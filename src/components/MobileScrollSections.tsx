"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/Icons";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageContext";
import { person, education, projects, services } from "@/lib/data";

const tabLabels = {
  en: ["About", "Services", "Education", "Works"],
  el: ["Σχετικά", "Υπηρεσίες", "Εκπαίδευση", "Έργα"],
};

const copyright = {
  en: "© Akos Digital 2026. All Rights Reserved.",
  el: "© Akos Digital 2026. Με επιφύλαξη παντός δικαιώματος.",
};

const sectionHeadings = {
  en: {
    about: "About",
    services: "Services",
    education: "Education",
    projects: "Selected Works",
  },
  el: {
    about: "Σχετικά",
    services: "Υπηρεσίες",
    education: "Εκπαίδευση",
    projects: "Επιλεγμένα Έργα",
  },
};


export default function MobileScrollSections() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const tabs = tabLabels[lang];
  const headings = sectionHeadings[lang];

  const scrollTo = (idx: number) => {
    setActive(idx);
    const container = containerRef.current;
    if (!container) return;
    const panelWidth = container.offsetWidth;
    container.scrollTo({ left: idx * panelWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const idx = Math.round(container.scrollLeft / container.offsetWidth);
    if (idx !== active) setActive(idx);
  };

  return (
    <div className="lg:hidden">
      {/* Mobile header */}
      <div className="pt-10 pb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-gold">
            {person.company}
          </p>
          <LanguageToggle />
        </div>
        <h1 className="font-display text-3xl font-bold text-paper mb-4">
          {person.name[lang]}
        </h1>
        <div className="deco-rule mb-4" />
        <h2 className="font-body text-base font-light text-stone-light tracking-wide mb-4">
          {person.role[lang]}
        </h2>
        <p className="text-sm text-stone leading-relaxed mb-6">
          {person.tagline[lang]}
        </p>
        <div className="flex gap-4">
          {person.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone hover:text-gold-light transition-colors"
            >
              <Icon
                name={s.icon as "linkedin" | "github" | "behance" | "email" | "phone" | "whatsapp" | "telegram"}
                size={17}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex sticky top-0 z-20 pt-3">
        {tabs.map((label, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className="flex-1 flex flex-col items-center gap-2 pb-3 transition-colors duration-300"
          >
            <span
              className="text-xs font-mono tracking-widest uppercase transition-colors duration-300"
              style={{ color: active === i ? "var(--paper)" : "var(--stone)" }}
            >
              {label}
            </span>
            <span
              className="block h-px transition-all duration-300"
              style={{
                width: active === i ? (i === 1 || i === 2 ? "3rem" : "2rem") : "0",
                backgroundColor: "var(--paper)",
                opacity: active === i ? 1 : 0,
              }}
            />
          </button>
        ))}
      </div>

      {/* Horizontal scroll panels */}
      <div
        ref={containerRef}
        onScroll={onScroll}
        className="flex overflow-x-auto scroll-smooth"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {/* ── Panel 1: About ── */}
        <div className="flex-none w-full py-8" style={{ scrollSnapAlign: "start" }}>
          <h3 className="font-mono text-xs tracking-widest uppercase text-stone-light mb-5">
            <span className="text-gold opacity-50 mr-2">§</span>
          </h3>
          <div className="space-y-4">
            {person.about[lang].map((para, i) => (
              <p
                key={i}
                className="text-sm text-stone leading-[1.85]"
                dangerouslySetInnerHTML={{ __html: para }}
              />
            ))}
            <br /><br /><br />
          </div>
        </div>

        {/* ── Panel 2: Services ── */}
        <div className="flex-none w-full py-8" style={{ scrollSnapAlign: "start" }}>
          <h3 className="font-mono text-xs tracking-widest uppercase text-stone-light mb-5">
            <span className="text-gold opacity-50 mr-2">§</span>
          </h3>
          <div className="space-y-4">
            {services.map((svc) => (
              <div key={svc.title.en} className="section-card">
                <span className="text-gold text-xl mb-3 block leading-none">
                  {svc.icon}
                </span>
                <h4 className="font-display font-semibold text-paper text-sm mb-2">
                  {svc.title[lang]}
                </h4>
                <p className="text-xs text-stone leading-relaxed">
                  {svc.description[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Panel 3: Education ── */}
        <div className="flex-none w-full py-8" style={{ scrollSnapAlign: "start" }}>
          <h3 className="font-mono text-xs tracking-widest uppercase text-stone-light mb-5">
            <span className="text-gold opacity-50 mr-2">§</span>
          </h3>
          <ol className="space-y-2">
            {education.map((edu) => (
              <li key={edu.degree.en} className="section-card">
                <p className="exp-date mb-1">{edu.period}</p>
                <h4 className="font-display font-semibold text-paper text-sm mb-0.5 leading-snug">
                  {edu.degree[lang]}
                  <span className="text-stone mx-1">·</span>
                  <a href={edu.institutionUrl} target="_blank" rel="noopener noreferrer" className="gold-link">{edu.institution[lang]}</a>
                </h4>
                <p className="text-xs text-stone leading-relaxed mt-2 mb-3">
                  {edu.description[lang]}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {edu.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Panel 4: Projects ── */}
        <div className="flex-none w-full py-8 pb-20" style={{ scrollSnapAlign: "start" }}>
          <h3 className="font-mono text-xs tracking-widest uppercase text-stone-light mb-5">
            <span className="text-gold opacity-50 mr-2">§</span>
          </h3>
          <ul className="space-y-3">
            {projects.map((proj) => (
              <li key={proj.title} className="section-card">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-display font-semibold text-paper text-sm leading-snug">
                    {proj.title}
                  </h4>
                  {proj.year && (
                    <span className="font-mono text-xs text-stone-dark shrink-0">
                      {proj.year}
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone leading-relaxed mb-3">
                  {proj.description[lang]}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                  {proj.links.map((lnk) => (
                    <a
                      key={lnk.label}
                      href={lnk.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-stone hover:text-gold-light transition-colors ml-1"
                    >
                      {lnk.label}
                      <span className="arrow-icon">
                        <Icon name="arrow" size={11} />
                      </span>
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>

      {/* Scroll progress dots */}
      <div className="flex justify-center gap-1.5 py-4">
        {tabs.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`rounded-full transition-all duration-300 ${
              active === i
                ? "w-5 h-1.5 bg-gold"
                : "w-1.5 h-1.5 bg-stone-dark"
            }`}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>

      {/* Copyright */}
      <p className="text-xs text-stone leading-relaxed pb-8 border-t border-stone-dark pt-4">
        {copyright[lang]}
      </p>
    </div>
  );
}
