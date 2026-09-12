import type { Lang } from "@/lib/i18n";

/**
 * One rule for every link that comes out of the projects data, so a card
 * cannot lead one place on the homepage and another on a sector page.
 *
 * An href starting with "/" is a route on this site and needs the locale
 * segment, or it lands on a path that does not exist. Anything else is
 * external and opens in a new tab.
 */
export const isInternalHref = (href: string) => href.startsWith("/");

export const localeHref = (href: string, lang: Lang) =>
  isInternalHref(href) ? `/${lang}${href}` : href;

export const externalProps = (href: string) =>
  isInternalHref(href) ? {} : { target: "_blank", rel: "noopener noreferrer" };

/**
 * The sister site: the fixed-price, 7-day small-business offer.
 *
 * It has no domain of its own for now, so it is served from this site: its
 * Astro build is copied into public/7mero and a rewrite in next.config.mjs
 * maps /7mero to that directory's index.html.
 *
 * Still the one line to change if it graduates to 7μερο.ai (punycode
 * xn--7-7lbunj.ai), together with the `base`/`site` in the sister repo.
 */
export const SEVENMERO_URL = "/7mero";
