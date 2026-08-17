"use client";

import { useEffect } from "react";
import Link from "next/link";
import SpotlightWrapper from "@/components/SpotlightWrapper";
import NavLinks from "@/components/NavLinks";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageContext";
import { Icon } from "@/components/Icons";
import { person, education, projects, services, sectors } from "@/lib/data";
import MobileScrollSections from "@/components/MobileScrollSections";
import SecretName from "@/components/SecretName";
import ProjectThumb from "@/components/ProjectThumb";
import { openCookiePreferences } from "@/components/CookieConsent";

const ui = {
  en: {
    about: "About",
    services: "Services",
    sectors: "Sectors",
    explore: "Explore",
    education: "Education",
    projects: "Selected Works",
    fullCV: "Full CV",
    requestQuote: "Request a Quote",
    terms: "Terms",
    privacy: "Privacy",
    cookies: "Cookies",
    copyright: "© Akos Digital 2026. All Rights Reserved.",
  },
  el: {
    about: "Σχετικά",
    services: "Υπηρεσίες",
    sectors: "Ειδικότητες",
    explore: "Περισσότερα",
    education: "Εκπαίδευση",
    projects: "Επιλεγμένα Έργα",
    fullCV: "Πλήρες Βιογραφικό",
    requestQuote: "Ζητήστε Προσφορά",
    terms: "Όροι",
    privacy: "Απόρρητο",
    cookies: "Cookies",
    copyright: "© Akos Digital 2026. Με επιφύλαξη παντός δικαιώματος.",
  },
};

