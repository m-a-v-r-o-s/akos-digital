import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/ping
 * Keep-alive for the free-tier Supabase project, which pauses after ~7 days of
 * inactivity. Runs a read-only HEAD count against `leads` (no rows returned, no
 * data changed) so a scheduled request every few days keeps the database awake.
 */
export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ ok: false, reason: "unconfigured" });
  }

  const { error } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true });

  if (error) {
    console.error("[ping] supabase read failed:", error.message);
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  return NextResponse.json({ ok: true, ts: Date.now() });
}
