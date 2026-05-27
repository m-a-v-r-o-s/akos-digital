export type BL = { en: string; el: string };
export type BLA = { en: string[]; el: string[] };

export const person = {
  name: {
    en: "Theodoros I. Mavros",
    el: "Θεόδωρος Ι. Μαύρος",
  } as BL,
  company: "Akos Digital Services",
  role: {
    en: "Web Architect",
    el: "Αρχιτέκτονας Ιστού",
  } as BL,
  tagline: {
    en: "I craft bespoke digital experiences that blend precise code with personalized design.",
    el: "Δημιουργώ ψηφιακές εμπειρίες που συνδυάζουν τον κώδικα ακριβείας με τον προσωποποιημένο σχεδιασμό.",
  } as BL,
  about: {
    en: [
      "I'm a web architect building purposeful digital presences for brands across Greece. My work sits at the intersection of visual identity, technical architecture, and human-centred design.",
      "<a href='#' class='gold-link'>Akos Digital Services</a> is a solo studio. I'm the only person you'll work with, from the first conversation to launch. No account managers, no handoffs. Every project starts with a real conversation about what your brand needs to say and why.",
      "The modern tech world moves fast and scales wide, but it rarely stops to listen. I do. Understanding a client's vision on a personal level, the way another person can, not a process, this is what every project I build is founded on.",
    ],
    el: [
      "Είμαι αρχιτέκτονας ιστού που δημιουργεί στοχευμένες ψηφιακές παρουσίες για επιχειρήσεις αλλά και όχι μόνο, στην Ελλάδα. Η δουλειά μου βρίσκεται επάνω τομή της οπτικής ταυτότητας και της τεχνικής αρχιτεκτονικής με τον ανθρωποκεντρικό σχεδιασμό.",
      "Η <a href='#' class='gold-link'>Akos Digital Services</a> είναι στούντιο ενός ατόμου. Είμαι ο μόνος με τον οποίο θα συνεργαστείς, από την πρώτη κουβέντα ως την παράδοση. Χωρίς μεσάζοντες. Κάθε έργο ξεκινά με μια πραγματική συζήτηση για το τι χρειάζεται να πει η επωνυμία σου και γιατί.",
      "Ο σύγχρονος τεχνολογικός κόσμος κινείται γρήγορα, αλλά σπάνια σταματά να ακούσει. Εγώ το κάνω. Η κατανόηση του οράματος ενός πελάτη σε προσωπικό επίπεδο, με τον τρόπο που μπορεί ένας άνθρωπος, όχι μια διαδικασία, αυτό είναι το θεμέλιο κάθε έργου που φτιάχνω.",
    ],
  } as BLA,
  socials: [
    { label: "GitHub", href: "https://github.com/m-a-v-r-o-s", icon: "github" },
    { label: "Behance", href: "https://www.behance.net/akosdigital", icon: "behance" },
    { label: "Phone", href: "tel:+306995358972", icon: "phone" },
    { label: "Telegram", href: "https://t.me/+306995358972", icon: "telegram" },
    { label: "WhatsApp", href: "https://wa.me/306995358972", icon: "whatsapp" },
    { label: "Email", href: "mailto:digitalaakos@gmail.com", icon: "email" },
  ],
};

export const education = [
  {
    period: "July 2023",
    degree: {
      en: "Piscine",
      el: "Piscine",
    } as BL,
    institution: {
      en: "42 Heilbronn",
      el: "42 Heilbronn",
    } as BL,
    institutionUrl: "https://www.42heilbronn.de/en/",
    description: {
      en: "Attended the full month-long Piscine at 42 Heilbronn, an intensive peer-to-peer coding immersion.",
      el: "Συμμετοχή στο πλήρες μηνιαίο Piscine της 42 Heilbronn, μία εντατική peer-to-peer εμβύθιση στον προγραμματισμό.",
    } as BL,
    tags: ["C++", "Python", "Shell", "Algorithms", "Peer Learning", "Logic", "AI"],
  },
  {
    period: "2018 - 2023",
    degree: {
      en: "Informatics & Telematics",
      el: "Πληροφορική και Τηλεματική",
    } as BL,
    institution: {
      en: "Harokopio University of Athens",
      el: "Χαροκόπειο Πανεπιστήμιο Αθηνών",
    } as BL,
    institutionUrl: "https://www.hua.gr/",
    description: {
      en: "Studied at the Department of Informatics and Telematics.",
      el: "Φοίτηση στο Τμήμα Πληροφορικής και Τηλεματικής.",
    } as BL,
    tags: ["Informatics", "Telematics", "Networks", "Programming", "Mathematics", "AI"],
  },
];

