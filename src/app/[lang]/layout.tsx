import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageContext";
import { LANGS, isLang } from "@/lib/i18n";
import KeyboardAwareFocus from "@/components/KeyboardAwareFocus";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsLoader from "@/components/AnalyticsLoader";
import { person, services } from "@/lib/data";
import { SITE_URL, staticPageMetadata } from "@/lib/seo";
import { accents, accentKeys, DEFAULT_ACCENT } from "@/lib/accents";
import "../globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#organization`,
      name: person.company,
      url: SITE_URL,
      email: "info@akosds.com",
      telephone: "+30-699-535-8972",
      image: `${SITE_URL}/og/cover.jpg`,
      description:
        "Web development studio in Athens, Greece building custom websites, web apps, booking/CRM systems and AI automations, serving Greek and international/English-speaking business owners across Greece.",
      founder: { "@id": `${SITE_URL}/#person` },
      areaServed: { "@type": "Country", name: "Greece" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Athens",
        addressCountry: "GR",
      },
      knowsLanguage: ["el", "en"],
      priceRange: "€€",
      sameAs: [
        "https://github.com/m-a-v-r-o-s",
        "https://www.behance.net/akosdigital",
        "https://partnely.com/partners/theodoros-mayros-akos-digital-services",
        "https://www.instagram.com/akosdigitalservices",
      ],
      makesOffer: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title.en,
          alternateName: s.title.el,
          description: s.description.en,
        },
      })),
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: person.name.en,
      alternateName: person.name.el,
      jobTitle: "Web Developer",
      url: SITE_URL,
      email: "info@akosds.com",
      knowsLanguage: ["el", "en"],
      worksFor: { "@id": `${SITE_URL}/#organization` },
      sameAs: [
        "https://github.com/m-a-v-r-o-s",
        "https://www.behance.net/akosdigital",
        "https://partnely.com/partners/theodoros-mayros-akos-digital-services",
        "https://www.instagram.com/akosdigitalservices",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: person.company,
      inLanguage: ["el", "en"],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

/**
 * One rule per accent, generated from the array so the palette is never
 * restated by hand. :root already carries the default, so a first time
 * visitor's HTML is unchanged and no attribute is needed for gold.
 *
 * This is a server component, so the block is static in the shipped HTML.
 */
const accentCss = accents
  .filter((a) => a.key !== DEFAULT_ACCENT)
  .map((a) => `[data-accent="${a.key}"]{--accent-rgb:${a.rgb};--accent-light-rgb:${a.lightRgb}}`)
  .join("");

/**
 * Runs as the first child of <body>, before anything paints, so a visitor who
 * picked teal never sees a frame of gold. Parser blocking on purpose and kept
 * to a few lines for that reason.
 *
 * The stored value is matched against the known keys before it goes anywhere
 * near a DOM attribute: never write an arbitrary localStorage string into the
 * document. localStorage rather than a cookie, and outside the consent gate,
 * because it is a functional preference the visitor set themselves.
 *
 * The default is set as an attribute like any other even though it has no
 * rule of its own, so nothing here depends on where gold sits in the array.
 */
const accentBoot = `try{var a=localStorage.getItem("accent");if(${JSON.stringify(
  accentKeys
)}.indexOf(a)>=0)document.documentElement.dataset.accent=a}catch(e){}`;

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    metadataBase: new URL(SITE_URL),
    ...staticPageMetadata("home", lang),
    keywords:
      lang === "el"
        ? [
            "κατασκευή ιστοσελίδων",
            "κατασκευή ιστοσελίδων Αθήνα",
            "κατασκευή eshop",
            "προγραμματιστής ιστοσελίδων",
            "ιστοσελίδα για επιχείρηση",
            "κατασκευή εφαρμογών",
            "SEO Ελλάδα",
          ]
        : [
            "web developer Greece",
            "website builder Greece",
            "app developer Athens",
            "English speaking web developer Greece",
            "website for business in Greece",
            "e-shop development Greece",
          ],
    icons: { icon: "/projects/favicon.ico" },
    twitter: {
      card: "summary_large_image",
      title:
        lang === "el"
          ? "Κατασκευή Ιστοσελίδων στην Ελλάδα · Akos Digital Services"
          : "Web Developer in Greece · Akos Digital Services",
      description:
        lang === "el"
          ? "Κατασκευή ιστοσελίδων, e-shop, συστημάτων κρατήσεων και αυτοματισμών AI για επιχειρήσεις σε όλη την Ελλάδα."
          : "Custom websites, e-shops, booking systems and AI automations for businesses across Greece.",
      images: ["/og/cover.jpg"],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    // The boot script below sets data-accent on <html> before React hydrates.
    <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: accentCss }} />
      </head>
      <body
        className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: accentBoot }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <KeyboardAwareFocus />
        <LanguageProvider lang={lang}>
          {children}
          <CookieConsent />
          <AnalyticsLoader />
        </LanguageProvider>
      </body>
    </html>
  );
}
