/**
 * The eight accents the site drifts through (src/scripts/site.ts).
 *
 * A curated set: scripts/check-accent-contrast.ts checks every colour, and
 * every step of the fade between any two of them, against the places the
 * accent has to stay legible (a fill under ink text, and text on the dark
 * sections), so no moment of the drift can produce an inaccessible page.
 *
 * Channels are space separated because that is the form --accent-rgb takes,
 * which lets any alpha be mixed in at the point of use.
 *
 * There is deliberately no blue in the set: it would collide with the Home
 * Assistant theme and the ΕΣΠΑ mark.
 */
export type Accent = {
  key: string;
  rgb: string;
};

/** Marigold is the brand: the first colour, and the only one under reduced motion. */
export const DEFAULT_ACCENT = "marigold";

/** The S in the header's "DS" starts here and walks the same set, never sharing a colour with the D. */
export const SECOND_ACCENT = "teal";

export const accents: Accent[] = [
  { key: "marigold",   rgb: "232 163 60" },
  { key: "copper",     rgb: "217 122 78" },
  { key: "rose",       rgb: "226 138 138" },
  { key: "orchid",     rgb: "226 138 203" },
  { key: "lavender",   rgb: "180 154 232" },
  { key: "teal",       rgb: "79 196 176" },
  { key: "sage",       rgb: "143 191 106" },
  { key: "platinum",   rgb: "198 203 209" },
];

export const accentKeys = accents.map((a) => a.key);
