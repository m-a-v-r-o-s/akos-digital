/**
 * Locale primitives, deliberately in a plain module rather than in
 * LanguageContext. That file is "use client", and Next.js replaces a client
 * module's exports with client references when server code imports them, so
 * a plain array or function read from there is not the value it looks like.
 * Server files (layout, sitemap, route metadata) import these from here.
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
