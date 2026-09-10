export type BL = { en: string; el: string };
export type BLA = { en: string[]; el: string[] };

export const person = {
  name: {
    en: "Theodoros I. Mavros",
    el: "Θεόδωρος Ι. Μαύρος",
  } as BL,
  company: "Akos Digital Services",
  role: {
    en: "Web Developer",
    el: "Web Developer",
  } as BL,
  tagline: {
    en: "I craft bespoke digital experiences that blend precise code with personalized design.",
    el: "Δημιουργώ ψηφιακές εμπειρίες που συνδυάζουν τον κώδικα ακριβείας με τον προσωποποιημένο σχεδιασμό.",
  } as BL,
  about: {
    en: [
      "I build purposeful digital presences for brands and other entities across Greece. My work sits at the intersection of visual identity, accurate architecture, and human-centered design.",
      "<a href='#' class='gold-link'>Akos Digital Services</a> is a solo studio. I'm the only person you'll work with, from the first conversation to launch. No account managers, no handoffs. Every project starts with a real conversation about what your brand needs to say and why.",
    ],
    el: [
      "Δημιουργώ στοχευμένες ψηφιακές παρουσίες για επιχειρήσεις και όχι μόνο στην Ελλάδα. Η δουλειά μου βρίσκεται επάνω στην τομή της οπτικής ταυτότητας και της άρτιας αρχιτεκτονικής με τον ανθρωποκεντρικό σχεδιασμό.",
      "Η <a href='#' class='gold-link'>Akos Digital Services</a> είναι μονομελές στούντιο. Είμαι ο μόνος με τον οποίο θα συνεργαστείς, από την πρώτη κουβέντα ως την παράδοση. Χωρίς μεσάζοντες. Κάθε έργο ξεκινά με μια πραγματική συζήτηση για το τι χρειάζεται να πει η επωνυμία σου και γιατί.",
    ],
  } as BLA,
  socials: [
    { label: "GitHub", href: "https://github.com/m-a-v-r-o-s", icon: "github" },
    { label: "Behance", href: "https://www.behance.net/akosdigital", icon: "behance" },
    { label: "Instagram", href: "https://www.instagram.com/akosdigitalservices", icon: "instagram" },
    { label: "Phone", href: "tel:+306995358972", icon: "phone" },
    { label: "Telegram", href: "https://t.me/+306995358972", icon: "telegram" },
    { label: "WhatsApp", href: "https://wa.me/306995358972", icon: "whatsapp" },
    { label: "Email", href: "mailto:info@akosds.com", icon: "email" },
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
      el: "Συμμετοχή στο πλήρες μηνιαίο Piscine της 42 Heilbronn, μία εντατική peer-to-peer εμβάθυνση στον προγραμματισμό.",
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

/**
 * A link on a project card. An href starting with "/" is a route on this site
 * and is prefixed with the locale at render time; anything else is external
 * and opens in a new tab. That is how a project with no public URL, such as an
 * internal tool, still has somewhere for the card to lead.
 */
export type ProjectLink = { label: string; href: string };

export type Project = {
  title: string;
  description: BL;
  tags: string[];
  image: string;
  imageMobile: string;
  sector: string;
  /** Nested under the project above it, for companion apps. */
  sub?: boolean;
  /** Set only while a project is unfinished, and shown as a badge. */
  status?: BL;
  links: ProjectLink[];
  year: string;
};

export const projects: Project[] = [
  {
    title: "International Rentals",
    description: {
      en: "Fleet operations platform for a Greek rent-a-car company running ~100 cars through reps stationed at hotel desks. One bilingual app for two very different users: the rep on a phone at a hotel, and the manager on a desktop. Availability and pricing are computed server-side only, and double-booking is refused by the database itself.",
      el: "Πλατφόρμα διαχείρισης στόλου για ελληνική εταιρεία rent-a-car με ~100 αυτοκίνητα και αντιπροσώπους σε ξενοδοχεία. Μία δίγλωσση εφαρμογή για δύο πολύ διαφορετικούς χρήστες: τον αντιπρόσωπο στο κινητό και τον ιδιοκτήτη σε desktop. Η διαθεσιμότητα και η τιμολόγηση υπολογίζονται αποκλειστικά server-side, και η διπλή κράτηση απορρίπτεται από την ίδια τη βάση.",
    } as BL,
    tags: ["Next.js", "TypeScript", "Postgres RLS", "Android TWA", "Bilingual"],
    image: "/projects/international.webp",
    imageMobile: "/projects/international-mobile.webp",
    sector: "rentacar",
    status: { en: "In development", el: "Σε εξέλιξη" } as BL,
    links: [{ label: "Case study", href: "/work/international-rentals" }],
    year: "",
  },
  {
    title: "SKIÁ Athens",
    description: {
      en: "Website for an Athenian atelier producing handcrafted clothing in small runs. Hand-built in HTML, CSS and JavaScript, with an intricate editorial interface, heavy typography and motion worked around light and shadow: a lookbook, a collection index, and a private enquiry flow for acquisitions and fittings.",
      el: "Ιστοσελίδα για αθηναϊκό atelier που παράγει χειροποίητα ρούχα σε μικρές σειρές. Χτισμένη εξ ολοκλήρου σε HTML, CSS και JavaScript, με σύνθετο editorial interface, βαριά τυπογραφία και κίνηση δουλεμένη γύρω από το φως και τη σκιά: lookbook, ευρετήριο συλλογής και ιδιωτική ροή αιτημάτων για αποκτήσεις και πρόβες.",
    } as BL,
    tags: ["HTML", "CSS", "JavaScript", "Interactive Animations", "Brand Identity"],
    image: "/projects/skia.webp",
    imageMobile: "/projects/skia-mobile.webp",
    sector: "fashion",
    links: [{ label: "Live Site", href: "https://skia.up.railway.app/" }],
    year: "",
  },
  {
    title: "Stefanidis Automotive Concept",
    description: {
      en: "Concept site for a Greek car import and dealership business. A showroom of imported vehicles with full specs and pricing, a request flow for sourcing a car to order, and an AI assistant that answers questions on customs, registration and Greek plates.",
      el: "Concept site για ελληνική επιχείρηση εισαγωγής και εμπορίας αυτοκινήτων. Έκθεση εισαγμένων οχημάτων με πλήρη χαρακτηριστικά και τιμές, ροή αιτήματος για εισαγωγή κατά παραγγελία και AI βοηθός που απαντά σε ερωτήσεις για εκτελωνισμό, ταξινόμηση και ελληνική πινακίδα.",
    } as BL,
    tags: ["Next.js", "TypeScript", "Tailwind", "AI Assistant", "Automotive"],
    image: "/projects/stefanidis.webp",
    imageMobile: "/projects/stefanidis-mobile.webp",
    sector: "automotive",
    links: [{ label: "Live Demo", href: "https://stefanidis.up.railway.app/" }],
    year: "",
  },
  {
    title: "Nocturne Club Concept",
    description: {
      en: "Concept site for a private late-night club on Ios. Age-gated entry, the full summer line-up, table reservations with deposits and a guest list, wrapped in a dark, high-contrast identity built around the floor.",
      el: "Concept site για ιδιωτικό νυχτερινό club στην Ίο. Έλεγχος ηλικίας στην είσοδο, πλήρες καλοκαιρινό line-up, κρατήσεις τραπεζιών με προκαταβολή και guest list, μέσα σε μια σκοτεινή ταυτότητα υψηλής αντίθεσης χτισμένη γύρω από την πίστα.",
    } as BL,
    tags: ["Next.js", "TypeScript", "Tailwind", "3D Object", "Reservations", "Nightlife"],
    image: "/projects/nocturne.webp",
    imageMobile: "/projects/nocturne-mobile.webp",
    sector: "food",
    links: [{ label: "Live Demo", href: "https://nocturnal.up.railway.app/" }],
    year: "",
  },
  {
    title: "Thalatta Bay Concept",
    description: {
      en: "Concept site for a five-star seafront resort and spa in Elounda, Crete. Minimalist luxury with immersive Aegean photography, five dining venues, a sea-water spa, and booking woven throughout the experience.",
      el: "Concept site για πολυτελές θέρετρο και spa πέντε αστέρων στην Ελούντα της Κρήτης. Μινιμαλιστική πολυτέλεια με εμβυθιστική αιγαιοπελαγίτικη φωτογραφία, πέντε χώρους εστίασης, spa θαλασσοθεραπείας και κρατήσεις ενσωματωμένες στην εμπειρία.",
    } as BL,
    tags: ["Next.js", "TypeScript", "Tailwind", "Booking", "Hospitality"],
    image: "/projects/thalatta.webp",
    imageMobile: "/projects/thalatta-mobile.webp",
    sector: "hotels",
    links: [{ label: "Live Demo", href: "https://thalatta-production.up.railway.app/en" }],
    year: "",
  },
  {
    title: "Nisos Rentals Concept",
    description: {
      en: "Concept booking platform for a Kos-based rental service offering cars, ATVs, buggies and scooters. Real-time availability by dates and pickup point, transparent all-inclusive pricing, and quick online booking with hotel and port delivery.",
      el: "Concept πλατφόρμα κρατήσεων για υπηρεσία ενοικιάσεων στην Κω, με αυτοκίνητα, ATV, buggies και scooters. Διαθεσιμότητα σε πραγματικό χρόνο ανά ημερομηνία και σημείο παραλαβής, διαφανής τιμολόγηση και γρήγορη online κράτηση με παράδοση σε ξενοδοχείο και λιμάνι.",
    } as BL,
    tags: ["Next.js", "TypeScript", "Tailwind", "Booking", "Fleet"],
    image: "/projects/nisos-web.webp",
    imageMobile: "/projects/nisos-web-mobile.webp",
    sector: "rentacar",
    links: [{ label: "Live Demo", href: "https://rentalsweb-production.up.railway.app/" }],
    year: "",
  },
  {
    title: "Nisos Rentals Admin Concept",
    description: {
      en: "Companion admin dashboard and CRM for the Nisos Rentals platform. Manage the fleet, bookings, availability and customers from a single operational panel.",
      el: "Συνοδευτικό admin dashboard και CRM για την πλατφόρμα Nisos Rentals. Διαχείριση στόλου, κρατήσεων, διαθεσιμότητας και πελατών από ένα ενιαίο λειτουργικό πάνελ.",
    } as BL,
    tags: ["Next.js", "TypeScript", "Dashboard", "CRM"],
    image: "/projects/nisos-admin.webp",
    imageMobile: "/projects/nisos-admin-mobile.webp",
    sector: "rentacar",
    sub: true,
    links: [{ label: "Live Demo", href: "https://rentalsadmin-production.up.railway.app/" }],
    year: "",
  },
  {
    title: "Kyma Villa Concept",
    description: {
      en: "Concept site for a private seafront villa in Paros. Clean, coastal aesthetic with booking integration and immersive photography.",
      el: "Concept site για ιδιωτική παραθαλάσσια βίλα στην Πάρο. Καθαρή, παράκτια αισθητική με ενσωμάτωση κρατήσεων και εμβυθιστική φωτογραφία.",
    } as BL,
    tags: ["Next.js", "TypeScript", "Tailwind", "HTML", "Booking"],
    image: "/projects/kyma.webp",
    imageMobile: "/projects/kyma-mobile.webp",
    sector: "hotels",
    links: [{ label: "Live Demo", href: "https://kyma-production-dd16.up.railway.app/" }],
    year: "",
  },
  {
    title: "Levká Dental Concept",
    description: {
      en: "Concept site for a modern dental clinic. Professional and approachable design with online appointment booking and a focus on patient trust.",
      el: "Concept site για σύγχρονη οδοντιατρική κλινική. Επαγγελματικός και προσιτός σχεδιασμός με online ραντεβού και έμφαση στην εμπιστοσύνη του ασθενή.",
    } as BL,
    tags: ["Next.js", "TypeScript", "Tailwind", "HTML", "Booking"],
    image: "/projects/levka.webp",
    imageMobile: "/projects/levka-mobile.webp",
    sector: "health",
    links: [{ label: "Live Demo", href: "https://levka-production.up.railway.app/" }],
    year: "",
  },
  {
    title: "Those Rambling Fools Band",
    description: {
      en: "Web app featuring a working vinyl record player, highly interactive and stylized to the bands aesthetic and vision.",
      el: "Web app με λειτουργικό πικάπ βινυλίου, εξαιρετικά διαδραστικό και στιλιζαρισμένο σύμφωνα με την αισθητική και το όραμα του συγκροτήματος.",
    } as BL,
    tags: ["Next.js", "TypeScript", "Interactive Animations", "Tailwind", "HTML"],
    image: "/projects/trf.webp",
    imageMobile: "/projects/trf-mobile.webp",
    sector: "artists",
    links: [{ label: "Live Site", href: "https://thoseramblingfools.com/" }],
    year: "",
  },
  {
    title: "Ellie Tattooer",
    description: {
      en: "Gallery and e-commerce platform for Ellie Tattooer, resident at Ritual Tattoo Athens. Highly stylized to match her vision and brand identity.",
      el: "Γκαλερί και e-commerce πλατφόρμα για την Ellie Tattooer, από το Ritual Tattoo Athens. Στιλιζαρισμένο για να ταιριάζει με το όραμά της και την ταυτότητα της.",
    } as BL,
    tags: ["Next.js", "TypeScript", "Tailwind", "HTML", "E-commerce"],
    image: "/projects/ellietattooer.webp",
    imageMobile: "/projects/ellietattooer-mobile.webp",
    sector: "artists",
    links: [{ label: "Live Site", href: "https://ellietattooer.com/" }],
    year: "",
  },
  {
    title: "Blessed Coffee & Spirits",
    description: {
      en: "Web presence for Blessed Coffee & Spirits, an establishment merging specialty coffee, craft cocktails with a neighborly spirit.",
      el: "Web παρουσία για το Blessed Coffee & Spirits, ένα κατάστημα που συνδυάζει specialty καφέ, craft cocktails με μια γειτονική ατμόσφαιρα.",
    } as BL,
    tags: ["React", "JavaScript", "Tailwind", "HTML", "Brand Identity"],
    image: "/projects/blessed.webp",
    imageMobile: "/projects/blessed-mobile.webp",
    sector: "food",
    links: [{ label: "Live Site", href: "https://blessed.cafe/" }],
    year: "",
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
  {
    icon: "⊡",
    title: {
      en: "AI Automations",
      el: "Αυτοματισμοί AI",
    } as BL,
    description: {
      en: "Intelligent automations tailored to your business. AI receptionists that handle inquiries and bookings 24/7, automated follow-ups, and workflow integrations that eliminate repetitive tasks.",
      el: "Έξυπνοι αυτοματισμοί προσαρμοσμένοι στην επιχείρησή σου. AI ρεσεψιονίστ που διαχειρίζεται ερωτήματα και κρατήσεις 24/7, αυτοματοποιεί follow-ups και εξαλείφει επαναλαμβανόμενες εργασίες.",
    } as BL,
  },
  {
    icon: "⌂",
    title: {
      en: "Offline Smart Home",
      el: "Έξυπνο Σπίτι Offline",
    } as BL,
    description: {
      en: "A fully local Home Assistant system: lights, climate, cameras, and sensors on one private dashboard, with no cloud and no subscriptions.",
      el: "Ένα πλήρως τοπικό σύστημα Home Assistant: φωτισμός, κλιματισμός, κάμερες και αισθητήρες σε ένα ιδιωτικό dashboard, χωρίς cloud και χωρίς συνδρομές.",
    } as BL,
    href: "/sectors/smarthome",
  },
];

export type FAQ = { q: BL; a: BL };

export const sectors = [
  {
    slug: "food",
    seoTitle: {
      en: "Website for Restaurants & Bars",
      el: "Ιστοσελίδα για Εστίαση & Bar",
    } as BL,
    icon: "❖",
    title: {
      en: "Website for Restaurants, Cafés, Bars & Clubs",
      el: "Ιστοσελίδα για Εστίαση, Bar & Club",
    } as BL,
    hook: {
      en: "Self-serve digital menu, online table reservations, a line-up for your nights, and a Google Maps listing.",
      el: "Ψηφιακό μενού που ενημερώνεις μόνος σου, online κρατήσεις τραπεζιού, πρόγραμμα για τα βράδια σου και καταχώρηση στο Google Maps.",
    } as BL,
    points: {
      en: [
        "A living menu with photography that sells the dishes and the drinks before a guest arrives, updated in seconds and never reprinted.",
        "Reservations taken around the clock, tables or booths, with a deposit online when the night calls for it.",
        "Tonight's line-up and the season ahead in one place, updated the moment a night changes.",
        "Found on Google and maps the moment locals and travellers search for somewhere to eat or drink nearby.",
      ],
      el: [
        "Ένα ζωντανό μενού με φωτογραφίες που πουλάει τα πιάτα και τα ποτά πριν καν φτάσει ο πελάτης, το ενημερώνεις σε δευτερόλεπτα και δεν το ξανατυπώνεις ποτέ.",
        "Κρατήσεις όλο το εικοσιτετράωρο, σε τραπέζια ή booth, με προκαταβολή online όταν το βράδυ το απαιτεί.",
        "Το αποψινό line-up και όλη η σεζόν σε ένα σημείο, ενημερωμένα τη στιγμή που αλλάζει κάτι.",
        "Σε βρίσκουν στο Google και στους χάρτες τη στιγμή που ντόπιοι και τουρίστες ψάχνουν πού θα φάνε ή θα πιουν εδώ κοντά.",
      ],
    } as BLA,
    included: {
      en: [
        "A photo menu you update yourself in seconds",
        "Table and booth reservations taken 24/7, with deposits when you want them",
        "A line-up or events calendar you update yourself",
        "Google Maps and local-search setup so you're found nearby",
        "An age gate and a door policy page when the venue needs one",
        "GDPR-compliant by default",
      ],
      el: [
        "Μενού με φωτογραφίες που ενημερώνεις μόνος σου σε δευτερόλεπτα",
        "Κρατήσεις τραπεζιών και booth όλο το εικοσιτετράωρο, με προκαταβολή όποτε τη θέλεις",
        "Ημερολόγιο line-up ή εκδηλώσεων που ενημερώνεις μόνος σου",
        "Ρύθμιση Google Maps και τοπικής αναζήτησης για να σε βρίσκουν κοντά τους",
        "Έλεγχος ηλικίας και σελίδα με την πολιτική πόρτας, όπου χρειάζεται",
        "Συμβατό με το GDPR εξ ορισμού",
      ],
    } as BLA,
    faq: [
      {
        q: { en: "How long until my site is live?", el: "Σε πόσο καιρό θα είναι online το site μου;" } as BL,
        a: { en: "Most restaurant, café, and bar sites are ready in about 2 to 4 weeks, depending on the content and the number of pages. A club site with a line-up and deposits usually takes a little longer.", el: "Τα περισσότερα sites για εστιατόρια, καφέ και bar είναι έτοιμα σε περίπου 2 με 4 εβδομάδες, ανάλογα με το περιεχόμενο και τον αριθμό των σελίδων. Ένα site για club με line-up και προκαταβολές θέλει συνήθως λίγο παραπάνω." } as BL,
      },
      {
        q: { en: "What do you need from me to start?", el: "Τι χρειάζεσαι από μένα για να ξεκινήσουμε;" } as BL,
        a: { en: "Your logo if you have one, a few photos of the space and the dishes or drinks, your menu, your opening hours, and the line-up if you run nights. I handle the rest.", el: "Το λογότυπό σου αν έχεις, μερικές φωτογραφίες από τον χώρο και τα πιάτα ή τα ποτά, το μενού σου, το ωράριο και το line-up αν κάνεις βραδιές. Τα υπόλοιπα τα αναλαμβάνω εγώ." } as BL,
      },
      {
        q: { en: "How do deposits work?", el: "Πώς λειτουργούν οι προκαταβολές;" } as BL,
        a: { en: "I connect a payment provider so deposits land straight in your account, and the transaction fees are close to zero.", el: "Συνδέω έναν πάροχο πληρωμών ώστε οι προκαταβολές να πηγαίνουν κατευθείαν στον λογαριασμό σου, και οι χρεώσεις συναλλαγών είναι σχεδόν μηδενικές." } as BL,
      },
      {
        q: { en: "Are hosting and the domain included?", el: "Περιλαμβάνονται το hosting και το domain;" } as BL,
        a: { en: "No, they're always separate from the build price. Hosting and the domain are recurring monthly or yearly costs; you can pay them through me if you prefer, or directly to the providers. Either way I set everything up for you.", el: "Όχι, είναι πάντα ξεχωριστά από την τιμή κατασκευής. Το hosting και το domain είναι επαναλαμβανόμενα μηνιαία ή ετήσια κόστη· μπορείς να τα πληρώνεις μέσω εμένα αν προτιμάς, ή απευθείας στους παρόχους. Σε κάθε περίπτωση, τα στήνω όλα για σένα." } as BL,
      },
    ] as FAQ[],
  },
  {
    slug: "artists",
    seoTitle: {
      en: "Website for Artists",
      el: "Ιστοσελίδα για Καλλιτέχνες",
    } as BL,
    icon: "✦",
    title: {
      en: "Website for Artists & Creatives",
      el: "Ιστοσελίδα για Καλλιτέχνες",
    } as BL,
    hook: {
      en: "A full-quality portfolio gallery, a shop for prints or tickets, and a mailing list for your audience.",
      el: "Portfolio gallery σε πλήρη ποιότητα, κατάστημα για prints ή εισιτήρια και λίστα email για το κοινό σου.",
    } as BL,
    points: {
      en: [
        "A gallery that shows your work in full quality and on your terms, not squeezed into a social feed.",
        "Sell prints, commissions, or tickets directly and keep a bigger share of every sale.",
        "One home for collectors, press, and bookings, plus a mailing list so your audience hears about new work first.",
      ],
      el: [
        "Μια gallery που δείχνει τη δουλειά σου σε πλήρη ποιότητα και με τους δικούς σου όρους, όχι στριμωγμένη σε ένα social feed.",
        "Πουλάς prints, παραγγελίες ή εισιτήρια απευθείας και κρατάς μεγαλύτερο κομμάτι από κάθε πώληση.",
        "Ένα σημείο για συλλέκτες, τον τύπο και κρατήσεις, μαζί με λίστα email ώστε το κοινό σου να μαθαίνει πρώτο τα νέα σου.",
      ],
    } as BLA,
    included: {
      en: [
        "A full-quality portfolio gallery",
        "A shop for prints, commissions, or tickets",
        "A mailing list to grow your audience",
        "One hub for press, bookings, and links",
        "GDPR-compliant by default",
      ],
      el: [
        "Portfolio gallery σε πλήρη ποιότητα",
        "Κατάστημα για prints, παραγγελίες ή εισιτήρια",
        "Λίστα email για να μεγαλώνεις το κοινό σου",
        "Ένα σημείο για τύπο, κρατήσεις και συνδέσμους",
        "Συμβατό με το GDPR εξ ορισμού",
      ],
    } as BLA,
    faq: [
      {
        q: { en: "How long does a portfolio site take?", el: "Πόσο χρόνο θέλει ένα portfolio site;" } as BL,
        a: { en: "Usually 2 to 4 weeks once I have your work and images, a little more if there's a shop to set up.", el: "Συνήθως 2 με 4 εβδομάδες μόλις έχω τα έργα και τις φωτογραφίες σου, λίγο παραπάνω αν στήνουμε και κατάστημα." } as BL,
      },
      {
        q: { en: "How much does it cost?", el: "Πόσο κοστίζει;" } as BL,
        a: { en: "It depends on the size of the gallery and whether you sell online. After a short chat I send a clear, fixed quote with no surprises.", el: "Εξαρτάται από το μέγεθος της gallery και αν πουλάς online. Μετά από μια σύντομη κουβέντα στέλνω μια ξεκάθαρη, σταθερή προσφορά χωρίς εκπλήξεις." } as BL,
      },
      {
        q: { en: "Is the site mine, and can I keep it updated?", el: "Το site είναι δικό μου και μπορώ να το κρατάω ενημερωμένο;" } as BL,
        a: { en: "Yes. The site and its content are yours, and adding new work is quick, whether you do it or I do.", el: "Ναι. Το site και το περιεχόμενό του είναι δικά σου, και το να προσθέτεις νέα δουλειά είναι γρήγορο, είτε το κάνεις εσύ είτε εγώ." } as BL,
      },
    ] as FAQ[],
  },
  {
    slug: "fashion",
    seoTitle: {
      en: "Website for Fashion Brands",
      el: "Ιστοσελίδα για Brands Μόδας",
    } as BL,
    icon: "◇",
    title: {
      en: "Website for Fashion Brands & Boutiques",
      el: "Ιστοσελίδα για Brands Μόδας & Boutique",
    } as BL,
    hook: {
      en: "An editorial lookbook, an online shop with sizes and stock, and a private enquiry flow for made-to-order and fittings.",
      el: "Editorial lookbook, online κατάστημα με μεγέθη και απόθεμα, και ιδιωτική ροή αιτημάτων για κατά παραγγελία και πρόβες.",
    } as BL,
    points: {
      en: [
        "A lookbook that treats your collection like a campaign, full-bleed photography and styling notes, instead of a grid of cut-off thumbnails.",
        "A shop that handles sizes, colours, and limited runs properly, so a piece sells out cleanly rather than overselling.",
        "A private enquiry and fitting flow for made-to-order and bespoke work, where the conversation matters more than the cart.",
        "A mailing list and a drop announcement so your own audience hears about a new collection before the algorithm decides who sees it.",
      ],
      el: [
        "Ένα lookbook που αντιμετωπίζει τη συλλογή σου σαν καμπάνια, φωτογραφία σε πλήρες πλάτος και σημειώσεις styling, αντί για ένα grid με κομμένα thumbnails.",
        "Ένα κατάστημα που διαχειρίζεται σωστά μεγέθη, χρώματα και περιορισμένες σειρές, ώστε ένα κομμάτι να εξαντλείται καθαρά και να μην πουλιέται παραπάνω από το απόθεμα.",
        "Ιδιωτική ροή αιτημάτων και προβών για κατά παραγγελία και bespoke δουλειά, όπου η κουβέντα μετράει περισσότερο από το καλάθι.",
        "Λίστα email και ανακοίνωση drop, ώστε το κοινό σου να μαθαίνει για μια νέα συλλογή πριν αποφασίσει ο αλγόριθμος ποιος θα τη δει.",
      ],
    } as BLA,
    included: {
      en: [
        "A lookbook and collection gallery in full quality",
        "An online shop with sizes, variants, and stock you control",
        "A made-to-order and fitting enquiry flow",
        "A mailing list for drops and new collections",
        "Size guides, care, shipping, and returns pages",
        "Google and local-search setup so the boutique is found nearby",
        "GDPR-compliant by default",
      ],
      el: [
        "Lookbook και gallery συλλογής σε πλήρη ποιότητα",
        "Online κατάστημα με μεγέθη, παραλλαγές και απόθεμα που ελέγχεις εσύ",
        "Ροή αιτημάτων για κατά παραγγελία και πρόβες",
        "Λίστα email για drops και νέες συλλογές",
        "Σελίδες με οδηγό μεγεθών, φροντίδα, αποστολές και επιστροφές",
        "Ρύθμιση Google και τοπικής αναζήτησης για να βρίσκουν το boutique κοντά τους",
        "Συμβατό με το GDPR εξ ορισμού",
      ],
    } as BLA,
    faq: [
      {
        q: { en: "How long until my site is live?", el: "Σε πόσο καιρό θα είναι online το site μου;" } as BL,
        a: { en: "Usually 3 to 5 weeks once I have your photography and the collection details. A lookbook-only site is faster; a full shop with sizes and payments takes a little longer.", el: "Συνήθως 3 με 5 εβδομάδες μόλις έχω τη φωτογραφία και τα στοιχεία της συλλογής. Ένα site μόνο με lookbook είναι πιο γρήγορο· ένα πλήρες κατάστημα με μεγέθη και πληρωμές θέλει λίγο παραπάνω." } as BL,
      },
      {
        q: { en: "What do you need from me to start?", el: "Τι χρειάζεσαι από μένα για να ξεκινήσουμε;" } as BL,
        a: { en: "Your logo if you have one, the collection photography, the pieces with their sizes and prices, and how you want to handle made-to-order. If the photography isn't ready, I'll tell you what to shoot and how.", el: "Το λογότυπό σου αν έχεις, τη φωτογραφία της συλλογής, τα κομμάτια με τα μεγέθη και τις τιμές τους, και πώς θέλεις να διαχειρίζεσαι τις κατά παραγγελία δουλειές. Αν η φωτογραφία δεν είναι έτοιμη, σου λέω τι να φωτογραφίσεις και πώς." } as BL,
      },
      {
        q: { en: "Can I add new pieces and collections myself?", el: "Μπορώ να προσθέτω μόνος μου νέα κομμάτια και συλλογές;" } as BL,
        a: { en: "Yes. Adding a piece, changing a price, or marking something sold out takes seconds and needs no developer. A whole new collection is just as easy once the first one is in place.", el: "Ναι. Το να προσθέσεις ένα κομμάτι, να αλλάξεις μια τιμή ή να το σημάνεις εξαντλημένο παίρνει δευτερόλεπτα και δεν χρειάζεται προγραμματιστή. Μια ολόκληρη νέα συλλογή είναι εξίσου εύκολη μόλις μπει η πρώτη." } as BL,
      },
      {
        q: { en: "How do online payments work?", el: "Πώς λειτουργούν οι online πληρωμές;" } as BL,
        a: { en: "I connect a payment provider so orders land straight in your account, with card and the usual local methods. You keep control of shipping rates and returns.", el: "Συνδέω έναν πάροχο πληρωμών ώστε οι παραγγελίες να πηγαίνουν κατευθείαν στον λογαριασμό σου, με κάρτα και τους συνηθισμένους τοπικούς τρόπους. Τα κόστη αποστολής και οι επιστροφές παραμένουν στον έλεγχό σου." } as BL,
      },
      {
        q: { en: "Are hosting and the domain included?", el: "Περιλαμβάνονται το hosting και το domain;" } as BL,
        a: { en: "No, they're always separate from the build price. Hosting and the domain are recurring monthly or yearly costs; you can pay them through me if you prefer, or directly to the providers. Either way I set everything up for you.", el: "Όχι, είναι πάντα ξεχωριστά από την τιμή κατασκευής. Το hosting και το domain είναι επαναλαμβανόμενα μηνιαία ή ετήσια κόστη· μπορείς να τα πληρώνεις μέσω εμένα αν προτιμάς, ή απευθείας στους παρόχους. Σε κάθε περίπτωση, τα στήνω όλα για σένα." } as BL,
      },
    ] as FAQ[],
  },
  {
    slug: "health",
    seoTitle: {
      en: "Website for Health Professionals",
      el: "Ιστοσελίδα για Επαγγελματίες Υγείας",
    } as BL,
    icon: "✚",
    title: {
      en: "Website for Health Professionals",
      el: "Ιστοσελίδα για Επαγγελματίες Υγείας",
    } as BL,
    hook: {
      en: "Online appointment booking, service and hours pages, and secure GDPR-ready contact forms.",
      el: "Online κλείσιμο ραντεβού, σελίδες με υπηρεσίες και ωράριο, και ασφαλείς φόρμες συμβατές με το GDPR.",
    } as BL,
    points: {
      en: [
        "Online appointment booking that keeps filling your calendar while you are with patients.",
        "A calm, professional presence that earns trust from the very first click.",
        "Clear answers on services, hours, and location, so the phone rings less and the right patients arrive.",
      ],
      el: [
        "Online κλείσιμο ραντεβού που γεμίζει το πρόγραμμά σου την ώρα που εσύ είσαι με τους ασθενείς σου.",
        "Μια ήρεμη, επαγγελματική παρουσία που κερδίζει την εμπιστοσύνη από το πρώτο κλικ.",
        "Ξεκάθαρες απαντήσεις για υπηρεσίες, ώρες και τοποθεσία, ώστε να χτυπάει λιγότερο το τηλέφωνο και να έρχονται οι σωστοί ασθενείς.",
      ],
    } as BLA,
    included: {
      en: [
        "Online appointment booking",
        "Clear service, hours and location pages",
        "A trustworthy, professional design",
        "GDPR-friendly contact forms",
      ],
      el: [
        "Online κλείσιμο ραντεβού",
        "Ξεκάθαρες σελίδες για υπηρεσίες, ώρες και τοποθεσία",
        "Αξιόπιστος, επαγγελματικός σχεδιασμός",
        "Φόρμες επικοινωνίας φιλικές προς το GDPR",
      ],
    } as BLA,
    faq: [
      {
        q: { en: "How long until it's ready?", el: "Σε πόσο καιρό θα είναι έτοιμο;" } as BL,
        a: { en: "A practice or clinic site is typically ready in 2 to 4 weeks, depending on the number of services and pages.", el: "Ένα site για ιατρείο ή κλινική είναι συνήθως έτοιμο σε 2 με 4 εβδομάδες, ανάλογα με τον αριθμό των υπηρεσιών και των σελίδων." } as BL,
      },
      {
        q: { en: "What do you need from me?", el: "Τι χρειάζεσαι από μένα;" } as BL,
        a: { en: "Your services, hours, location, any credentials you want shown, and photos if you have them. I guide you through the rest.", el: "Τις υπηρεσίες σου, το ωράριο, την τοποθεσία, όποια πιστοποιητικά θες να προβληθούν και φωτογραφίες αν έχεις. Σε καθοδηγώ στα υπόλοιπα." } as BL,
      },
      {
        q: { en: "Do hosting and the domain cost extra?", el: "Το hosting και το domain κοστίζουν επιπλέον;" } as BL,
        a: { en: "Yes. They're never part of the build price; they're separate recurring monthly or yearly costs. You can pay them through me if you like, or directly to the providers. I set them up for you.", el: "Ναι. Δεν περιλαμβάνονται ποτέ στην τιμή κατασκευής· είναι ξεχωριστά, επαναλαμβανόμενα μηνιαία ή ετήσια κόστη. Μπορείς να τα πληρώνεις μέσω εμένα αν θέλεις, ή απευθείας στους παρόχους. Τα στήνω για σένα." } as BL,
      },
    ] as FAQ[],
  },
  {
    slug: "rentacar",
    seoTitle: {
      en: "Website for Rent-a-Car",
      el: "Ιστοσελίδα για Rent-a-Car",
    } as BL,
    icon: "◈",
    title: {
      en: "Website for Rent-a-Car",
      el: "Ιστοσελίδα για Rent-a-Car",
    } as BL,
    hook: {
      en: "Real-time availability, an online fleet catalogue, bookings with deposits, and an admin panel.",
      el: "Διαθεσιμότητα σε πραγματικό χρόνο, online κατάλογος στόλου, κρατήσεις με προκαταβολή και admin panel.",
    } as BL,
    points: {
      en: [
        "Real-time availability and online booking with deposits, instead of endless back-and-forth messages.",
        "Fleet, pricing, and terms laid out clearly, so customers reserve with confidence.",
        "Reaches travellers who book before they even land, and offers insurance, seats, and delivery at checkout.",
      ],
      el: [
        "Διαθεσιμότητα σε πραγματικό χρόνο και online κράτηση με προκαταβολή, αντί για ατελείωτα μηνύματα πέρα δώθε.",
        "Στόλος, τιμές και όροι ξεκάθαρα, για να κλείνει ο πελάτης με σιγουριά.",
        "Φτάνεις σε ταξιδιώτες που κλείνουν πριν καν προσγειωθούν, και προτείνεις ασφάλεια, παιδικά καθίσματα και παράδοση τη στιγμή της πληρωμής.",
      ],
    } as BLA,
    included: {
      en: [
        "Real-time availability and online booking",
        "A fleet catalogue with photos and pricing",
        "Deposit or full payment at checkout",
        "An admin panel to manage bookings and fleet",
        "GDPR-compliant by default",
      ],
      el: [
        "Διαθεσιμότητα σε πραγματικό χρόνο και online κράτηση",
        "Κατάλογος στόλου με φωτογραφίες και τιμές",
        "Προκαταβολή ή πλήρης πληρωμή στο ταμείο",
        "Admin panel για τη διαχείριση κρατήσεων και στόλου",
        "Συμβατό με το GDPR εξ ορισμού",
      ],
    } as BLA,
    faq: [
      {
        q: { en: "How long does a rental site take?", el: "Πόσο χρόνο θέλει ένα site ενοικιάσεων;" } as BL,
        a: { en: "A rental site with availability and an admin panel usually takes about 4 to 6 weeks, since the booking logic needs more care.", el: "Ένα site ενοικιάσεων με διαθεσιμότητα και admin panel θέλει συνήθως 4 με 6 εβδομάδες, καθώς η λογική των κρατήσεων χρειάζεται μεγαλύτερη προσοχή." } as BL,
      },
      {
        q: { en: "How do online payments and deposits work?", el: "Πώς λειτουργούν οι online πληρωμές και οι προκαταβολές;" } as BL,
        a: { en: "I connect a payment provider so deposits or full payments land straight in your account, and the transaction fees are close to zero.", el: "Συνδέω έναν πάροχο πληρωμών ώστε οι προκαταβολές ή οι πλήρεις πληρωμές να πηγαίνουν κατευθείαν στον λογαριασμό σου, και οι χρεώσεις συναλλαγών είναι σχεδόν μηδενικές." } as BL,
      },
      {
        q: { en: "What does it cost to build?", el: "Πόσο κοστίζει η κατασκευή;" } as BL,
        a: { en: "It depends on fleet size and features. After we talk I send a fixed quote before any work starts.", el: "Εξαρτάται από το μέγεθος του στόλου και τις λειτουργίες. Μετά την κουβέντα μας στέλνω σταθερή προσφορά πριν ξεκινήσει οποιαδήποτε δουλειά." } as BL,
      },
    ] as FAQ[],
  },
  {
    slug: "hotels",
    seoTitle: {
      en: "Website for Hotels",
      el: "Ιστοσελίδα για Ξενοδοχεία",
    } as BL,
    icon: "⌂",
    title: {
      en: "Website for Hotels & Short Stays",
      el: "Ιστοσελίδα για Ξενοδοχεία & Καταλύματα Βραχυπρόθεσμης Διαμονής",
    } as BL,
    hook: {
      en: "Room and suite pages, an availability calendar, direct booking or enquiries, and multilingual content.",
      el: "Σελίδες δωματίων και σουιτών, ημερολόγιο διαθεσιμότητας, απευθείας κράτηση ή αιτήματα και πολύγλωσσο περιεχόμενο.",
    } as BL,
    points: {
      en: [
        "Direct bookings that skip platform commissions and keep the guest relationship yours.",
        "Immersive photography and honest room detail that turn browsers into reservations.",
        "Multilingual pages and instant enquiries that reach international travellers and answer them fast.",
      ],
      el: [
        "Απευθείας κρατήσεις που παρακάμπτουν τις προμήθειες των πλατφορμών και κρατούν δική σου τη σχέση με τον επισκέπτη.",
        "Καθηλωτική φωτογραφία και ειλικρινείς λεπτομέρειες για τα δωμάτια, που μετατρέπουν τους επισκέπτες σε κρατήσεις.",
        "Πολύγλωσσες σελίδες και άμεσα αιτήματα που φτάνουν σε ταξιδιώτες απ' όλο τον κόσμο και τους απαντούν γρήγορα.",
      ],
    } as BLA,
    included: {
      en: [
        "A room and suite showcase with real detail",
        "Availability, enquiries, and direct booking",
        "Immersive photography and layout",
        "Multilingual pages for international guests",
        "GDPR-compliant by default",
      ],
      el: [
        "Παρουσίαση δωματίων και σουιτών με πραγματική λεπτομέρεια",
        "Διαθεσιμότητα, αιτήματα και απευθείας κράτηση",
        "Καθηλωτική φωτογραφία και διάταξη",
        "Πολύγλωσσες σελίδες για επισκέπτες από το εξωτερικό",
        "Συμβατό με το GDPR εξ ορισμού",
      ],
    } as BLA,
    faq: [
      {
        q: { en: "How long until launch?", el: "Σε πόσο καιρό γίνεται το launch;" } as BL,
        a: { en: "A hotel or short-stay site is usually ready in about 3 to 5 weeks, depending on the number of rooms and languages.", el: "Ένα site για ξενοδοχείο ή κατάλυμα είναι συνήθως έτοιμο σε περίπου 3 με 5 εβδομάδες, ανάλογα με τον αριθμό δωματίων και γλωσσών." } as BL,
      },
      {
        q: { en: "What do you need from me to start?", el: "Τι χρειάζεσαι από μένα για να ξεκινήσουμε;" } as BL,
        a: { en: "Room details and rates, good photos, and the languages you want. I take it from there.", el: "Στοιχεία και τιμές δωματίων, καλές φωτογραφίες και τις γλώσσες που θέλεις. Από εκεί και πέρα το αναλαμβάνω." } as BL,
      },
      {
        q: { en: "Who pays for hosting and the domain?", el: "Ποιος πληρώνει το hosting και το domain;" } as BL,
        a: { en: "You do, but you can pay through me if you prefer or directly to the providers. Either way it's a separate, recurring monthly or yearly charge, never part of the build price.", el: "Εσύ, αλλά μπορείς να πληρώνεις μέσω εμένα αν προτιμάς ή απευθείας στους παρόχους. Σε κάθε περίπτωση είναι ξεχωριστή, επαναλαμβανόμενη μηνιαία ή ετήσια χρέωση, ποτέ μέρος της τιμής κατασκευής." } as BL,
      },
    ] as FAQ[],
  },
  {
    slug: "automotive",
    seoTitle: {
      en: "Website for Car Dealerships",
      el: "Ιστοσελίδα για Πωλήσεις Αυτοκινήτων",
    } as BL,
    icon: "◎",
    title: {
      en: "Website for Automotive Sales",
      el: "Ιστοσελίδα για Πωλήσεις Αυτοκινήτων",
    } as BL,
    hook: {
      en: "A stock listing with full specs and pricing, an import-on-order request flow, and enquiries that arrive tied to a specific car.",
      el: "Κατάλογος οχημάτων με πλήρη χαρακτηριστικά και τιμές, ροή αιτήματος για εισαγωγή κατά παραγγελία και ερωτήματα που φτάνουν συνδεδεμένα με συγκεκριμένο όχημα.",
    } as BL,
    points: {
      en: [
        "Every car listed with photos, mileage, engine, and price, so buyers arrive already knowing what they came to see.",
        "An import request form that captures make, model, budget, and equipment, instead of the same questions over the phone every time.",
        "Stock you update yourself in minutes, so a sold car comes off the site before the next caller asks about it.",
      ],
      el: [
        "Κάθε αυτοκίνητο καταχωρημένο με φωτογραφίες, χιλιόμετρα, κινητήρα και τιμή, ώστε ο αγοραστής να έρχεται ξέροντας ήδη τι ήρθε να δει.",
        "Φόρμα αιτήματος εισαγωγής που καταγράφει μάρκα, μοντέλο, budget και εξοπλισμό, αντί για τις ίδιες ερωτήσεις στο τηλέφωνο κάθε φορά.",
        "Στοκ που ενημερώνεις μόνος σου σε λίγα λεπτά, ώστε ένα πουλημένο αυτοκίνητο να φεύγει από το site πριν ρωτήσει ο επόμενος.",
      ],
    } as BLA,
    included: {
      en: [
        "A stock listing with photos, specs, and pricing you update yourself",
        "An import-on-order request flow with make, model, budget, and equipment",
        "Enquiries that arrive tied to a specific vehicle",
        "Customs, registration, and delivery explained step by step",
        "GDPR-compliant by default",
      ],
      el: [
        "Κατάλογος οχημάτων με φωτογραφίες, χαρακτηριστικά και τιμές που ενημερώνεις μόνος σου",
        "Ροή αιτήματος για εισαγωγή κατά παραγγελία με μάρκα, μοντέλο, budget και εξοπλισμό",
        "Ερωτήματα που φτάνουν συνδεδεμένα με συγκεκριμένο όχημα",
        "Εκτελωνισμός, ταξινόμηση και παράδοση εξηγημένα βήμα βήμα",
        "Συμβατό με το GDPR εξ ορισμού",
      ],
    } as BLA,
    faq: [
      {
        q: { en: "How long does a dealership site take?", el: "Πόσο χρόνο θέλει ένα site για εμπορία αυτοκινήτων;" } as BL,
        a: { en: "Usually about 3 to 5 weeks, depending on the size of the stock and whether you want an import request flow on top of the listing.", el: "Συνήθως 3 με 5 εβδομάδες, ανάλογα με το μέγεθος του στοκ και το αν θέλεις και ροή αιτήματος εισαγωγής πέρα από τον κατάλογο." } as BL,
      },
      {
        q: { en: "How do I add or remove cars?", el: "Πώς προσθέτω ή αφαιρώ αυτοκίνητα;" } as BL,
        a: { en: "From a simple admin panel. You upload the photos, fill in the specs and price, and the car is live. Mark it sold and it comes off the site.", el: "Από ένα απλό admin panel. Ανεβάζεις τις φωτογραφίες, συμπληρώνεις χαρακτηριστικά και τιμή και το αυτοκίνητο μπαίνει online. Το σημειώνεις ως πουλημένο και φεύγει από το site." } as BL,
      },
      {
        q: { en: "Are hosting and the domain included?", el: "Περιλαμβάνονται το hosting και το domain;" } as BL,
        a: { en: "No, they're always separate from the build price. They're recurring monthly or yearly costs; you can pay them through me if you prefer, or directly to the providers. Either way I set everything up for you.", el: "Όχι, είναι πάντα ξεχωριστά από την τιμή κατασκευής. Είναι επαναλαμβανόμενα μηνιαία ή ετήσια κόστη· μπορείς να τα πληρώνεις μέσω εμένα αν προτιμάς, ή απευθείας στους παρόχους. Σε κάθε περίπτωση, τα στήνω όλα για σένα." } as BL,
      },
    ] as FAQ[],
  },
  {
    slug: "smarthome",
    seoTitle: {
      en: "Smart Home with Home Assistant",
      el: "Έξυπνο Σπίτι με Home Assistant",
    } as BL,
    icon: "⊡",
    title: {
      en: "Smart Home & Home Assistant",
      el: "Έξυπνο Σπίτι με Home Assistant",
    } as BL,
    hook: {
      en: "A fully local Home Assistant setup: lights, climate, cameras, and sensors on one private dashboard, with no cloud and no subscriptions.",
      el: "Μια πλήρως τοπική εγκατάσταση Home Assistant: φωτισμός, κλιματισμός, κάμερες και αισθητήρες σε ένα ιδιωτικό dashboard, χωρίς cloud και χωρίς συνδρομές.",
    } as BL,
    points: {
      en: [
        "Everything runs locally on your own hardware, so it responds instantly and keeps working even without internet.",
        "One private dashboard for lights, climate, security cameras, and sensors, reachable only over an encrypted local connection.",
        "No cloud, no subscriptions, and no data leaving your home.",
      ],
      el: [
        "Όλα τρέχουν τοπικά στον δικό σου εξοπλισμό, οπότε αποκρίνονται άμεσα και συνεχίζουν να λειτουργούν ακόμη και χωρίς internet.",
        "Ένα ιδιωτικό dashboard για φωτισμό, κλιματισμό, κάμερες ασφαλείας και αισθητήρες, προσβάσιμο μόνο μέσω κρυπτογραφημένης τοπικής σύνδεσης.",
        "Χωρίς cloud, χωρίς συνδρομές και χωρίς δεδομένα που φεύγουν από το σπίτι σου.",
      ],
    } as BLA,
    included: {
      en: [
        "A local Home Assistant hub on your own hardware",
        "Custom automations for lights, climate, and security",
        "One private, encrypted dashboard for phone and tablet",
        "Integration of the cameras, sensors, and devices you already own",
        "Private by design, with no data leaving your home",
      ],
      el: [
        "Ένα τοπικό hub Home Assistant στον δικό σου εξοπλισμό",
        "Προσαρμοσμένοι αυτοματισμοί για φωτισμό, κλιματισμό και ασφάλεια",
        "Ένα ιδιωτικό, κρυπτογραφημένο dashboard για κινητό και tablet",
        "Ενσωμάτωση των καμερών, αισθητήρων και συσκευών που ήδη έχεις",
        "Ιδιωτικό εξ ορισμού, χωρίς δεδομένα να φεύγουν από το σπίτι σου",
      ],
    } as BLA,
    faq: [
      {
        q: { en: "How long does an installation take?", el: "Πόσο χρόνο θέλει μια εγκατάσταση;" } as BL,
        a: { en: "It depends on the size of your home and the number of devices, but a typical setup is done within a few days to a couple of weeks.", el: "Εξαρτάται από το μέγεθος του σπιτιού και τον αριθμό των συσκευών, αλλά μια τυπική εγκατάσταση ολοκληρώνεται μέσα σε λίγες μέρες έως δυο εβδομάδες." } as BL,
      },
      {
        q: { en: "What hardware do I need?", el: "Τι εξοπλισμό χρειάζομαι;" } as BL,
        a: { en: "A small local hub, like a mini PC or a Raspberry Pi, plus whatever smart devices you want to control. For Zigbee devices you also need a Zigbee USB adapter, a small antenna that acts as the coordinator and runs through Zigbee2MQTT. I recommend what fits your home, and the hardware is a separate cost from my work.", el: "Ένα μικρό τοπικό hub, όπως ένα mini PC ή ένα Raspberry Pi, μαζί με όποιες έξυπνες συσκευές θες να ελέγχεις. Για συσκευές Zigbee χρειάζεται επίσης ένας προσαρμογέας Zigbee USB, μια μικρή κεραία που λειτουργεί ως coordinator και τρέχει μέσω Zigbee2MQTT. Προτείνω ό,τι ταιριάζει στο σπίτι σου, και ο εξοπλισμός είναι ξεχωριστό κόστος από τη δουλειά μου." } as BL,
      },
      {
        q: { en: "Do I need an electrician?", el: "Χρειάζομαι ηλεκτρολόγο;" } as BL,
        a: { en: "In most cases yes, some wiring needs a certified electrician. I can bring my own, or work alongside yours.", el: "Στις περισσότερες περιπτώσεις ναι, κάποιες εργασίες καλωδίωσης θέλουν πιστοποιημένο ηλεκτρολόγο. Μπορώ να φέρω δικό μου ηλεκτρολόγο, ή να συνεργαστώ με τον δικό σου." } as BL,
      },
      {
        q: { en: "Are there any monthly subscriptions?", el: "Υπάρχουν μηνιαίες συνδρομές;" } as BL,
        a: { en: "No. The system runs fully local, so there are no cloud fees or subscriptions. You own it outright.", el: "Όχι. Το σύστημα τρέχει πλήρως τοπικά, οπότε δεν υπάρχουν χρεώσεις cloud ή συνδρομές. Είναι εξ ολοκλήρου δικό σου." } as BL,
      },
    ] as FAQ[],
  },
];

/**
 * Service pages: what the studio sells, as opposed to the sector pages,
 * which describe who the client is. These carry the commercial-intent
 * queries ("κατασκευή ιστοσελίδων", "κατασκευή e-shop", "SEO"), which no
 * sector page targets.
 */
export const servicePages = [
  {
    slug: "websites",
    icon: "✦",
    seoTitle: {
      en: "Website Development",
      el: "Κατασκευή Ιστοσελίδων",
    } as BL,
    title: {
      en: "Website Development for Businesses in Greece",
      el: "Κατασκευή Ιστοσελίδων για Επιχειρήσεις στην Ελλάδα",
    } as BL,
    hook: {
      en: "A site built from scratch around your business, fast enough to rank, readable by search and AI engines, and yours to keep.",
      el: "Ιστοσελίδα χτισμένη από το μηδέν γύρω από την επιχείρησή σου, αρκετά γρήγορη για να ανέβει, αναγνώσιμη από μηχανές αναζήτησης και AI, και δική σου.",
    } as BL,
    points: {
      en: [
        "Built for your business rather than assembled from a theme, so nothing on the page is there because a template needed filling.",
        "Server-rendered HTML, so search crawlers and AI answer engines read your content without running a line of JavaScript.",
        "Greek and English on separate URLs when you serve both markets, each one indexable on its own instead of hidden behind a toggle.",
        "You own the code and the domain outright. No licence, no platform that can raise its rent, no rebuild needed to leave.",
      ],
      el: [
        "Χτισμένη για την επιχείρησή σου, όχι συναρμολογημένη από θέμα, ώστε τίποτα στη σελίδα να μην υπάρχει επειδή έπρεπε να γεμίσει ένα template.",
        "HTML που παράγεται στον server, ώστε οι crawlers και οι μηχανές απαντήσεων AI να διαβάζουν το περιεχόμενό σου χωρίς να εκτελέσουν JavaScript.",
        "Ελληνικά και αγγλικά σε ξεχωριστά URL όταν απευθύνεσαι και στις δύο αγορές, το καθένα ευρετηριάσιμο από μόνο του και όχι κρυμμένο πίσω από ένα κουμπί.",
        "Ο κώδικας και το domain είναι δικά σου. Χωρίς άδεια χρήσης, χωρίς πλατφόρμα που μπορεί να ανεβάσει το ενοίκιο, χωρίς ανακατασκευή για να φύγεις.",
      ],
    } as BLA,
    included: {
      en: [
        "A design made for your brand, mobile-first and tested down to phone width",
        "Greek and English versions on their own URLs, with hreflang, when you need both",
        "Sitemap, robots.txt and structured data set up from the first day",
        "A contact or quote form with spam and rate-limit protection",
        "GDPR cookie consent and a privacy policy that matches what the site actually does",
        "Google Search Console set up and the sitemap submitted",
        "WCAG 2.1 AA accessibility as a baseline, not an extra",
        "Lifetime support for the site's security and functionality",
      ],
      el: [
        "Σχεδιασμός φτιαγμένος για τη δική σου επωνυμία, mobile-first και δοκιμασμένος μέχρι το πλάτος κινητού",
        "Ελληνική και αγγλική έκδοση σε δικά τους URL, με hreflang, όπου χρειάζεται",
        "Sitemap, robots.txt και structured data από την πρώτη μέρα",
        "Φόρμα επικοινωνίας ή προσφοράς με προστασία από spam και rate limiting",
        "Συγκατάθεση cookies κατά GDPR και πολιτική απορρήτου που αντιστοιχεί σε όσα πραγματικά κάνει το site",
        "Ρύθμιση Google Search Console και υποβολή του sitemap",
        "Προσβασιμότητα WCAG 2.1 AA ως βάση, όχι ως έξτρα",
        "Υποστήριξη εφ' όρου ζωής για την ασφάλεια και τη λειτουργία του site",
      ],
    } as BLA,
    relatedSectors: ["food", "health", "hotels", "artists"],
    faq: [
      {
        q: { en: "How long does a website take?", el: "Πόσο καιρό παίρνει μια ιστοσελίδα;" } as BL,
        a: { en: "Most business sites are ready in 2 to 4 weeks once I have your content. A larger site with a shop, a booking flow or two languages usually runs 4 to 8 weeks. The slow part is almost never the code, it's waiting on text and photos.", el: "Τα περισσότερα εταιρικά sites είναι έτοιμα σε 2 με 4 εβδομάδες μόλις έχω το περιεχόμενό σου. Ένα μεγαλύτερο site με κατάστημα, ροή κρατήσεων ή δύο γλώσσες θέλει συνήθως 4 με 8 εβδομάδες. Το αργό κομμάτι σχεδόν ποτέ δεν είναι ο κώδικας, είναι η αναμονή για κείμενα και φωτογραφίες." } as BL,
      },
      {
        q: { en: "Do I own the site when it's done?", el: "Μου ανήκει το site όταν ολοκληρωθεί;" } as BL,
        a: { en: "Yes. The code and the domain are yours, and you can take both anywhere. Nothing is licensed to you and nothing stops working if we part ways.", el: "Ναι. Ο κώδικας και το domain είναι δικά σου και μπορείς να τα πάρεις οπουδήποτε. Τίποτα δεν σου παραχωρείται με άδεια και τίποτα δεν σταματά να λειτουργεί αν χωρίσουν οι δρόμοι μας." } as BL,
      },
      {
        q: { en: "Is WordPress an option?", el: "Είναι επιλογή το WordPress;" } as BL,
        a: { en: "I don't build on it. It carries plugin and update risk that a small business ends up paying for in maintenance, and it is slower out of the box than a site that ships plain HTML. If you already have a WordPress site, I can rebuild it and keep your URLs so you don't lose rankings.", el: "Δεν χτίζω πάνω σε αυτό. Κουβαλά ρίσκο από plugins και ενημερώσεις που μια μικρή επιχείρηση τελικά το πληρώνει σε συντήρηση, και είναι πιο αργό εξ ορισμού από ένα site που στέλνει σκέτο HTML. Αν έχεις ήδη WordPress, μπορώ να το ξαναχτίσω κρατώντας τα URL σου ώστε να μη χάσεις θέσεις." } as BL,
      },
      {
        q: { en: "Are hosting and the domain included?", el: "Περιλαμβάνονται το hosting και το domain;" } as BL,
        a: { en: "No, they're always separate from the build price, because they're recurring costs rather than one-off ones. You can pay them through me or directly to the providers. Either way I set everything up.", el: "Όχι, είναι πάντα ξεχωριστά από την τιμή κατασκευής, γιατί είναι επαναλαμβανόμενα και όχι εφάπαξ κόστη. Μπορείς να τα πληρώνεις μέσω εμένα ή απευθείας στους παρόχους. Σε κάθε περίπτωση τα στήνω εγώ." } as BL,
      },
    ] as FAQ[],
  },
  {
    slug: "eshop",
    icon: "◉",
    seoTitle: {
      en: "E-shop Development",
      el: "Κατασκευή E-shop",
    } as BL,
    title: {
      en: "E-shop and Online Store Development",
      el: "Κατασκευή E-shop και Ηλεκτρονικού Καταστήματος",
    } as BL,
    hook: {
      en: "An online shop that takes card payments, works out shipping, and keeps every euro of the sale except the card fee.",
      el: "Ηλεκτρονικό κατάστημα που δέχεται πληρωμές με κάρτα, υπολογίζει τα μεταφορικά και κρατά κάθε ευρώ της πώλησης εκτός από την προμήθεια της κάρτας.",
    } as BL,
    points: {
      en: [
        "No commission per sale. You pay your payment provider's card fee and nothing to a platform on top of it.",
        "Shipping cost worked out from weight and destination at checkout, instead of a flat guess that loses money on half the orders.",
        "Prices set on the server, so a total can't be tampered with on the way to checkout.",
        "Stock that updates as orders come in, so you stop selling what you no longer have.",
      ],
      el: [
        "Καμία προμήθεια ανά πώληση. Πληρώνεις τη χρέωση κάρτας του παρόχου πληρωμών και τίποτα επιπλέον σε πλατφόρμα.",
        "Κόστος αποστολής υπολογισμένο από βάρος και προορισμό στο ταμείο, αντί για μια σταθερή εκτίμηση που χάνει χρήματα στις μισές παραγγελίες.",
        "Οι τιμές ορίζονται στον server, ώστε ένα σύνολο να μην μπορεί να αλλοιωθεί στον δρόμο προς το ταμείο.",
        "Απόθεμα που ενημερώνεται καθώς έρχονται παραγγελίες, ώστε να σταματάς να πουλάς ό,τι δεν έχεις πια.",
      ],
    } as BLA,
    included: {
      en: [
        "A product catalogue you update yourself, with variants and photos",
        "Cart and checkout with card payments through a provider that pays you directly",
        "Shipping rules by weight, destination and free-shipping threshold",
        "Order confirmation emails to you and to the customer",
        "Stock tracking that stops overselling",
        "Verified payment webhooks, so an order is only marked paid when the bank says so",
        "GDPR-compliant checkout and cookie consent",
        "Lifetime support for the shop's security and functionality",
      ],
      el: [
        "Κατάλογος προϊόντων που ενημερώνεις μόνος σου, με παραλλαγές και φωτογραφίες",
        "Καλάθι και ταμείο με πληρωμές κάρτας μέσω παρόχου που σε πληρώνει απευθείας",
        "Κανόνες αποστολής ανά βάρος, προορισμό και όριο δωρεάν μεταφορικών",
        "Email επιβεβαίωσης παραγγελίας σε εσένα και στον πελάτη",
        "Παρακολούθηση αποθέματος που σταματά τις υπερπωλήσεις",
        "Επαληθευμένα webhooks πληρωμών, ώστε μια παραγγελία να μαρκάρεται πληρωμένη μόνο όταν το πει η τράπεζα",
        "Ταμείο και συγκατάθεση cookies συμβατά με GDPR",
        "Υποστήριξη εφ' όρου ζωής για την ασφάλεια και τη λειτουργία του καταστήματος",
      ],
    } as BLA,
    relatedSectors: ["fashion", "artists", "food", "automotive"],
    faq: [
      {
        q: { en: "Why not Shopify or WooCommerce?", el: "Γιατί όχι Shopify ή WooCommerce;" } as BL,
        a: { en: "Both work, and for some shops they're the right answer. The tradeoff is a monthly fee plus, on some plans, a cut of every sale, and a checkout you can only change as far as the platform allows. A custom shop costs more up front and nothing per sale after that. If your volume is low and you want to start tomorrow, I'll tell you to use a platform.", el: "Και τα δύο δουλεύουν, και για κάποια καταστήματα είναι η σωστή απάντηση. Το αντίτιμο είναι μια μηνιαία χρέωση συν, σε ορισμένα πακέτα, ένα ποσοστό κάθε πώλησης, και ένα ταμείο που αλλάζεις μόνο όσο επιτρέπει η πλατφόρμα. Ένα custom κατάστημα κοστίζει περισσότερο στην αρχή και τίποτα ανά πώληση μετά. Αν ο τζίρος σου είναι μικρός και θες να ξεκινήσεις αύριο, θα σου πω να πας σε πλατφόρμα." } as BL,
      },
      {
        q: { en: "How do payments work in Greece?", el: "Πώς λειτουργούν οι πληρωμές στην Ελλάδα;" } as BL,
        a: { en: "I connect a payment provider so card payments land straight in your business account. You keep the merchant relationship and I never touch the money. Cash on delivery and bank transfer can sit alongside cards if your customers expect them.", el: "Συνδέω πάροχο πληρωμών ώστε οι πληρωμές με κάρτα να πηγαίνουν κατευθείαν στον επαγγελματικό σου λογαριασμό. Η σχέση με τον πάροχο είναι δική σου και εγώ δεν αγγίζω ποτέ τα χρήματα. Η αντικαταβολή και η τραπεζική κατάθεση μπορούν να συνυπάρχουν με τις κάρτες αν το περιμένουν οι πελάτες σου." } as BL,
      },
      {
        q: { en: "Can I move my existing shop over?", el: "Μπορώ να μεταφέρω το υπάρχον κατάστημά μου;" } as BL,
        a: { en: "Yes. Products and customers can be imported, and the old product URLs get redirected to the new ones so the rankings and links you've already earned follow you across.", el: "Ναι. Τα προϊόντα και οι πελάτες μπορούν να εισαχθούν, και τα παλιά URL προϊόντων ανακατευθύνονται στα νέα ώστε οι θέσεις και οι σύνδεσμοι που έχεις ήδη κερδίσει να σε ακολουθήσουν." } as BL,
      },
      {
        q: { en: "Is it hard to add products myself?", el: "Είναι δύσκολο να προσθέτω προϊόντα μόνος μου;" } as BL,
        a: { en: "No. You get an admin area where adding a product is a form: name, price, photos, stock. If you can post to Instagram you can run the shop.", el: "Όχι. Έχεις περιοχή διαχείρισης όπου η προσθήκη προϊόντος είναι μια φόρμα: όνομα, τιμή, φωτογραφίες, απόθεμα. Αν μπορείς να ανεβάσεις κάτι στο Instagram, μπορείς να διαχειριστείς το κατάστημα." } as BL,
      },
    ] as FAQ[],
  },
  {
    slug: "seo",
    icon: "◈",
    seoTitle: {
      en: "SEO and Local Search",
      el: "SEO και Τοπική Αναζήτηση",
    } as BL,
    title: {
      en: "SEO, Local Search and AI Answer Engines",
      el: "SEO, Τοπική Αναζήτηση και Μηχανές Απαντήσεων AI",
    } as BL,
    hook: {
      en: "Getting found by Google and by the AI assistants people now ask instead, which mostly read raw HTML and structured data.",
      el: "Να σε βρίσκουν το Google και οι βοηθοί AI που πλέον ρωτούν οι άνθρωποι, οι οποίοι κυρίως διαβάζουν σκέτο HTML και structured data.",
    } as BL,
    points: {
      en: [
        "Most AI crawlers do not execute JavaScript. If your content only appears after the page loads, they never see it.",
        "Structured data tells a search engine what your business is, not just what words are on the page.",
        "A bilingual site needs each language on its own URL with hreflang, or one of them is effectively invisible.",
        "Local intent is won with an accurate Google Business Profile and consistent details, not with keywords stuffed into a page.",
      ],
      el: [
        "Οι περισσότεροι crawlers AI δεν εκτελούν JavaScript. Αν το περιεχόμενό σου εμφανίζεται μόνο αφού φορτώσει η σελίδα, δεν το βλέπουν ποτέ.",
        "Τα structured data λένε στη μηχανή αναζήτησης τι είναι η επιχείρησή σου, όχι απλώς ποιες λέξεις υπάρχουν στη σελίδα.",
        "Ένα δίγλωσσο site χρειάζεται κάθε γλώσσα σε δικό της URL με hreflang, αλλιώς η μία είναι ουσιαστικά αόρατη.",
        "Η τοπική πρόθεση κερδίζεται με σωστό προφίλ Google Business και συνεπή στοιχεία, όχι με λέξεις-κλειδιά στοιβαγμένες σε μια σελίδα.",
      ],
    } as BLA,
    included: {
      en: [
        "An audit of what is actually indexed today, read from Search Console rather than guessed",
        "Structured data for your business type, plus FAQ schema where you have real questions",
        "Per-page titles and descriptions written for search intent in your market's language",
        "Sitemap, robots.txt, canonical tags and hreflang where the site is bilingual",
        "Core Web Vitals brought into the green, measured on the production build",
        "Internal linking so your weakest pages have more than one way in",
        "Google Business Profile guidance for local search",
        "A written report of what changed and what is worth watching",
      ],
      el: [
        "Έλεγχος του τι είναι πραγματικά ευρετηριασμένο σήμερα, διαβασμένος από το Search Console και όχι υποθετικός",
        "Structured data για τον τύπο της επιχείρησής σου, συν FAQ schema όπου υπάρχουν πραγματικές ερωτήσεις",
        "Τίτλοι και περιγραφές ανά σελίδα, γραμμένοι για την πρόθεση αναζήτησης στη γλώσσα της αγοράς σου",
        "Sitemap, robots.txt, canonical tags και hreflang όπου το site είναι δίγλωσσο",
        "Core Web Vitals στο πράσινο, μετρημένα στο production build",
        "Εσωτερική διασύνδεση ώστε οι πιο αδύναμες σελίδες σου να έχουν πάνω από έναν δρόμο προς τα μέσα",
        "Καθοδήγηση για το προφίλ Google Business και την τοπική αναζήτηση",
        "Γραπτή αναφορά για το τι άλλαξε και τι αξίζει να παρακολουθείς",
      ],
    } as BLA,
    relatedSectors: ["rentacar", "hotels", "health", "food"],
    faq: [
      {
        q: { en: "How long until I see results?", el: "Σε πόσο καιρό θα δω αποτελέσματα;" } as BL,
        a: { en: "Technical fixes show up in weeks. Ranking for competitive terms takes months, and on a new domain it takes longer still, because age and links matter and neither can be bought honestly. Anyone promising page one by a date is guessing.", el: "Οι τεχνικές διορθώσεις φαίνονται σε εβδομάδες. Η κατάταξη σε ανταγωνιστικούς όρους θέλει μήνες, και σε νέο domain θέλει ακόμη περισσότερο, γιατί μετράνε η ηλικία και οι σύνδεσμοι και κανένα από τα δύο δεν αγοράζεται τίμια. Όποιος υπόσχεται πρώτη σελίδα σε συγκεκριμένη ημερομηνία μαντεύει." } as BL,
      },
      {
        q: { en: "Can you guarantee first place?", el: "Μπορείς να εγγυηθείς την πρώτη θέση;" } as BL,
        a: { en: "No, and nobody can. Google's ranking is not something a developer controls. What I can do is make sure nothing on your side is blocking you, and that everything a search engine needs is present and correct.", el: "Όχι, και κανείς δεν μπορεί. Η κατάταξη του Google δεν είναι κάτι που ελέγχει ένας προγραμματιστής. Αυτό που μπορώ να κάνω είναι να βεβαιωθώ ότι τίποτα από τη δική σου πλευρά δεν σε εμποδίζει και ότι ό,τι χρειάζεται μια μηχανή αναζήτησης υπάρχει και είναι σωστό." } as BL,
      },
      {
        q: { en: "Can you audit a site you didn't build?", el: "Μπορείς να ελέγξεις site που δεν έφτιαξες εσύ;" } as BL,
        a: { en: "Yes, and it's often the most useful thing I do. I read your real Search Console data, check which pages are indexed and which are not, and report the gaps before changing anything.", el: "Ναι, και συχνά είναι το πιο χρήσιμο πράγμα που κάνω. Διαβάζω τα πραγματικά δεδομένα του Search Console σου, ελέγχω ποιες σελίδες είναι ευρετηριασμένες και ποιες όχι, και αναφέρω τα κενά πριν αλλάξω οτιδήποτε." } as BL,
      },
      {
        q: { en: "Do I need to keep paying monthly?", el: "Χρειάζεται να πληρώνω κάθε μήνα;" } as BL,
        a: { en: "Not for the technical work: that's done once and stays done. A monthly arrangement only makes sense if you want ongoing content and reporting, and I'll say so plainly rather than sell you a retainer you don't need.", el: "Όχι για την τεχνική δουλειά: γίνεται μία φορά και μένει. Μηνιαία συνεργασία έχει νόημα μόνο αν θέλεις συνεχή παραγωγή περιεχομένου και αναφορές, και θα στο πω ευθέως αντί να σου πουλήσω πάγιο που δεν χρειάζεσαι." } as BL,
      },
    ] as FAQ[],
  },
  {
    slug: "booking-systems",
    icon: "◈",
    seoTitle: {
      en: "Booking and CRM Systems",
      el: "Συστήματα Κρατήσεων και CRM",
    } as BL,
    title: {
      en: "Booking, Reservation and CRM Systems",
      el: "Συστήματα Κρατήσεων, Ραντεβού και CRM",
    } as BL,
    hook: {
      en: "Take bookings around the clock, with deposits when you want them, and pay no commission on a single one.",
      el: "Δέξου κρατήσεις όλο το εικοσιτετράωρο, με προκαταβολή όποτε τη θέλεις, χωρίς προμήθεια σε καμία από αυτές.",
    } as BL,
    points: {
      en: [
        "No commission per booking. The portals take a cut of every reservation; your own system takes none.",
        "Deposits collected online when a no-show actually costs you something.",
        "Availability that reflects how you really work: turnaround times, staff, seasons, minimum stays.",
        "Every booking checked on the server, so nobody can book a slot that isn't free by editing the request.",
      ],
      el: [
        "Καμία προμήθεια ανά κράτηση. Οι πλατφόρμες κρατούν ποσοστό από κάθε κράτηση· το δικό σου σύστημα δεν κρατά τίποτα.",
        "Προκαταβολές online όταν μια ακύρωση σου κοστίζει πραγματικά.",
        "Διαθεσιμότητα που αντικατοπτρίζει το πώς δουλεύεις στ' αλήθεια: χρόνοι προετοιμασίας, προσωπικό, σεζόν, ελάχιστες διανυκτερεύσεις.",
        "Κάθε κράτηση ελέγχεται στον server, ώστε κανείς να μην μπορεί να κλείσει θέση που δεν είναι ελεύθερη αλλάζοντας το αίτημα.",
      ],
    } as BLA,
    included: {
      en: [
        "A booking flow shaped around your actual availability rules",
        "Online deposits or full prepayment, paid straight into your account",
        "Confirmation and reminder emails to the customer and to you",
        "An admin view of what's booked, with the ability to block dates and edit bookings",
        "Double-booking prevented in the database, not just in the interface",
        "Customer records kept so repeat guests don't retype everything",
        "GDPR-compliant data handling with access locked to your account",
        "Lifetime support for the system's security and functionality",
      ],
      el: [
        "Ροή κρατήσεων διαμορφωμένη γύρω από τους πραγματικούς σου κανόνες διαθεσιμότητας",
        "Προκαταβολές ή πλήρης προπληρωμή online, κατευθείαν στον λογαριασμό σου",
        "Email επιβεβαίωσης και υπενθύμισης στον πελάτη και σε εσένα",
        "Περιβάλλον διαχείρισης με ό,τι έχει κλειστεί, δυνατότητα κλειδώματος ημερομηνιών και επεξεργασίας κρατήσεων",
        "Αποτροπή διπλοκράτησης στη βάση δεδομένων, όχι μόνο στη διεπαφή",
        "Καρτέλες πελατών ώστε οι επαναλαμβανόμενοι επισκέπτες να μην ξαναγράφουν τα πάντα",
        "Διαχείριση δεδομένων κατά GDPR με πρόσβαση κλειδωμένη στον λογαριασμό σου",
        "Υποστήριξη εφ' όρου ζωής για την ασφάλεια και τη λειτουργία του συστήματος",
      ],
    } as BLA,
    relatedSectors: ["rentacar", "hotels", "health", "food"],
    faq: [
      {
        q: { en: "Will this replace Booking.com or the portals?", el: "Θα αντικαταστήσει το Booking.com ή τις πλατφόρμες;" } as BL,
        a: { en: "Not straight away, and I wouldn't advise cutting them off. The point is to shift the guests who already know you onto a direct booking that costs you no commission, while the portals keep bringing new ones.", el: "Όχι αμέσως, και δεν θα σου πρότεινα να τις κόψεις. Το ζητούμενο είναι να μετακινήσεις τους επισκέπτες που ήδη σε ξέρουν σε απευθείας κράτηση που δεν σου κοστίζει προμήθεια, ενώ οι πλατφόρμες συνεχίζουν να φέρνουν καινούργιους." } as BL,
      },
      {
        q: { en: "Can it sync with a calendar I already use?", el: "Μπορεί να συγχρονιστεί με ημερολόγιο που ήδη χρησιμοποιώ;" } as BL,
        a: { en: "Usually yes. Most calendars and channel managers speak a common format, so dates blocked in one place can show as blocked in the other. I'll check yours specifically before promising it.", el: "Συνήθως ναι. Τα περισσότερα ημερολόγια και channel managers μιλούν μια κοινή μορφή, οπότε ημερομηνίες κλειδωμένες στο ένα μπορούν να εμφανίζονται κλειδωμένες και στο άλλο. Θα ελέγξω το δικό σου συγκεκριμένα πριν το υποσχεθώ." } as BL,
      },
      {
        q: { en: "What happens with cancellations?", el: "Τι γίνεται με τις ακυρώσεις;" } as BL,
        a: { en: "You set the policy and the system enforces it: a window in which a deposit is refundable, and what happens after it. The customer sees the terms before paying, which is both fairer and required.", el: "Ορίζεις εσύ την πολιτική και το σύστημα την εφαρμόζει: ένα διάστημα στο οποίο η προκαταβολή επιστρέφεται και τι ισχύει μετά. Ο πελάτης βλέπει τους όρους πριν πληρώσει, κάτι που είναι και δικαιότερο και υποχρεωτικό." } as BL,
      },
      {
        q: { en: "Can staff use it without training?", el: "Μπορεί το προσωπικό να το χρησιμοποιεί χωρίς εκπαίδευση;" } as BL,
        a: { en: "That's the intent. The admin side is built around the few things you do every day, not around every option that could exist. I walk you through it once at handover and stay reachable after.", el: "Αυτός είναι ο σκοπός. Η πλευρά διαχείρισης χτίζεται γύρω από τα λίγα πράγματα που κάνεις κάθε μέρα, όχι γύρω από κάθε πιθανή επιλογή. Σου το δείχνω μία φορά στην παράδοση και παραμένω διαθέσιμος μετά." } as BL,
      },
    ] as FAQ[],
  },
  {
    slug: "ai-automation",
    icon: "⊡",
    seoTitle: {
      en: "AI Automations",
      el: "Αυτοματισμοί AI",
    } as BL,
    title: {
      en: "AI Receptionists and Business Automations",
      el: "AI Ρεσεψιονίστ και Αυτοματισμοί Επιχείρησης",
    } as BL,
    hook: {
      en: "An assistant that answers the same twenty questions at midnight, in Greek or English, and hands over a booking when the answer is yes.",
      el: "Ένας βοηθός που απαντά στις ίδιες είκοσι ερωτήσεις τα μεσάνυχτα, στα ελληνικά ή στα αγγλικά, και παραδίδει την κράτηση όταν η απάντηση είναι ναι.",
    } as BL,
    points: {
      en: [
        "Most enquiries are the same handful of questions. Answering them automatically buys back the hours you spend retyping them.",
        "Grounded in your real information, so it quotes your hours, your prices and your policies rather than inventing them.",
        "Hands off to a human or a booking form the moment it is out of its depth, instead of guessing.",
        "Spend is capped per user and per session, so an abusive loop cannot turn into a runaway bill.",
      ],
      el: [
        "Τα περισσότερα ερωτήματα είναι οι ίδιες λίγες ερωτήσεις. Η αυτόματη απάντησή τους σου επιστρέφει τις ώρες που ξαναγράφεις τα ίδια.",
        "Στηρίζεται στις πραγματικές σου πληροφορίες, ώστε να λέει το ωράριό σου, τις τιμές σου και τους όρους σου αντί να τα επινοεί.",
        "Παραδίδει σε άνθρωπο ή σε φόρμα κράτησης μόλις ξεπεραστεί, αντί να μαντέψει.",
        "Η δαπάνη έχει όριο ανά χρήστη και ανά συνεδρία, ώστε ένας κακόβουλος βρόχος να μη γίνει ανεξέλεγκτος λογαριασμός.",
      ],
    } as BLA,
    included: {
      en: [
        "An assistant grounded in your hours, prices, policies and services",
        "Greek and English, switching to whichever the visitor writes in",
        "Handover to a booking flow, a form or a phone number when it can't finish the job",
        "Per-user and per-session usage caps so costs stay predictable",
        "User input treated as untrusted, so a visitor can't talk it into ignoring its instructions",
        "A log of what was asked and answered, so you can see what customers actually want",
        "No customer data used to train anyone's model",
        "Lifetime support for the automation's security and functionality",
      ],
      el: [
        "Βοηθός βασισμένος στο ωράριο, τις τιμές, τους όρους και τις υπηρεσίες σου",
        "Ελληνικά και αγγλικά, με εναλλαγή σε όποια γλώσσα γράφει ο επισκέπτης",
        "Παράδοση σε ροή κράτησης, φόρμα ή τηλέφωνο όταν δεν μπορεί να ολοκληρώσει",
        "Όρια χρήσης ανά χρήστη και ανά συνεδρία ώστε το κόστος να παραμένει προβλέψιμο",
        "Η είσοδος του χρήστη αντιμετωπίζεται ως μη έμπιστη, ώστε ένας επισκέπτης να μην μπορεί να το πείσει να αγνοήσει τις οδηγίες του",
        "Καταγραφή του τι ρωτήθηκε και τι απαντήθηκε, ώστε να βλέπεις τι θέλουν πραγματικά οι πελάτες",
        "Κανένα δεδομένο πελάτη δεν χρησιμοποιείται για εκπαίδευση μοντέλου",
        "Υποστήριξη εφ' όρου ζωής για την ασφάλεια και τη λειτουργία του αυτοματισμού",
      ],
    } as BLA,
    relatedSectors: ["rentacar", "hotels", "health", "automotive"],
    faq: [
      {
        q: { en: "What stops it from making things up?", el: "Τι το εμποδίζει να λέει ανακρίβειες;" } as BL,
        a: { en: "It answers from your own information rather than from general knowledge, and it is built to say it doesn't know and pass you the enquiry instead of filling the gap. No system is perfect at this, which is why the handover matters more than the cleverness.", el: "Απαντά από τις δικές σου πληροφορίες και όχι από γενική γνώση, και είναι φτιαγμένο να λέει ότι δεν ξέρει και να σου προωθεί το ερώτημα αντί να καλύψει το κενό. Κανένα σύστημα δεν είναι τέλειο σε αυτό, γι' αυτό η παράδοση μετράει περισσότερο από την ευφυΐα." } as BL,
      },
      {
        q: { en: "Could it cost me a fortune in usage?", el: "Μπορεί να μου κοστίσει μια περιουσία σε χρήση;" } as BL,
        a: { en: "Not without you deciding to raise the ceiling. Usage is capped per visitor and per session, so the worst case is that the assistant stops answering, not that you get an unexpected invoice.", el: "Όχι χωρίς να αποφασίσεις εσύ να ανεβάσεις το όριο. Η χρήση έχει πλαφόν ανά επισκέπτη και ανά συνεδρία, οπότε η χειρότερη περίπτωση είναι να σταματήσει να απαντά ο βοηθός, όχι να σου έρθει απρόσμενος λογαριασμός." } as BL,
      },
      {
        q: { en: "Does it replace answering the phone?", el: "Αντικαθιστά το να σηκώνω το τηλέφωνο;" } as BL,
        a: { en: "It replaces the repetitive part of it. The calls worth your voice still reach you, and the assistant absorbs the ones asking whether you're open on Sunday.", el: "Αντικαθιστά το επαναλαμβανόμενο κομμάτι του. Οι κλήσεις που αξίζουν τη φωνή σου φτάνουν ακόμη σε εσένα, και ο βοηθός απορροφά εκείνες που ρωτούν αν είσαι ανοιχτά την Κυριακή." } as BL,
      },
      {
        q: { en: "Where does the conversation data go?", el: "Πού πηγαίνουν τα δεδομένα των συνομιλιών;" } as BL,
        a: { en: "Into your own logs, so you can read them. It isn't used to train a model, and the privacy policy on your site says so in plain terms, which GDPR requires you to be able to show.", el: "Στα δικά σου αρχεία καταγραφής, ώστε να μπορείς να τα διαβάσεις. Δεν χρησιμοποιούνται για εκπαίδευση μοντέλου, και η πολιτική απορρήτου στο site σου το λέει καθαρά, κάτι που ο GDPR απαιτεί να μπορείς να αποδείξεις." } as BL,
      },
    ] as FAQ[],
  },
];

/**
 * Case studies for the three live client sites. Deliberately no invented
 * business metrics: every claim here is something verifiable by opening the
 * site or reading its HTML, because a fabricated conversion figure is worth
 * less than nothing the moment a prospect checks it.
 */
export type CaseStudy = {
  slug: string;
  client: string;
  projectTitle: string;
  seoTitle: BL;
  title: BL;
  sector: string;
  service: string;
  /** Absent for a build with nothing public to open. */
  live?: string;
  /** Set only while a build is unfinished, and shown as a badge. */
  status?: BL;
  /** Rendered by its own component instead of the standard case study layout. */
  bespoke?: boolean;
  summary: BL;
  challenge?: BL;
  approach?: BLA;
  outcome?: BLA;
  stack: string[];
  image: string;
  imageMobile: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "international-rentals",
    client: "International Rentals",
    projectTitle: "International Rentals Fleet Operations",
    seoTitle: {
      en: "International Rentals, Fleet Operations App",
      el: "International Rentals, Εφαρμογή Διαχείρισης Στόλου",
    } as BL,
    title: {
      en: "Fleet operations, off paper",
      el: "Διαχείριση στόλου, χωρίς χαρτί",
    } as BL,
    sector: "rentacar",
    service: "booking-systems",
    status: { en: "In development", el: "Σε εξέλιξη" } as BL,
    bespoke: true,
    summary: {
      en: "A Greek rent-a-car company runs roughly 100 cars through reps stationed at hotel desks. Availability, prices, contracts and cash all live on paper and in phone calls. This is the operations platform replacing that, end to end.",
      el: "Ελληνική εταιρεία rent-a-car κινεί περίπου 100 αυτοκίνητα μέσα από αντιπροσώπους σε ξενοδοχεία. Η διαθεσιμότητα, οι τιμές, τα συμφωνητικά και τα μετρητά ζουν σε χαρτί και σε τηλεφωνήματα. Αυτή είναι η πλατφόρμα που τα αντικαθιστά, από άκρη σε άκρη.",
    } as BL,
    stack: ["Next.js", "TypeScript", "Postgres RLS", "Android TWA", "Bilingual"],
    image: "/projects/international.webp",
    imageMobile: "/projects/international-mobile.webp",
  },
  {
    slug: "blessed-coffee",
    client: "Blessed Coffee & Spirits",
    projectTitle: "Blessed Coffee & Spirits",
    seoTitle: {
      en: "Blessed Coffee, Cafe Website",
      el: "Blessed Coffee, Καφετέρια Αθήνα",
    } as BL,
    title: {
      en: "A cafe in two languages",
      el: "Μια καφετέρια σε δύο γλώσσες",
    } as BL,
    sector: "food",
    service: "websites",
    live: "https://blessed.cafe/",
    summary: {
      en: "A specialty coffee and cocktail bar in Kato Patisia, Athens, serving a Greek-speaking neighbourhood and English-speaking visitors from the same address.",
      el: "Μπαρ specialty καφέ και cocktails στα Κάτω Πατήσια, που εξυπηρετεί μια ελληνόφωνη γειτονιά και αγγλόφωνους επισκέπτες από την ίδια διεύθυνση.",
    } as BL,
    challenge: {
      en: "The site is a React single-page app, which means the content only exists after JavaScript runs. Most AI answer engines and a good share of crawlers never run it, so to them the page was effectively blank. On top of that, the business is genuinely bilingual, and the delivery platforms it depends on each wanted a link.",
      el: "Το site είναι React single-page app, που σημαίνει ότι το περιεχόμενο υπάρχει μόνο αφού τρέξει η JavaScript. Οι περισσότερες μηχανές απαντήσεων AI και αρκετοί crawlers δεν την τρέχουν ποτέ, οπότε γι' αυτούς η σελίδα ήταν ουσιαστικά κενή. Επιπλέον, η επιχείρηση είναι πραγματικά δίγλωσση, και οι πλατφόρμες delivery από τις οποίες εξαρτάται ήθελε η καθεμία τον σύνδεσμό της.",
    } as BL,
    approach: {
      en: [
        "A crawlable fallback written directly into index.html, carrying the address, phone numbers, opening hours and menu summary in both Greek and English. React replaces it on mount, so visitors never see it and crawlers always do.",
        "The fallback is deliberately limited to facts that do not change. Prices live in one place in the app and are not duplicated into the HTML, because a stale price is worse than no price.",
        "CafeOrCoffeeShop schema with real opening hours, geo coordinates and a postal address, so a search engine knows what the business is rather than guessing from the words on the page.",
        "It is styled to the brand's black and cream palette rather than left unstyled, since it is on screen for the moment before React mounts and a white flash would read as a broken page.",
        "Ordering links to e-food, Wolt and Box sit in the crawlable layer too, so the routes that actually take orders are never behind JavaScript.",
      ],
      el: [
        "Ένα crawlable fallback γραμμένο απευθείας στο index.html, με τη διεύθυνση, τα τηλέφωνα, το ωράριο και μια σύνοψη του μενού στα ελληνικά και στα αγγλικά. Το React το αντικαθιστά κατά τη φόρτωση, οπότε οι επισκέπτες δεν το βλέπουν ποτέ και οι crawlers πάντα.",
        "Το fallback περιορίζεται σκόπιμα σε στοιχεία που δεν αλλάζουν. Οι τιμές βρίσκονται σε ένα σημείο μέσα στην εφαρμογή και δεν αντιγράφονται στο HTML, γιατί μια ξεπερασμένη τιμή είναι χειρότερη από καμία τιμή.",
        "Schema CafeOrCoffeeShop με πραγματικό ωράριο, γεωγραφικές συντεταγμένες και ταχυδρομική διεύθυνση, ώστε η μηχανή αναζήτησης να ξέρει τι είναι η επιχείρηση αντί να το μαντεύει από τις λέξεις της σελίδας.",
        "Είναι στιλιζαρισμένο στη μαύρη και κρεμ παλέτα της επωνυμίας αντί να μείνει άστυλο, αφού είναι στην οθόνη για τη στιγμή πριν φορτώσει το React και ένα λευκό φλας θα έμοιαζε με χαλασμένη σελίδα.",
        "Οι σύνδεσμοι παραγγελίας προς e-food, Wolt και Box βρίσκονται και αυτοί στο crawlable στρώμα, ώστε οι δρόμοι που όντως φέρνουν παραγγελίες να μην είναι ποτέ πίσω από JavaScript.",
      ],
    } as BLA,
    outcome: {
      en: [
        "Both languages are in the served HTML, verifiable by fetching the page with JavaScript disabled.",
        "The business details a local search needs, address, hours, phone, are machine-readable rather than baked into an image or a script.",
        "Legal pages are real, separately addressable URLs rather than modal dialogs, so they can be indexed and linked.",
      ],
      el: [
        "Και οι δύο γλώσσες βρίσκονται στο HTML που σερβίρεται, κάτι επαληθεύσιμο ζητώντας τη σελίδα με απενεργοποιημένη JavaScript.",
        "Τα στοιχεία που χρειάζεται μια τοπική αναζήτηση, διεύθυνση, ωράριο, τηλέφωνο, είναι αναγνώσιμα από μηχανή αντί να είναι ψημένα σε εικόνα ή σε script.",
        "Οι νομικές σελίδες είναι πραγματικά, ξεχωριστά URL και όχι αναδυόμενα παράθυρα, οπότε μπορούν να ευρετηριαστούν και να συνδεθούν.",
      ],
    } as BLA,
    stack: ["React", "Vite", "JavaScript", "Tailwind", "Schema.org", "Bilingual"],
    image: "/projects/blessed.webp",
    imageMobile: "/projects/blessed-mobile.webp",
  },
  {
    slug: "ellie-tattooer",
    client: "Ellie Tattooer",
    projectTitle: "Ellie Tattooer",
    seoTitle: {
      en: "Ellie Tattooer, Portfolio and Shop",
      el: "Ellie Tattooer, Portfolio",
    } as BL,
    title: {
      en: "A tattoo portfolio that sells",
      el: "Ένα portfolio τατουάζ που πουλάει",
    } as BL,
    sector: "artists",
    service: "eshop",
    live: "https://ellietattooer.com/",
    summary: {
      en: "An American Traditional tattoo artist working out of Ritual Tattoo in Athens, whose work was living entirely inside a social feed that crops it and reorders it.",
      el: "Καλλιτέχνις τατουάζ American Traditional που εργάζεται στο Ritual Tattoo στην Αθήνα, με τη δουλειά της να ζει εξ ολοκλήρου μέσα σε ένα social feed που την κόβει και την αναδιατάσσει.",
    } as BL,
    challenge: {
      en: "A tattoo artist's portfolio is the sales pitch, and a social platform decides how much of it anyone sees. The work needed to be shown at full quality, in an order she controls, alongside a way to sell flash and prints without handing a cut of each sale to a marketplace. The visual identity is strong and specific, so a generic gallery template would have undercut the thing being sold.",
      el: "Το portfolio μιας καλλιτέχνιδας τατουάζ είναι η ίδια η πρόταση πώλησης, και μια πλατφόρμα social αποφασίζει πόσο από αυτό βλέπει ο καθένας. Η δουλειά έπρεπε να παρουσιάζεται σε πλήρη ποιότητα, με σειρά που ορίζει η ίδια, μαζί με έναν τρόπο να πουλάει flash και prints χωρίς να δίνει ποσοστό κάθε πώλησης σε μια αγορά τρίτων. Η οπτική ταυτότητα είναι έντονη και συγκεκριμένη, οπότε ένα γενικό template γκαλερί θα υπονόμευε αυτό ακριβώς που πουλιέται.",
    } as BL,
    approach: {
      en: [
        "A gallery built around full-quality imagery rather than thumbnails, with the ordering under her control instead of a feed algorithm's.",
        "A shop for flash and prints on the same domain as the portfolio, so the work and the way to buy it are never a link apart.",
        "The interface is styled to her existing identity rather than to a template, because for an artist the site is part of the portfolio, not a container for it.",
        "TattooParlor schema with the studio's real address, so a search for a tattoo artist in Athens can match the business rather than only the name.",
        "Privacy and terms as real routes, which a shop taking payments needs to have and to be able to show.",
      ],
      el: [
        "Γκαλερί χτισμένη γύρω από εικόνα πλήρους ποιότητας αντί για μικρογραφίες, με τη σειρά να την ελέγχει η ίδια και όχι ο αλγόριθμος ενός feed.",
        "Κατάστημα για flash και prints στο ίδιο domain με το portfolio, ώστε η δουλειά και ο τρόπος αγοράς της να μην απέχουν ποτέ έναν σύνδεσμο.",
        "Η διεπαφή είναι στιλιζαρισμένη στη δική της ταυτότητα και όχι σε template, γιατί για μια καλλιτέχνιδα το site είναι μέρος του portfolio, όχι απλώς το δοχείο του.",
        "Schema TattooParlor με την πραγματική διεύθυνση του στούντιο, ώστε μια αναζήτηση για καλλιτέχνη τατουάζ στην Αθήνα να μπορεί να ταιριάξει την επιχείρηση και όχι μόνο το όνομα.",
        "Πολιτική απορρήτου και όροι ως πραγματικές διαδρομές, κάτι που ένα κατάστημα που δέχεται πληρωμές πρέπει να έχει και να μπορεί να δείξει.",
      ],
    } as BLA,
    outcome: {
      en: [
        "The portfolio lives on a domain she owns, so no platform decides who sees it.",
        "The page title targets what a customer actually searches, the style and the city, rather than only the artist's name.",
        "The site links back here without a nofollow, which is how a small studio's reputation compounds honestly.",
      ],
      el: [
        "Το portfolio ζει σε domain που της ανήκει, οπότε καμία πλατφόρμα δεν αποφασίζει ποιος το βλέπει.",
        "Ο τίτλος της σελίδας στοχεύει σε αυτό που όντως αναζητά ένας πελάτης, το στιλ και την πόλη, και όχι μόνο στο όνομα της καλλιτέχνιδας.",
        "Το site συνδέει πίσω σε εμάς χωρίς nofollow, που είναι ο τίμιος τρόπος να χτίζεται η φήμη ενός μικρού στούντιο.",
      ],
    } as BLA,
    stack: ["Next.js", "TypeScript", "Tailwind", "E-commerce", "Schema.org"],
    image: "/projects/ellietattooer.webp",
    imageMobile: "/projects/ellietattooer-mobile.webp",
  },
  {
    slug: "those-rambling-fools",
    client: "Those Rambling Fools",
    projectTitle: "Those Rambling Fools Band",
    seoTitle: {
      en: "Those Rambling Fools, Band Site",
      el: "Those Rambling Fools, Συγκρότημα",
    } as BL,
    title: {
      en: "A band site that plays",
      el: "Ένα site συγκροτήματος που παίζει",
    } as BL,
    sector: "artists",
    service: "websites",
    live: "https://thoseramblingfools.com/",
    summary: {
      en: "A band writing original music from Kos, needing somewhere to be heard that is not a streaming profile identical to every other streaming profile.",
      el: "Ένα συγκρότημα που γράφει δική του μουσική από την Κω, με ανάγκη για ένα σημείο όπου να ακούγεται, που να μην είναι ένα προφίλ streaming ίδιο με κάθε άλλο προφίλ streaming.",
    } as BL,
    challenge: {
      en: "Every band has the same links to the same platforms, so the site itself has to be the thing worth visiting. It also has to be a real site underneath the interaction: gigs people can find, a story worth reading, and enough structure for a search engine to understand that this is a music group with releases rather than a page of animation.",
      el: "Κάθε συγκρότημα έχει τους ίδιους συνδέσμους προς τις ίδιες πλατφόρμες, οπότε το ίδιο το site πρέπει να είναι αυτό που αξίζει την επίσκεψη. Πρέπει επίσης να είναι πραγματικό site από κάτω: εμφανίσεις που βρίσκει ο κόσμος, μια ιστορία που αξίζει να διαβαστεί, και αρκετή δομή ώστε μια μηχανή αναζήτησης να καταλάβει ότι πρόκειται για μουσικό σχήμα με κυκλοφορίες και όχι για μια σελίδα με animation.",
    } as BL,
    approach: {
      en: [
        "A working vinyl record player as the centre of the page: the interaction is the point, not decoration bolted onto a template.",
        "Separate routes for the story and for upcoming gigs, so each is its own indexable page that can be linked and shared on its own.",
        "MusicGroup and MusicAlbum schema naming the members and the releases, which is what lets a search engine present the band as an entity rather than a string of text.",
        "The heavy interaction is kept off the critical path, so the content is present in the served HTML rather than waiting on the animation to finish.",
        "Privacy and terms as real routes, because a site collecting anything at all needs them and they cost nothing to do properly.",
      ],
      el: [
        "Ένα λειτουργικό πικάπ βινυλίου στο κέντρο της σελίδας: η αλληλεπίδραση είναι το ζητούμενο, όχι διακόσμηση βιδωμένη πάνω σε template.",
        "Ξεχωριστές διαδρομές για την ιστορία και για τις επερχόμενες εμφανίσεις, ώστε καθεμία να είναι δική της ευρετηριάσιμη σελίδα που μπορεί να συνδεθεί και να μοιραστεί αυτόνομα.",
        "Schema MusicGroup και MusicAlbum που ονοματίζει τα μέλη και τις κυκλοφορίες, κάτι που επιτρέπει σε μια μηχανή αναζήτησης να παρουσιάσει το συγκρότημα ως οντότητα και όχι ως μια σειρά χαρακτήρων.",
        "Η βαριά αλληλεπίδραση μένει εκτός της κρίσιμης διαδρομής, ώστε το περιεχόμενο να υπάρχει στο HTML που σερβίρεται αντί να περιμένει να τελειώσει το animation.",
        "Πολιτική απορρήτου και όροι ως πραγματικές διαδρομές, γιατί ένα site που συλλέγει οτιδήποτε τις χρειάζεται και δεν κοστίζει τίποτα να γίνουν σωστά.",
      ],
    } as BLA,
    outcome: {
      en: [
        "Four indexable routes rather than one long scroll, so gigs and the band's story can rank and be shared separately.",
        "The band is described in structured data as a music group with named members and releases.",
        "The site links back here without a nofollow.",
      ],
      el: [
        "Τέσσερις ευρετηριάσιμες διαδρομές αντί για ένα μακρύ scroll, ώστε οι εμφανίσεις και η ιστορία του συγκροτήματος να μπορούν να καταταγούν και να μοιραστούν ξεχωριστά.",
        "Το συγκρότημα περιγράφεται στα structured data ως μουσικό σχήμα με ονοματισμένα μέλη και κυκλοφορίες.",
        "Το site συνδέει πίσω σε εμάς χωρίς nofollow.",
      ],
    } as BLA,
    stack: ["Next.js", "TypeScript", "Tailwind", "Interactive Animations", "Schema.org"],
    image: "/projects/trf.webp",
    imageMobile: "/projects/trf-mobile.webp",
  },
];
