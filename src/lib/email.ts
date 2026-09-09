/**
 * Tiny email sender. Lead submissions (/api/lead) are delivered as email —
 * there is no database, so a failed send means a lost lead and the caller
 * must surface the failure rather than swallow it.
 *
 * Uses the Resend HTTP API directly (no SDK, no extra dependency). If
 * RESEND_API_KEY is not set, it logs the message server-side and reports
 * failure.
 */

type Mail = { to: string; subject: string; text: string; replyTo?: string };

export async function sendMail({ to, subject, text, replyTo }: Mail): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_MAIL_FROM || "onboarding@resend.dev";

  if (!key) {
    console.warn(
      `[email] RESEND_API_KEY not set — not sending. Intended for ${to}:\n  ${subject}\n  ${text}`
    );
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      // reply_to lets the owner hit Reply and answer the lead directly.
      body: JSON.stringify({ from, to, subject, text, ...(replyTo && { reply_to: replyTo }) }),
    });
    if (!res.ok) {
      console.error("[email] send failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] send threw:", err);
    return false;
  }
}
