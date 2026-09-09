/**
 * Abuse guards for the public lead form. Pure and dependency-free, so the
 * server route, the client component, and scripts/check-lead-route.ts can all
 * share them — in particular HONEYPOT_FIELD, which must be identical in the
 * rendered input and the server check or the honeypot silently does nothing.
 */

/**
 * Bait field rendered off-screen by <Honeypot>. A human never sees it, so a
 * non-empty value means a bot filled the form in.
 */
export const HONEYPOT_FIELD = "company_website";

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
export function clientIp(req: Request): string {
  const chain = (req.headers.get("x-forwarded-for") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return chain[chain.length - 1] || req.headers.get("x-real-ip")?.trim() || "unknown";
}

// ponytail: in-memory sliding window, so the limit is per instance and resets
// on redeploy. Fine for one Railway replica; move to Redis/Upstash if this
// ever scales horizontally.
export const WINDOW_MS = 60 * 60 * 1000; // 1 hour
export const MAX_PER_IP = 5;
const MAX_KEYS = 5000; // hard cap so a spoofed-IP flood can't grow the map

const hits = new Map<string, number[]>();

/** Returns true if this IP is over its quota. Prunes as it goes. */
export function rateLimited(ip: string, now = Date.now()): boolean {
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

/** Test seam: drop all recorded hits. */
export function resetRateLimit(): void {
  hits.clear();
}
