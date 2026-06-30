import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { verifySession, SESSION_COOKIE } from "@/lib/crmAuth";
import { getSupabase } from "@/lib/supabase";
import CrmDashboard, { type Lead } from "@/components/CrmDashboard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CRM",
  robots: { index: false, follow: false },
};

export default async function CrmPage() {
  // Gate: a valid signed session cookie is required. Otherwise 404 — the page
  // gives no hint that it exists.
  const store = await cookies();
  if (!verifySession(store.get(SESSION_COOKIE)?.value)) notFound();

  const supabase = getSupabase();
  let leads: Lead[] = [];
  let error: string | null = null;

  if (!supabase) {
    error = "Supabase is not configured (set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY).";
  } else {
    const { data, error: e } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (e) error = e.message;
    else leads = (data ?? []) as Lead[];
  }

  return <CrmDashboard leads={leads} error={error} />;
}
