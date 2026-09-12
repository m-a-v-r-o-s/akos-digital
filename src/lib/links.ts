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
 * Display name is the Greek IDN 7μερο.com, but every machine-readable use
 * needs the punycode, which is what a browser and a crawler actually resolve.
 *
 * NOTE: the domain is not registered yet, so this link does not resolve. It is
 * deliberately the one line to change, point it at whatever host the offer is
 * actually served from before shipping the buttons that use it.
 */
export const SEVENMERO_URL = "https://xn--7-7lbunj.com";
