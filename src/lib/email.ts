/**
 * Tiny email sender used for the CRM passkey (and reusable for lead alerts).
 *
 * Uses the Resend HTTP API directly (no SDK, no extra dependency). If
 * RESEND_API_KEY is not set, it logs the message server-side instead of
 * sending — handy during setup so the owner can still read the code from logs.
 */

type Mail = { to: string; subject: string; text: string };

export async function sendMail({ to, subject, text }: Mail): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CRM_MAIL_FROM || "onboarding@resend.dev";

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
      body: JSON.stringify({ from, to, subject, text }),
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
