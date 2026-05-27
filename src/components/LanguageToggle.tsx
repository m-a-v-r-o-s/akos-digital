"use client";

import { useLanguage } from "./LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <button
      onClick={() => setLang(lang === "en" ? "el" : "en")}
      className="font-mono text-xs tracking-widest uppercase transition-colors duration-200 text-stone hover:text-gold-light"
      aria-label="Toggle language"
    >
      {lang === "en" ? "ΕΛ" : "EN"}
    </button>
  );
}
