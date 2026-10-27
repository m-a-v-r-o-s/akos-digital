/**
 * Abuse guards for the public lead form. Pure and dependency-free, so the
 * server route, the client component, and scripts/check-lead-route.ts can all
 * share them, in particular HONEYPOT_FIELD, which must be identical in the
 * rendered input and the server check or the honeypot silently does nothing.
 */

/**
 * Bait field rendered off-screen by <Honeypot>. A human never sees it, so a
 * non-empty value means a bot filled the form in.
 */
export const HONEYPOT_FIELD = "company_website";

// Cloudflare edge ranges, copied from https://www.cloudflare.com/ips-v4 and
// /ips-v6 on 2026-10-25. Refresh occasionally; they change rarely.
const CF_V4 = `173.245.48.0/20 103.21.244.0/22 103.22.200.0/22 103.31.4.0/22
141.101.64.0/18 108.162.192.0/18 190.93.240.0/20 188.114.96.0/20
197.234.240.0/22 198.41.128.0/17 162.158.0.0/15 104.16.0.0/13
104.24.0.0/14 172.64.0.0/13 131.0.72.0/22`.split(/\s+/);
const CF_V6 = `2400:cb00::/32 2606:4700::/32 2803:f800::/32 2405:b500::/32
2405:8100::/32 2a06:98c0::/29 2c0f:f248::/32`.split(/\s+/);

function v4(ip: string): number | null {
  const p = ip.split(".").map(Number);
  if (p.length !== 4 || p.some((n) => !(n >= 0 && n <= 255))) return null;
  return ((p[0] << 24) | (p[1] << 16) | (p[2] << 8) | p[3]) >>> 0;
}

/** Expands an IPv6 address to a BigInt, or null if it is not one. */
function v6(ip: string): bigint | null {
  if (!/^[0-9a-f:]+$/i.test(ip) || (ip.match(/::/g) || []).length > 1) return null;
  const [h, t = ""] = ip.split("::");
  const head = h ? h.split(":") : [];
  const tail = t ? t.split(":") : [];
  const fill = ip.includes("::") ? 8 - head.length - tail.length : 0;
  const groups = [...head, ...Array(Math.max(fill, 0)).fill("0"), ...tail];
  if (groups.length !== 8) return null;
  return groups.reduce((acc, g) => (acc << BigInt(16)) | BigInt(parseInt(g, 16) || 0), BigInt(0));
}

function isCloudflare(ip: string): boolean {
  const a4 = v4(ip);
  if (a4 !== null) {
    return CF_V4.some((c) => {
      const [base, bits] = c.split("/");
      const mask = (~0 << (32 - Number(bits))) >>> 0;
      return ((a4 & mask) >>> 0) === ((v4(base)! & mask) >>> 0);
    });
  }
  const a6 = v6(ip);
  if (a6 === null) return false;
  return CF_V6.some((c) => {
    const [base, bits] = c.split("/");
    const shift = BigInt(128 - Number(bits));
    return a6 >> shift === v6(base)! >> shift;
  });
}

/**
 * Client IP on Railway behind Cloudflare. Railway's edge sets x-real-ip to the
 * address that connected to it, which a client cannot spoof. When that is a
 * Cloudflare edge, cf-connecting-ip carries the visitor; otherwise x-real-ip
 * is already the client. x-forwarded-for is never trusted: its entries can be
 * client-supplied.
 */
export function clientIp(req: Request): string {
  const real = req.headers.get("x-real-ip")?.trim();
  if (!real) return "unknown";
  if (isCloudflare(real)) return req.headers.get("cf-connecting-ip")?.trim() || real;
  return real;
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