export const projects = [
  {
    title: "Ellie Tattooer",
    description: {
      en: "Portfolio and merch shop for Ellie Tattooer, resident at Ritual Tattoo Athens. Highly stylized to match her vision and brand identity.",
      el: "Portfolio και merch shop για την Ellie Tattooer, από το Ritual Tattoo Athens. Στιλιζαρισμένο για να ταιριάζει με το όραμά της και την ταυτότητα της.",
    } as BL,
    tags: ["Next.js", "TypeScript", "Tailwind", "HTML", "E-commerce"],
    image: "/projects/ellietattooer.png",
    links: [{ label: "Live Site", href: "https://ellietattooer.com/" }],
    year: "2026",
  },
  {
    title: "Blessed Coffee & Spirits",
    description: {
      en: "Web presence for Blessed Coffee & Spirits, an establishment merging specialty coffee, craft cocktails with a neighborly spirit.",
      el: "Web παρουσία για το Blessed Coffee & Spirits, ένα κατάστημα που συνδυάζει specialty καφέ, craft cocktails με μια γειτονική ατμόσφαιρα.",
    } as BL,
    tags: ["React", "JavaScript", "Tailwind", "HTML", "Brand Identity"],
    image: "/projects/blessed.png",
    links: [{ label: "Live Site", href: "https://blessed.cafe/" }],
    year: "2026",
  },
];

export const services = [
  {
    icon: "✦",
    title: {
      en: "Web Architecture & Development",
      el: "Αρχιτεκτονική & Ανάπτυξη Web",
    } as BL,
    description: {
      en: "Custom-built platforms using modern stacks, Next.js, TypeScript, headless CMS, engineered for performance, scalability, and longevity.",
      el: "Custom πλατφόρμες με σύγχρονα stacks, Next.js, TypeScript, headless CMS, σχεδιασμένες για απόδοση, κλιμακωσιμότητα και μακροβιότητα.",
    } as BL,
  },
  {
    icon: "◈",
    title: {
      en: "Booking & CRM Systems",
      el: "Συστήματα Κρατήσεων & CRM",
    } as BL,
    description: {
      en: "Custom booking flows, reservation systems, and CRM integrations built around how your business actually operates, not the other way around.",
      el: "Προσαρμοσμένες ροές κρατήσεων, συστήματα ραντεβού και ενσωματώσεις CRM, σχεδιασμένα γύρω από τον τρόπο που λειτουργεί η επιχείρησή σου, όχι το αντίστροφο.",
    } as BL,
  },
  {
    icon: "⬡",
    title: {
      en: "Brand & UI Design",
      el: "Σχεδιασμός Brand & UI",
    } as BL,
    description: {
      en: "Visual identity, design systems, and interface design that holds up to scrutiny, delivered with meticulous specifications.",
      el: "Οπτική ταυτότητα, design systems και interface design που αντέχουν τον έλεγχο, παραδομένα με ακριβείς προδιαγραφές.",
    } as BL,
  },
  {
    icon: "◉",
    title: {
      en: "E-commerce Solutions",
      el: "Λύσεις E-commerce",
    } as BL,
    description: {
      en: "Headless storefronts, custom configurators, and shipping cost estimation built into platforms that convert browsers into buyers and buyers into advocates.",
      el: "Headless storefronts, custom configurators και ενσωματωμένη εκτίμηση κόστους αποστολής, σε πλατφόρμες που μετατρέπουν επισκέπτες σε αγοραστές και αγοραστές σε υποστηρικτές.",
    } as BL,
  },
];
