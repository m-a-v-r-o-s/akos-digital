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

export const projects = [
  {
    title: "Thalatta Bay Concept",
    description: {
      en: "Concept site for a five-star seafront resort and spa in Elounda, Crete. Minimalist luxury with immersive Aegean photography, five dining venues, a sea-water spa, and booking woven throughout the experience.",
      el: "Concept site για πολυτελές θέρετρο και spa πέντε αστέρων στην Ελούντα της Κρήτης. Μινιμαλιστική πολυτέλεια με εμβυθιστική αιγαιοπελαγίτικη φωτογραφία, πέντε χώρους εστίασης, spa θαλασσοθεραπείας και κρατήσεις ενσωματωμένες στην εμπειρία.",
    } as BL,
    tags: ["Next.js", "TypeScript", "Tailwind", "Booking", "Hospitality"],
    image: "/projects/thalatta.webp",
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
    sector: "rentacar",
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
      en: "A fully local AND automated Home Assistant system, no cloud, no subscriptions, no data leaving your space. Lights, climate, security cameras, sensors, and much more unified under one private dashboard accessible ONLY through an encrypted local connection. Every automation runs locally, responds instantly and keeps working even without internet.",
      el: "Ένα πλήρως τοπικό και αυτοματοποιημένο σύστημα Home Assistant, χωρίς cloud, χωρίς συνδρομές, χωρίς δεδομένα που φεύγουν από το χώρο σου. Φωτισμός, κλιματισμός, κάμερες ασφαλείας, αισθητήρες και πολλά άλλα σε ένα ιδιωτικό dashboard προσβάσιμο ΜΟΝΟ μέσω κρυπτογραφημένης τοπικής σύνδεσης. Κάθε αυτοματισμός τρέχει τοπικά αποκρίνεται άμεσα και συνεχίζει να λειτουργεί ακόμα και χωρίς internet.",
    } as BL,
  },
];

export type FAQ = { q: BL; a: BL };

