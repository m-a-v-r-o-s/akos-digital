"use client";

import { useEffect } from "react";
import Link from "next/link";
import SpotlightWrapper from "@/components/SpotlightWrapper";
import LanguageToggle from "@/components/LanguageToggle";
import ProjectThumb from "@/components/ProjectThumb";
import { Icon } from "@/components/Icons";
import { useLanguage } from "@/components/LanguageContext";
import { sectors, projects } from "@/lib/data";

const L = {
  en: {
    back: "Back to home",
    eyebrow: "Sector",
    works: "Selected work in this space",
    included: "What's included",
    supportNote:
      "Every site includes lifetime support for its security and functionality. New features and content changes are quoted separately, and hosting and the domain are separate recurring costs, payable through me or directly to the providers.",
    supportNoteLocal:
      "Every installation includes lifetime support for its security and reliable operation. It runs fully local, with no cloud, no subscriptions, and no data leaving your home; new devices or automations are quoted separately.",
    faq: "Common questions",
    ctaTitle: "Ready to start?",
    ctaBody:
      "Tell me about your project and I'll get back to you within 24 hours, with ideas and a clear, no-obligation quote.",
    cta: "Request a quote",
  },
  el: {
    back: "Επιστροφή στην αρχική",
    eyebrow: "Ειδικότητα",
    works: "Επιλεγμένες δουλειές στον χώρο",
    included: "Τι περιλαμβάνεται",
    supportNote:
      "Κάθε site περιλαμβάνει υποστήριξη εφ' όρου ζωής για την ασφάλεια και τη λειτουργία του. Νέες λειτουργίες και αλλαγές περιεχομένου κοστολογούνται ξεχωριστά, ενώ το hosting και το domain είναι ξεχωριστά, επαναλαμβανόμενα κόστη, που πληρώνονται μέσω εμένα ή απευθείας στους παρόχους.",
    supportNoteLocal:
      "Κάθε εγκατάσταση περιλαμβάνει υποστήριξη εφ' όρου ζωής για την ασφάλεια και την αξιόπιστη λειτουργία της. Τρέχει πλήρως τοπικά, χωρίς cloud, χωρίς συνδρομές και χωρίς δεδομένα να φεύγουν από το σπίτι σου· νέες συσκευές ή αυτοματισμοί κοστολογούνται ξεχωριστά.",
    faq: "Συχνές ερωτήσεις",
    ctaTitle: "Έτοιμος να ξεκινήσεις;",
    ctaBody:
      "Πες μου για το έργο σου και θα επικοινωνήσω εντός 24 ωρών, με ιδέες και μια ξεκάθαρη προσφορά χωρίς δέσμευση.",
    cta: "Ζήτησε προσφορά",
  },
};

export default function SectorDetail({ slug }: { slug: string }) {
  const { lang } = useLanguage();
  const t = L[lang];

  // Remember that we came from the Sectors section, so going back (browser
  // back or the link) returns to it on the homepage instead of the top.
  useEffect(() => {
    try {
      sessionStorage.setItem("akos:return", "sectors");
    } catch {
      /* ignore */
    }
  }, []);

  const sec = sectors.find((s) => s.slug === slug);
  if (!sec) return null;

  const work = projects.filter((p) => p.sector === slug);

  return (
    <SpotlightWrapper className={slug === "smarthome" ? "smarthome-theme" : ""}>
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 min-h-screen pb-24">
        {/* Header */}
        <header className="flex items-center justify-between py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors"
          >
            <span className="ornament">←</span>
            {t.back}
          </Link>
          <LanguageToggle />
        </header>

        {/* Hero */}
        <section className="fade-up pt-2 pb-12">
          {slug === "smarthome" ? (
            <span
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-5 font-mono text-[0.65rem] tracking-widest uppercase"
              style={{
                background: "rgba(24,188,242,0.12)",
                border: "1px solid rgba(24,188,242,0.45)",
                color: "#18bcf2",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 3 3 10.5V21h6v-6h6v6h6V10.5z" />
              </svg>
              Home Assistant
            </span>
          ) : (
            <span className="text-gold text-3xl block mb-5 leading-none">{sec.icon}</span>
          )}
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-stone mb-4">
            {t.eyebrow}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-paper mb-5">
            {sec.title[lang]}
          </h1>
          <div className="deco-rule mb-6" />
          <p className="text-base text-stone-light leading-relaxed max-w-3xl mb-6">
            {sec.hook[lang]}
          </p>
          <ul className="space-y-2 max-w-3xl">
            {sec.points[lang].map((p, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-stone leading-relaxed">
                <span className="text-gold mt-0.5 shrink-0">›</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Selected work */}
        {work.length > 0 && (
          <section className="mb-14">
            <h2 className="section-heading !static mb-5">{t.works}</h2>
            <ul className="space-y-2">
              {work.map((proj) => (
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
                    <ProjectThumb image={proj.image} title={proj.title} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-semibold text-paper text-sm mb-1 group-hover:text-gold-light transition-colors">
                        {proj.title}
                      </h4>
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
        )}

        {/* What's included */}
        <section className="mb-14">
          <h2 className="section-heading !static mb-5">{t.included}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {sec.included[lang].map((item, i) => (
              <div key={i} className="section-card flex gap-3" style={{ padding: "1rem" }}>
                <span className="text-gold mt-0.5 shrink-0">✦</span>
                <span className="text-sm text-stone-light leading-snug">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-stone leading-relaxed mt-4 border-l-2 border-gold/30 pl-4 max-w-3xl">
            {slug === "smarthome" ? t.supportNoteLocal : t.supportNote}
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="section-heading !static mb-5">{t.faq}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {sec.faq.map((f, i) => (
              <div key={i} className="section-card">
                <p className="font-display font-semibold text-paper text-sm mb-1.5">
                  {f.q[lang]}
                </p>
                <p className="text-sm text-stone leading-relaxed">{f.a[lang]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-stone-dark pt-10">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-paper mb-3">
            {t.ctaTitle}
          </h2>
          <p className="text-sm text-stone leading-relaxed mb-6 max-w-xl">{t.ctaBody}</p>
          <Link href="/request" className="cta-button inline-flex">
            {t.cta}
            <span className="arrow-icon">
              <Icon name="arrow" size={13} />
            </span>
          </Link>
        </section>
      </div>
    </SpotlightWrapper>
  );
}
