import crypto from "crypto";

/**
 * Minimal signed-session helper for the CRM.
 *
 * A session token is `${expiresAt}.${hmac}` where the HMAC is keyed with
 * CRM_SESSION_SECRET. No DB, no library — just enough to prove the cookie was
 * issued by us and hasn't expired. If the secret is unset, every check fails
 * (secure default: the CRM stays locked until configured).
 */

const TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

function secret(): string | null {
  return process.env.CRM_SESSION_SECRET || null;
}

function sign(payload: string, key: string): string {
  return crypto.createHmac("sha256", key).update(payload).digest("hex");
}

export function createSession(): string | null {
  const key = secret();
  if (!key) return null;
  const payload = String(Date.now() + TTL_MS);
  return `${payload}.${sign(payload, key)}`;
}

export function verifySession(token?: string | null): boolean {
  const key = secret();
  if (!key || !token) return false;

  const dot = token.lastIndexOf(".");
  if (dot < 1) return false;

  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = sign(payload, key);

  if (sig.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;

  const exp = Number(payload);
  return Number.isFinite(exp) && exp > Date.now();
}

export const SESSION_COOKIE = "crm_session";
export const SESSION_MAX_AGE = TTL_MS / 1000;
