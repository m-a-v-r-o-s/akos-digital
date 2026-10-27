import type { APIRoute } from "astro";
import { clientIp } from "../../../lib/leadGuard.ts";
import { checkCode, sameOrigin, sessionCookie } from "../../../lib/statsAuth.ts";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  const form = await request.formData().catch(() => null);
  const code = String(form?.get("code") ?? "").replace(/\s/g, "").slice(0, 12);
  const result = checkCode(code);
  if (result === "ok") {
    console.warn("[stats] signed in from", clientIp(request));
    return new Response(null, { status: 303, headers: { Location: "/stats", "Set-Cookie": sessionCookie() } });
  }
  console.warn(`[stats] ${result} code from`, clientIp(request));
  return new Response(null, { status: 303, headers: { Location: `/stats?sent=1&e=${result}` } });
};
