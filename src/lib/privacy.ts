import type { Lang } from "@/components/LanguageContext";
import type { TermsSection, TermsContent } from "@/lib/terms";

export type { TermsSection, TermsContent };

/**
 * Original privacy policy for Akos Digital Services. Written from scratch to
 * cover the data this site actually collects; intended as a solid starting
 * point that the owner may wish to have reviewed by a lawyer.
 */
export const privacy: Record<Lang, TermsContent> = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: 1 July 2026",
    back: "Back to home",
    footer:
      "Akos Digital Services · Epidamnou 21, 11254, Athens, Greece · info@akosds.com",
    sections: [
      {
        heading: "Who is responsible for your data",
        body: [
          "Akos Digital Services is a solo studio based in Athens, Greece, and the data controller for the personal data described in this policy. Correspondence address: Epidamnou 21, 11254, Athens, Greece. All enquiries can be sent to info@akosds.com.",
        ],
      },
      {
        heading: "What data I collect",
        body: [
          "When you submit the quote request form or the ESPA eligibility form, I collect the details you provide: your name, email, phone number, and any project or business information you enter.",
          "The site's cookie banner stores a single technical preference (accepted or rejected, and which categories) so it doesn't ask again on your next visit.",
          "I don't collect payment details on this site, and I don't require an account to browse it.",
        ],
      },
      {
        heading: "Why I use it",
        body: [
          "Form submissions are used only to respond to your enquiry, prepare a quote, and, if we proceed, deliver the project. This is necessary to take the steps you request before entering into a contract.",
          "If you've opted in via the cookie banner, anonymous, cookieless analytics help me understand which pages are useful and where visitors run into friction. No profile is built from this data and it isn't used for advertising.",
        ],
      },
      {
        heading: "Cookies",
        body: [
          "Strictly necessary: one cookie/local-storage entry that remembers your cookie preference. This is always on, since the site can't function without it.",
          "Analytics: only loaded once you accept it in the cookie banner. You can withdraw consent at any time from the \"Cookies\" link in the footer.",
        ],
      },
      {
        heading: "Who else sees it",
        body: [
          "Form submissions are stored in a Supabase database and are only accessible to me, behind an authenticated, password- and one-time-passkey-protected dashboard.",
          "Sending that one-time passkey (for the CRM login) is handled by Resend, a transactional email provider, which processes the recipient address and message content needed to deliver that email.",
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
          "Under the GDPR you can ask me to: access the data I hold about you, correct it, delete it, restrict or object to its processing, or receive it in a portable format. Where processing relies on consent (such as analytics cookies), you can withdraw that consent at any time without affecting anything processed before the withdrawal.",
          "To exercise any of these rights, email info@akosds.com. If you're not satisfied with my response, you can lodge a complaint with the Hellenic Data Protection Authority (dpa.gr).",
        ],
      },
      {
        heading: "Security",
        body: [
          "Access to submitted data is limited to me and protected by authentication (a session cookie plus a one-time email passkey). Data in transit to and from this site is encrypted (HTTPS).",
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
          "Questions about this policy, or requests about your data, can be sent to info@akosds.com, or by post to Epidamnou 21, 11254, Athens, Greece.",
        ],
      },
    ],
  },
  el: {
    title: "Πολιτική Απορρήτου",
    updated: "Τελευταία ενημέρωση: 1 Ιουλίου 2026",
    back: "Επιστροφή στην αρχική",
    footer:
      "Akos Digital Services · Επιδάμνου 21, 11254, Αθήνα, Ελλάδα · info@akosds.com",
    sections: [
      {
        heading: "Ποιος είναι υπεύθυνος για τα δεδομένα σας",
        body: [
          "Η Akos Digital Services είναι μονομελές studio με έδρα την Αθήνα και υπεύθυνος επεξεργασίας για τα προσωπικά δεδομένα που περιγράφονται σε αυτή την πολιτική. Διεύθυνση αλληλογραφίας: Επιδάμνου 21, 11254, Αθήνα, Ελλάδα. Για κάθε επικοινωνία: info@akosds.com.",
        ],
      },
      {
        heading: "Ποια δεδομένα συλλέγω",
        body: [
          "Όταν υποβάλλετε τη φόρμα αιτήματος προσφοράς ή τη φόρμα επιλεξιμότητας ΕΣΠΑ, συλλέγω τα στοιχεία που παρέχετε: όνομα, email, τηλέφωνο και κάθε πληροφορία έργου ή επιχείρησης που καταχωρείτε.",
          "Το banner cookies του ιστότοπου αποθηκεύει μία τεχνική προτίμηση (αποδοχή ή απόρριψη, και ποιες κατηγορίες) ώστε να μην ερωτηθείτε ξανά στην επόμενη επίσκεψή σας.",
          "Δεν συλλέγω στοιχεία πληρωμής σε αυτόν τον ιστότοπο, ούτε απαιτείται λογαριασμός για την περιήγηση.",
        ],
      },
      {
        heading: "Γιατί τα χρησιμοποιώ",
        body: [
          "Οι υποβολές φορμών χρησιμοποιούνται μόνο για να απαντήσω στο αίτημά σας, να ετοιμάσω προσφορά και, εφόσον προχωρήσουμε, να παραδώσω το έργο. Αυτό είναι απαραίτητο για τα βήματα που ζητάτε πριν τη σύναψη σύμβασης.",
          "Εφόσον έχετε συναινέσει μέσω του banner cookies, ανώνυμα, χωρίς cookies analytics με βοηθούν να καταλάβω ποιες σελίδες είναι χρήσιμες και πού οι επισκέπτες συναντούν δυσκολίες. Δεν δημιουργείται προφίλ από αυτά τα δεδομένα και δεν χρησιμοποιούνται για διαφήμιση.",
        ],
      },
      {
        heading: "Cookies",
        body: [
          "Απολύτως απαραίτητα: ένα cookie/εγγραφή local-storage που θυμάται την προτίμησή σας για τα cookies. Είναι πάντα ενεργό, καθώς ο ιστότοπος δεν μπορεί να λειτουργήσει χωρίς αυτό.",
          "Analytics: φορτώνονται μόνο εφόσον τα αποδεχτείτε στο banner cookies. Μπορείτε να ανακαλέσετε τη συναίνεση οποιαδήποτε στιγμή από τον σύνδεσμο \"Cookies\" στο footer.",
        ],
      },
      {
        heading: "Ποιος άλλος τα βλέπει",
        body: [
          "Οι υποβολές φορμών αποθηκεύονται σε βάση δεδομένων Supabase και είναι προσβάσιμες μόνο σε εμένα, πίσω από πίνακα ελέγχου προστατευμένο με έλεγχο ταυτότητας και μοναδικό κωδικό πρόσβασης μίας χρήσης.",
          "Η αποστολή αυτού του κωδικού μίας χρήσης (για είσοδο στο CRM) γίνεται μέσω της Resend, πάροχου συναλλακτικών email, ο οποίος επεξεργάζεται τη διεύθυνση παραλήπτη και το περιεχόμενο που απαιτείται για την αποστολή του email.",
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
          "Βάσει του GDPR μπορείτε να ζητήσετε: πρόσβαση στα δεδομένα που τηρώ για εσάς, διόρθωσή τους, διαγραφή τους, περιορισμό ή αντίταξη στην επεξεργασία τους, ή λήψη τους σε φορητή μορφή. Όπου η επεξεργασία βασίζεται σε συναίνεση (όπως τα cookies analytics), μπορείτε να την ανακαλέσετε οποιαδήποτε στιγμή, χωρίς να επηρεάζεται όσα έχουν ήδη επεξεργαστεί πριν την ανάκληση.",
          "Για να ασκήσετε οποιοδήποτε από αυτά τα δικαιώματα, στείλτε email στο info@akosds.com. Αν δεν είστε ικανοποιημένοι με την απάντησή μου, μπορείτε να υποβάλετε καταγγελία στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (dpa.gr).",
        ],
      },
      {
        heading: "Ασφάλεια",
        body: [
          "Η πρόσβαση στα υποβληθέντα δεδομένα περιορίζεται σε εμένα και προστατεύεται με έλεγχο ταυτότητας (cookie session και κωδικός πρόσβασης email μίας χρήσης). Τα δεδομένα κατά τη μεταφορά προς και από τον ιστότοπο είναι κρυπτογραφημένα (HTTPS).",
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
          "Ερωτήσεις σχετικά με αυτή την πολιτική, ή αιτήματα σχετικά με τα δεδομένα σας, μπορούν να σταλούν στο info@akosds.com ή ταχυδρομικά στη διεύθυνση Επιδάμνου 21, 11254, Αθήνα, Ελλάδα.",
        ],
      },
    ],
  },
};
