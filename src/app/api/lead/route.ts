import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trim + cap an incoming string so a single submission can't store junk. */
function str(v: unknown, max = 2000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

const SOURCES = ["request-wizard", "espa-assessment"] as const;

/** Sanitise an arbitrary `extra` object into a flat record of capped strings. */
function cleanExtra(v: unknown): Record<string, string> | null {
  if (!v || typeof v !== "object" || Array.isArray(v)) return null;
  const out: Record<string, string> = {};
  for (const [k, val] of Object.entries(v as Record<string, unknown>).slice(0, 30)) {
    const s = str(val, 500);
    if (s) out[k.slice(0, 60)] = s;
  }
  return Object.keys(out).length ? out : null;
}

export async function POST(req: Request) {
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

  const supabase = getSupabase();
  if (!supabase) {
    // Env not configured yet — fail loudly in logs but don't leak details.
    console.error("[lead] Supabase env vars are not set (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
    return NextResponse.json({ error: "server_unconfigured" }, { status: 503 });
  }

  const requestedSource = str(body.source, 40);
  const source = (SOURCES as readonly string[]).includes(requestedSource)
    ? requestedSource
    : "request-wizard";

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
    consent,
    lang: str(body.lang, 5) || "el",
    source,
    extra: cleanExtra(body.extra),
    user_agent: str(req.headers.get("user-agent"), 400),
  };

  const { error } = await supabase.from("leads").insert(lead);

  if (error) {
    console.error("[lead] Supabase insert failed:", error.message);
    return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
