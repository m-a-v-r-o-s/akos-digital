/**
 * Self-check for the SVGs in public/.
 *   node --experimental-strip-types scripts/check-svg-assets.ts
 *
 * A malformed SVG fails in the worst possible way: the file still serves
 * 200 with the right content type, and the browser simply paints nothing.
 * No console error, no broken-image icon, no failing build. public/7mero.svg
 * shipped exactly like that once, because an XML comment explaining a CSS
 * custom property contained "--accent", and XML forbids "--" inside a comment.
 *
 * Node has no built-in XML parser, so this is not full well-formedness
 * checking. It covers the hazards that actually reach a hand-written SVG:
 * illegal "--" in comments, unescaped ampersands, and a missing root close.
 */
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

const dir = new URL("../public/", import.meta.url);
const files = readdirSync(dir).filter((f) => f.endsWith(".svg"));

assert.ok(files.length > 0, "expected at least one SVG in public/");

for (const file of files) {
  const svg = readFileSync(new URL(file, dir), "utf8");

  for (const comment of svg.match(/<!--[\s\S]*?-->/g) ?? []) {
    assert.ok(
      !comment.slice(4, -3).includes("--"),
      `${file}: XML forbids "--" inside a comment, and the browser will render ` +
        `nothing at all. Write "the accent token" rather than "--accent".`
    );
  }

  // & is only legal as the start of an entity reference.
  const badAmp = svg.match(/&(?!(?:[a-zA-Z][a-zA-Z0-9]*|#[0-9]+|#x[0-9a-fA-F]+);)/);
  assert.ok(!badAmp, `${file}: unescaped "&", use &amp;`);

  assert.match(svg, /<svg[\s>]/, `${file}: no <svg> root element`);
  assert.match(svg, /<\/svg>\s*$/, `${file}: <svg> root is not closed`);
}

console.log(`✓ ${files.length} SVG asset(s) OK`);
