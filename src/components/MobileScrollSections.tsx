"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { openCookiePreferences } from "@/components/CookieConsent";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageContext";
import { person, education, projects, services, sectors } from "@/lib/data";
import SecretName from "@/components/SecretName";
import Bilingual, { BilingualHtml } from "@/components/Bilingual";
import ProjectThumb from "@/components/ProjectThumb";

const tabLabels = {
  en: ["Works", "Sectors", "Services", "Education", "About"],
  el: ["Έργα", "Ειδικότητες", "Υπηρεσίες", "Εκπαίδευση", "Σχετικά"],
};

const copyright = {
  en: "© Akos Digital 2026. All Rights Reserved.",
  el: "© Akos Digital 2026. Με επιφύλαξη παντός δικαιώματος.",
};

const requestQuote = {
  en: "Request a Quote",
  el: "Ζητήστε Προσφορά",
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
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const tabs = tabLabels[lang];
  const headings = sectionHeadings[lang];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // Returning from a sector page: open the Sectors panel (index 2) and bring
    // the panels into view; otherwise start on the first panel.
    if (
      sessionStorage.getItem("akos:return") === "sectors" &&
      window.innerWidth < 1024
    ) {
      sessionStorage.removeItem("akos:return");
      const idx = 1; // Works, Sectors, Services, Education, About
      setActive(idx);
      requestAnimationFrame(() => {
        container.scrollLeft = idx * container.offsetWidth;
        container.scrollIntoView({ block: "start" });
      });
    } else {
      container.scrollLeft = 0;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 350);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <SecretName name={person.name[lang]} />
        </h1>
        <div className="deco-rule mb-4" />
        <h2 className="font-body text-base font-light text-stone-light tracking-wide mb-4">
          <Bilingual el={person.role.el} en={person.role.en} />
        </h2>
        <p className="text-sm text-stone leading-relaxed mb-6">
          <Bilingual el={person.tagline.el} en={person.tagline.en} />
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
                name={s.icon as "linkedin" | "github" | "behance" | "email" | "phone" | "whatsapp" | "telegram" | "instagram"}
                size={17}
              />
            </a>
          ))}
        </div>

        <div className="mt-7 flex items-center gap-4">
          <Link href="/request" className="cta-button">
            {requestQuote[lang]}
            <span className="arrow-icon">
              <Icon name="arrow" size={13} />
            </span>
          </Link>

          {/* ESPA funding button */}
          <Link href="/espa" aria-label="ΕΣΠΑ" className="espa-button w-28 shrink-0">
            <img src="/1915943-2048448176.jpg" alt="ΕΣΠΑ" loading="lazy" decoding="async" className="w-full h-auto block" />
          </Link>
        </div>
      </div>

      {/* Tab bar */}
      <div
        className="flex justify-between sticky top-0 z-20 pt-3 px-1 transition-all duration-300"
        style={scrolled ? { backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", backgroundColor: "rgba(13,13,13,0.15)" } : {}}
      >
        {tabs.map((label, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className="flex items-center justify-center py-3 px-1 transition-colors duration-300"
          >
            <span
              className="font-mono tracking-wide uppercase whitespace-nowrap transition-colors duration-300"
              style={{
                color: active === i ? "var(--paper)" : "var(--stone)",
                fontSize: "clamp(0.5rem, 2vw, 0.7rem)",
              }}
            >
              {label}
            </span>
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
        {/* ── Panel 1: Projects ── */}
        <div className="flex-none w-full py-8" style={{ scrollSnapAlign: "start" }}>
          <h3 className="font-mono text-xs tracking-widest uppercase text-stone-light mb-5">
            <span className="text-gold opacity-50 mr-2">§</span>
          </h3>
          <ul className="space-y-3">
            {projects.map((proj) =>
              proj.sub ? (
              <li key={proj.title} className="-mt-1 ml-6 group relative">
                {proj.links[0] && (
                  <a
                    href={proj.links[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={proj.title}
                    className="absolute inset-0 z-10"
                  />
                )}
                <div className="flex items-center gap-3 rounded-lg px-4 py-2.5 border border-transparent transition-all duration-300 group-hover:border-gold/10">
                  <span className="text-gold/40 font-mono text-sm shrink-0 leading-none">↳</span>
                  <h4 className="flex-1 min-w-0 font-display font-medium text-stone-light text-xs leading-snug">
                    {proj.title}
                  </h4>
                  {proj.links.map((lnk) => (
                    <a
                      key={lnk.label}
                      href={lnk.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-20 inline-flex items-center gap-1 text-[0.7rem] font-mono text-stone hover:text-gold-light transition-colors shrink-0"
                    >
                      {lnk.label}
                      <span className="arrow-icon">
                        <Icon name="arrow" size={10} />
                      </span>
                    </a>
                  ))}
                </div>
              </li>
              ) : (
              <li key={proj.title} className="section-card relative">
                {proj.links[0] && (
                  <a
                    href={proj.links[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={proj.title}
                    className="absolute inset-0 z-10"
                  />
                )}
                <div className="flex gap-3">
                  <ProjectThumb
                    imageMobile={proj.imageMobile}
                    title={proj.title}
                    variant="mobile"
                  />
                  <div className="flex-1 min-w-0">
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
                      <Bilingual el={proj.description.el} en={proj.description.en} />
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
                          className="relative z-20 inline-flex items-center gap-1 text-xs font-mono text-stone hover:text-gold-light transition-colors ml-1"
                        >
                          {lnk.label}
                          <span className="arrow-icon">
                            <Icon name="arrow" size={11} />
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Panel: Sectors ── */}
        <div className="flex-none w-full py-8" style={{ scrollSnapAlign: "start" }}>
          <h3 className="font-mono text-xs tracking-widest uppercase text-stone-light mb-5">
            <span className="text-gold opacity-50 mr-2">§</span>
          </h3>
          <div className="space-y-4">
            {sectors.map((sec) => (
              <Link
                key={sec.slug}
                href={`/sectors/${sec.slug}`}
                className="section-card block group"
              >
                <span className="text-gold text-xl mb-3 block leading-none">
                  {sec.icon}
                </span>
                <h4 className="font-display font-semibold text-paper text-sm mb-2">
                  <Bilingual el={sec.title.el} en={sec.title.en} />
                </h4>
                <p className="text-xs text-stone leading-relaxed mb-3">
                  <Bilingual el={sec.hook.el} en={sec.hook.en} />
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-stone">
                  {lang === "en" ? "Explore" : "Περισσότερα"}
                  <span className="arrow-icon">
                    <Icon name="arrow" size={11} />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Panel: Services ── */}
        <div className="flex-none w-full py-8" style={{ scrollSnapAlign: "start" }}>
          <h3 className="font-mono text-xs tracking-widest uppercase text-stone-light mb-5">
            <span className="text-gold opacity-50 mr-2">§</span>
          </h3>
          <div className="space-y-4">
            {services.map((svc) =>
              svc.href ? (
                <Link key={svc.title.en} href={svc.href} className="section-card block group">
                  <span className="text-gold text-xl mb-3 block leading-none">
                    {svc.icon}
                  </span>
                  <h4 className="font-display font-semibold text-paper text-sm mb-2">
                    <Bilingual el={svc.title.el} en={svc.title.en} />
                  </h4>
                  <p className="text-xs text-stone leading-relaxed mb-3">
                    <Bilingual el={svc.description.el} en={svc.description.en} />
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-stone">
                    {lang === "en" ? "Explore" : "Περισσότερα"}
                    <span className="arrow-icon">
                      <Icon name="arrow" size={11} />
                    </span>
                  </span>
                </Link>
              ) : (
                <div key={svc.title.en} className="section-card">
                  <span className="text-gold text-xl mb-3 block leading-none">
                    {svc.icon}
                  </span>
                  <h4 className="font-display font-semibold text-paper text-sm mb-2">
                    <Bilingual el={svc.title.el} en={svc.title.en} />
                  </h4>
                  <p className="text-xs text-stone leading-relaxed">
                    <Bilingual el={svc.description.el} en={svc.description.en} />
                  </p>
                </div>
              )
            )}
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
                  <Bilingual el={edu.degree.el} en={edu.degree.en} />
                  <span className="text-stone mx-1">·</span>
                  <a href={edu.institutionUrl} target="_blank" rel="noopener noreferrer" className="gold-link">
                    <Bilingual el={edu.institution.el} en={edu.institution.en} />
                  </a>
                </h4>
                <p className="text-xs text-stone leading-relaxed mt-2 mb-3">
                  <Bilingual el={edu.description.el} en={edu.description.en} />
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

        {/* ── Panel 4: About ── */}
        <div className="flex-none w-full py-8 pb-20" style={{ scrollSnapAlign: "start" }}>
          <h3 className="font-mono text-xs tracking-widest uppercase text-stone-light mb-5">
            <span className="text-gold opacity-50 mr-2">§</span>
          </h3>
          <div className="space-y-4">
            {person.about.el.map((para, i) => (
              <BilingualHtml
                key={`el-${i}`}
                as="p"
                className="text-sm text-stone leading-[1.85]"
                el={para}
                en={person.about.en[i]}
              />
            ))}
            <br /><br /><br />
          </div>
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
      <div className="flex items-center justify-between gap-4 pb-8 border-t border-stone-dark pt-4">
        <p className="text-xs text-stone leading-relaxed">
          {copyright[lang]}
        </p>
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={openCookiePreferences}
            className="text-xs font-mono tracking-wider text-stone-dark hover:text-stone transition-colors"
          >
            Cookies
          </button>
          <Link
            href="/privacy"
            className="text-xs font-mono tracking-wider text-stone-dark hover:text-stone transition-colors"
          >
            {lang === "en" ? "Privacy" : "Απόρρητο"}
          </Link>
          <Link
            href="/terms"
            className="text-xs font-mono tracking-wider text-stone-dark hover:text-stone transition-colors"
          >
            {lang === "en" ? "Terms" : "Όροι"}
          </Link>
        </div>
      </div>
    </div>
  );
}
