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
assert.equal(clientIp(req({ "x-forwarded-for": "203.0.113.5" })), "203.0.113.5");

// A spoofed leading entry must lose to the address the proxy appended.
assert.equal(
  clientIp(req({ "x-forwarded-for": "8.8.8.8, 203.0.113.5" })),
  "203.0.113.5",
  "rightmost XFF entry must win, or spoofing defeats the rate limit"
);

assert.equal(clientIp(req({ "x-real-ip": "198.51.100.1" })), "198.51.100.1");
assert.equal(clientIp(req({})), "unknown");
assert.equal(clientIp(req({ "x-forwarded-for": " , " })), "unknown");

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

console.log("✓ lead route guards OK");
