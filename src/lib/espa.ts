import type { Lang } from "@/components/LanguageContext";
import type { Choice } from "@/lib/requestForm";

/**
 * Content for the /espa subpage: explains ESPA website funding and runs a free
 * eligibility assessment. Choice `value`s are stable keys stored in the lead's
 * `extra` JSON, so the data stays clean across languages.
 */

export const companyTypeOptions: Choice[] = [
  { value: "new", label: { en: "New business (being set up)", el: "Νέα επιχείρηση (υπό σύσταση)" } },
  { value: "existing", label: { en: "Existing business", el: "Υφιστάμενη επιχείρηση" } },
];

export const employeesOptions: Choice[] = [
  { value: "0", label: { en: "Just me (0 employees)", el: "Μόνο εγώ (0 εργαζόμενοι)" } },
  { value: "1_9", label: { en: "1–9", el: "1–9" } },
  { value: "10_49", label: { en: "10–49", el: "10–49" } },
  { value: "50_249", label: { en: "50–249", el: "50–249" } },
  { value: "250_plus", label: { en: "250+", el: "250+" } },
];

export const priorFundingOptions: Choice[] = [
  { value: "no", label: { en: "No", el: "Όχι" } },
  { value: "yes", label: { en: "Yes", el: "Ναι" } },
  { value: "unsure", label: { en: "Not sure", el: "Δεν είμαι σίγουρος" } },
];

export const programOptions: Choice[] = [
  { value: "digital_upgrade", label: { en: "Digital upgrade of my business", el: "Ψηφιακή αναβάθμιση της επιχείρησης" } },
  { value: "eshop", label: { en: "Online shop / e-commerce", el: "Ηλεκτρονικό κατάστημα / e-shop" } },
  { value: "extroversion", label: { en: "Exports / reaching foreign markets", el: "Εξωστρέφεια / ξένες αγορές" } },
  { value: "unsure", label: { en: "Not sure — help me find the right one", el: "Δεν ξέρω — βοήθησέ με να βρω το κατάλληλο" } },
];

