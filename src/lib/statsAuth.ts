/**
 * Sign-in for /stats: a six-digit code emailed to the owner, never a password.
 * A good code sets a signed session cookie (HttpOnly, Secure, SameSite=Strict)
 * for 30 days. Codes expire after 10 minutes; wrong guesses lock sign-in for a
 * growing pause (2s, 4s, 8s ... up to 15 min); code requests are rate limited.
 *
 * ponytail: state is in memory, so a redeploy signs everyone out and forgets
 * pending codes. Fine for a single owner on one replica.
 */
import { createHmac, randomBytes, randomInt, timingSafeEqual } from "node:crypto";

const SECRET = process.env.STATS_SECRET || randomBytes(32).toString("hex");
export const COOKIE = "akos_stats";
const SESSION_MS = 30 * 86_400_000;
const CODE_MS = 10 * 60_000;

let pending: { hash: string; exp: number } | null = null;
let failures = 0;
let lockedUntil = 0;
const sends: number[] = [];

const hmac = (s: string) => createHmac("sha256", SECRET).update(s).digest("hex");
const same = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

/** A new code, or null when three were already sent in the last 15 minutes. */
export function newCode(now = Date.now()): string | null {
  while (sends.length && sends[0] < now - 15 * 60_000) sends.shift();
  if (sends.length >= 3) return null;
  sends.push(now);
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  pending = { hash: hmac(code), exp: now + CODE_MS };
  return code;
}

export type Check = "ok" | "bad" | "locked";

export function checkCode(code: string, now = Date.now()): Check {
  if (now < lockedUntil) return "locked";
  if (pending && now < pending.exp && /^\d{6}$/.test(code) && same(hmac(code), pending.hash)) {
    pending = null;
    failures = 0;
    return "ok";
  }
  failures++;
  lockedUntil = now + Math.min(2 ** failures * 1000, 15 * 60_000);
  if (failures >= 5) pending = null; // five misses burn the code
  return "bad";
}

export function sessionCookie(now = Date.now()): string {
  const exp = String(now + SESSION_MS);
  return `${COOKIE}=${exp}.${hmac(exp)}; Path=/; Max-Age=${SESSION_MS / 1000}; HttpOnly; Secure; SameSite=Strict`;
}

export function validSession(cookieHeader: string | null, now = Date.now()): boolean {
  const raw = cookieHeader?.split(/;\s*/).find((c) => c.startsWith(COOKIE + "="))?.slice(COOKIE.length + 1);
  if (!raw) return false;
  const [exp, sig] = raw.split(".");
  return !!exp && !!sig && Number(exp) > now && same(hmac(exp), sig);
}

/** POSTs to the sign-in endpoints must come from this site's own pages. */
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) return false;
  try { return new URL(origin).host === host; } catch { return false; }
}
