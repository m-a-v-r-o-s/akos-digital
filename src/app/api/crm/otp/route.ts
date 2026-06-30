import { NextResponse } from "next/server";
import { issueOtp } from "@/lib/crmOtp";
import { sendMail } from "@/lib/email";

export const runtime = "nodejs";

/**
 * POST /api/crm/otp
 * Triggered when the Obi-Wan page is clicked. Generates a one-time passkey and
 * emails it to the owner. Always responds `{ ok: true }` and never returns the
 * code — the viewer gets no hint; only the inbox owner can read it.
 */
export async function POST() {
  const code = issueOtp();

  // null = throttled; stay silent and pretend success.
  if (code) {
    const to = process.env.CRM_ALERT_EMAIL || "info@akosds.com";
    await sendMail({
      to,
      subject: "Akos · access passkey",
      text: `Your one-time access passkey is ${code}\n\nValid for 10 minutes. If you didn't request this, ignore it.`,
    });
  }

  return NextResponse.json({ ok: true });
}
