import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/ping
 * Keep-alive for the free-tier Supabase project, which pauses after ~7 days of
 * inactivity. Performs a tiny WRITE (upsert of a single row) rather than a
 * read, so it registers as unambiguous database activity. A scheduled request
 * every few hours keeps the database awake.
 *
 * Requires the `keepalive` table (see supabase/schema.sql).
 */
export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ ok: false, reason: "unconfigured" });
  }

  const { error } = await supabase
    .from("keepalive")
    .upsert({ id: 1, last_ping: new Date().toISOString() });

  if (error) {
    console.error("[ping] keepalive write failed:", error.message);
    // Still return 200 so the scheduler doesn't disable the job.
    return NextResponse.json({ ok: false, error: error.message }, { status: 200 });
  }

  return NextResponse.json({ ok: true, ts: Date.now() });
}
