/**
 * Self-check for the lead form's abuse guards.
 *   node --experimental-strip-types scripts/check-lead-route.ts
 *
 * Covers the logic that silently stops protecting anything when it breaks:
 * a rate limit that never trips, an IP a client can spoof, and a honeypot
 * whose field name drifts from the input the form actually renders.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  HONEYPOT_FIELD,
  MAX_PER_IP,
  WINDOW_MS,
  clientIp,
  rateLimited,
  resetRateLimit,
} from "../src/lib/leadGuard.ts";

const req = (headers: Record<string, string>) => new Request("https://x/", { headers });

// ── IP extraction ────────────────────────────────────────────────────────
assert.equal(clientIp(req({ "x-real-ip": "198.51.100.1" })), "198.51.100.1");
// Behind Cloudflare (x-real-ip is an edge range) the visitor is cf-connecting-ip.
assert.equal(
  clientIp(req({ "x-real-ip": "104.16.5.5", "cf-connecting-ip": "9.9.9.9" })),
  "9.9.9.9"
);
assert.equal(
  clientIp(req({ "x-real-ip": "2606:4700::1", "cf-connecting-ip": "9.9.9.9" })),
  "9.9.9.9"
);
// A client-supplied cf-connecting-ip or XFF must not win over a non-CF x-real-ip.
assert.equal(
  clientIp(
    req({ "x-real-ip": "8.8.8.8", "cf-connecting-ip": "9.9.9.9", "x-forwarded-for": "1.1.1.1" })
  ),
  "8.8.8.8"
);
// Just outside 104.16.0.0/13.
assert.equal(
  clientIp(req({ "x-real-ip": "104.15.255.255", "cf-connecting-ip": "9.9.9.9" })),
  "104.15.255.255"
);
assert.equal(clientIp(req({ "x-forwarded-for": "203.0.113.5" })), "unknown");
assert.equal(clientIp(req({})), "unknown");

// ── Rate limiting ────────────────────────────────────────────────────────
resetRateLimit();
for (let i = 0; i < MAX_PER_IP; i++) {
  assert.equal(rateLimited("1.1.1.1"), false, `submission ${i + 1} should pass`);
}
assert.equal(rateLimited("1.1.1.1"), true, "must trip once over quota");
assert.equal(rateLimited("2.2.2.2"), false, "a different IP must be unaffected");

// The window must actually slide, not block that IP forever.
const later = Date.now() + WINDOW_MS + 1000;
assert.equal(rateLimited("1.1.1.1", later), false, "quota must expire after the window");

// ── Honeypot field name ──────────────────────────────────────────────────
// The guard is worthless if the rendered input and the server check disagree.
const component = readFileSync(new URL("../src/components/Honeypot.tsx", import.meta.url), "utf8");
assert.match(
  component,
  /name=\{HONEYPOT_FIELD\}/,
  "Honeypot must render the shared constant as the input name"
);
const route = readFileSync(new URL("../src/app/api/lead/route.ts", import.meta.url), "utf8");
assert.match(route, /body\[HONEYPOT_FIELD\]/, "route must check the shared constant");
assert.ok(HONEYPOT_FIELD.length > 0);

// A tripped honeypot must look like success, or a bot learns which field
// caught it and simply clears that one and retries.
const branch = route.slice(
  route.indexOf("body[HONEYPOT_FIELD]"),
  route.indexOf("const name =")
);
assert.ok(branch.includes("{ ok: true }"), "honeypot branch must return ok:true");
assert.ok(!branch.includes("status:"), "honeypot branch must not return a status code");

// -- CORS allowlist -------------------------------------------------------
// This route sends mail, so whoever can reach it cross-site can spend the
// sending quota. A wildcard here is the failure worth catching in CI.
assert.ok(
  !/Access-Control-Allow-Origin["']?\s*[:,]\s*["']\*/.test(route),
  "lead route must never answer Access-Control-Allow-Origin: *"
);
assert.match(
  route,
  /export async function OPTIONS/,
  "a cross-origin JSON POST is preflighted, so OPTIONS must be handled"
);
assert.match(
  route,
  /https:\/\/xn--7-7lbunj\.com/,
  "7mero must be allowlisted by its punycode host, which is what the browser sends as Origin"
);
assert.match(
  route,
  /NODE_ENV === "production"\s*\?\s*\[\]/,
  "localhost origins must be dropped in production, not merely unused"
);
assert.match(route, /Vary: "Origin"/, "per-origin responses must not be cached across origins");

// -- 7mero accepts a phone instead of an email ----------------------------
// Its whole pitch is three fields. If this branch goes, the order form starts
// 422-ing every lead that did not type an email address.
assert.match(route, /"7mero-order"/, "7mero-order must be an accepted source");
assert.match(route, /phone_required/, "7mero must require a phone in place of the email");


console.log("✓ lead route guards OK");