export default function Home() {
  const { lang } = useLanguage();
  const t = ui[lang];

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // Returning from a sector page: land on the Sectors section, not the top.
    // (Desktop scrolls here; mobile is handled in MobileScrollSections.)
    const returning = sessionStorage.getItem("akos:return") === "sectors";
    if (returning) {
      if (window.innerWidth >= 1024) {
        sessionStorage.removeItem("akos:return");
        requestAnimationFrame(() =>
          document.getElementById("sectors")?.scrollIntoView({ block: "start" })
        );
      }
      return;
    }
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <SpotlightWrapper>
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-16 xl:px-24 min-h-screen">
        {/* ── Desktop: 2-column layout ── */}
        <div className="lg:flex lg:gap-16 xl:gap-24">
          {/* ── LEFT COLUMN — sticky ── */}
          <aside className="hidden lg:sticky lg:top-0 lg:flex lg:flex-col lg:justify-between lg:h-screen lg:w-[42%] xl:w-[40%] lg:py-20 lg:flex-shrink-0">
            {/* Top: identity */}
            <div>
              {/* Studio badge */}
              <p className="fade-up fade-up-delay-1 font-mono text-xs tracking-[0.2em] uppercase text-gold mb-5">
                <span className="ornament">— </span>
                {person.company}
              </p>

              <h1 className="fade-up fade-up-delay-2 font-display text-4xl xl:text-5xl font-bold leading-tight text-paper mb-6">
                <SecretName name={person.name[lang]} inlineKeypad />
              </h1>

              <div className="fade-up fade-up-delay-3 deco-rule mb-6" />

              <h2 className="fade-up fade-up-delay-3 font-body text-lg font-light text-stone-light tracking-wide mb-4">
                {person.role[lang]}
              </h2>

              <p className="fade-up fade-up-delay-4 text-sm text-stone leading-relaxed max-w-xs">
                {person.tagline[lang]}
                {lang === "en" && <><br /><br /></>}
              </p>

              {/* Desktop nav */}
              <div className="fade-up fade-up-delay-5">
                <NavLinks />
              </div>

              {/* Request a quote CTA + ESPA button (stacked) */}
              <div className="fade-up fade-up-delay-5 mt-10 flex flex-col items-start gap-4">
                <Link href="/request" className="cta-button">
                  {t.requestQuote}
                  <span className="arrow-icon">
                    <Icon name="arrow" size={13} />
                  </span>
                </Link>

                {/* ESPA funding button */}
                <Link href="/espa" aria-label="ΕΣΠΑ" className="espa-button w-40">
                  <img src="/1915943-2048448176.jpg" alt="ΕΣΠΑ" loading="lazy" decoding="async" className="w-full h-auto block" />
                </Link>
              </div>
            </div>

            {/* Bottom: socials + language toggle */}
            <div className="fade-up fade-up-delay-5 flex items-center gap-4 pb-2 lg:pb-0 mt-10 lg:mt-0">
              {person.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone hover:text-gold-light transition-colors duration-200"
                >
                  <Icon name={s.icon as "linkedin" | "github" | "behance" | "email" | "phone" | "whatsapp" | "telegram" | "instagram"} size={18} />
                </a>
              ))}
              <span className="ml-2 text-xs font-mono text-stone-dark tracking-wider">
                info@AkosDS.com
              </span>
              <div className="ml-auto">
                <LanguageToggle />
              </div>
            </div>
          </aside>

          {/* ── RIGHT COLUMN — scrollable on desktop ── */}
          <main className="hidden lg:block flex-1 py-20 space-y-32">
            {/* PROJECTS */}
            <section id="projects">
              <h3 className="section-heading">
                <span className="ornament mr-2">§</span>
                {t.projects}
              </h3>
              <ul className="space-y-2">
                {projects.map((proj) =>
                  proj.sub ? (
                    <li key={proj.title} className="-mt-1 ml-8 group relative">
                      {proj.links[0] && (
                        <a
                          href={proj.links[0].href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={proj.title}
                          className="absolute inset-0 z-10"
                        />
                      )}
                      <div className="flex items-center gap-3 rounded-lg px-4 py-2.5 border border-transparent transition-all duration-300 group-hover:border-gold/10 group-hover:bg-gold/[0.03]">
                        <span className="text-gold/40 font-mono text-sm shrink-0 leading-none">↳</span>
                        <h4 className="flex-1 min-w-0 font-display font-medium text-stone-light text-xs leading-snug group-hover:text-gold-light transition-colors">
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
                  <li key={proj.title} className="section-card group relative">
                    {proj.links[0] && (
                      <a
                        href={proj.links[0].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={proj.title}
                        className="absolute inset-0 z-10"
                      />
                    )}
                    <div className="flex gap-5">
                      <ProjectThumb
                        image={proj.image}
                        imageMobile={proj.imageMobile}
                        href={proj.links[0]?.href}
                        title={proj.title}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-display font-semibold text-paper text-sm group-hover:text-gold-light transition-colors leading-snug">
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
            </section>

            {/* SECTORS */}
            <section id="sectors">
              <h3 className="section-heading">
                <span className="ornament mr-2">§</span>
                {t.sectors}
              </h3>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {sectors.map((sec) => (
                  <Link
                    key={sec.slug}
                    href={`/sectors/${sec.slug}`}
                    className="section-card group flex flex-col"
                  >
                    <span className="text-gold text-xl mb-3 block leading-none">
                      {sec.icon}
                    </span>
                    <h4 className="font-display font-semibold text-paper text-base mb-2 group-hover:text-gold-light transition-colors">
                      {sec.title[lang]}
                    </h4>
                    <p className="text-xs text-stone leading-relaxed mb-4">
                      {sec.hook[lang]}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-stone group-hover:text-gold-light transition-colors">
                      {t.explore}
                      <span className="arrow-icon">
                        <Icon name="arrow" size={11} />
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* SERVICES */}
            <section id="services">
              <h3 className="section-heading">
                <span className="ornament mr-2">§</span>
                {t.services}
              </h3>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {services.map((svc) =>
                  svc.href ? (
                    <Link
                      key={svc.title.en}
                      href={svc.href}
                      className="section-card group flex flex-col"
                    >
                      <span className="text-gold text-xl mb-3 block leading-none">
                        {svc.icon}
                      </span>
                      <h4 className="font-display font-semibold text-paper text-base mb-2 group-hover:text-gold-light transition-colors">
                        {svc.title[lang]}
                      </h4>
                      <p className="text-xs text-stone leading-relaxed mb-4">
                        {svc.description[lang]}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-stone group-hover:text-gold-light transition-colors">
                        {t.explore}
                        <span className="arrow-icon">
                          <Icon name="arrow" size={11} />
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <div key={svc.title.en} className="section-card group">
                      <span className="text-gold text-xl mb-3 block leading-none">
                        {svc.icon}
                      </span>
                      <h4 className="font-display font-semibold text-paper text-base mb-2 group-hover:text-gold-light transition-colors">
                        {svc.title[lang]}
                      </h4>
                      <p className="text-xs text-stone leading-relaxed">
                        {svc.description[lang]}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* EDUCATION */}
            <section id="education">
              <h3 className="section-heading">
                <span className="ornament mr-2">§</span>
                {t.education}
              </h3>
              <ol className="space-y-2">
                {education.map((edu) => (
                  <li key={edu.degree.en} className="section-card group">
                    <div className="flex flex-col sm:flex-row sm:gap-6">
                      <p className="exp-date sm:w-36 shrink-0 mb-1 sm:mb-0">
                        {edu.period}
                      </p>
                      <div className="flex-1">
                        <h4 className="font-display font-semibold text-paper text-sm mb-0.5 group-hover:text-gold-light transition-colors leading-snug">
                          {edu.degree[lang]}
                          <span className="text-stone mx-2">·</span>
                          <a href={edu.institutionUrl} target="_blank" rel="noopener noreferrer" className="gold-link">
                            {edu.institution[lang]}
                          </a>
                        </h4>
                        <p className="text-xs text-stone leading-relaxed mt-2 mb-3">
                          {edu.description[lang]}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {edu.tags.map((tag) => (
                            <span key={tag} className="tag-pill">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* ABOUT */}
            <section id="about">
              <h3 className="section-heading">
                <span className="ornament mr-2">§</span>
                {t.about}
              </h3>
              <div className="space-y-4">
                {person.about[lang].map((para, i) => (
                  <p
                    key={i}
                    className="text-sm text-stone leading-[1.85] max-w-prose"
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                ))}
              <br /><br /><br />
              </div>
            </section>

            {/* FOOTER */}
            <footer className="pt-8 border-t border-stone-dark flex items-center justify-between gap-4">
              <p className="text-xs text-stone leading-relaxed">
                {t.copyright}
              </p>
              <div className="flex items-center gap-4 shrink-0">
                <button
                  onClick={openCookiePreferences}
                  className="text-xs font-mono tracking-wider text-stone-dark hover:text-stone transition-colors"
                >
                  {t.cookies}
                </button>
                <Link
                  href="/privacy"
                  className="text-xs font-mono tracking-wider text-stone-dark hover:text-stone transition-colors"
                >
                  {t.privacy}
                </Link>
                <Link
                  href="/terms"
                  className="text-xs font-mono tracking-wider text-stone-dark hover:text-stone transition-colors"
                >
                  {t.terms}
                </Link>
              </div>
            </footer>
          </main>
        </div>

        {/* ── MOBILE LAYOUT ── */}
        <MobileScrollSections />
      </div>
    </SpotlightWrapper>
  );
}