export const sectors = [
  {
    slug: "food",
    icon: "❖",
    title: {
      en: "Restaurants & Cafés",
      el: "Επιχειρήσεις Εστίασης",
    } as BL,
    hook: {
      en: "Turn a hungry Google search into a booked table.",
      el: "Κάνε την πεινασμένη αναζήτηση στο Google κλεισμένο τραπέζι.",
    } as BL,
    points: {
      en: [
        "A living menu with photography that sells the dishes before a guest arrives, updated in seconds and never reprinted.",
        "Reservations taken around the clock, so the phone stops ringing in the middle of service.",
        "Found on Google and maps the moment locals and travellers search for somewhere to eat nearby.",
      ],
      el: [
        "Ένα ζωντανό μενού με φωτογραφίες που πουλάει τα πιάτα πριν καν φτάσει ο πελάτης, το ενημερώνεις σε δευτερόλεπτα και δεν το ξανατυπώνεις ποτέ.",
        "Κρατήσεις όλο το εικοσιτετράωρο, για να μη χτυπάει το τηλέφωνο την ώρα του σέρβις.",
        "Σε βρίσκουν στο Google και στους χάρτες τη στιγμή που ντόπιοι και τουρίστες ψάχνουν πού θα φάνε εδώ κοντά.",
      ],
    } as BLA,
    included: {
      en: [
        "A photo menu you update yourself in seconds",
        "Table reservations taken 24/7",
        "Google Maps and local-search setup so you're found nearby",
        "A mobile-first design with gallery and story",
      ],
      el: [
        "Μενού με φωτογραφίες που ενημερώνεις μόνος σου σε δευτερόλεπτα",
        "Κρατήσεις τραπεζιού όλο το εικοσιτετράωρο",
        "Ρύθμιση Google Maps και τοπικής αναζήτησης για να σε βρίσκουν κοντά τους",
        "Σχεδιασμός mobile-first με gallery και ιστορία",
      ],
    } as BLA,
    faq: [
      {
        q: { en: "Can guests book a table online?", el: "Μπορούν οι πελάτες να κλείνουν τραπέζι online;" } as BL,
        a: { en: "Yes. You take reservations around the clock, with the details landing straight in your inbox.", el: "Ναι. Δέχεσαι κρατήσεις όλο το εικοσιτετράωρο, με τα στοιχεία να έρχονται κατευθείαν στο inbox σου." } as BL,
      },
      {
        q: { en: "Can I change the menu myself?", el: "Μπορώ να αλλάζω μόνος μου το μενού;" } as BL,
        a: { en: "Absolutely. Prices and dishes update in seconds, with no reprinting and no calling me.", el: "Φυσικά. Τιμές και πιάτα αλλάζουν σε δευτερόλεπτα, χωρίς ανατύπωση και χωρίς να με παίρνεις τηλέφωνο." } as BL,
      },
      {
        q: { en: "Will people find me on Google?", el: "Θα με βρίσκουν στο Google;" } as BL,
        a: { en: "That's part of the build: local SEO and Google Maps so nearby searches lead to you.", el: "Είναι μέρος της δουλειάς: τοπικό SEO και Google Maps ώστε οι κοντινές αναζητήσεις να καταλήγουν σε σένα." } as BL,
      },
    ] as FAQ[],
  },
  {
    slug: "artists",
    icon: "✦",
    title: {
      en: "Artists & Creatives",
      el: "Καλλιτέχνες",
    } as BL,
    hook: {
      en: "Show your work like it deserves, and sell it on your own terms.",
      el: "Δείξε τη δουλειά σου όπως της αξίζει και πούλησέ την με τους δικούς σου όρους.",
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
      ],
      el: [
        "Portfolio gallery σε πλήρη ποιότητα",
        "Κατάστημα για prints, παραγγελίες ή εισιτήρια",
        "Λίστα email για να μεγαλώνεις το κοινό σου",
        "Ένα σημείο για τύπο, κρατήσεις και συνδέσμους",
      ],
    } as BLA,
    faq: [
      {
        q: { en: "Can I sell directly from the site?", el: "Μπορώ να πουλάω απευθείας από το site;" } as BL,
        a: { en: "Yes: prints, commissions, or tickets, so you keep a bigger share than a marketplace leaves you.", el: "Ναι: prints, παραγγελίες ή εισιτήρια, ώστε να κρατάς μεγαλύτερο μέρος απ' ό,τι σου αφήνει ένα marketplace." } as BL,
      },
      {
        q: { en: "Can I update the gallery myself?", el: "Μπορώ να ανανεώνω μόνος μου τη gallery;" } as BL,
        a: { en: "Yes, adding new work is quick and doesn't need me.", el: "Ναι, το να προσθέτεις νέα δουλειά είναι γρήγορο και δεν με χρειάζεται." } as BL,
      },
      {
        q: { en: "Can I collect emails from fans?", el: "Μπορώ να μαζεύω email από το κοινό μου;" } as BL,
        a: { en: "Yes, a mailing list is built in so your audience hears about new work and shows first.", el: "Ναι, η λίστα email είναι ενσωματωμένη ώστε το κοινό σου να μαθαίνει πρώτο για νέα έργα και εμφανίσεις." } as BL,
      },
    ] as FAQ[],
  },
  {
    slug: "health",
    icon: "✚",
    title: {
      en: "Health Professionals",
      el: "Επαγγελματίες Υγείας",
    } as BL,
    hook: {
      en: "A calm, trusted presence that fills your calendar while you work.",
      el: "Μια ήρεμη, αξιόπιστη παρουσία που γεμίζει το πρόγραμμά σου όσο εσύ δουλεύεις.",
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
        q: { en: "Can patients book appointments online?", el: "Μπορούν οι ασθενείς να κλείνουν ραντεβού online;" } as BL,
        a: { en: "Yes, your calendar fills up on its own while you focus on care.", el: "Ναι, το πρόγραμμά σου γεμίζει μόνο του όσο εσύ επικεντρώνεσαι στη φροντίδα." } as BL,
      },
      {
        q: { en: "Will it look professional and trustworthy?", el: "Θα δείχνει επαγγελματικό και αξιόπιστο;" } as BL,
        a: { en: "That's the whole point: a calm, clean design that reassures patients from the first second.", el: "Αυτός είναι όλος ο στόχος: ένας ήρεμος, καθαρός σχεδιασμός που καθησυχάζει τον ασθενή από το πρώτο δευτερόλεπτο." } as BL,
      },
      {
        q: { en: "Is patient data handled safely?", el: "Τα δεδομένα των ασθενών είναι ασφαλή;" } as BL,
        a: { en: "Yes, forms are set up with privacy and GDPR consent in mind.", el: "Ναι, οι φόρμες στήνονται με γνώμονα την ιδιωτικότητα και τη συγκατάθεση GDPR." } as BL,
      },
    ] as FAQ[],
  },
  {
    slug: "rentacar",
    icon: "◈",
    title: {
      en: "Rent-a-Car",
      el: "Rent-a-Car",
    } as BL,
    hook: {
      en: "Take real bookings and deposits before travellers even land.",
      el: "Κλείσε αληθινές κρατήσεις με προκαταβολή, πριν καν προσγειωθεί ο ταξιδιώτης.",
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
      ],
      el: [
        "Διαθεσιμότητα σε πραγματικό χρόνο και online κράτηση",
        "Κατάλογος στόλου με φωτογραφίες και τιμές",
        "Προκαταβολή ή πλήρης πληρωμή στο ταμείο",
        "Admin panel για τη διαχείριση κρατήσεων και στόλου",
      ],
    } as BLA,
    faq: [
      {
        q: { en: "Can customers see availability and book online?", el: "Μπορούν οι πελάτες να βλέπουν διαθεσιμότητα και να κλείνουν online;" } as BL,
        a: { en: "Yes, real-time availability by dates and pickup point, booked in a couple of minutes.", el: "Ναι, διαθεσιμότητα σε πραγματικό χρόνο ανά ημερομηνία και σημείο παραλαβής, με κράτηση σε δυο λεπτά." } as BL,
      },
      {
        q: { en: "Can I take a deposit or full payment?", el: "Μπορώ να παίρνω προκαταβολή ή ολόκληρο το ποσό;" } as BL,
        a: { en: "Yes, collect a deposit online or the full amount, whichever you prefer.", el: "Ναι, μπορείς να εισπράττεις προκαταβολή online ή όλο το ποσό, όπως προτιμάς." } as BL,
      },
      {
        q: { en: "Can I manage the fleet and bookings?", el: "Μπορώ να διαχειρίζομαι τον στόλο και τις κρατήσεις;" } as BL,
        a: { en: "Yes, an admin panel handles vehicles, bookings, and customers in one place, like the Nisos demo.", el: "Ναι, ένα admin panel διαχειρίζεται οχήματα, κρατήσεις και πελάτες σε ένα σημείο, όπως στο demo της Nisos." } as BL,
      },
    ] as FAQ[],
  },
  {
    slug: "hotels",
    icon: "⌂",
    title: {
      en: "Hotels & Short Stays",
      el: "Ξενοδοχεία & Καταλύματα Βραχυπρόθεσμης Διαμονής",
    } as BL,
    hook: {
      en: "Win direct bookings and keep the commission for yourself.",
      el: "Κέρδισε απευθείας κρατήσεις και κράτα την προμήθεια για σένα.",
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
      ],
      el: [
        "Παρουσίαση δωματίων και σουιτών με πραγματική λεπτομέρεια",
        "Διαθεσιμότητα, αιτήματα και απευθείας κράτηση",
        "Καθηλωτική φωτογραφία και διάταξη",
        "Πολύγλωσσες σελίδες για επισκέπτες από το εξωτερικό",
      ],
    } as BLA,
    faq: [
      {
        q: { en: "Can I take direct bookings?", el: "Μπορώ να δέχομαι απευθείας κρατήσεις;" } as BL,
        a: { en: "Yes, guests book straight with you, so you skip the platform commission and own the relationship.", el: "Ναι, οι επισκέπτες κλείνουν κατευθείαν μαζί σου, οπότε γλιτώνεις την προμήθεια της πλατφόρμας και κρατάς δική σου τη σχέση." } as BL,
      },
      {
        q: { en: "Can the site be multilingual?", el: "Μπορεί το site να είναι πολύγλωσσο;" } as BL,
        a: { en: "Yes, pages can speak to international travellers in their own language.", el: "Ναι, οι σελίδες μπορούν να μιλούν στους ταξιδιώτες από το εξωτερικό στη γλώσσα τους." } as BL,
      },
      {
        q: { en: "Can I still use Booking or Airbnb too?", el: "Μπορώ να χρησιμοποιώ και Booking ή Airbnb;" } as BL,
        a: { en: "Of course. It works alongside them and simply wins you the direct, commission-free bookings on top.", el: "Φυσικά. Λειτουργεί παράλληλα μ' αυτά και απλώς σου κερδίζει επιπλέον τις απευθείας κρατήσεις χωρίς προμήθεια." } as BL,
      },
    ] as FAQ[],
  },
];
