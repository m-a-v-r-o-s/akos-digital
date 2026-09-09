"use client";

import { createContext, useContext } from "react";
import type { Lang } from "@/lib/i18n";

/**
 * The active language comes from the /el or /en route segment, not from
 * client state, so the server renders exactly one language per URL and each
 * locale is its own crawlable page. The provider only carries the value
 * down; switching language is a navigation, handled by LanguageToggle.
 */
const LanguageContext = createContext<Lang>("el");

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  return { lang: useContext(LanguageContext) };
}