export const espaUi: Record<Lang, {
  back: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  whatTitle: string;
  what: string[];
  coversTitle: string;
  covers: string[];
  stepsTitle: string;
  steps: { title: string; body: string }[];
  disclaimer: string;
  formTitle: string;
  formSubtitle: string;
  // fields
  fBusiness: string;
  fVat: string;
  fKad: string;
  fKadHint: string;
  fRegion: string;
  fCompanyType: string;
  fEmployees: string;
  fPrior: string;
  fProgram: string;
  fGoal: string;
  fGoalPlaceholder: string;
  fName: string;
  fEmail: string;
  fPhone: string;
  consent: string;
  consentNote: string;
  optional: string;
  submit: string;
  sending: string;
  // validation / states
  vRequired: string;
  vEmail: string;
  vConsent: string;
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorBody: string;
  backHome: string;
}> = {
  en: {
    back: "Back to home",
    eyebrow: "ESPA · Funding",
    title: "Build your website with ESPA funding",
    subtitle:
      "ESPA programs can co-fund your business's website or digital upgrade. Tell me a little about your business and I'll check — for free — whether you might qualify, then handle everything from build to the paperwork the audit needs.",
    whatTitle: "What is ESPA?",
    what: [
      "ESPA (ΕΣΠΑ) is the framework through which Greece and the EU co-finance investments in businesses. Different calls open through the year, each with its own budget and rules.",
      "In several programs — like digital transformation and extroversion — building or upgrading a website is an eligible expense when it's properly documented. That means part of the cost can be covered by the subsidy.",
    ],
    coversTitle: "What it can cover",
    covers: [
      "A new professional website or a full redesign",
      "An online shop (e-commerce) to start selling",
      "Booking systems, digital tools and integrations",
      "The technical documentation the managing authority requires",
    ],
    stepsTitle: "How it works",
    steps: [
      { title: "Free assessment", body: "Fill in the short form below. I review your details against the current calls and tell you honestly if it's worth pursuing." },
      { title: "We build", body: "If it fits, I design and build your website to the program's requirements — and to a standard you'd want anyway." },
      { title: "Audit-ready folder", body: "You receive the technical folder, manuals and documents the managing authority asks for at completion." },
    ],
    disclaimer:
      "Eligibility always depends on the specific active call and your business details. This assessment is free and carries no obligation — it's not a guarantee of approval.",
    formTitle: "Free eligibility check",
    formSubtitle: "A few quick details. I'll reply within 24 hours.",
    fBusiness: "Business name",
    fVat: "VAT number (ΑΦΜ)",
    fKad: "Main activity code (ΚΑΔ)",
    fKadHint: "If you know it — it helps match programs.",
    fRegion: "City / region",
    fCompanyType: "Is the business new or existing?",
    fEmployees: "How many employees?",
    fPrior: "Have you received ESPA funding before?",
    fProgram: "What are you mainly after?",
    fGoal: "What should the website do?",
    fGoalPlaceholder: "A short description of your goals…",
    fName: "Your name",
    fEmail: "Email",
    fPhone: "Phone",
    consent: "I agree to be contacted about my ESPA assessment.",
    consentNote: "Your details are only used to assess and respond, never shared or sold.",
    optional: "optional",
    submit: "Request free assessment",
    sending: "Sending…",
    vRequired: "Please fill in your name, business and email.",
    vEmail: "Please enter a valid email.",
    vConsent: "Please tick the box so I can get back to you.",
    successTitle: "Thank you — request received",
    successBody:
      "I've got your details and I'll review your ESPA eligibility, then get back to you within 24 hours.",
    errorTitle: "Hmm, that didn't go through",
    errorBody: "Please try again, or email me directly at info@akosds.com.",
    backHome: "Back to home",
  },
  el: {
    back: "Επιστροφή στην αρχική",
    eyebrow: "ΕΣΠΑ · Χρηματοδότηση",
    title: "Φτιάξε την ιστοσελίδα σου μέσω ΕΣΠΑ",
    subtitle:
      "Τα προγράμματα ΕΣΠΑ μπορούν να συγχρηματοδοτήσουν την ιστοσελίδα ή την ψηφιακή αναβάθμιση της επιχείρησής σου. Πες μου λίγα για την επιχείρησή σου και θα ελέγξω — δωρεάν — αν ενδέχεται να είσαι επιλέξιμος, και αναλαμβάνω τα πάντα από την κατασκευή ως τα έγγραφα που χρειάζεται ο έλεγχος.",
    whatTitle: "Τι είναι το ΕΣΠΑ;",
    what: [
      "Το ΕΣΠΑ είναι το πλαίσιο μέσω του οποίου η Ελλάδα και η ΕΕ συγχρηματοδοτούν επενδύσεις σε επιχειρήσεις. Μέσα στη χρονιά ανοίγουν διάφορες προσκλήσεις, η καθεμία με δικό της προϋπολογισμό και κανόνες.",
      "Σε αρκετά προγράμματα — όπως ψηφιακός μετασχηματισμός και εξωστρέφεια — η κατασκευή ή αναβάθμιση ιστοσελίδας είναι επιλέξιμη δαπάνη όταν τεκμηριώνεται σωστά. Δηλαδή μέρος του κόστους μπορεί να καλυφθεί από την επιδότηση.",
    ],
    coversTitle: "Τι μπορεί να καλύψει",
    covers: [
      "Μια νέα επαγγελματική ιστοσελίδα ή πλήρη ανασχεδιασμό",
      "Ένα ηλεκτρονικό κατάστημα (e-shop) για να ξεκινήσεις πωλήσεις",
      "Συστήματα κρατήσεων, ψηφιακά εργαλεία και ενσωματώσεις",
      "Την τεχνική τεκμηρίωση που απαιτεί η διαχειριστική αρχή",
    ],
    stepsTitle: "Πώς λειτουργεί",
    steps: [
      { title: "Δωρεάν αξιολόγηση", body: "Συμπλήρωσε τη σύντομη φόρμα. Ελέγχω τα στοιχεία σου σε σχέση με τις τρέχουσες προσκλήσεις και σου λέω ειλικρινά αν αξίζει." },
      { title: "Κατασκευή", body: "Αν ταιριάζει, σχεδιάζω και υλοποιώ την ιστοσελίδα σου σύμφωνα με τις απαιτήσεις του προγράμματος — και σε επίπεδο που έτσι κι αλλιώς θα ήθελες." },
      { title: "Φάκελος για τον έλεγχο", body: "Λαμβάνεις τον τεχνικό φάκελο, τα εγχειρίδια και τα έγγραφα που ζητά η διαχειριστική αρχή κατά την ολοκλήρωση." },
    ],
    disclaimer:
      "Η επιλεξιμότητα εξαρτάται πάντα από τη συγκεκριμένη ενεργή πρόσκληση και τα στοιχεία της επιχείρησής σου. Η αξιολόγηση είναι δωρεάν και χωρίς δέσμευση — δεν αποτελεί εγγύηση έγκρισης.",
    formTitle: "Δωρεάν έλεγχος επιλεξιμότητας",
    formSubtitle: "Μερικά γρήγορα στοιχεία. Θα απαντήσω εντός 24 ωρών.",
    fBusiness: "Επωνυμία επιχείρησης",
    fVat: "ΑΦΜ",
    fKad: "Κύριος ΚΑΔ (κωδικός δραστηριότητας)",
    fKadHint: "Αν τον ξέρεις — βοηθά στην αντιστοίχιση προγραμμάτων.",
    fRegion: "Πόλη / Περιφέρεια",
    fCompanyType: "Η επιχείρηση είναι νέα ή υφιστάμενη;",
    fEmployees: "Πόσους εργαζόμενους έχει;",
    fPrior: "Έχεις λάβει ξανά χρηματοδότηση ΕΣΠΑ;",
    fProgram: "Τι σε ενδιαφέρει κυρίως;",
    fGoal: "Τι θέλεις να κάνει η ιστοσελίδα;",
    fGoalPlaceholder: "Μια σύντομη περιγραφή των στόχων σου…",
    fName: "Το όνομά σου",
    fEmail: "Email",
    fPhone: "Τηλέφωνο",
    consent: "Συμφωνώ να επικοινωνήσετε μαζί μου για την αξιολόγηση ΕΣΠΑ.",
    consentNote: "Τα στοιχεία σου χρησιμοποιούνται μόνο για την αξιολόγηση και την απάντηση, δεν κοινοποιούνται ποτέ.",
    optional: "προαιρετικό",
    submit: "Ζήτησε δωρεάν αξιολόγηση",
    sending: "Αποστολή…",
    vRequired: "Συμπλήρωσε όνομα, επιχείρηση και email.",
    vEmail: "Βάλε ένα έγκυρο email.",
    vConsent: "Τσέκαρε το κουτί για να μπορέσω να επικοινωνήσω.",
    successTitle: "Ευχαριστώ — το αίτημα ελήφθη",
    successBody:
      "Έλαβα τα στοιχεία σου, θα ελέγξω την επιλεξιμότητά σου για ΕΣΠΑ και θα επικοινωνήσω εντός 24 ωρών.",
    errorTitle: "Χμμ, κάτι δεν πήγε καλά",
    errorBody: "Δοκίμασε ξανά ή στείλε μου email απευθείας στο info@akosds.com.",
    backHome: "Επιστροφή στην αρχική",
  },
};
