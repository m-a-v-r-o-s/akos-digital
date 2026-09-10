"use client";

import Image from "next/image";
import Link from "next/link";
import SpotlightWrapper from "@/components/SpotlightWrapper";
import LanguageToggle from "@/components/LanguageToggle";
import { Icon } from "@/components/Icons";
import { useLanguage } from "@/components/LanguageContext";
import { caseStudies, sectors, servicePages } from "@/lib/data";
import { international } from "@/lib/international";
import { SITE_URL } from "@/lib/seo";

/**
 * The International Rentals build gets its own page rather than the shared
 * case study layout. Every other entry ends in a link you can open, which is
 * what carries the proof; this one is an internal tool behind a login, so the
 * page has to do that work itself.
 */

const L = {
  en: {
    back: "All work",
    eyebrow: "Case study",
    noLinkTitle: "Why there is no link",
    factsTitle: "The shape of it",
    timeline: "Where it stands",
    stack: "Built with",
    related: "Related",
    ctaTitle: "Building something this size?",
    ctaBody:
      "Tell me what your business needs to run on and I'll come back within 24 hours with a clear, no-obligation quote.",
    cta: "Request a quote",
    others: "Other work",
    shipped: "Built",
    ahead: "Ahead",
    fullSize: "Open full size",
  },
  el: {
    back: "Όλα τα έργα",
    eyebrow: "Μελέτη περίπτωσης",
    noLinkTitle: "Γιατί δεν υπάρχει σύνδεσμος",
    factsTitle: "Το μέγεθος του έργου",
    timeline: "Πού βρίσκεται",
    stack: "Χτισμένο με",
    related: "Σχετικά",
    ctaTitle: "Χτίζεις κάτι αυτού του μεγέθους;",
    ctaBody:
      "Πες μου πάνω σε τι χρειάζεται να τρέχει η επιχείρησή σου και θα επανέλθω εντός 24 ωρών με ξεκάθαρη προσφορά χωρίς δέσμευση.",
    cta: "Ζήτησε προσφορά",
    others: "Άλλα έργα",
    shipped: "Έγινε",
    ahead: "Μπροστά",
    fullSize: "Άνοιγμα σε πλήρες μέγεθος",
  },
};

