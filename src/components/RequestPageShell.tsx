"use client";

import Link from "next/link";
import SpotlightWrapper from "@/components/SpotlightWrapper";
import LanguageToggle from "@/components/LanguageToggle";
import RequestWizard from "@/components/RequestWizard";
import { useLanguage } from "@/components/LanguageContext";
import { ui } from "@/lib/requestForm";

export default function RequestPageShell() {
  const { lang } = useLanguage();
  const t = ui[lang];

  return (
    <SpotlightWrapper>
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-16 xl:px-24 min-h-screen">
        <div className="lg:flex lg:gap-16 xl:gap-24">
          {/* ── LEFT — sticky intro ── */}
          <aside className="lg:sticky lg:top-0 lg:flex lg:flex-col lg:justify-between lg:h-screen lg:w-[42%] xl:w-[40%] lg:py-20 lg:flex-shrink-0 pt-10 pb-4">
            <div>
              <div className="flex items-center justify-between mb-10">
                <Link
                  href="/"
                  className="fade-up fade-up-delay-1 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors"
                >
                  <span className="ornament">←</span>
                  {t.backHome}
                </Link>
                <div className="lg:hidden">
                  <LanguageToggle />
                </div>
              </div>

              <p className="fade-up fade-up-delay-2 font-mono text-xs tracking-[0.2em] uppercase text-stone mb-5">
                <span className="ornament">— </span>
                {t.eyebrow}
              </p>

              <h1 className="fade-up fade-up-delay-2 font-display text-4xl xl:text-5xl font-bold leading-tight text-paper mb-6">
                {t.title}
              </h1>

              <div className="fade-up fade-up-delay-3 deco-rule mb-6" />

              <p className="fade-up fade-up-delay-4 text-sm text-stone leading-relaxed max-w-sm">
                {t.subtitle}
              </p>
            </div>

            {/* Bottom: contact + language toggle (desktop) */}
            <div className="fade-up fade-up-delay-5 hidden lg:flex items-center gap-4 pb-2">
              <span className="text-xs font-mono text-stone-dark tracking-wider">
                info@AkosDS.com
              </span>
              <div className="ml-auto">
                <LanguageToggle />
              </div>
            </div>
          </aside>

          {/* ── RIGHT — wizard ── */}
          <main className="flex-1 flex items-start lg:items-center lg:min-h-screen py-8 lg:py-20 pb-24">
            <div className="w-full fade-up fade-up-delay-3 flex lg:justify-start">
              <RequestWizard />
            </div>
          </main>
        </div>
      </div>
    </SpotlightWrapper>
  );
}
