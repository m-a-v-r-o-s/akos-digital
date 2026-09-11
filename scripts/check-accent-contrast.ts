/**
 * Self-check for the visitor-switchable accent palette.
 *   node --experimental-strip-types scripts/check-accent-contrast.ts
 *
 * The palette is curated precisely so no choice in it can produce an
 * unreadable page, which is only true for as long as something enforces it.
 * WCAG 2.1 AA (4.5:1) is the floor, checked on the four places the accent
 * actually carries text.
 */
import assert from "node:assert/strict";
import { accents, accentKeys, DEFAULT_ACCENT } from "../src/lib/accents.ts";

const AA = 4.5;
const INK = [13, 13, 13] as const; // --ink, the page ground and the CTA's text

const parse = (s: string) => {
  const c = s.split(" ").map(Number);
  assert.equal(c.length, 3, `"${s}" must be three space separated channels`);
  assert.ok(c.every((n) => Number.isInteger(n) && n >= 0 && n <= 255), `"${s}" out of range`);
  return c as [number, number, number];
};

/** WCAG 2.1 relative luminance. */
const lum = (rgb: readonly number[]) =>
  rgb
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);

const ratio = (a: readonly number[], b: readonly number[]) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

/** Flattens a translucent foreground over an opaque background. */
const over = (fg: readonly number[], bg: readonly number[], alpha: number) =>
  fg.map((v, i) => alpha * v + (1 - alpha) * bg[i]);

// ── the palette itself ───────────────────────────────────────────────────
assert.equal(accents.length, 10, "the set is ten colours; adding an eleventh is a decision, not a tweak");
assert.equal(new Set(accentKeys).size, 10, "accent keys must be unique: they index the CSS and localStorage");
assert.ok(accentKeys.includes(DEFAULT_ACCENT), "the default must be in the set");
assert.equal(
  accents.find((a) => a.key === "gold")?.rgb,
  "201 168 76",
  "gold is the current brand and must not drift"
);
for (const a of accents) {
  assert.match(a.key, /^[a-z]+$/, `"${a.key}" must be a plain lowercase key: it goes in a DOM attribute`);
  assert.ok(a.label.en.trim() && a.label.el.trim(), `${a.key} needs both labels: colour is never the only signal`);
}

// ── contrast, in the four places the accent carries text ─────────────────
const checks: [string, (a: (typeof accents)[number]) => number][] = [
  // text-accent on the page ground
  ["on ink", (a) => ratio(parse(a.rgb), INK)],
  // the CTA: ink text on a solid accent fill
  ["CTA fill", (a) => ratio(INK, parse(a.rgb))],
  // the tag pill is the accent at 10% over ink, so the text sits on the blend,
  // not on pure ink. This is the tightest of the four.
  ["tag pill", (a) => ratio(parse(a.rgb), over(parse(a.rgb), INK, 0.1))],
  // the hover states
  ["light on ink", (a) => ratio(parse(a.lightRgb), INK)],
];

const pad = (s: string, n: number) => s.padEnd(n);
console.log(pad("accent", 12) + checks.map(([n]) => n.padStart(14)).join(""));

const failures: string[] = [];
for (const a of accents) {
  const rs = checks.map(([, f]) => f(a));
  const row = rs.map((r) => `${r.toFixed(2)}:1`.padStart(14)).join("");
  const bad = rs.some((r) => r < AA);
  console.log(pad(a.key, 12) + row + (bad ? "   ✗" : ""));
  rs.forEach((r, i) => {
    if (r < AA) failures.push(`${a.key} fails "${checks[i][0]}": ${r.toFixed(2)}:1 < ${AA}:1`);
  });
}

// The light companion must read as lighter than its base, or the hover state
// reads as a dimming rather than a lift.
for (const a of accents) {
  assert.ok(
    lum(parse(a.lightRgb)) > lum(parse(a.rgb)),
    `${a.key}: lightRgb must be lighter than rgb, or hover reads as a dim`
  );
}

assert.deepEqual(failures, [], "\n  " + failures.join("\n  ") + "\n");
console.log(`\n✓ all ${accents.length} accents clear WCAG AA (${AA}:1) in all ${checks.length} places`);

// ── the wiring, which fails silently rather than loudly ──────────────────
// A contrast table proves nothing if the palette stopped reaching the page.
import { readFileSync } from "node:fs";
const read = (p: string) => readFileSync(new URL(p, import.meta.url), "utf8");

// Comments explain these rules, so they would otherwise trip the checks for them.
const css = read("../src/app/globals.css").replace(/\/\*[\s\S]*?\*\//g, "");
assert.ok(
  !/rgba\(201,\s*168,\s*76/.test(css),
  "a hardcoded gold literal is back in globals.css: it would stay gold at every accent"
);
assert.ok(
  !/--accent(-light)?:\s*rgb\(var\(/.test(css),
  "a --accent: rgb(var(--accent-rgb)) shorthand is back. A custom property is " +
    "substituted where it is declared, so it would freeze at :root and the two " +
    "scoped themes would stop overriding it. Consumers must read the channels."
);
for (const theme of ["espa", "smarthome"]) {
  const block = css.match(new RegExp(`\\.${theme}-theme \\{[^}]*\\}`))?.[0] ?? "";
  assert.match(
    block,
    /--accent-rgb:/,
    `.${theme}-theme must redefine --accent-rgb on a descendant: that redefinition ` +
      "is the whole lock that keeps a visitor from recolouring it"
  );
}

const tw = read("../tailwind.config.ts");
assert.ok(
  tw.includes("rgb(var(--accent-rgb) / <alpha-value>)"),
  "Tailwind's accent must stay in the channel form: <alpha-value> cannot be " +
    "applied to a hex variable, so border-accent/30 would silently go opaque"
);
assert.ok(!/gold/i.test(tw), "no gold left in the Tailwind palette");

const layout = read("../src/app/[lang]/layout.tsx");
assert.ok(
  layout.includes("accents") && layout.includes("[data-accent="),
  "the layout must generate the per-accent rules from the array, not by hand"
);
assert.ok(
  layout.includes("accentKeys") && layout.includes("localStorage"),
  "the boot script must validate the stored key against the known list before " +
    "putting it in a DOM attribute"
);
assert.ok(
  layout.indexOf("<body") < layout.indexOf("accentBoot"),
  "the boot script must render inside the body, ahead of the page, or a visitor " +
    "who picked teal sees a frame of gold"
);

const controls = read("../src/components/HeaderControls.tsx");
for (const locked of ["espa", "smarthome"]) {
  assert.ok(
    controls.includes(locked),
    `HeaderControls must still hide the switcher on ${locked}: the cascade makes ` +
      "it inert there, and an inert control reads as a bug"
  );
}

console.log("✓ accent wiring intact");
