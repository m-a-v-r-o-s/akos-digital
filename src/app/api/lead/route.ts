import { NextResponse } from "next/server";
import { sendMail } from "@/lib/email";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trim + cap an incoming string so a single submission can't send junk. */
function str(v: unknown, max = 2000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

const SOURCES = ["request-wizard", "espa-assessment"] as const;

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

/**
 * Client IP behind Railway's proxy.
 *
 * `x-forwarded-for` is a chain each hop appends to, so a client can prepend
 * whatever it likes — the LEFTMOST entry is attacker-controlled and must not
 * be trusted. Railway appends the address it actually observed, so with one
 * trusted proxy in front the RIGHTMOST entry is the real client. Using it for
 * both the rate-limit key and the logged value means a spoofed header can
 * neither dodge the limit nor plant a fake IP in the lead email.
 */
function clientIp(req: Request): string {
  const chain = (req.headers.get("x-forwarded-for") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return chain[chain.length - 1] || req.headers.get("x-real-ip")?.trim() || "unknown";
}

// ── Rate limiting ────────────────────────────────────────────────────────
// ponytail: in-memory sliding window, so the limit is per instance and resets
// on redeploy. Fine for one Railway replica; move to Redis/Upstash if this
// ever scales horizontally.
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_IP = 5;
const MAX_KEYS = 5000; // hard cap so a spoofed-IP flood can't grow the map
const hits = new Map<string, number[]>();

/** Returns true if this IP is over its quota. Prunes as it goes. */
function rateLimited(ip: string): boolean {
  const now = Date.now();

  if (hits.size > MAX_KEYS) {
    for (const [k, times] of hits) {
      if (times[times.length - 1] < now - WINDOW_MS) hits.delete(k);
    }
    if (hits.size > MAX_KEYS) hits.clear();
  }

  const recent = (hits.get(ip) ?? []).filter((t) => t > now - WINDOW_MS);
  if (recent.length >= MAX_PER_IP) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
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
    lines.push("", "— ESPA assessment —");
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

  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const name = str(body.name, 120);
  const needs = Array.isArray(body.needs)
    ? body.needs.filter((n): n is string => typeof n === "string").slice(0, 12)
    : [];
  const email = str(body.email, 200);
  const consent = body.consent === true;

  // Mirror the wizard's client-side validation on the server.
  if (!name) return NextResponse.json({ error: "name_required" }, { status: 422 });
  if (needs.length === 0) return NextResponse.json({ error: "needs_required" }, { status: 422 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "email_invalid" }, { status: 422 });
  if (!consent) return NextResponse.json({ error: "consent_required" }, { status: 422 });

  const requestedSource = str(body.source, 40);
  const source = (SOURCES as readonly string[]).includes(requestedSource)
    ? requestedSource
    : "request-wizard";

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
    phone: str(body.phone, 60),
    contact_method: str(body.contactMethod, 60),
    lang: str(body.lang, 5) || "el",
    source,
    ip,
    user_agent: str(req.headers.get("user-agent"), 400),
  };

  const label = source === "espa-assessment" ? "ESPA" : "Request";
  const sent = await sendMail({
    to: process.env.LEAD_ALERT_EMAIL || "info@akosds.com",
    replyTo: email,
    subject: `${label} · ${name}${lead.business_name ? ` (${lead.business_name})` : ""}`,
    text: format(lead, extra),
  });

  if (!sent) {
    // Email is the only sink now — a silent failure would lose the lead, so
    // surface it and let the visitor retry.
    console.error("[lead] send failed for", email);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
