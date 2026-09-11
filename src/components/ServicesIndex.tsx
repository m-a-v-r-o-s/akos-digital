"use client";

import Link from "next/link";
import SpotlightWrapper from "@/components/SpotlightWrapper";
import LanguageToggle from "@/components/LanguageToggle";
import { Icon } from "@/components/Icons";
import { useLanguage } from "@/components/LanguageContext";
import { servicePages, sectors } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

const L = {
  en: {
    back: "Back to home",
    eyebrow: "Services",
    title: "What I build",
    intro:
      "A solo studio in Athens working with businesses across Greece, in Greek and in English. Every service below is something I build and support myself, from the first conversation to launch and after it.",
    sectorsTitle: "Or start from your line of work",
    ctaTitle: "Not sure which you need?",
    ctaBody:
      "Describe the problem rather than the solution and I'll tell you what it actually takes, including when the answer is less than you expected.",
    cta: "Request a quote",
  },
  el: {
    back: "Επιστροφή στην αρχική",
    eyebrow: "Υπηρεσίες",
    title: "Τι κατασκευάζω",
    intro:
      "Μονομελές στούντιο στην Αθήνα που συνεργάζεται με επιχειρήσεις σε όλη την Ελλάδα, στα ελληνικά και στα αγγλικά. Κάθε υπηρεσία παρακάτω είναι κάτι που χτίζω και υποστηρίζω ο ίδιος, από την πρώτη κουβέντα ως την παράδοση και μετά από αυτήν.",
    sectorsTitle: "Ή ξεκίνα από τον κλάδο σου",
    ctaTitle: "Δεν είσαι σίγουρος τι χρειάζεσαι;",
    ctaBody:
      "Περίγραψε το πρόβλημα αντί για τη λύση και θα σου πω τι πραγματικά χρειάζεται, ακόμη και όταν η απάντηση είναι λιγότερα από όσα περίμενες.",
    cta: "Ζήτησε προσφορά",
  },
};

export default function ServicesIndex() {
  const { lang } = useLanguage();
  const t = L[lang];

  // An ItemList of the services, so the set is legible to a crawler as one
  // collection rather than five unrelated links.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.title,
    inLanguage: lang,
    itemListElement: servicePages.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.seoTitle[lang],
      url: `${SITE_URL}/${lang}/services/${s.slug}`,
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
              <ul className="grid gap-3 sm:grid-cols-2">
                {servicePages.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/${lang}/services/${s.slug}`}
                      className="section-card group block h-full"
                    >
                      <span className="text-accent text-2xl block mb-3 leading-none" aria-hidden="true">
                        {s.icon}
                      </span>
                      <h2 className="font-display font-semibold text-paper text-base mb-2 group-hover:text-accent-light transition-colors">
                        {s.seoTitle[lang]}
                      </h2>
                      <p className="text-sm text-stone leading-relaxed">{s.hook[lang]}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <nav aria-label={t.sectorsTitle} className="mb-14">
              <h2 className="section-heading !static mb-5">{t.sectorsTitle}</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {sectors.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/${lang}/sectors/${s.slug}`}
                      className="section-card group flex items-center gap-3"
                    >
                      <span className="text-accent text-lg leading-none" aria-hidden="true">
                        {s.icon}
                      </span>
                      <span className="font-display font-semibold text-paper text-sm group-hover:text-accent-light transition-colors">
                        {s.title[lang]}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

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
