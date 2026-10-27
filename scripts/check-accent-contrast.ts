/**
 * Self-check for the drifting accent palette.
 *   node --experimental-strip-types scripts/check-accent-contrast.ts
 *
 * The accent sits in two places near text: as a fill under ink text (buttons,
 * the round "Get in touch") and as text on the dark sections. Both are the
 * same pair, ink against the accent, and WCAG 2.2 AA (4.5:1) is the floor.
 * The site fades from one accent to another, so the check covers every step
 * of every fade, not just the eight end points: browsers interpolate a colour
 * transition in Oklab, and sRGB is checked too in case one doesn't.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { accents, accentKeys, DEFAULT_ACCENT } from "../src/lib/accents.ts";

const AA = 4.5;
const INK = [20, 18, 16]; // --ink and --night

type RGB = [number, number, number];
const parse = (s: string): RGB => {
  const c = s.split(" ").map(Number);
  assert.equal(c.length, 3, `"${s}" must be three space separated channels`);
  assert.ok(c.every((n) => Number.isInteger(n) && n >= 0 && n <= 255), `"${s}" out of range`);
  return c as RGB;
};
const toLin = (v: number) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const toSrgb = (v: number) => 255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);
const lum = (c: readonly number[]) => 0.2126 * toLin(c[0]) + 0.7152 * toLin(c[1]) + 0.0722 * toLin(c[2]);
const ratio = (a: readonly number[], b: readonly number[]) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

// Oklab (Björn Ottosson), for interpolating the way CSS does.
const toOklab = ([r, g, b]: RGB) => {
  const [R, G, B] = [r, g, b].map(toLin);
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
};
const fromOklab = ([L, a, b]: number[]): RGB => {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const lin = [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
  return lin.map((v) => Math.min(255, Math.max(0, toSrgb(Math.max(0, v))))) as RGB;
};
const mix = (a: number[], b: number[], t: number) => a.map((v, i) => v + (b[i] - v) * t);

assert.equal(accents.length, 8, "the set is eight colours; adding a ninth is a decision, not a tweak");
assert.equal(new Set(accentKeys).size, accents.length, "accent keys must be unique");
assert.equal(accents.find((a) => a.key === DEFAULT_ACCENT)?.rgb, "232 163 60", "marigold is the brand and must not drift");

let worst = { r: Infinity, at: "" };
for (const a of accents) {
  for (const b of accents) {
    if (a.key >= b.key) continue;
    const [A, B] = [parse(a.rgb), parse(b.rgb)];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      for (const [space, c] of [["oklab", fromOklab(mix(toOklab(A), toOklab(B), t))], ["srgb", mix(A, B, t)]] as const) {
        const r = ratio(c, INK);
        if (r < worst.r) worst = { r, at: `${a.key} → ${b.key} at ${Math.round(t * 100)}% (${space})` };
      }
    }
  }
}
assert.ok(worst.r >= AA, `ink on the accent drops to ${worst.r.toFixed(2)}:1 during ${worst.at}`);

// The CSS starts from the same marigold the script and reduced motion rest on.
const css = readFileSync(new URL("../src/styles/global.css", import.meta.url), "utf8");
assert.match(css, /@property --accent \{ syntax: "<color>"; inherits: true; initial-value: rgb\(232 163 60\); \}/, "the accent must be a registered <color> so it fades, starting at marigold");
assert.match(css, /--accent: rgb\(232 163 60\);/, ":root must carry marigold");

console.log(`✓ ink on the accent stays ≥ ${AA}:1 through every fade between all ${accents.length} accents (lowest ${worst.r.toFixed(2)}:1, ${worst.at})`);
