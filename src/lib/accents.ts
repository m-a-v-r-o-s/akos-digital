/**
 * The eight accents a visitor can choose from.
 *
 * A curated set, never a free picker: every entry here has been checked by
 * scripts/check-accent-contrast.ts against the four places the accent has to
 * stay legible, so no choice can produce an inaccessible page.
 *
 * Channels are space separated because that is the form --accent-rgb takes:
 * Tailwind's <alpha-value> needs it, and it lets any alpha be mixed in at the
 * point of use. The light companion carries the hover states and is pinned
 * rather than derived, since it has to clear the same contrast checks.
 *
 * There is deliberately no blue in the set. It would collide with the two
 * locked themes (ESPA cyan #29ABE2, Home Assistant blue #18BCF2) and muddy
 * the signal those pages carry.
 */
export type Accent = {
  key: string;
  label: { en: string; el: string };
  rgb: string;
  lightRgb: string;
};

/** Marigold is the brand and the no-attribute default, carried by :root. */
export const DEFAULT_ACCENT = "marigold";

export const accents: Accent[] = [
  { key: "marigold",   label: { en: "Marigold",   el: "Κατιφές" },      rgb: "232 163 60",  lightRgb: "243 206 143" },
  { key: "copper",     label: { en: "Copper",     el: "Χαλκός" },       rgb: "217 122 78",  lightRgb: "236 178 148" },
  { key: "rose",       label: { en: "Rose",       el: "Τριαντάφυλλο" }, rgb: "226 138 138", lightRgb: "240 185 185" },
  { key: "orchid",     label: { en: "Orchid",     el: "Ορχιδέα" },      rgb: "226 138 203", lightRgb: "240 185 226" },
  { key: "lavender",   label: { en: "Lavender",   el: "Λεβάντα" },      rgb: "180 154 232", lightRgb: "213 198 243" },
  { key: "teal",       label: { en: "Teal",       el: "Πετρόλ" },       rgb: "79 196 176",  lightRgb: "150 221 208" },
  { key: "sage",       label: { en: "Sage",       el: "Φασκόμηλο" },    rgb: "143 191 106", lightRgb: "189 219 166" },
  { key: "platinum",   label: { en: "Platinum",   el: "Πλατίνα" },      rgb: "198 203 209", lightRgb: "223 226 230" },
];

export const accentKeys = accents.map((a) => a.key);
