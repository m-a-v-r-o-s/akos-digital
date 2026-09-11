"use client";

import Link from "next/link";
import SpotlightWrapper from "@/components/SpotlightWrapper";
import LanguageToggle from "@/components/LanguageToggle";
import { Icon } from "@/components/Icons";
import { useLanguage } from "@/components/LanguageContext";
import { caseStudies } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

const L = {
  en: {
    back: "Back to home",
    eyebrow: "Work",
    title: "Client work",
    intro:
      "Three businesses running on sites I built and still support, and one operations platform still being built. Each case study says what the problem actually was and what was done about it. There are no invented conversion figures here: every claim is something you can check by opening the site.",
    read: "Read the case study",
    ctaTitle: "Want yours here?",
    ctaBody:
      "Tell me what your business needs to do online and I'll come back within 24 hours with a clear, no-obligation quote.",
    cta: "Request a quote",
  },
  el: {
    back: "Επιστροφή στην αρχική",
    eyebrow: "Έργα",
    title: "Έργα πελατών",
    intro:
      "Τρεις επιχειρήσεις που λειτουργούν πάνω σε sites που έχτισα και συνεχίζω να υποστηρίζω, και μία πλατφόρμα διαχείρισης που χτίζεται ακόμη. Κάθε μελέτη περίπτωσης λέει ποιο ήταν πραγματικά το πρόβλημα και τι έγινε γι' αυτό. Δεν υπάρχουν επινοημένα ποσοστά μετατροπής εδώ: κάθε ισχυρισμός είναι κάτι που μπορείς να ελέγξεις ανοίγοντας το site.",
    read: "Διάβασε τη μελέτη",
    ctaTitle: "Θέλεις το δικό σου εδώ;",
    ctaBody:
      "Πες μου τι χρειάζεται να κάνει online η επιχείρησή σου και θα επανέλθω εντός 24 ωρών με ξεκάθαρη προσφορά χωρίς δέσμευση.",
    cta: "Ζήτησε προσφορά",
  },
};

export default function WorkIndex() {
  const { lang } = useLanguage();
  const t = L[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.title,
    inLanguage: lang,
    itemListElement: caseStudies.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.client,
      url: `${SITE_URL}/${lang}/work/${c.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SpotlightWrapper>
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 min-h-screen pb-24">
          <header className="flex items-center justify-between py-8">
            <Link
              href={`/${lang}`}
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-accent hover:text-accent-light transition-colors"
            >
              <span className="ornament">←</span>
              {t.back}
            </Link>
            <LanguageToggle />
          </header>

          <main>
            <section className="fade-up pt-2 pb-12">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-stone mb-4">
                {t.eyebrow}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-paper mb-5">
                {t.title}
              </h1>
              <div className="deco-rule mb-6" />
              <p className="text-base text-stone-light leading-relaxed max-w-3xl">{t.intro}</p>
            </section>

            <section className="mb-14">
              <ul className="space-y-4">
                {caseStudies.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${lang}/work/${c.slug}`} className="section-card group block">
                      {c.logo && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={c.logo}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="client-logo mb-3"
                        />
                      )}
                      <p className="flex flex-wrap items-center gap-2.5 font-mono text-xs tracking-[0.2em] uppercase text-stone mb-2">
                        {c.client}
                        {c.status && <span className="status-badge">{c.status[lang]}</span>}
                      </p>
                      <h2 className="font-display font-semibold text-paper text-lg mb-2 group-hover:text-accent-light transition-colors">
                        {c.title[lang]}
                      </h2>
                      <p className="text-sm text-stone leading-relaxed mb-4 max-w-3xl">
                        {c.summary[lang]}
                      </p>
                      <ul className="flex flex-wrap gap-2 mb-4">
                        {c.stack.slice(0, 4).map((s) => (
                          <li
                            key={s}
                            className="font-mono text-[0.65rem] tracking-wide text-stone border border-stone-dark rounded-full px-2.5 py-0.5"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-stone group-hover:text-accent-light transition-colors">
                        {t.read}
                        <span className="arrow-icon">
                          <Icon name="arrow" size={11} />
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-t border-stone-dark pt-10">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-paper mb-3">
                {t.ctaTitle}
              </h2>
              <p className="text-sm text-stone leading-relaxed mb-6 max-w-xl">{t.ctaBody}</p>
              <Link href={`/${lang}/request`} className="cta-button inline-flex">
                {t.cta}
                <span className="arrow-icon">
                  <Icon name="arrow" size={13} />
                </span>
              </Link>
            </section>
          </main>
        </div>
      </SpotlightWrapper>
    </>
  );
}
