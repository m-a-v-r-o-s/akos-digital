"use client";

import { useEffect } from "react";
import SpotlightWrapper from "@/components/SpotlightWrapper";
import NavLinks from "@/components/NavLinks";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageContext";
import { Icon } from "@/components/Icons";
import { person, education, projects, services } from "@/lib/data";
import MobileScrollSections from "@/components/MobileScrollSections";

const ui = {
  en: {
    about: "About",
    services: "Services",
    education: "Education",
    projects: "Selected Works",
    fullCV: "Full CV",
    copyright: "© Akos Digital 2026. All Rights Reserved.",
  },
  el: {
    about: "Σχετικά",
    services: "Υπηρεσίες",
    education: "Εκπαίδευση",
    projects: "Επιλεγμένα Έργα",
    fullCV: "Πλήρες Βιογραφικό",
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
                {person.name[lang]}
              </h1>

              <div className="fade-up fade-up-delay-3 deco-rule mb-6" />

              <h2 className="fade-up fade-up-delay-3 font-body text-lg font-light text-stone-light tracking-wide mb-4">
                {person.role[lang]}
              </h2>

              <p className="fade-up fade-up-delay-4 text-sm text-stone leading-relaxed max-w-xs">
                {person.tagline[lang]}
              </p>

              {/* Desktop nav */}
              <div className="fade-up fade-up-delay-5">
                <NavLinks />
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
                  <Icon name={s.icon as "linkedin" | "github" | "behance" | "email" | "phone" | "whatsapp" | "telegram"} size={18} />
                </a>
              ))}
              <span className="ml-2 text-xs font-mono text-stone-dark tracking-wider">
                digitalaakos@gmail.com
              </span>
              <div className="ml-auto">
                <LanguageToggle />
              </div>
            </div>
          </aside>

          {/* ── RIGHT COLUMN — scrollable on desktop ── */}
          <main className="hidden lg:block flex-1 py-20 space-y-32">
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

            {/* SERVICES */}
            <section id="services">
              <h3 className="section-heading">
                <span className="ornament mr-2">§</span>
                {t.services}
              </h3>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {services.map((svc) => (
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
                ))}
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
                          <a href={edu.institutionUrl} className="gold-link">
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

            {/* PROJECTS */}
            <section id="projects">
              <h3 className="section-heading">
                <span className="ornament mr-2">§</span>
                {t.projects}
              </h3>
              <ul className="space-y-2">
                {projects.map((proj) => (
                  <li key={proj.title} className="section-card group">
                    <div className="flex gap-5">
                      <div
                        className="hidden sm:block w-24 h-16 rounded shrink-0 overflow-hidden"
                        style={{ border: "1px solid rgba(201,168,76,0.15)" }}
                      >
                        {proj.image ? (
                          <img
                            src={proj.image}
                            alt={proj.title}
                            className="w-full h-full object-cover object-top project-screenshot"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center text-gold opacity-40 text-2xl font-display italic"
                            style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(13,13,13,0.5) 100%)" }}
                          >
                            {proj.title.charAt(0)}
                          </div>
                        )}
                      </div>
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
                              className="inline-flex items-center gap-1 text-xs font-mono text-stone hover:text-gold-light transition-colors ml-1"
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

            {/* FOOTER */}
            <footer className="pb-20 pt-8 border-t border-stone-dark">
              <p className="text-xs text-stone leading-relaxed">
                {t.copyright}
              </p>
            </footer>
          </main>
        </div>

        {/* ── MOBILE LAYOUT ── */}
        <MobileScrollSections />
      </div>
    </SpotlightWrapper>
  );
}
