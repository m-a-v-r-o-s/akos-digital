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

export const sectors = [
  {
    icon: "❖",
    title: {
      en: "Restaurants & Cafés",
      el: "Επιχειρήσεις Εστίασης",
    } as BL,
    points: {
      en: [
        "A living menu with photography that sells the dishes before a guest arrives, updated in seconds and never reprinted.",
        "Reservations taken around the clock, so the phone stops ringing in the middle of service.",
        "Found on Google and maps the moment locals and travellers search for somewhere to eat nearby.",
      ],
      el: [
        "Ένα ζωντανό μενού με φωτογραφία που πουλά τα πιάτα πριν φτάσει ο πελάτης, ενημερώνεται σε δευτερόλεπτα και δεν ξανατυπώνεται.",
        "Κρατήσεις όλο το εικοσιτετράωρο, ώστε να μη χτυπά το τηλέφωνο μέσα στην υπηρεσία.",
        "Εμφάνιση στο Google και στους χάρτες τη στιγμή που ντόπιοι και ταξιδιώτες ψάχνουν πού θα φάνε κοντά τους.",
      ],
    } as BLA,
  },
  {
    icon: "✦",
    title: {
      en: "Artists & Creatives",
      el: "Καλλιτέχνες",
    } as BL,
    points: {
      en: [
        "A gallery that shows your work in full quality and on your terms, not squeezed into a social feed.",
        "Sell prints, commissions, or tickets directly and keep a bigger share of every sale.",
        "One home for collectors, press, and bookings, plus a mailing list so your audience hears about new work first.",
      ],
      el: [
        "Μια γκαλερί που δείχνει τη δουλειά σου σε πλήρη ποιότητα και με τους δικούς σου όρους, όχι στριμωγμένη σε ένα social feed.",
        "Πώληση prints, παραγγελιών ή εισιτηρίων απευθείας, κρατώντας μεγαλύτερο μέρος από κάθε πώληση.",
        "Ένα σπίτι για συλλέκτες, τύπο και κρατήσεις, μαζί με λίστα email ώστε το κοινό σου να μαθαίνει πρώτο τα νέα σου.",
      ],
    } as BLA,
  },
  {
    icon: "✚",
    title: {
      en: "Health Professionals",
      el: "Επαγγελματίες Υγείας",
    } as BL,
    points: {
      en: [
        "Online appointment booking that keeps filling your calendar while you are with patients.",
        "A calm, professional presence that earns trust from the very first click.",
        "Clear answers on services, hours, and location, so the phone rings less and the right patients arrive.",
      ],
      el: [
        "Online κράτηση ραντεβού που γεμίζει το πρόγραμμά σου ενώ εσύ είσαι με τους ασθενείς.",
        "Μια ήρεμη, επαγγελματική παρουσία που κερδίζει την εμπιστοσύνη από το πρώτο κλικ.",
        "Ξεκάθαρες απαντήσεις για υπηρεσίες, ώρες και τοποθεσία, ώστε να χτυπά λιγότερο το τηλέφωνο και να έρχονται οι σωστοί ασθενείς.",
      ],
    } as BLA,
  },
  {
    icon: "◈",
    title: {
      en: "Rent-a-Car",
      el: "Rent-a-Car",
    } as BL,
    points: {
      en: [
        "Real-time availability and online booking with deposits, instead of endless back-and-forth messages.",
        "Fleet, pricing, and terms laid out clearly, so customers reserve with confidence.",
        "Reaches travellers who book before they even land, and offers insurance, seats, and delivery at checkout.",
      ],
      el: [
        "Διαθεσιμότητα σε πραγματικό χρόνο και online κράτηση με προκαταβολή, αντί για ατελείωτα μηνύματα πέρα δώθε.",
        "Στόλος, τιμές και όροι ξεκάθαρα, ώστε ο πελάτης να κλείνει με σιγουριά.",
        "Φτάνει σε ταξιδιώτες που κλείνουν πριν καν προσγειωθούν, και προσφέρει ασφάλεια, καθίσματα και παράδοση στο ταμείο.",
      ],
    } as BLA,
  },
  {
    icon: "⌂",
    title: {
      en: "Hotels & Short Stays",
      el: "Ξενοδοχεία & Καταλύματα Βραχυπρόθεσμης Διαμονής",
    } as BL,
    points: {
      en: [
        "Direct bookings that skip platform commissions and keep the guest relationship yours.",
        "Immersive photography and honest room detail that turn browsers into reservations.",
        "Multilingual pages and instant enquiries that reach international travellers and answer them fast.",
      ],
      el: [
        "Απευθείας κρατήσεις που παρακάμπτουν τις προμήθειες των πλατφορμών και κρατούν δική σου τη σχέση με τον επισκέπτη.",
        "Εμβυθιστική φωτογραφία και ειλικρινής λεπτομέρεια δωματίων που μετατρέπουν τους επισκέπτες σε κρατήσεις.",
        "Πολύγλωσσες σελίδες και άμεσα ερωτήματα που φτάνουν σε ταξιδιώτες από όλο τον κόσμο και τους απαντούν γρήγορα.",
      ],
    } as BLA,
  },
];
