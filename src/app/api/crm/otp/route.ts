import { NextResponse } from "next/server";
import { issueOtp, OTP_COOKIE, OTP_MAX_AGE } from "@/lib/crmOtp";
import { sendMail } from "@/lib/email";

export const runtime = "nodejs";

/**
 * POST /api/crm/otp
 * Triggered when the Obi-Wan page is clicked. Generates a one-time passkey,
 * emails it to the owner, and stores its signed hash in an HTTP-only cookie so
 * it can be verified statelessly. Never returns the code itself.
 */
export async function POST() {
  const issued = issueOtp();
  if (!issued) {
    // CRM_SESSION_SECRET not set — stay silent (CRM stays locked).
    console.error("[crm] CRM_SESSION_SECRET is not set — cannot issue passkey.");
    return NextResponse.json({ ok: true });
  }

  const to = process.env.CRM_ALERT_EMAIL || "info@akosds.com";
  await sendMail({
    to,
    subject: "Akos · access passkey",
    text: `Your one-time access passkey is ${issued.code}\n\nValid for 10 minutes. If you didn't request this, ignore it.`,
  });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(OTP_COOKIE, issued.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: OTP_MAX_AGE,
  });
  return res;
}
