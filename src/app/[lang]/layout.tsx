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
    <html lang={lang} className="scroll-smooth">
      <body
        className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
      >
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
