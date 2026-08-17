"use client";

import Link from "next/link";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageContext";
import { privacy } from "@/lib/privacy";

export default function PrivacyPage() {
  const { lang } = useLanguage();
  const t = privacy[lang];

  return (
    <div className="min-h-screen max-w-2xl mx-auto px-6 sm:px-10 py-10">
      <header className="flex items-center justify-between mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors"
        >
          <span className="ornament">←</span>
          {t.back}
        </Link>
        <LanguageToggle />
      </header>

      <h1 className="font-display text-3xl sm:text-4xl font-bold text-paper mb-2">
        {t.title}
      </h1>
      <p className="font-mono text-xs tracking-widest uppercase text-stone-dark mb-4">
        {t.updated}
      </p>
      <div className="deco-rule mb-10" />

      <div className="space-y-9">
        {t.sections.map((s, i) => (
          <section key={i}>
            <h2 className="font-display font-semibold text-paper text-lg mb-3 flex gap-2.5">
              <span className="font-mono text-sm text-gold shrink-0 pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{s.heading}</span>
            </h2>
            <div className="space-y-3 sm:pl-8">
              {s.body.map((p, j) => (
                <p key={j} className="text-sm text-stone leading-[1.85]">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-14 pt-6 border-t border-stone-dark">
        <p className="text-xs text-stone leading-relaxed">{t.footer}</p>
      </footer>
    </div>
  );
}
