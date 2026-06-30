import type { Lang } from "@/components/LanguageContext";

export type BL = { en: string; el: string };
export type Choice = { value: string; label: BL; hint?: BL };

/**
 * Content for the multi-step "Request a Quote" wizard.
 * Choice `value`s are stable, language-independent keys — those are what gets
 * stored in Supabase, so leads stay clean no matter which language was used.
 */

export const needsOptions: Choice[] = [
  { value: "new_website", label: { en: "A brand-new website", el: "Μια ολοκαίνουργια ιστοσελίδα" }, hint: { en: "A site built from scratch", el: "Ιστότοπος από την αρχή" } },
  { value: "online_shop", label: { en: "An online shop to sell products", el: "Ένα online κατάστημα για πωλήσεις" }, hint: { en: "E-commerce / payments", el: "E-commerce / πληρωμές" } },
  { value: "bookings", label: { en: "Online bookings or appointments", el: "Online κρατήσεις ή ραντεβού" }, hint: { en: "Let clients book themselves", el: "Οι πελάτες κλείνουν μόνοι τους" } },
  { value: "branding", label: { en: "Logo & visual branding", el: "Λογότυπο & οπτική ταυτότητα" }, hint: { en: "How your brand looks", el: "Η εικόνα της επωνυμίας σου" } },
  { value: "ai_automation", label: { en: "An AI assistant or automation", el: "Έναν AI βοηθό ή αυτοματισμό" }, hint: { en: "Answer & follow up 24/7", el: "Απαντήσεις & follow-up 24/7" } },
  { value: "smart_home", label: { en: "Smart home setup", el: "Εγκατάσταση έξυπνου σπιτιού" }, hint: { en: "Private, offline automation", el: "Ιδιωτικός, offline αυτοματισμός" } },
  { value: "not_sure", label: { en: "Something else / not sure yet", el: "Κάτι άλλο / δεν είμαι σίγουρος" } },
];

export const situationOptions: Choice[] = [
  { value: "from_scratch", label: { en: "No, I'm starting from scratch", el: "Όχι, ξεκινάω από την αρχή" } },
  { value: "needs_refresh", label: { en: "Yes, but it needs a refresh", el: "Ναι, αλλά χρειάζεται ανανέωση" } },
  { value: "add_features", label: { en: "Yes, I just want to add features", el: "Ναι, θέλω απλώς να προσθέσω λειτουργίες" } },
];

export const budgetOptions: Choice[] = [
  { value: "under_1k", label: { en: "Under €1,000", el: "Κάτω από €1.000" } },
  { value: "1k_3k", label: { en: "€1,000 – €3,000", el: "€1.000 – €3.000" } },
  { value: "3k_7k", label: { en: "€3,000 – €7,000", el: "€3.000 – €7.000" } },
  { value: "7k_plus", label: { en: "€7,000+", el: "€7.000+" } },
  { value: "unsure", label: { en: "I'm not sure yet", el: "Δεν είμαι σίγουρος ακόμα" } },
];

export const timelineOptions: Choice[] = [
  { value: "asap", label: { en: "As soon as possible", el: "Το συντομότερο δυνατό" } },
  { value: "1_3_months", label: { en: "In the next 1–3 months", el: "Μέσα στους επόμενους 1–3 μήνες" } },
  { value: "3_6_months", label: { en: "In 3–6 months", el: "Σε 3–6 μήνες" } },
  { value: "exploring", label: { en: "Just exploring for now", el: "Απλώς ψάχνομαι προς το παρόν" } },
];

export const contactMethodOptions: Choice[] = [
  { value: "email", label: { en: "Email", el: "Email" } },
  { value: "phone", label: { en: "Phone call", el: "Τηλεφώνημα" } },
  { value: "whatsapp", label: { en: "WhatsApp", el: "WhatsApp" } },
  { value: "telegram", label: { en: "Telegram", el: "Telegram" } },
];

