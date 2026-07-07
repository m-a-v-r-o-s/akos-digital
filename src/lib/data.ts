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
      en: "Self-serve digital menu, online table reservations, a food gallery, and a Google Maps listing.",
      el: "Ψηφιακό μενού που ενημερώνεις μόνος σου, online κρατήσεις τραπεζιού, gallery φαγητού και καταχώρηση στο Google Maps.",
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
        "GDPR-compliant by default",
      ],
      el: [
        "Μενού με φωτογραφίες που ενημερώνεις μόνος σου σε δευτερόλεπτα",
        "Κρατήσεις τραπεζιού όλο το εικοσιτετράωρο",
        "Ρύθμιση Google Maps και τοπικής αναζήτησης για να σε βρίσκουν κοντά τους",
        "Σχεδιασμός mobile-first με gallery και ιστορία",
        "Συμβατό με το GDPR εξ ορισμού",
      ],
    } as BLA,
    faq: [
      {
        q: { en: "How long until my site is live?", el: "Σε πόσο καιρό θα είναι online το site μου;" } as BL,
        a: { en: "Most restaurant and café sites are ready in about 2 to 4 weeks, depending on the content and the number of pages.", el: "Τα περισσότερα sites για εστιατόρια και καφέ είναι έτοιμα σε περίπου 2 με 4 εβδομάδες, ανάλογα με το περιεχόμενο και τον αριθμό των σελίδων." } as BL,
      },
      {
        q: { en: "What do you need from me to start?", el: "Τι χρειάζεσαι από μένα για να ξεκινήσουμε;" } as BL,
        a: { en: "Your logo if you have one, a few photos of the space and the dishes, your menu, and your opening hours. I handle the rest.", el: "Το λογότυπό σου αν έχεις, μερικές φωτογραφίες από τον χώρο και τα πιάτα, το μενού σου και το ωράριο. Τα υπόλοιπα τα αναλαμβάνω εγώ." } as BL,
      },
      {
        q: { en: "Are hosting and the domain included?", el: "Περιλαμβάνονται το hosting και το domain;" } as BL,
        a: { en: "No, they're always separate from the build price. Hosting and the domain are recurring monthly or yearly costs; you can pay them through me if you prefer, or directly to the providers. Either way I set everything up for you.", el: "Όχι, είναι πάντα ξεχωριστά από την τιμή κατασκευής. Το hosting και το domain είναι επαναλαμβανόμενα μηνιαία ή ετήσια κόστη· μπορείς να τα πληρώνεις μέσω εμένα αν προτιμάς, ή απευθείας στους παρόχους. Σε κάθε περίπτωση, τα στήνω όλα για σένα." } as BL,
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
    slug: "health",
    icon: "✚",
    title: {
      en: "Health Professionals",
      el: "Επαγγελματίες Υγείας",
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
    icon: "◈",
    title: {
      en: "Rent-a-Car",
      el: "Rent-a-Car",
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
    icon: "⌂",
    title: {
      en: "Hotels & Short Stays",
      el: "Ξενοδοχεία & Καταλύματα Βραχυπρόθεσμης Διαμονής",
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
];
