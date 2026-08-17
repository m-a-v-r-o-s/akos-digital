"use client";

import Link from "next/link";
import SpotlightWrapper from "@/components/SpotlightWrapper";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageContext";
import { Icon } from "@/components/Icons";

const t = {
  en: {
    back: "Back to home",
    eyebrow: "404",
    title: "This page wandered off.",
    body: "The page you're looking for doesn't exist, or has moved.",
    cta: "Back home",
  },
  el: {
    back: "Πίσω στην αρχική",
    eyebrow: "404",
    title: "Αυτή η σελίδα δεν βρέθηκε.",
    body: "Η σελίδα που ψάχνεις δεν υπάρχει, ή έχει μετακινηθεί.",
    cta: "Αρχική σελίδα",
  },
};

export default function NotFound() {
  const { lang } = useLanguage();
  const copy = t[lang];

  return (
    <SpotlightWrapper>
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 min-h-screen pb-24">
        <header className="flex items-center justify-between py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors"
          >
            <span className="ornament">←</span>
            {copy.back}
          </Link>
          <LanguageToggle />
        </header>

        <div className="fade-up flex flex-col items-start justify-center min-h-[60vh]">
          <div className="deco-rule mb-6" />
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-gold mb-4">
            {copy.eyebrow}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-paper leading-tight mb-4">
            {copy.title}
          </h1>
          <p className="text-base text-stone-light leading-relaxed mb-10 max-w-md">
            {copy.body}
          </p>
          <Link href="/" className="cta-button inline-flex">
            {copy.cta}
            <span className="arrow-icon">
              <Icon name="arrow" size={13} />
            </span>
          </Link>
        </div>
      </div>
    </SpotlightWrapper>
  );
}
