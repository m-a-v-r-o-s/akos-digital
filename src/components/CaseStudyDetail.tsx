"use client";

import Link from "next/link";
import SpotlightWrapper from "@/components/SpotlightWrapper";
import LanguageToggle from "@/components/LanguageToggle";
import ProjectThumb from "@/components/ProjectThumb";
import { Icon } from "@/components/Icons";
import { useLanguage } from "@/components/LanguageContext";
import { caseStudies, sectors, servicePages } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

const L = {
  en: {
    back: "All work",
    eyebrow: "Case study",
    challenge: "The problem",
    approach: "What I built",
    outcome: "Where it stands",
    stack: "Built with",
    visit: "Visit the live site",
    ctaTitle: "Want something like this?",
    ctaBody:
      "Tell me what your business needs to do online and I'll come back within 24 hours with a clear, no-obligation quote.",
    cta: "Request a quote",
    others: "Other work",
    related: "Related",
  },
  el: {
    back: "Όλα τα έργα",
    eyebrow: "Μελέτη περίπτωσης",
    challenge: "Το πρόβλημα",
    approach: "Τι έχτισα",
    outcome: "Πού βρίσκεται",
    stack: "Χτισμένο με",
    visit: "Δες το live site",
    ctaTitle: "Θέλεις κάτι αντίστοιχο;",
    ctaBody:
      "Πες μου τι χρειάζεται να κάνει online η επιχείρησή σου και θα επανέλθω εντός 24 ωρών με ξεκάθαρη προσφορά χωρίς δέσμευση.",
    cta: "Ζήτησε προσφορά",
    others: "Άλλα έργα",
    related: "Σχετικά",
  },
};

export default function CaseStudyDetail({ slug }: { slug: string }) {
  const { lang } = useLanguage();
  const t = L[lang];

  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return null;

  const sector = sectors.find((s) => s.slug === cs.sector);
  const service = servicePages.find((s) => s.slug === cs.service);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: cs.client,
    headline: cs.title[lang],
    description: cs.summary[lang],
    inLanguage: lang,
    url: `${SITE_URL}/${lang}/work/${cs.slug}`,
    creator: { "@id": `${SITE_URL}/#organization` },
    about: { "@type": "Organization", name: cs.client, ...(cs.live ? { url: cs.live } : {}) },
    keywords: cs.stack.join(", "),
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
              href={`/${lang}/work`}
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors"
            >
              <span className="ornament">←</span>
              {t.back}
            </Link>
            <LanguageToggle />
          </header>

          <main>
            <section className="fade-up pt-2 pb-12">
              {cs.logo && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={cs.logo}
                  alt=""
                  className="client-logo client-logo-lg mb-5"
                />
              )}
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-stone mb-4">
                {t.eyebrow} · {cs.client}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-paper mb-5">
                {cs.title[lang]}
              </h1>
              <div className="deco-rule mb-6" />
              <p className="text-base text-stone-light leading-relaxed max-w-3xl mb-6">
                {cs.summary[lang]}
              </p>
              {cs.live && (
                <a
                  href={cs.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button inline-flex"
                >
                  {t.visit}
                  <span className="arrow-icon">
                    <Icon name="arrow" size={13} />
                  </span>
                </a>
              )}
            </section>

            <section className="mb-14">
              <ProjectThumb
                image={cs.image}
                imageMobile={cs.imageMobile}
                href={cs.live}
                title={cs.client}
                variant="pair"
              />
            </section>

            {cs.challenge && (
              <section className="mb-14">
                <h2 className="section-heading !static mb-5">{t.challenge}</h2>
                <p className="text-sm text-stone-light leading-relaxed max-w-3xl">
                  {cs.challenge[lang]}
                </p>
              </section>
            )}

            {cs.approach && (
              <section className="mb-14">
                <h2 className="section-heading !static mb-5">{t.approach}</h2>
                <ul className="space-y-3 max-w-3xl">
                  {cs.approach[lang].map((p, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-stone-light leading-relaxed">
                      <span className="text-gold mt-0.5 shrink-0" aria-hidden="true">›</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {cs.outcome && (
              <section className="mb-14">
                <h2 className="section-heading !static mb-5">{t.outcome}</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {cs.outcome[lang].map((o, i) => (
                    <div key={i} className="section-card flex gap-3" style={{ padding: "1rem" }}>
                      <span className="text-gold mt-0.5 shrink-0" aria-hidden="true">✦</span>
                      <span className="text-sm text-stone-light leading-snug">{o}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mb-14">
              <h2 className="section-heading !static mb-5">{t.stack}</h2>
              <ul className="flex flex-wrap gap-2">
                {cs.stack.map((s) => (
                  <li
                    key={s}
                    className="font-mono text-xs tracking-wide text-stone-light border border-stone-dark rounded-full px-3 py-1"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </section>

            {/* Ties each case study into the service that sells it and the
                sector it belongs to, so the commercial pages gain inbound
                links from real work rather than from a nav alone. */}
            <nav aria-label={t.related} className="mb-14">
              <h2 className="section-heading !static mb-5">{t.related}</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {service && (
                  <li>
                    <Link
                      href={`/${lang}/services/${service.slug}`}
                      className="section-card group flex items-center gap-3"
                    >
                      <span className="text-gold text-lg leading-none" aria-hidden="true">
                        {service.icon}
                      </span>
                      <span className="font-display font-semibold text-paper text-sm group-hover:text-gold-light transition-colors">
                        {service.seoTitle[lang]}
                      </span>
                    </Link>
                  </li>
                )}
                {sector && (
                  <li>
                    <Link
                      href={`/${lang}/sectors/${sector.slug}`}
                      className="section-card group flex items-center gap-3"
                    >
                      <span className="text-gold text-lg leading-none" aria-hidden="true">
                        {sector.icon}
                      </span>
                      <span className="font-display font-semibold text-paper text-sm group-hover:text-gold-light transition-colors">
                        {sector.title[lang]}
                      </span>
                    </Link>
                  </li>
                )}
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

          <nav aria-label={t.others} className="border-t border-stone-dark pt-10 mt-14">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-paper mb-5">
              {t.others}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {caseStudies
                .filter((c) => c.slug !== cs.slug)
                .map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/${lang}/work/${c.slug}`}
                      className="section-card group block"
                    >
                      <h3 className="font-display font-semibold text-paper text-sm mb-1.5 group-hover:text-gold-light transition-colors">
                        {c.client}
                        {c.status && (
                          <span className="status-badge ml-2 align-middle">{c.status[lang]}</span>
                        )}
                      </h3>
                      <p className="text-xs text-stone leading-relaxed">{c.title[lang]}</p>
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
