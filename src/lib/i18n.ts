/**
 * Locale primitives, in a plain module so pages, endpoints and the node check
 * scripts can all import them.
 */

export type Lang = "en" | "el";

export const LANGS: Lang[] = ["el", "en"];

export function isLang(v: string): v is Lang {
  return v === "el" || v === "en";
}

/**
 * Swaps the leading locale segment of a path, so a language switch lands on
 * the same page in the other language instead of resetting to the homepage.
 */
export function swapLocale(pathname: string, to: Lang) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length && isLang(parts[0])) parts[0] = to;
  else parts.unshift(to);
  return "/" + parts.join("/");
}
