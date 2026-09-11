/**
 * Self-check for the vendored LiquidGlass component (LIQUID_GLASS_PLAN.md).
 *   node --experimental-strip-types scripts/check-liquid-glass.ts
 *
 * Covers the parts that fail silently rather than loudly: a filter id typo
 * that goes back to duplicating "feimage" across every instance, a
 * mousemove listener wired up even at elasticity 0 (the 73-tag-pill
 * INP concern this plan exists to avoid), or shader/polar/prominent code
 * creeping back in after being trimmed on purpose.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../src/components/LiquidGlass.tsx", import.meta.url), "utf8");

assert.ok(src.startsWith('"use client"'), "must stay a client component: it reads navigator client-side");

// The upstream bug this file exists to fix: a hardcoded id="feimage" makes
// every mounted instance emit the same DOM id.
assert.ok(!/id="feimage"/.test(src), 'a hardcoded id="feimage" is back: every instance would collide');
assert.match(src, /id=\{`\$\{id\}-feimage`\}/, "feImage's id must be derived from the per-instance filter id");

// navigator must never be read outside an effect, or next build breaks on
// the server render (this is exactly why the package isn't a dependency).
// Comments stripped first: the file's own header explains this in prose.
const code = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
const outsideEffect = code.split(/useEffect\(/)[0];
assert.ok(!/navigator\./.test(outsideEffect), "navigator must not be read before the first useEffect(: breaks `next build`");
assert.match(src, /useState\(false\)/, "isFirefox must default to false so SSR and first client paint match");

// elasticity 0 (the default, and every instance except the /request CTA)
// must skip the mousemove listener entirely, not just no-op inside it.
assert.match(
  src,
  /if\s*\(elasticity === 0\)\s*return;/,
  "must bail out of the mousemove effect before attaching a listener when elasticity is 0",
);

// Trimmed on purpose per LIQUID_GLASS_PLAN.md §0.2: shader mode builds a
// canvas per instance, and polar/prominent modes are unused here. Checked
// against code with comments stripped: the file's own header names these
// in prose to explain the trim.
for (const dropped of ["polarDisplacementMap", "prominentDisplacementMap", "ShaderDisplacementGenerator"]) {
  assert.ok(!code.includes(dropped), `"${dropped}" was trimmed on purpose and must not come back`);
}

assert.match(src, /new ResizeObserver/, "size tracking must use ResizeObserver, not mount + window-resize only");

console.log("✓ LiquidGlass component intact");
