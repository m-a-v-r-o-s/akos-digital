import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n";
import type { BL } from "@/lib/data";

export const SITE_URL = "https://www.akosds.com";

const OG_IMAGE = { url: "/og/cover.jpg", width: 1280, height: 720 };

const SUFFIX = " · Akos Digital Services";

/**
 * Self-referencing canonical for this locale plus the full hreflang set, so
 * /el and /en declare each other as alternates instead of competing for the
 * same query. x-default points at Greek: Greece is the primary market.
 */
export function alternates(lang: Lang, path = ""): Metadata["alternates"] {
  return {
    canonical: `${SITE_URL}/${lang}${path}`,
    languages: {
      el: `${SITE_URL}/el${path}`,
      en: `${SITE_URL}/en${path}`,
      "x-default": `${SITE_URL}/el${path}`,
    },
  };
}

/**
 * Titles are kept short and single-language, with the page's own name first
 * and the studio name as a suffix. Google lifts a sitelink label from the
 * leading part of the title, so a long "English | Greek" pair left it with
 * nothing short enough to use.
 */
export function buildMetadata({
  lang,
  path,
  name,
  description,
  ogTitle,
}: {
  lang: Lang;
  path: string;
  name: BL;
  description: BL;
  ogTitle?: BL;
}): Metadata {
  const title = name[lang] + SUFFIX;
  return {
    title,
    description: description[lang],
    alternates: alternates(lang, path),
    openGraph: {
      title: (ogTitle ?? name)[lang] + SUFFIX,
      description: description[lang],
      url: `${SITE_URL}/${lang}${path}`,
      locale: lang === "el" ? "el_GR" : "en_US",
      alternateLocale: lang === "el" ? ["en_US"] : ["el_GR"],
      type: "website",
      images: [OG_IMAGE],
    },
  };
}

/** Copy for the routes that are not generated from a data collection. */
export const pageSeo: Record<
  string,
  { path: string; name: BL; description: BL }
> = {
  home: {
    path: "",
    name: {
      el: "Κατασκευή Ιστοσελίδων στην Ελλάδα",
      en: "Web Developer in Greece",
    },
    description: {
      el: "Κατασκευή ιστοσελίδων, e-shop, συστημάτων κρατήσεων και αυτοματισμών AI για επιχειρήσεις σε όλη την Ελλάδα. Μονομελές στούντιο, συνεργάζεσαι απευθείας μαζί μου.",
      en: "Custom websites, e-shops, booking and CRM systems and AI automations for businesses across Greece. A solo studio: you work directly with the developer.",
    },
  },
  services: {
    path: "/services",
    name: { el: "Υπηρεσίες", en: "Services" },
    description: {
      el: "Κατασκευή ιστοσελίδων, e-shop, SEO, συστήματα κρατήσεων και αυτοματισμοί AI για επιχειρήσεις στην Ελλάδα, από ένα μονομελές στούντιο στην Αθήνα.",
      en: "Website and e-shop development, SEO, booking systems and AI automations for businesses in Greece, from a solo studio in Athens.",
    },
  },
  work: {
    path: "/work",
    name: { el: "Έργα", en: "Work" },
    description: {
      el: "Έργα πελατών που έχτισα και υποστηρίζω: καφετέρια στην Αθήνα, καλλιτέχνις τατουάζ, συγκρότημα από την Κω, και πλατφόρμα διαχείρισης στόλου για εταιρεία rent-a-car.",
      en: "Client work I built and support: a cafe in Athens, a tattoo artist and a band from Kos, and a fleet operations platform for a rent-a-car company.",
    },
  },
  request: {
    path: "/request",
    name: { el: "Ζητήστε Προσφορά", en: "Request a Quote" },
    description: {
      el: "Πες μου για το έργο σου σε λίγες γρήγορες ερωτήσεις και πάρε ξεκάθαρη προσφορά χωρίς δέσμευση εντός 24 ωρών.",
      en: "Tell me about your project in a few quick questions and get a clear, no-obligation quote within 24 hours.",
    },
  },
  espa: {
    path: "/espa",
    name: { el: "Ιστοσελίδα μέσω ΕΣΠΑ", en: "ESPA-Funded Websites" },
    description: {
      el: "Κατασκευή ή αναβάθμιση της ιστοσελίδας της επιχείρησής σου με χρηματοδότηση ΕΣΠΑ, με δωρεάν έλεγχο επιλεξιμότητας χωρίς δέσμευση.",
      en: "Build or upgrade your business website with ESPA and EU funding in Greece, starting with a free, no-obligation eligibility check.",
    },
  },
  privacy: {
    path: "/privacy",
    name: { el: "Πολιτική Απορρήτου", en: "Privacy Policy" },
    description: {
      el: "Πώς συλλέγονται, χρησιμοποιούνται και προστατεύονται τα προσωπικά δεδομένα στο akosds.com, σύμφωνα με τον GDPR.",
      en: "How personal data is collected, used and protected on akosds.com, in line with the GDPR.",
    },
  },
  terms: {
    path: "/terms",
    name: { el: "Όροι Χρήσης", en: "Terms of Service" },
    description: {
      el: "Οι όροι που διέπουν τη χρήση του akosds.com και τη συνεργασία με την Akos Digital Services.",
      en: "The terms governing use of akosds.com and engagements with Akos Digital Services.",
    },
  },
};

export function staticPageMetadata(key: keyof typeof pageSeo, lang: Lang): Metadata {
  const p = pageSeo[key];
  return buildMetadata({ lang, path: p.path, name: p.name, description: p.description });
}
