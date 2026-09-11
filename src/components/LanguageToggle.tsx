"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./LanguageContext";
import { swapLocale, type Lang } from "@/lib/i18n";

/**
 * A real link, not a button, so the other locale is crawlable from every
 * page and behaves like any other link for opening in a new tab.
 */
export default function LanguageToggle() {
  const { lang } = useLanguage();
  const pathname = usePathname();
  const other: Lang = lang === "en" ? "el" : "en";

  return (
    <Link
      href={swapLocale(pathname ?? `/${lang}`, other)}
      hrefLang={other}
      className="font-mono text-xs tracking-widest uppercase transition-colors duration-200 text-stone hover:text-accent-light"
      aria-label={
        other === "el" ? "Αλλαγή γλώσσας στα Ελληνικά" : "Switch language to English"
      }
    >
      {other === "el" ? "ΕΛ" : "EN"}
    </Link>
  );
}
