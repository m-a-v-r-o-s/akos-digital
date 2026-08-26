import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageContext";
import KeyboardAwareFocus from "@/components/KeyboardAwareFocus";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsLoader from "@/components/AnalyticsLoader";
import { person, services } from "@/lib/data";
import "./globals.css";

const SITE_URL = "https://www.akosds.com";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Web Developer & App Builder in Greece | Κατασκευή Ιστοσελίδων – Akos Digital Services",
  description:
    "Custom websites, web apps, booking/CRM systems, e-commerce and AI automations for businesses across Greece — built and supported in Greek and English. // Κατασκευή ιστοσελίδων, εφαρμογών, συστημάτων κρατήσεων/CRM και αυτοματισμών AI για επιχειρήσεις σε όλη την Ελλάδα, στα ελληνικά και στα αγγλικά.",
  keywords: [
    "web developer Greece",
    "website builder Greece",
    "app developer Athens",
    "English speaking web developer Greece",
    "website for business in Greece",
    "κατασκευή ιστοσελίδων",
    "κατασκευαστής ιστοσελίδων Αθήνα",
    "προγραμματιστής ιστοσελίδων",
    "φτιάξιμο ιστοσελίδας",
    "ιστοσελίδα για επιχείρηση",
    "κατασκευή εφαρμογών",
  ],
  icons: {
    icon: "/projects/favicon.ico",
  },
  openGraph: {
    title: "Web Developer & App Builder in Greece | Κατασκευή Ιστοσελίδων – Akos Digital Services",
    description:
      "Custom websites, web apps, booking/CRM systems and AI automations for businesses across Greece — Greek and English spoken.",
    locale: "el_GR",
    alternateLocale: ["en_US"],
    type: "website",
    images: [{ url: "/og/cover.jpg", width: 1280, height: 720 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Developer & App Builder in Greece – Akos Digital Services",
    description:
      "Custom websites, web apps, booking/CRM systems and AI automations for businesses across Greece — Greek and English spoken.",
    images: ["/og/cover.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <KeyboardAwareFocus />
        <LanguageProvider>
          {children}
          <CookieConsent />
          <AnalyticsLoader />
        </LanguageProvider>
      </body>
    </html>
  );
}
