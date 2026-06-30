import crypto from "crypto";

/**
 * One-time passkey store for CRM login.
 *
 * Kept in module memory — fine for a single long-running server (Railway).
 * A fresh 6-digit code is emailed to the owner each time the Obi-Wan page is
 * clicked; it is single-use, expires after 10 minutes, and survives at most a
 * handful of wrong attempts before it is discarded.
 */

const TTL_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const THROTTLE_MS = 8 * 1000; // ignore re-issues fired faster than this

type Active = { hash: string; expiresAt: number; attempts: number };

let active: Active | null = null;
let lastIssued = 0;

function sha256(s: string): string {
  return crypto.createHash("sha256").update(s).digest("hex");
}

/** Returns a fresh code to email, or null if throttled (caller stays silent). */
export function issueOtp(): string | null {
  const now = Date.now();
  if (now - lastIssued < THROTTLE_MS) return null;
  lastIssued = now;

  const code = String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");
  active = { hash: sha256(code), expiresAt: now + TTL_MS, attempts: 0 };
  return code;
}

export function checkOtp(code: string): boolean {
  if (!active) return false;
  if (Date.now() > active.expiresAt) {
    active = null;
    return false;
  }
  if (active.attempts >= MAX_ATTEMPTS) {
    active = null;
    return false;
  }
  active.attempts += 1;

  const candidate = sha256(String(code));
  const ok =
    candidate.length === active.hash.length &&
    crypto.timingSafeEqual(Buffer.from(candidate), Buffer.from(active.hash));

  if (ok) active = null; // single use
  return ok;
}