export default function InternationalDetail() {
  const { lang } = useLanguage();
  const t = L[lang];
  const p = international;
  const cs = caseStudies.find((c) => c.slug === p.slug);

  const sector = sectors.find((s) => s.slug === "rentacar");
  const service = servicePages.find((s) => s.slug === "booking-systems");

  if (!cs) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: cs.client,
    headline: cs.title[lang],
    description: cs.summary[lang],
    inLanguage: lang,
    url: `${SITE_URL}/${lang}/work/${p.slug}`,
    creator: { "@id": `${SITE_URL}/#organization` },
    about: { "@type": "Organization", name: cs.client },
    creativeWorkStatus: cs.status?.en,
    keywords: p.stack.flatMap((g) => g.items).join(", "),
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
            {/* ── Hero ── */}
            <section className="fade-up pt-2 pb-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-stone-light">
                  {t.eyebrow} · {cs.client}
                </p>
                {cs.status && <span className="status-badge">{cs.status[lang]}</span>}
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-paper mb-5">
                {cs.title[lang]}
              </h1>
              <div className="deco-rule mb-6" />
              <p className="text-base text-stone-light leading-relaxed max-w-3xl">
                {cs.summary[lang]}
              </p>
            </section>

            {/* ── The one thing this page has to explain up front ── */}
            <section className="fade-up fade-up-delay-1 mb-14">
              <div className="section-card">
                <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-gold mb-3">
                  {t.noLinkTitle}
                </h2>
                <p className="text-sm text-stone-light leading-relaxed max-w-3xl">
                  {p.noLink[lang]}
                </p>
              </div>
            </section>

            {/* ── Facts ── */}
            <section className="mb-16" aria-label={t.factsTitle}>
              <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
                {p.facts.map((f) => (
                  <li key={f.n.en} className="border-l-2 border-gold/50 pl-4">
                    <p className="font-display text-3xl sm:text-4xl font-bold text-paper leading-none mb-2 tabular-nums">
                      {f.n[lang]}
                    </p>
                    <p className="text-xs text-stone-light leading-relaxed">{f.k[lang]}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* ── Chapters ── */}
            {p.chapters.map((c) => (
              <section key={c.eyebrow.en} className="mb-16">
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-gold mb-3">
                  {c.eyebrow[lang]}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-paper leading-snug mb-5 max-w-3xl">
                  {c.title[lang]}
                </h2>
                <div className="space-y-4 max-w-3xl">
                  {c.body[lang].map((para, i) => (
                    <p key={i} className="text-sm text-stone-light leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                {c.code && (
                  <figure className="mt-7 max-w-3xl">
                    <figcaption className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-stone-light mb-2">
                      {c.code.label[lang]}
                    </figcaption>
                    <pre className="code-block">
                      <code>{c.code.lines.join("\n")}</code>
                    </pre>
                  </figure>
                )}

                {c.image && c.alt && c.caption && (
                  <figure className="mt-8">
                    <a
                      href={c.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${c.alt[lang]}, ${t.fullSize}`}
                      className="board-frame block group"
                    >
                      <Image
                        src={c.image}
                        alt={c.alt[lang]}
                        width={1600}
                        height={900}
                        sizes="(max-width: 1024px) 100vw, 1024px"
                        className="w-full h-auto block transition-opacity group-hover:opacity-90"
                      />
                    </a>
                    <figcaption className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs text-stone-light leading-relaxed mt-3">
                      <span className="flex-1 min-w-[16rem]">{c.caption[lang]}</span>
                      <a
                        href={c.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[0.65rem] uppercase tracking-widest text-gold hover:text-gold-light transition-colors shrink-0"
                      >
                        {t.fullSize}
                        <span className="arrow-icon">
                          <Icon name="arrow" size={10} />
                        </span>
                      </a>
                    </figcaption>
                  </figure>
                )}
              </section>
            ))}

            {/* ── Timeline ── */}
            <section className="mb-16">
              <h2 className="section-heading !static mb-6">{t.timeline}</h2>
              <ol className="space-y-0">
                {p.timeline.map((step, i) => (
                  <li key={step.when.en} className="flex gap-4">
                    <div className="flex flex-col items-center shrink-0">
                      <span
                        className={`mt-1.5 w-3 h-3 rounded-full border ${
                          step.done
                            ? "bg-gold border-gold"
                            : "bg-transparent border-stone-dark"
                        }`}
                        aria-hidden="true"
                      />
                      {i < p.timeline.length - 1 && (
                        <span className="w-px flex-1 bg-stone-dark my-1.5" aria-hidden="true" />
                      )}
                    </div>
                    <div className="pb-7 max-w-3xl">
                      <p className="font-mono text-xs tracking-[0.18em] uppercase text-paper mb-1.5">
                        {step.when[lang]}
                        <span className="ml-2 text-stone-light normal-case tracking-normal">
                          {step.done ? t.shipped : t.ahead}
                        </span>
                      </p>
                      <p className="text-sm text-stone-light leading-relaxed">
                        {step.what[lang]}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* ── Stack ── */}
            <section className="mb-14">
              <h2 className="section-heading !static mb-6">{t.stack}</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {p.stack.map((g) => (
                  <div key={g.group.en}>
                    <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-stone-light mb-3">
                      {g.group[lang]}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {g.items.map((s) => (
                        <li
                          key={s}
                          className="font-mono text-xs tracking-wide text-stone-light border border-stone-dark rounded-full px-3 py-1"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Ties the build into the service that sells it and the sector it
                belongs to, the same way every other case study does. */}
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
              <p className="text-sm text-stone-light leading-relaxed mb-6 max-w-xl">{t.ctaBody}</p>
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
                .filter((c) => c.slug !== p.slug)
                .map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${lang}/work/${c.slug}`} className="section-card group block">
                      <h3 className="font-display font-semibold text-paper text-sm mb-1.5 group-hover:text-gold-light transition-colors">
                        {c.client}
                      </h3>
                      <p className="text-xs text-stone-light leading-relaxed">{c.title[lang]}</p>
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
