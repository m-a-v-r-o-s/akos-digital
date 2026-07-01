import crypto from "crypto";

/**
 * Cookie-backed one-time passkey.
 *
 * The (hashed) code lives in a signed, HTTP-only cookie set on the response
 * that emails it, so verification is stateless: it works across server
 * restarts, redeploys, and multiple instances — unlike an in-memory store,
 * where a code issued by one process is invisible to another.
 *
 * Signed with CRM_SESSION_SECRET. If that is unset, no code can be issued or
 * verified (the CRM stays locked — a secure default).
 */

const TTL_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export const OTP_COOKIE = "crm_otp";
export const OTP_MAX_AGE = TTL_MS / 1000;

function key(): string | null {
  return process.env.CRM_SESSION_SECRET || null;
}
function sha256(s: string): string {
  return crypto.createHash("sha256").update(s).digest("hex");
}
function sign(payload: string, k: string): string {
  return crypto.createHmac("sha256", k).update(payload).digest("hex");
}
function safeEq(a: string, b: string): boolean {
  return a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

/** Returns the code to email and the signed cookie token to store, or null. */
export function issueOtp(): { code: string; token: string } | null {
  const k = key();
  if (!k) return null;
  const code = String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");
  const payload = `${sha256(code)}.${Date.now() + TTL_MS}.0`;
  return { code, token: `${payload}.${sign(payload, k)}` };
}

export type VerifyResult = { ok: boolean; token?: string; clear?: boolean };

/**
 * Verify an entered code against the cookie token. On a wrong-but-still-valid
 * guess it returns a refreshed token (attempt count + 1) to set back on the
 * cookie; `clear` means the cookie should be removed.
 */
export function verifyOtp(code: string, token?: string | null): VerifyResult {
  const k = key();
  if (!k || !token) return { ok: false, clear: true };

  const parts = token.split(".");
  if (parts.length !== 4) return { ok: false, clear: true };
  const [hash, expStr, attemptsStr, sig] = parts;

  const payload = `${hash}.${expStr}.${attemptsStr}`;
  if (!safeEq(sig, sign(payload, k))) return { ok: false, clear: true };

  const exp = Number(expStr);
  const attempts = Number(attemptsStr);
  if (!Number.isFinite(exp) || exp < Date.now()) return { ok: false, clear: true };
  if (!Number.isFinite(attempts) || attempts >= MAX_ATTEMPTS) return { ok: false, clear: true };

  if (safeEq(sha256(String(code)), hash)) return { ok: true, clear: true };

  const bumped = `${hash}.${expStr}.${attempts + 1}`;
  return { ok: false, token: `${bumped}.${sign(bumped, k)}` };
}
