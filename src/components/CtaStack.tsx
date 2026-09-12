"use client";

/*
 * The three sidebar CTAs — Request a Quote, 7μερο, ΕΣΠΑ — as one set.
 *
 * They used to be written out twice (desktop aside in page.tsx, mobile
 * header in MobileScrollSections.tsx) and had already drifted: ΕΣΠΑ was
 * w-36 on one and w-28 on the other. One component, two layouts.
 *
 * Shape rules, which the CSS in globals.css (.cta-set*) enforces:
 *   - all three share a width, always
 *   - the quote and 7μερο pills share a height
 *   - stacked (desktop), ΕΣΠΑ is the tall one: its badge is a 1.6:1 block
 *     and has to be reproduced as-is, so it cannot be a pill
 *   - in a row (mobile), all three stretch to one height instead, because
 *     a short third column beside two tall ones reads as a mistake
 */

import Link from "next/link";
import LiquidGlass from "@/components/LiquidGlass";
import { Icon } from "@/components/Icons";
import { useLanguage } from "@/components/LanguageContext";
import { SEVENMERO_URL } from "@/lib/links";

const copy = {
  en: {
    quote: "Request a Quote",
    sevenmeroPrice: "€399 website",
    sevenmeroPriceShort: "€399",
    sevenmeroLabel:
      "7μερο.com, €399 websites for small businesses, live in 7 days (opens in a new tab)",
    espaLabel: "ΕΣΠΑ 2021-2027 funding — how we can help you apply",
  },
  el: {
    quote: "Ζητήστε Προσφορά",
    sevenmeroPrice: "Ιστοσελίδα 399€",
    sevenmeroPriceShort: "399€",
    sevenmeroLabel:
      "7μερο.com, ιστοσελίδες 399€ για μικρές επιχειρήσεις, έτοιμες σε 7 μέρες (ανοίγει σε νέα καρτέλα)",
    espaLabel: "ΕΣΠΑ 2021-2027 — χρηματοδότηση και πώς μπορούμε να βοηθήσουμε",
  },
};

/*
 * The 7μερο lockup, inline rather than the <img src="/7mero.svg"> this
 * replaces. public/7mero.svg's own header notes that through <img> the
 * page's webfonts never apply and the wordmark falls back to a system
 * grotesque; inline, it renders in the site's own body font and the mark
 * can be sized independently of the wordmark, which is what lets the pill
 * hold a price line next to it. Colours are the sister site's documented
 * dark-ground rule: orange fill, near-black ink on top.
 */
function SevenmeroMark() {
  return (
    <span className="sevenmero-lockup" aria-hidden="true">
      <svg viewBox="0 0 56 56" className="sevenmero-tile" role="presentation" focusable="false">
        <rect width="56" height="56" rx="12" fill="#E8590C" />
        <path d="M16,13 H42 V19 L30,46 H21 L33,19 H16 Z" fill="#0d0d0d" />
        <rect y="27.4" width="56" height="1.4" fill="#000" opacity="0.25" />
      </svg>
      {/* The tile is the 7 — the wordmark picks up at "μερο", exactly as
          public/7mero.svg does. Spelling it again here reads "7 7μερο". */}
      <span className="sevenmero-word">
        μερο<span className="sevenmero-tld">.com</span>
      </span>
    </span>
  );
}

export default function CtaStack({ layout }: { layout: "stack" | "row" }) {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <div className={`cta-set ${layout === "row" ? "cta-set-row" : "cta-set-stack"}`}>
      {/* Primary. Accent-tinted glass rather than the solid accent fill of
          .cta-button elsewhere: a solid fill is opaque, so it hides the very
          blur and rim that makes the other two read as glass. The label stays
          --paper, which clears AA against the tint over ink by a wide margin
          (~9:1), so going translucent costs no contrast. */}
      <LiquidGlass
        elasticity={0.12}
        padding="0"
        cornerRadius={17}
        className="cta-glass cta-glass-primary"
      >
        <Link href={`/${lang}/request`} className="cta-face cta-face-primary">
          <span className="cta-face-label">{t.quote}</span>
          <span className="arrow-icon cta-face-arrow">
            <Icon name="arrow" size={13} />
          </span>
        </Link>
      </LiquidGlass>

      {/* The fixed-price route, for a small business that would otherwise
          stall on a custom quote. The price is the whole point of the link,
          so it sits on the face, not only in the accessible name. */}
      <LiquidGlass padding="0" cornerRadius={17} elasticity={0} className="cta-glass">
        <a
          href={SEVENMERO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.sevenmeroLabel}
          className="cta-face cta-face-sevenmero"
        >
          <SevenmeroMark />
          {/* Three columns on a phone cannot hold "Ιστοσελίδα 399€"; the
              number is the part that has to survive the cut. */}
          <span className="cta-price">
            {layout === "row" ? t.sevenmeroPriceShort : t.sevenmeroPrice}
          </span>
        </a>
      </LiquidGlass>

      {/* Co-funding badge. The artwork is reproduced unaltered — it is a
          compliance mark, not a logo to restyle — so the glass is the frame
          around it and the white plate keeps its own edge off the rim. */}
      <LiquidGlass padding="0" cornerRadius={17} elasticity={0} className="cta-glass">
        <Link href={`/${lang}/espa`} aria-label={t.espaLabel} className="cta-face cta-face-espa">
          <span className="espa-plate">
            <img
              src="/espa-2021-2027.webp"
              alt="ΕΣΠΑ 2021-2027"
              loading="lazy"
              decoding="async"
              width={977}
              height={591}
            />
          </span>
        </Link>
      </LiquidGlass>
    </div>
  );
}
