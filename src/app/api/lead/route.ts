import { NextResponse } from "next/server";
import { sendMail } from "@/lib/email";
import { HONEYPOT_FIELD, clientIp, rateLimited } from "@/lib/leadGuard";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trim + cap an incoming string so a single submission can't send junk. */
function str(v: unknown, max = 2000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

const SOURCES = ["request-wizard", "espa-assessment", "7mero-order"] as const;

/**
 * Origins allowed to POST here cross-site.
 *
 * 7μερο is currently served from this same origin at /7mero, so its order form
 * needs none of this: a same-origin POST sends no Origin the list has to match.
 * The punycode hosts stay for the day it moves to its own domain, since that is
 * a static Astro build with no server and would still post here rather than
 * duplicate the Resend wiring, the honeypot and the rate limiter.
 *
 * An explicit list, never a wildcard: this route sends mail, so anything that
 * can reach it can spend the sending quota.
 */
const ALLOWED_ORIGINS = new Set([
  "https://xn--7-7lbunj.com",
  "https://www.xn--7-7lbunj.com",
  // Astro's dev and preview servers, so the form can be tested against a local
  // akosds. Dropped from the set entirely in production.
  ...(process.env.NODE_ENV === "production"
    ? []
    : ["http://localhost:4321", "http://localhost:3001"]),
]);

/**
 * CORS headers for an allowed origin, none for anyone else. Vary matters: the
 * response differs per origin, and without it a shared cache could hand one
 * origin's headers to another.
 */
function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin");
  if (!origin || !ALLOWED_ORIGINS.has(origin)) return { Vary: "Origin" };
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

/** A JSON POST from another origin is preflighted, so this has to answer. */
export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(req) });
}

/** Sanitise an arbitrary `extra` object into a flat record of capped strings. */
function cleanExtra(v: unknown): Record<string, string> {
  if (!v || typeof v !== "object" || Array.isArray(v)) return {};
  const out: Record<string, string> = {};
  for (const [k, val] of Object.entries(v as Record<string, unknown>).slice(0, 30)) {
    const s = str(val, 500);
    if (s) out[k.slice(0, 60)] = s;
  }
  return out;
}

/** Human-readable lead email. Only non-empty fields are listed. */
function format(lead: Record<string, string | string[]>, extra: Record<string, string>): string {
  const lines: string[] = [];
  const add = (label: string, value: string | string[]) => {
    const v = Array.isArray(value) ? value.join(", ") : value;
    if (v) lines.push(`${label.padEnd(16)} ${v}`);
  };

  add("Name", lead.name);
  add("Business", lead.business_name);
  add("Email", lead.email);
  add("Phone", lead.phone);
  add("Prefers", lead.contact_method);
  lines.push("");
  add("Needs", lead.needs);
  add("Situation", lead.situation);
  add("Budget", lead.budget);
  add("Timeline", lead.timeline);

  if (Object.keys(extra).length) {
    // The wizard now sends `extra` too (the declined 7μερο offer), so the
    // heading follows the source instead of always claiming to be ESPA.
    lines.push("", lead.source === "espa-assessment" ? "— ESPA assessment —" : "— Extra —");
    for (const [k, v] of Object.entries(extra)) add(k.replace(/_/g, " "), v);
  }

  if (lead.business_about) lines.push("", "— About the business —", String(lead.business_about));
  if (lead.details) lines.push("", "— Details —", String(lead.details));

  lines.push(
    "",
    "———",
    `Source:     ${lead.source}`,
    `Language:   ${lead.lang}`,
    `IP:         ${lead.ip}`,
    `User agent: ${lead.user_agent}`,
    `Received:   ${new Date().toISOString()}`
  );

  return lines.join("\n");
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  // Every response needs these, not just the happy one: without them the
  // browser will not let the 7μερο page read its own error either.
  const cors = corsHeaders(req);

  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429, headers: cors });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400, headers: cors });
  }

  // Drop bots BEFORE validating, so a spam run learns nothing from the
  // response. 200 + {ok:true} is deliberate: a 4xx tells the bot which field
  // gave it away, and it just clears that one and retries.
  if (str(body[HONEYPOT_FIELD], 200)) {
    console.warn("[lead] honeypot tripped from", ip);
    return NextResponse.json({ ok: true }, { headers: cors });
  }

  const requestedSource = str(body.source, 40);
  const source = (SOURCES as readonly string[]).includes(requestedSource)
    ? requestedSource
    : "request-wizard";

  const name = str(body.name, 120);
  const needs = Array.isArray(body.needs)
    ? body.needs.filter((n): n is string => typeof n === "string").slice(0, 12)
    : [];
  const email = str(body.email, 200);
  const phone = str(body.phone, 60);
  const consent = body.consent === true;

  /**
   * The 7μερο order form is deliberately three fields: name, phone, and what
   * the business does. Its whole pitch is that there is nothing to fill in, so
   * it cannot be held to the wizard's needs-and-email shape. Phone carries the
   * callback instead, and an email is accepted but never demanded.
   */
  const phoneOnly = source === "7mero-order";
  const fail = (error: string) =>
    NextResponse.json({ error }, { status: 422, headers: cors });

  // Mirror each form's client-side validation on the server.
  if (!name) return fail("name_required");
  if (!phoneOnly && needs.length === 0) return fail("needs_required");
  if (phoneOnly && !phone) return fail("phone_required");
  // Required for the wizard and ESPA, optional but still checked for 7μερο:
  // a typo'd address is worth rejecting, an absent one is not.
  if (phoneOnly ? email && !EMAIL_RE.test(email) : !EMAIL_RE.test(email)) {
    return fail("email_invalid");
  }
  if (!consent) return fail("consent_required");

  const extra = cleanExtra(body.extra);
  const lead = {
    name,
    needs,
    business_name: str(body.businessName, 200),
    business_about: str(body.businessAbout, 600),
    situation: str(body.situation, 60),
    budget: str(body.budget, 60),
    timeline: str(body.timeline, 60),
    details: str(body.details, 2000),
    email,
    phone,
    contact_method: str(body.contactMethod, 60),
    lang: str(body.lang, 5) || "el",
    source,
    ip,
    user_agent: str(req.headers.get("user-agent"), 400),
  };

  const label =
    source === "espa-assessment" ? "ESPA" : source === "7mero-order" ? "7μερο" : "Request";
  const sent = await sendMail({
    to: process.env.LEAD_ALERT_EMAIL || "info@akosds.com",
    // A 7μερο lead may have no email at all, and Resend rejects an empty one.
    ...(email && { replyTo: email }),
    subject: `${label} · ${name}${lead.business_name ? ` (${lead.business_name})` : ""}`,
    text: format(lead, extra),
  });

  if (!sent) {
    // Email is the only sink now, a silent failure would lose the lead, so
    // surface it and let the visitor retry.
    console.error("[lead] send failed for", email || phone);
    return NextResponse.json({ error: "send_failed" }, { status: 502, headers: cors });
  }

  return NextResponse.json({ ok: true }, { headers: cors });
}