export const ui: Record<Lang, {
  eyebrow: string;
  title: string;
  subtitle: string;
  step: string;
  of: string;
  back: string;
  next: string;
  submit: string;
  sending: string;
  backHome: string;
  optional: string;
  skip: string;
  // questions
  qName: string;
  qNameHint: string;
  qNeeds: string;
  qNeedsHint: string;
  qBusiness: string;
  qBusinessName: string;
  qBusinessAbout: string;
  qSituation: string;
  qBudget: string;
  qBudgetHint: string;
  qTimeline: string;
  qDetails: string;
  qDetailsHint: string;
  qDetailsPlaceholder: string;
  qContact: string;
  fEmail: string;
  fPhone: string;
  fContactMethod: string;
  consent: string;
  consentNote: string;
  // validation
  vRequired: string;
  vPickOne: string;
  vPickAtLeastOne: string;
  vEmail: string;
  vConsent: string;
  // success / error
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorBody: string;
  tryAgain: string;
  espaPrompt: string;
}> = {
  en: {
    eyebrow: "Start a Project",
    title: "Let's build something",
    subtitle: "Answer a few quick questions and I'll personally get back to you within 24 hours with ideas and a clear quote. No cost, no obligation.",
    step: "Step",
    of: "of",
    back: "Back",
    next: "Next",
    submit: "Send request",
    sending: "Sending…",
    backHome: "Back to home",
    optional: "Optional",
    skip: "Skip",
    qName: "First, what's your name?",
    qNameHint: "So I know who I'm talking to.",
    qNeeds: "What can I help you with?",
    qNeedsHint: "Pick everything that applies.",
    qBusiness: "Tell me about your business",
    qBusinessName: "Business or project name",
    qBusinessAbout: "What does it do? (a sentence is plenty)",
    qSituation: "Do you already have a website?",
    qBudget: "What budget are you working with?",
    qBudgetHint: "A rough idea is fine — it just helps me suggest the right approach.",
    qTimeline: "When would you like to launch?",
    qDetails: "Anything else I should know?",
    qDetailsHint: "Goals, examples you like, a deadline — whatever's on your mind.",
    qDetailsPlaceholder: "Tell me a bit more…",
    qContact: "Great — how can I reach you?",
    fEmail: "Email",
    fPhone: "Phone (optional)",
    fContactMethod: "Best way to reach you",
    consent: "I agree to be contacted about my request.",
    consentNote: "Your details are only used to respond to you and are never shared or sold.",
    vRequired: "Please fill this in.",
    vPickOne: "Please pick an option.",
    vPickAtLeastOne: "Please select at least one.",
    vEmail: "Please enter a valid email.",
    vConsent: "Please tick the box so I can get back to you.",
    successTitle: "Thank you — request received",
    successBody: "I've got your details and I'll be in touch within 24 hours. Talk soon.",
    errorTitle: "Hmm, that didn't go through",
    errorBody: "Your request couldn't be sent. Please try again, or email me directly at info@akosds.com.",
    tryAgain: "Try again",
    espaPrompt: "Did you know a website can be funded by ESPA? Check your eligibility for free →",
  },
  el: {
    eyebrow: "Ξεκίνα ένα Έργο",
    title: "Ας φτιάξουμε κάτι",
    subtitle: "Απάντησε σε μερικές γρήγορες ερωτήσεις και θα επικοινωνήσω προσωπικά μαζί σου εντός 24 ωρών με ιδέες και μια ξεκάθαρη προσφορά. Χωρίς κόστος, χωρίς δέσμευση.",
    step: "Βήμα",
    of: "από",
    back: "Πίσω",
    next: "Επόμενο",
    submit: "Αποστολή αιτήματος",
    sending: "Αποστολή…",
    backHome: "Επιστροφή στην αρχική",
    optional: "Προαιρετικό",
    skip: "Παράλειψη",
    qName: "Καταρχάς, πώς σε λένε;",
    qNameHint: "Για να ξέρω με ποιον μιλάω.",
    qNeeds: "Με τι μπορώ να βοηθήσω;",
    qNeedsHint: "Διάλεξε ό,τι ισχύει.",
    qBusiness: "Πες μου για την επιχείρησή σου",
    qBusinessName: "Όνομα επιχείρησης ή έργου",
    qBusinessAbout: "Με τι ασχολείται; (μια πρόταση αρκεί)",
    qSituation: "Έχεις ήδη ιστοσελίδα;",
    qBudget: "Τι προϋπολογισμό έχεις υπόψη;",
    qBudgetHint: "Μια γενική ιδέα αρκεί — απλώς με βοηθά να προτείνω τη σωστή λύση.",
    qTimeline: "Πότε θα ήθελες να ξεκινήσει;",
    qDetails: "Κάτι άλλο που πρέπει να ξέρω;",
    qDetailsHint: "Στόχοι, παραδείγματα που σου αρέσουν, μια προθεσμία — ό,τι σκέφτεσαι.",
    qDetailsPlaceholder: "Πες μου λίγα παραπάνω…",
    qContact: "Τέλεια — πώς να επικοινωνήσω μαζί σου;",
    fEmail: "Email",
    fPhone: "Τηλέφωνο (προαιρετικό)",
    fContactMethod: "Καλύτερος τρόπος επικοινωνίας",
    consent: "Συμφωνώ να επικοινωνήσετε μαζί μου σχετικά με το αίτημά μου.",
    consentNote: "Τα στοιχεία σου χρησιμοποιούνται μόνο για να σου απαντήσω και δεν κοινοποιούνται ποτέ.",
    vRequired: "Συμπλήρωσέ το, παρακαλώ.",
    vPickOne: "Διάλεξε μια επιλογή.",
    vPickAtLeastOne: "Διάλεξε τουλάχιστον μία.",
    vEmail: "Βάλε ένα έγκυρο email.",
    vConsent: "Τσέκαρε το κουτί για να μπορέσω να επικοινωνήσω.",
    successTitle: "Ευχαριστώ — το αίτημα ελήφθη",
    successBody: "Έλαβα τα στοιχεία σου και θα επικοινωνήσω εντός 24 ωρών. Τα λέμε σύντομα.",
    errorTitle: "Χμμ, κάτι δεν πήγε καλά",
    errorBody: "Το αίτημα δεν στάλθηκε. Δοκίμασε ξανά ή στείλε μου email απευθείας στο info@akosds.com.",
    tryAgain: "Δοκίμασε ξανά",
    espaPrompt: "Ήξερες ότι μια ιστοσελίδα μπορεί να χρηματοδοτηθεί από το ΕΣΠΑ; Έλεγξε δωρεάν αν είσαι επιλέξιμος →",
  },
};

export const TOTAL_STEPS = 8;
