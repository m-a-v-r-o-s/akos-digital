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
const cfg = readFileSync(new URL("../next.config.mjs", import.meta.url), "utf8");
for (const p of ["/request", "/espa", "/privacy", "/terms", "/sectors/:slug"]) {
  assert.ok(
    cfg.includes(`"${p}"`),
    `${p} must keep its redirect to /el${p}, or an indexed URL becomes a 404`
  );
}
assert.ok(
  cfg.includes('source: "/", destination: "/el"'),
  "the bare root must redirect to the default locale"
);

// ── the sitemap covers both locales, and no locale-less path ─────────────
const sitemap = readFileSync(new URL("../src/app/sitemap.ts", import.meta.url), "utf8");
assert.ok(sitemap.includes("LANGS.flatMap"), "sitemap must emit every path in every locale");
assert.ok(
  sitemap.includes("/privacy") && sitemap.includes("/terms"),
  "legal pages belong in the sitemap: they are routine sitelink material"
);

// ── one language per page ────────────────────────────────────────────────
const bilingual = readFileSync(
  new URL("../src/components/Bilingual.tsx", import.meta.url),
  "utf8"
);
assert.ok(
  !bilingual.includes("hidden"),
  "Bilingual must render only the active locale; a hidden second copy would " +
    "put both languages back on one URL and make /el and /en duplicates"
);
const sector = readFileSync(
  new URL("../src/components/SectorDetail.tsx", import.meta.url),
  "utf8"
);
assert.ok(
  !sector.includes("hidden={lang"),
  "SectorDetail must not dual-render its points, included list or FAQ"
);

console.log("✓ locale routing OK");
