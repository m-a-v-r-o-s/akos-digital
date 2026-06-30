import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client.
 *
 * Uses the SERVICE ROLE key, so this module must never be imported into a
 * client component — it only runs inside API route handlers. The lazy getter
 * lets the app build and run even before the env vars are configured; the
 * /api/lead route reports a clear error instead of crashing at import time.
 */
let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return null;

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
