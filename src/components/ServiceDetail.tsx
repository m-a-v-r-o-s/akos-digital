"use client";

import Link from "next/link";
import SpotlightWrapper from "@/components/SpotlightWrapper";
import HeaderControls from "@/components/HeaderControls";
import { Icon } from "@/components/Icons";
import LiquidGlass from "@/components/LiquidGlass";
import { useLanguage } from "@/components/LanguageContext";
import { servicePages, sectors } from "@/lib/data";

const L = {
  en: {
    back: "Back to home",
    eyebrow: "Service",
    included: "What's included",
    faq: "Common questions",
    ctaTitle: "Ready to start?",
    ctaBody:
      "Tell me about your project and I'll get back to you within 24 hours, with ideas and a clear, no-obligation quote.",
    cta: "Request a quote",
    others: "Other services",
    forWho: "Who this is usually for",
    espaNote:
      "This work can often be funded through ESPA. I check whether you qualify before you commit to anything.",
    espaLink: "See ESPA funding",
  },
  el: {
    back: "Επιστροφή στην αρχική",
    eyebrow: "Υπηρεσία",
    included: "Τι περιλαμβάνεται",
    faq: "Συχνές ερωτήσεις",
    ctaTitle: "Έτοιμος να ξεκινήσεις;",
    ctaBody:
      "Πες μου για το έργο σου και θα επικοινωνήσω εντός 24 ωρών, με ιδέες και μια ξεκάθαρη προσφορά χωρίς δέσμευση.",
    cta: "Ζήτησε προσφορά",
    others: "Άλλες υπηρεσίες",
    forWho: "Σε ποιους απευθύνεται συνήθως",
    espaNote:
      "Αυτή η δουλειά μπορεί συχνά να χρηματοδοτηθεί μέσω ΕΣΠΑ. Ελέγχω αν πληροίς τις προϋποθέσεις πριν δεσμευτείς σε οτιδήποτε.",
    espaLink: "Δες τη χρηματοδότηση ΕΣΠΑ",
  },
};

export default function ServiceDetail({ slug }: { slug: string }) {
  const { lang } = useLanguage();
  const t = L[lang];

  const svc = servicePages.find((s) => s.slug === slug);
  if (!svc) return null;

  const related = sectors.filter((s) => svc.relatedSectors.includes(s.slug));

  // Service plus FAQPage in one graph: the page is a service offering that
  // also answers questions, and both describe the same URL.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: svc.seoTitle[lang],
        description: svc.hook[lang],
        inLanguage: lang,
        serviceType: svc.seoTitle.en,
        areaServed: { "@type": "Country", name: "Greece" },
        provider: { "@id": "https://www.akosds.com/#organization" },
      },
      {
        "@type": "FAQPage",
        inLanguage: lang,
        mainEntity: svc.faq.map((f) => ({
          "@type": "Question",
          name: f.q[lang],
          acceptedAnswer: { "@type": "Answer", text: f.a[lang] },
        })),
      },
    ],
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
            <HeaderControls />
          </header>

          <main>
            {/* Hero */}
            <section className="fade-up pt-2 pb-12">
              <span className="text-accent text-3xl block mb-5 leading-none" aria-hidden="true">
                {svc.icon}
              </span>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-stone mb-4">
                {t.eyebrow}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-paper mb-5">
                {svc.title[lang]}
              </h1>
              <div className="deco-rule mb-6" />
              <p className="text-base text-stone-light leading-relaxed max-w-3xl mb-6">
                {svc.hook[lang]}
              </p>
              <ul className="space-y-2 max-w-3xl">
                {svc.points[lang].map((p, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-stone leading-relaxed">
                    <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">›</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* What's included */}
            <section className="mb-14">
              <h2 className="section-heading !static mb-5">{t.included}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {svc.included[lang].map((item, i) => (
                  <div key={i} className="section-card flex gap-3" style={{ padding: "1rem" }}>
                    <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">✦</span>
                    <span className="text-sm text-stone-light leading-snug">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-stone leading-relaxed mt-4 border-l-2 border-accent/30 pl-4 max-w-3xl">
                {t.espaNote}{" "}
                {/* Underlined rather than .accent-link: that class sets
                    text-decoration:none, which leaves an inline link with
                    colour as its only cue and fails WCAG 1.4.1. */}
                <Link
                  href={`/${lang}/espa`}
                  className="font-medium text-stone-light underline underline-offset-2 hover:text-accent-light transition-colors"
                >
                  {t.espaLink}
                </Link>
              </p>
            </section>

            {/* Who it's for: links every service into the sector pages, so the
                sector pages gain inbound links from a second direction. */}
            <nav aria-label={t.forWho} className="mb-14">
              <h2 className="section-heading !static mb-5">{t.forWho}</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {related.map((s) => (
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

            {/* FAQ */}
            <section className="mb-14">
              <h2 className="section-heading !static mb-5">{t.faq}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {svc.faq.map((f, i) => (
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
              <LiquidGlass elasticity={0.12} padding="0" className="inline-block">
                <Link href={`/${lang}/request`} className="cta-button cta-button-glass inline-flex">
                  {t.cta}
                  <span className="arrow-icon">
                    <Icon name="arrow" size={13} />
                  </span>
                </Link>
              </LiquidGlass>
            </section>
          </main>

          {/* Sibling services */}
          <nav aria-label={t.others} className="border-t border-stone-dark pt-10 mt-14">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-paper mb-5">
              {t.others}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {servicePages
                .filter((s) => s.slug !== svc.slug)
                .map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/${lang}/services/${s.slug}`}
                      className="section-card group flex items-center gap-3"
                    >
                      <span className="text-accent text-lg leading-none" aria-hidden="true">
                        {s.icon}
                      </span>
                      <span className="font-display font-semibold text-paper text-sm group-hover:text-accent-light transition-colors">
                        {s.seoTitle[lang]}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </SpotlightWrapper>
    </>
  );
}
