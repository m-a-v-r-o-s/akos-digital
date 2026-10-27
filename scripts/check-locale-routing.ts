/**
 * Self-check for the /el and /en locale routing.
 *   node --experimental-strip-types scripts/check-locale-routing.ts
 *
 * Covers the parts that fail silently rather than loudly: a language toggle
 * that drops the current page, a sitemap that stops covering both locales,
 * and legacy paths losing their redirect (which would turn the three URLs
 * Google already indexed into 404s).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LANGS, isLang, swapLocale } from "../src/lib/i18n.ts";

// ── locale guard ─────────────────────────────────────────────────────────
assert.deepEqual(LANGS, ["el", "en"], "Greek must stay first: it is x-default");
assert.ok(isLang("el") && isLang("en"));
assert.ok(!isLang("de") && !isLang("") && !isLang("EL"), "guard must reject non-locales");

// ── swapLocale keeps you on the same page ────────────────────────────────
assert.equal(swapLocale("/el", "en"), "/en");
assert.equal(swapLocale("/en", "el"), "/el");
assert.equal(
  swapLocale("/el/sectors/hotels", "en"),
  "/en/sectors/hotels",
  "the toggle must stay on the same page, not reset to the homepage"
);
assert.equal(swapLocale("/en/request", "el"), "/el/request");
assert.equal(swapLocale("/el/", "en"), "/en", "a trailing slash must not create an empty segment");
// A path that somehow has no locale segment gets one, rather than losing its tail.
assert.equal(swapLocale("/request", "el"), "/el/request");
assert.equal(swapLocale("/", "el"), "/el");
// Idempotent: swapping to the locale already in the path changes nothing.
assert.equal(swapLocale("/el/terms", "el"), "/el/terms");

// ── every legacy path still redirects ────────────────────────────────────
const { redirectFor } = await import("../src/lib/routes.mjs");
for (const p of ["/request", "/espa", "/privacy", "/terms", "/sectors/food"]) {
  assert.equal(redirectFor(p), `/el${p}`, `${p} must keep its redirect to /el${p}, or an indexed URL becomes a 404`);
}
assert.equal(redirectFor("/"), "/el", "the bare root must redirect to the default locale");
assert.equal(redirectFor("/7mero"), "/7mero.ai", "the old offer URL keeps its history");
assert.equal(redirectFor("/en/work"), "/en#work", "the old work index lands on the homepage's work list");
assert.equal(redirectFor("/el/services/"), "/el/services", "one URL per page: no trailing slash");
assert.equal(redirectFor("/el/services"), null, "a real page must not redirect");

// ── the sitemap covers both locales ──────────────────────────────────────
const sitemap = readFileSync(new URL("../src/pages/sitemap.xml.ts", import.meta.url), "utf8");
assert.ok(sitemap.includes("LANGS.flatMap"), "sitemap must emit every path in every locale");
assert.ok(
  sitemap.includes("/privacy") && sitemap.includes("/terms"),
  "legal pages belong in the sitemap: they are routine sitelink material"
);
assert.ok(sitemap.includes('hreflang="x-default"'), "every sitemap URL declares the Greek x-default");

console.log("✓ locale routing OK");
