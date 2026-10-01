import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Resend's own sink: accepts and discards, never bounces, so probes cannot hurt
// the sender reputation. Still counts toward the free-tier daily quota, hence
// the cache below.
const PROBE_TO = "delivered@resend.dev";
const TTL_MS = 60 * 60 * 1000;

// ponytail: per instance, resets on redeploy. Fine for one replica.
let last: { at: number; ok: boolean } | null = null;

function authorised(req: Request): boolean {
  const want = process.env.HEALTHCHECK_TOKEN;
  const got = req.headers.get("x-health-token") ?? "";
  if (!want || got.length !== want.length) return false;
  return timingSafeEqual(Buffer.from(got), Buffer.from(want));
}

/**
 * Uptime probe for the mail path /api/lead depends on (API key, sender domain,
 * Resend itself). Sends one real email through the same sendMail() the lead form
 * uses, but to a test sink, and at most once an hour however often it is polled.
 * A failed send is never cached, so a recovery shows on the next poll.
 */
export async function GET(req: Request) {
  if (!authorised(req)) return new Response(null, { status: 404 });

  if (!last || !last.ok || Date.now() - last.at > TTL_MS) {
    const ok = await sendMail({
      to: PROBE_TO,
      subject: "akosds mail probe",
      text: `Uptime probe ${new Date().toISOString()}`,
    });
    last = { at: Date.now(), ok };
  }

  return NextResponse.json(
    { ok: last.ok, checkedAt: new Date(last.at).toISOString() },
    { status: last.ok ? 200 : 503, headers: { "Cache-Control": "no-store" } }
  );
}
