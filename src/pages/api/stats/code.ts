import type { APIRoute } from "astro";
import { sendMail } from "../../../lib/email.ts";
import { clientIp } from "../../../lib/leadGuard.ts";
import { newCode, sameOrigin } from "../../../lib/statsAuth.ts";

export const prerender = false;

const back = (q: string) => new Response(null, { status: 303, headers: { Location: `/stats?${q}` } });

/** Emails a one-time sign-in code for /stats to the owner's own address. */
export const POST: APIRoute = async ({ request }) => {
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  const code = newCode();
  if (!code) return back("wait=1");
  const to = process.env.STATS_EMAIL || process.env.LEAD_ALERT_EMAIL || "info@akosds.com";
  const ok = await sendMail({ to, subject: `akosds.com stats code: ${code}`, text: `Your sign-in code for akosds.com/stats is ${code}. It expires in 10 minutes.\n\nRequested from ${clientIp(request)}. If this wasn't you, ignore this email.` });
  console.warn("[stats] sign-in code requested from", clientIp(request), ok ? "(sent)" : "(send failed)");
  return back(ok ? "sent=1" : "mailfail=1");
};
