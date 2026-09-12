"use client";

import { useEffect } from "react";
import Link from "next/link";
import SpotlightWrapper from "@/components/SpotlightWrapper";
import NavLinks from "@/components/NavLinks";
import HeaderControls from "@/components/HeaderControls";
import Bilingual, { BilingualHtml } from "@/components/Bilingual";
import { useLanguage } from "@/components/LanguageContext";
import { Icon } from "@/components/Icons";
import { person, education, projects, services, sectors } from "@/lib/data";
import MobileScrollSections from "@/components/MobileScrollSections";
import ProjectThumb from "@/components/ProjectThumb";
import { CardOverlay, CardLinks } from "@/components/ProjectLinks";
import { openCookiePreferences } from "@/components/CookieConsent";
import CtaStack from "@/components/CtaStack";

const ui = {
  en: {
    about: "About",
    services: "Services",
    allServices: "All services",
    sectors: "Sectors",
    explore: "Explore",
    education: "Education",
    projects: "Selected Works",
    allWork: "All case studies",
    fullCV: "Full CV",
    terms: "Terms",
    privacy: "Privacy",
    cookies: "Cookies",
    copyright: "© Akos Digital 2026. All Rights Reserved.",
  },
  el: {
    about: "Σχετικά",
    services: "Υπηρεσίες",
    allServices: "Όλες οι υπηρεσίες",
    sectors: "Ειδικότητες",
    explore: "Περισσότερα",
    education: "Εκπαίδευση",
    projects: "Επιλεγμένα Έργα",
    allWork: "Όλες οι μελέτες",
    fullCV: "Πλήρες Βιογραφικό",
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
          <aside className="aside-col hidden lg:sticky lg:top-0 lg:flex lg:flex-col lg:justify-between lg:h-screen lg:w-[42%] xl:w-[40%] lg:pt-10 lg:pb-6 lg:flex-shrink-0">
            {/* Top: identity */}
            <div className="aside-identity">
              {/* Studio badge */}
              <p className="fade-up fade-up-delay-1 font-mono text-xs tracking-[0.2em] uppercase text-accent mb-5">
                <span className="ornament">— </span>
                {person.company}
              </p>

              <h1 className="fade-up fade-up-delay-2 font-display text-4xl xl:text-5xl font-bold leading-tight text-paper mb-6">
                {person.name[lang]}
              </h1>

              <div className="fade-up fade-up-delay-3 deco-rule mb-6" />

              <h2 className="fade-up fade-up-delay-3 font-body text-lg font-light text-stone-light tracking-wide mb-4">
                <Bilingual el={person.role.el} en={person.role.en} />
              </h2>

              <p className="fade-up fade-up-delay-4 text-sm text-stone leading-relaxed max-w-xs">
                <Bilingual el={person.tagline.el} en={<>{person.tagline.en}<br /><br /></>} />
              </p>

              {/* Desktop nav */}
              <div className="fade-up fade-up-delay-5">
                <NavLinks />
              </div>

              {/* All three CTAs, one set — see CtaStack.tsx. mt-6 rather
                  than mt-10: this column is h-screen and cannot scroll, so
                  the stack's height is paid for out of the aside's own
                  padding and this margin. */}
              <div className="fade-up fade-up-delay-5 mt-6">
                <CtaStack layout="stack" />
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
                  className="text-stone hover:text-accent-light transition-colors duration-200"
                >
                  <Icon name={s.icon as "linkedin" | "github" | "behance" | "email" | "phone" | "whatsapp" | "telegram" | "instagram"} size={18} />
                </a>
              ))}
              <span className="ml-2 text-xs font-mono text-stone-dark tracking-wider">
                info@AkosDS.com
              </span>
              <div className="ml-auto">
                <HeaderControls />
              </div>
            </div>
          </aside>

          {/* ── RIGHT COLUMN — scrollable on desktop ── */}
          <main className="hidden lg:block flex-1 pt-20 pb-6 space-y-32">
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
                      <CardOverlay project={proj} />
                      <div className="flex items-center gap-3 rounded-lg px-4 py-2.5 border border-transparent transition-all duration-300 group-hover:border-accent/10 group-hover:bg-accent/[0.03]">
                        <span className="text-accent/40 font-mono text-sm shrink-0 leading-none">↳</span>
                        <h4 className="flex-1 min-w-0 font-display font-medium text-stone-light text-xs leading-snug group-hover:text-accent-light transition-colors">
                          {proj.title}
                        </h4>
                        <CardLinks project={proj} size={10} />
                      </div>
                    </li>
                  ) : (
                  <li key={proj.title} className="section-card group relative">
                    <CardOverlay project={proj} />
                    <div className="flex gap-5">
                      <ProjectThumb
                        image={proj.image}
                        imageMobile={proj.imageMobile}
                        href={proj.links[0]?.href}
                        title={proj.title}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-display font-semibold text-paper text-sm group-hover:text-accent-light transition-colors leading-snug">
                            {proj.title}
                          </h4>
                          {proj.status ? (
                            <span className="status-badge shrink-0">{proj.status[lang]}</span>
                          ) : (
                            proj.year && (
                              <span className="font-mono text-xs text-stone-dark shrink-0">
                                {proj.year}
                              </span>
                            )
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
                          <CardLinks project={proj} />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${lang}/work`}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-accent hover:text-accent-light transition-colors"
              >
                {t.allWork}
                <span className="arrow-icon">
                  <Icon name="arrow" size={11} />
                </span>
              </Link>
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
                    href={`/${lang}/sectors/${sec.slug}`}
                    className="section-card group flex flex-col"
                  >
                    <span className="text-accent text-xl mb-3 block leading-none">
                      {sec.icon}
                    </span>
                    <h4 className="font-display font-semibold text-paper text-base mb-2 group-hover:text-accent-light transition-colors">
                      <Bilingual el={sec.title.el} en={sec.title.en} />
                    </h4>
                    <p className="text-xs text-stone leading-relaxed mb-4">
                      <Bilingual el={sec.hook.el} en={sec.hook.en} />
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-stone group-hover:text-accent-light transition-colors">
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
                      href={`/${lang}${svc.href}`}
                      className="section-card group flex flex-col"
                    >
                      <span className="text-accent text-xl mb-3 block leading-none">
                        {svc.icon}
                      </span>
                      <h4 className="font-display font-semibold text-paper text-base mb-2 group-hover:text-accent-light transition-colors">
                        <Bilingual el={svc.title.el} en={svc.title.en} />
                      </h4>
                      <p className="text-xs text-stone leading-relaxed mb-4">
                        <Bilingual el={svc.description.el} en={svc.description.en} />
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-stone group-hover:text-accent-light transition-colors">
                        {t.explore}
                        <span className="arrow-icon">
                          <Icon name="arrow" size={11} />
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <div key={svc.title.en} className="section-card group">
                      <span className="text-accent text-xl mb-3 block leading-none">
                        {svc.icon}
                      </span>
                      <h4 className="font-display font-semibold text-paper text-base mb-2 group-hover:text-accent-light transition-colors">
                        <Bilingual el={svc.title.el} en={svc.title.en} />
                      </h4>
                      <p className="text-xs text-stone leading-relaxed">
                        <Bilingual el={svc.description.el} en={svc.description.en} />
                      </p>
                    </div>
                  )
                )}
              </div>
              <Link
                href={`/${lang}/services`}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-accent hover:text-accent-light transition-colors"
              >
                {t.allServices}
                <span className="arrow-icon">
                  <Icon name="arrow" size={11} />
                </span>
              </Link>
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
                        <h4 className="font-display font-semibold text-paper text-sm mb-0.5 group-hover:text-accent-light transition-colors leading-snug">
                          <Bilingual el={edu.degree.el} en={edu.degree.en} />
                          <span className="text-stone mx-2">·</span>
                          <a href={edu.institutionUrl} target="_blank" rel="noopener noreferrer" className="accent-link">
                            <Bilingual el={edu.institution.el} en={edu.institution.en} />
                          </a>
                        </h4>
                        <p className="text-xs text-stone leading-relaxed mt-2 mb-3">
                          <Bilingual el={edu.description.el} en={edu.description.en} />
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
                {person.about.el.map((para, i) => (
                  <BilingualHtml
                    key={`el-${i}`}
                    as="p"
                    className="text-sm text-stone leading-[1.85] max-w-prose"
                    el={para}
                    en={person.about.en[i]}
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
                  href={`/${lang}/privacy`}
                  className="text-xs font-mono tracking-wider text-stone-dark hover:text-stone transition-colors"
                >
                  {t.privacy}
                </Link>
                <Link
                  href={`/${lang}/terms`}
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
