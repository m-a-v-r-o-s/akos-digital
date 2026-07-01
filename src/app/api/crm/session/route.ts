import { NextResponse, type NextRequest } from "next/server";
import { verifyOtp, OTP_COOKIE, OTP_MAX_AGE } from "@/lib/crmOtp";
import { createSession, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/crmAuth";

export const runtime = "nodejs";

const cookieBase = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

/**
 * POST /api/crm/session  — verify the passkey (from the crm_otp cookie), then
 *                          set the session cookie.
 * DELETE /api/crm/session — log out (clear the session cookie).
 */
export async function POST(req: NextRequest) {
  if (!process.env.CRM_SESSION_SECRET) {
    console.error("[crm] CRM_SESSION_SECRET is not set — login disabled.");
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  let code = "";
  try {
    const body = await req.json();
    code = typeof body?.code === "string" ? body.code.trim() : "";
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const token = req.cookies.get(OTP_COOKIE)?.value;
  const result = verifyOtp(code, token);

  if (!result.ok) {
    const res = NextResponse.json({ error: "denied" }, { status: 401 });
    if (result.token) {
      res.cookies.set(OTP_COOKIE, result.token, { ...cookieBase, maxAge: OTP_MAX_AGE });
    } else {
      res.cookies.set(OTP_COOKIE, "", { ...cookieBase, maxAge: 0 });
    }
    return res;
  }

  const session = createSession();
  if (!session) {
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, session, { ...cookieBase, maxAge: SESSION_MAX_AGE });
  res.cookies.set(OTP_COOKIE, "", { ...cookieBase, maxAge: 0 }); // consume the passkey
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { ...cookieBase, maxAge: 0 });
  return res;
}
