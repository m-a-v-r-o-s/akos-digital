import type { APIRoute } from "astro";
import { clientIp } from "../../lib/leadGuard.ts";
import { clean, prune, record, tooMany } from "../../lib/stats.ts";

export const prerender = false;

let lastPrune = 0;
const noContent = () => new Response(null, { status: 204 });

/** Page-view beacon from site.ts. Always 204: a caller learns nothing about what was kept. */
export const POST: APIRoute = async ({ request }) => {
  const text = await request.text().catch(() => "");
  if (text.length > 4000 || tooMany(clientIp(request))) return noContent();
  let body: unknown;
  try { body = JSON.parse(text); } catch { return noContent(); }
  const hit = clean(body, request.headers.get("user-agent") ?? "", request.headers.get("cf-ipcountry"));
  if (!hit) return noContent();
  try {
    await record(hit);
    if (hit.t - lastPrune > 86_400_000) { lastPrune = hit.t; await prune(hit.t); }
  } catch (err) {
    console.error("[stats] write failed:", (err as Error).message);
  }
  return noContent();
};
