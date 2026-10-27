import type { Lang } from "./i18n.ts";
import type { TermsSection, TermsContent } from "./terms.ts";

export type { TermsSection, TermsContent };

/**
 * Original privacy policy for Akos Digital Services. Written from scratch to
 * cover the data this site actually collects; intended as a solid starting
 * point that the owner may wish to have reviewed by a lawyer.
 */
export const privacy: Record<Lang, TermsContent> = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: 27 October 2026",
    back: "Back to home",
    footer:
      "Akos Digital Services · Epidamnou 21, 11254, Athens, Greece · info@akosds.com",
    sections: [
      {
        heading: "Who is responsible for your data",
        body: [
          "Akos Digital Services is a solo studio based in Athens, Greece, and the data controller for the personal data described in this policy. Correspondence address: Epidamnou 21, 11254, Athens, Greece. Registered business name: AKOS DS. GEMI (Greek business registry) No.: 196793203000. All enquiries can be sent to info@akosds.com.",
        ],
      },
      {
        heading: "What data I collect",
        body: [
          "When you submit the quote request form or the ESPA eligibility form, I collect the details you provide: your name, email, phone number, and any project or business information you enter.",
          "Alongside a submission I also record your IP address and browser user-agent. These are used solely to rate-limit the form against automated abuse and spam, on the basis of my legitimate interest in keeping the site working.",
          "I don't collect payment details on this site, and I don't require an account to browse it.",
        ],
      },
      {
        heading: "Why I use it",
        body: [
          "Form submissions are used only to respond to your enquiry, prepare a quote, and, if we proceed, deliver the project. This is necessary to take the steps you request before entering into a contract.",
          "A simple page counter of my own records which page was opened, the site you came from (its domain only), your country as reported by the network, whether the device is a phone or a computer, and the time. It stores no IP address, sets no cookie and nothing on your device, so it cannot tell visits apart or follow you anywhere. I use these totals, on the basis of my legitimate interest, to see which pages are useful. No profile is built from them and they are never used for advertising. The counts are kept for 13 months.",
        ],
      },
      {
        heading: "Cookies",
        body: [
          "This site sets no cookies at all, and loads nothing from third parties: fonts and scripts are served from this domain. That is why there is no cookie banner.",
        ],
      },
      {
        heading: "Who else sees it",
        body: [
          "Form submissions are not stored in a database. They are delivered straight to my own inbox as an email and live only there, where only I can read them.",
          "Delivering that email is handled by Resend, a transactional email provider, which processes the recipient address and the message content needed to send it.",
          "The site itself is hosted by a cloud hosting provider that processes standard server logs (IP address, request time, requested URL) as part of running the infrastructure.",
          "None of these providers are permitted to use your data for their own purposes, and I never sell or rent personal data to anyone.",
        ],
      },
      {
        heading: "How long I keep it",
        body: [
          "Enquiries and leads are kept for as long as needed to respond, deliver a project, and meet legal/accounting retention requirements, and are deleted or anonymised once no longer needed. You can ask me to delete your data sooner at any time; see \"Your rights\" below.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "Under the GDPR you can ask me to: access the data I hold about you, correct it, delete it, restrict or object to its processing, or receive it in a portable format. Where processing relies on consent, you can withdraw that consent at any time without affecting anything processed before the withdrawal.",
          "To exercise any of these rights, email info@akosds.com. If you're not satisfied with my response, you can lodge a complaint with the Hellenic Data Protection Authority (dpa.gr).",
        ],
      },
      {
        heading: "Security",
        body: [
          "Form submissions are not kept on this site's servers: they are sent as an email to my inbox, which only I can access. Data in transit to and from this site is encrypted (HTTPS).",
        ],
      },
      {
        heading: "Children",
        body: [
          "This site is directed at businesses and adults commissioning digital work, and isn't intended for children.",
        ],
      },
      {
        heading: "Changes to this policy",
        body: [
          "I may update this policy from time to time to reflect changes to the site or the law. The version published on this page is the one that applies.",
        ],
      },
      {
        heading: "Contact",
        body: [
          "Questions about this policy, or requests about your data, can be sent to info@akosds.com, or by post to Epidamnou 21, 11254, Athens, Greece. Registered business name: AKOS DS. GEMI (Greek business registry) No.: 196793203000.",
        ],
      },
    ],
  },
  el: {
    title: "Πολιτική Απορρήτου",
    updated: "Τελευταία ενημέρωση: 27 Οκτωβρίου 2026",
    back: "Επιστροφή στην αρχική",
    footer:
      "Akos Digital Services · Επιδάμνου 21, 11254, Αθήνα, Ελλάδα · info@akosds.com",
    sections: [
      {
        heading: "Ποιος είναι υπεύθυνος για τα δεδομένα σας",
        body: [
          "Η Akos Digital Services είναι μονομελές studio με έδρα την Αθήνα και υπεύθυνος επεξεργασίας για τα προσωπικά δεδομένα που περιγράφονται σε αυτή την πολιτική. Διεύθυνση αλληλογραφίας: Επιδάμνου 21, 11254, Αθήνα, Ελλάδα. Επωνυμία: AKOS DS. Αρ. ΓΕΜΗ: 196793203000. Για κάθε επικοινωνία: info@akosds.com.",
        ],
      },
      {
        heading: "Ποια δεδομένα συλλέγω",
        body: [
          "Όταν υποβάλλετε τη φόρμα αιτήματος προσφοράς ή τη φόρμα επιλεξιμότητας ΕΣΠΑ, συλλέγω τα στοιχεία που παρέχετε: όνομα, email, τηλέφωνο και κάθε πληροφορία έργου ή επιχείρησης που καταχωρείτε.",
          "Μαζί με την υποβολή καταγράφονται επίσης η διεύθυνση IP και ο user-agent του προγράμματος περιήγησής σας. Χρησιμοποιούνται αποκλειστικά για τον περιορισμό ρυθμού υποβολών, ώστε η φόρμα να προστατεύεται από αυτοματοποιημένη κατάχρηση και spam, με βάση το έννομο συμφέρον μου να διατηρώ τον ιστότοπο λειτουργικό.",
          "Δεν συλλέγω στοιχεία πληρωμής σε αυτόν τον ιστότοπο, ούτε απαιτείται λογαριασμός για την περιήγηση.",
        ],
      },
      {
        heading: "Γιατί τα χρησιμοποιώ",
        body: [
          "Οι υποβολές φορμών χρησιμοποιούνται μόνο για να απαντήσω στο αίτημά σας, να ετοιμάσω προσφορά και, εφόσον προχωρήσουμε, να παραδώσω το έργο. Αυτό είναι απαραίτητο για τα βήματα που ζητάτε πριν τη σύναψη σύμβασης.",
          "Ένας απλός δικός μου μετρητής σελίδων καταγράφει ποια σελίδα άνοιξε, τον ιστότοπο από τον οποίο ήρθατε (μόνο το domain του), τη χώρα σας όπως τη δηλώνει το δίκτυο, αν η συσκευή είναι κινητό ή υπολογιστής, και την ώρα. Δεν αποθηκεύει διεύθυνση IP, δεν ορίζει cookie ούτε τίποτα στη συσκευή σας, οπότε δεν μπορεί να ξεχωρίσει επισκέψεις ούτε να σας ακολουθήσει πουθενά. Χρησιμοποιώ αυτά τα σύνολα, με βάση το έννομο συμφέρον μου, για να βλέπω ποιες σελίδες είναι χρήσιμες. Δεν δημιουργείται προφίλ και δεν χρησιμοποιούνται ποτέ για διαφήμιση. Οι μετρήσεις διατηρούνται για 13 μήνες.",
        ],
      },
      {
        heading: "Cookies",
        body: [
          "Αυτός ο ιστότοπος δεν ορίζει κανένα cookie και δεν φορτώνει τίποτα από τρίτους: οι γραμματοσειρές και τα scripts σερβίρονται από αυτό το domain. Γι' αυτό δεν υπάρχει banner cookies.",
        ],
      },
      {
        heading: "Ποιος άλλος τα βλέπει",
        body: [
          "Οι υποβολές φορμών δεν αποθηκεύονται σε βάση δεδομένων. Παραδίδονται απευθείας στο δικό μου email και παραμένουν μόνο εκεί, όπου μόνο εγώ μπορώ να τις διαβάσω.",
          "Η αποστολή αυτού του email γίνεται μέσω της Resend, πάροχου συναλλακτικών email, ο οποίος επεξεργάζεται τη διεύθυνση παραλήπτη και το περιεχόμενο που απαιτείται για την αποστολή του.",
          "Ο ίδιος ο ιστότοπος φιλοξενείται από πάροχο cloud hosting, ο οποίος επεξεργάζεται τυπικά αρχεία καταγραφής διακομιστή (διεύθυνση IP, ώρα αιτήματος, ζητούμενο URL) στο πλαίσιο λειτουργίας της υποδομής.",
          "Κανένας από αυτούς τους παρόχους δεν επιτρέπεται να χρησιμοποιεί τα δεδομένα σας για δικούς του σκοπούς, και ποτέ δεν πωλώ ή ενοικιάζω προσωπικά δεδομένα σε κανέναν.",
        ],
      },
      {
        heading: "Για πόσο χρόνο τα διατηρώ",
        body: [
          "Τα αιτήματα και τα leads διατηρούνται όσο χρειάζεται για να απαντήσω, να παραδώσω ένα έργο και να τηρήσω νομικές/λογιστικές υποχρεώσεις διατήρησης, και διαγράφονται ή ανωνυμοποιούνται όταν δεν είναι πλέον απαραίτητα. Μπορείτε να ζητήσετε νωρίτερα διαγραφή των δεδομένων σας οποιαδήποτε στιγμή· δείτε \"Τα δικαιώματά σας\" παρακάτω.",
        ],
      },
      {
        heading: "Τα δικαιώματά σας",
        body: [
          "Βάσει του GDPR μπορείτε να ζητήσετε: πρόσβαση στα δεδομένα που τηρώ για εσάς, διόρθωσή τους, διαγραφή τους, περιορισμό ή αντίταξη στην επεξεργασία τους, ή λήψη τους σε φορητή μορφή. Όπου η επεξεργασία βασίζεται σε συναίνεση, μπορείτε να την ανακαλέσετε οποιαδήποτε στιγμή, χωρίς να επηρεάζεται όσα έχουν ήδη επεξεργαστεί πριν την ανάκληση.",
          "Για να ασκήσετε οποιοδήποτε από αυτά τα δικαιώματα, στείλτε email στο info@akosds.com. Αν δεν είστε ικανοποιημένοι με την απάντησή μου, μπορείτε να υποβάλετε καταγγελία στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (dpa.gr).",
        ],
      },
      {
        heading: "Ασφάλεια",
        body: [
          "Οι υποβολές φορμών δεν κρατιούνται στους servers του ιστότοπου: αποστέλλονται ως email στο δικό μου γραμματοκιβώτιο, στο οποίο έχω πρόσβαση μόνο εγώ. Τα δεδομένα κατά τη μεταφορά προς και από τον ιστότοπο είναι κρυπτογραφημένα (HTTPS).",
        ],
      },
      {
        heading: "Ανήλικοι",
        body: [
          "Ο ιστότοπος απευθύνεται σε επιχειρήσεις και ενήλικες που αναθέτουν ψηφιακές εργασίες, και δεν προορίζεται για ανήλικους.",
        ],
      },
      {
        heading: "Αλλαγές σε αυτή την πολιτική",
        body: [
          "Ενδέχεται να επικαιροποιώ αυτή την πολιτική κατά καιρούς ώστε να αντικατοπτρίζει αλλαγές στον ιστότοπο ή στη νομοθεσία. Η έκδοση που είναι δημοσιευμένη σε αυτή τη σελίδα είναι εκείνη που ισχύει.",
        ],
      },
      {
        heading: "Επικοινωνία",
        body: [
          "Ερωτήσεις σχετικά με αυτή την πολιτική, ή αιτήματα σχετικά με τα δεδομένα σας, μπορούν να σταλούν στο info@akosds.com ή ταχυδρομικά στη διεύθυνση Επιδάμνου 21, 11254, Αθήνα, Ελλάδα. Επωνυμία: AKOS DS. Αρ. ΓΕΜΗ: 196793203000.",
        ],
      },
    ],
  },
};
