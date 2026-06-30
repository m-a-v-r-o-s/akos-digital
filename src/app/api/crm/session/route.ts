import { NextResponse } from "next/server";
import { checkOtp } from "@/lib/crmOtp";
import {
  createSession,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/crmAuth";

export const runtime = "nodejs";

/**
 * POST /api/crm/session  — verify the passkey, then set the session cookie.
 * DELETE /api/crm/session — log out (clear the cookie).
 */
export async function POST(req: Request) {
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

  if (!checkOtp(code)) {
    return NextResponse.json({ error: "denied" }, { status: 401 });
  }

  const token = createSession();
  if (!token) {
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
