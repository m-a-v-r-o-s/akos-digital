import type { Lang } from "@/components/LanguageContext";

export type TermsSection = { heading: string; body: string[] };

export type TermsContent = {
  title: string;
  updated: string;
  back: string;
  sections: TermsSection[];
  footer: string;
};

/**
 * Original terms of service for Akos Digital Services. Written from scratch to
 * cover the topics a solo web studio needs; intended as a solid starting point
 * that the owner may wish to have reviewed by a lawyer.
 */
export const terms: Record<Lang, TermsContent> = {
  en: {
    title: "Terms of Service",
    updated: "Last updated: 1 July 2026",
    back: "Back to home",
    footer:
      "Akos Digital Services · Epidamnou 21, 11254, Athens, Greece · info@akosds.com",
    sections: [
      {
        heading: "Introduction & acceptance",
        body: [
          "These terms govern the working relationship between Akos Digital Services (\"the Studio\", \"I\", \"me\") and any individual or business (\"the Client\", \"you\") that commissions design, development, or related digital work. By requesting a quote, approving a proposal, paying a deposit, or otherwise engaging my services, you accept these terms.",
          "Where a signed proposal or written agreement conflicts with anything here, the signed document takes precedence for that particular project.",
        ],
      },
      {
        heading: "Who I am",
        body: [
          "Akos Digital Services is a solo studio based in Athens, Greece. Correspondence address: Epidamnou 21, 11254, Athens, Greece. All enquiries can be sent to info@akosds.com.",
        ],
      },
      {
        heading: "Services",
        body: [
          "I provide website design and development, e-commerce, booking and CRM systems, brand and interface design, AI automations, and related consulting. The exact scope of any engagement is set out in the individual proposal or quote agreed for that project. Anything not listed there is treated as out of scope and may be quoted separately.",
        ],
      },
      {
        heading: "Quotes & confirmation",
        body: [
          "Quotes are based on the information you provide and stay valid for 30 days unless stated otherwise. A project is confirmed once you approve the proposal in writing and pay any agreed deposit. Significant changes to the brief after confirmation may affect both the price and the timeline.",
        ],
      },
      {
        heading: "Fees & payment",
        body: [
          "Prices are quoted in euros and, unless noted, exclude applicable taxes and third-party costs such as hosting, domains, plugins, stock media, and fonts.",
          "Unless a proposal says otherwise, an upfront deposit is required before work begins, with the balance due on completion and before final files are handed over or the project is deployed. Invoices are payable within the period shown on them. Overdue payments may pause work and, where the law allows, accrue statutory interest.",
        ],
      },
      {
        heading: "Your responsibilities",
        body: [
          "You agree to supply, in good time, the content, materials, access, and feedback needed to complete the project, and to confirm you hold the rights to any text, images, or other assets you provide. You are responsible for reviewing deliverables and confirming they are correct before launch. Delays in providing materials or approvals may extend the agreed timeline.",
        ],
      },
      {
        heading: "Timelines",
        body: [
          "Any timeline in a proposal is a good-faith estimate that depends on prompt feedback, content, and payment from you. I am not responsible for delays caused by factors outside my control, including third-party providers.",
        ],
      },
      {
        heading: "Revisions",
        body: [
          "Each proposal states how many rounds of revisions are included. Reasonable revisions within the agreed scope are part of the project; requests that go beyond the original brief are treated as additional work and quoted accordingly.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "Until a project is paid in full, all designs, code, and materials I produce remain my property. On receipt of final payment, ownership of the final deliverables created specifically for you passes to you, with two exceptions: (a) third-party components, which stay under their own licences; and (b) my own pre-existing tools, libraries, and know-how, which I keep and may reuse.",
          "Unless we agree otherwise in writing, I may show the finished work in my portfolio and reference you as a client.",
        ],
      },
      {
        heading: "Third-party services",
        body: [
          "Projects often rely on third-party services and software (for example hosting, payment providers, and open-source libraries). These are governed by their own terms, and I am not responsible for their availability, changes, or costs. Ongoing subscriptions and licences are your responsibility unless we agree that I manage them for you.",
        ],
      },
      {
        heading: "Confidentiality",
        body: [
          "Each party agrees to keep confidential any non-public information shared during a project and to use it only for that project. This does not apply to information that is already public or that must be disclosed by law.",
        ],
      },
      {
        heading: "Data protection",
        body: [
          "Personal data you submit through my forms or share during a project is used only to respond to you and deliver the work, and is never sold. Where I process personal data on your behalf, we will agree appropriate terms in line with applicable data-protection law, including the GDPR.",
        ],
      },
      {
        heading: "Warranty disclaimer",
        body: [
          "Work is delivered on a reasonable-effort basis. Beyond any specific warranty stated in a proposal, deliverables are provided \"as is\", without guarantees of uninterrupted or error-free operation, of particular commercial results, or of compatibility with every future device or third-party update.",
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          "To the extent permitted by law, my total liability arising from any project is limited to the fees you paid for that project. I am not liable for indirect or consequential losses, including lost profits, data, or business, however they arise.",
        ],
      },
      {
        heading: "Indemnification",
        body: [
          "You agree to hold me harmless from claims arising out of materials you supply or instructions you give (for example, content that infringes someone else's rights), except where the claim is caused by my own fault.",
        ],
      },
      {
        heading: "Termination",
        body: [
          "Either party may end a project in writing. If you cancel, work completed and costs incurred up to that point remain payable, and any non-refundable deposit is retained. I may pause or end a project if invoices go unpaid, or if continuing would be unlawful or unreasonable.",
        ],
      },
      {
        heading: "Governing law",
        body: [
          "These terms are governed by the laws of Greece. Any dispute that cannot be resolved amicably falls under the jurisdiction of the competent courts of Athens.",
        ],
      },
      {
        heading: "Severability",
        body: [
          "If any provision of these terms is found invalid or unenforceable, the remaining provisions stay in full effect.",
        ],
      },
      {
        heading: "Changes to these terms",
        body: [
          "I may update these terms from time to time. The version published on this page at the time you engage my services is the one that applies to your project.",
        ],
      },
      {
        heading: "Contact",
        body: [
          "Questions about these terms can be sent to info@akosds.com, or by post to Epidamnou 21, 11254, Athens, Greece.",
        ],
      },
    ],
  },
  el: {
    title: "Όροι Χρήσης",
    updated: "Τελευταία ενημέρωση: 1 Ιουλίου 2026",
    back: "Επιστροφή στην αρχική",
    footer:
      "Akos Digital Services · Επιδάμνου 21, 11254, Αθήνα, Ελλάδα · info@akosds.com",
    sections: [
      {
        heading: "Εισαγωγή & αποδοχή",
        body: [
          "Οι παρόντες όροι διέπουν τη συνεργασία μεταξύ της Akos Digital Services (\"το Studio\", \"εγώ\") και κάθε φυσικού ή νομικού προσώπου (\"ο Πελάτης\", \"εσείς\") που αναθέτει εργασίες σχεδιασμού, ανάπτυξης ή σχετικές ψηφιακές υπηρεσίες. Ζητώντας προσφορά, εγκρίνοντας μια πρόταση, καταβάλλοντας προκαταβολή ή χρησιμοποιώντας με άλλον τρόπο τις υπηρεσίες μου, αποδέχεστε τους όρους αυτούς.",
          "Όπου μια υπογεγραμμένη πρόταση ή γραπτή συμφωνία συγκρούεται με κάτι εδώ, υπερισχύει το υπογεγραμμένο έγγραφο για το συγκεκριμένο έργο.",
        ],
      },
      {
        heading: "Ποιος είμαι",
        body: [
          "Η Akos Digital Services είναι μονομελές studio με έδρα την Αθήνα. Διεύθυνση αλληλογραφίας: Επιδάμνου 21, 11254, Αθήνα, Ελλάδα. Για κάθε επικοινωνία: info@akosds.com.",
        ],
      },
      {
        heading: "Υπηρεσίες",
        body: [
          "Παρέχω σχεδιασμό και ανάπτυξη ιστοσελίδων, e-commerce, συστήματα κρατήσεων και CRM, σχεδιασμό brand και interface, αυτοματισμούς AI και σχετική συμβουλευτική. Το ακριβές αντικείμενο κάθε συνεργασίας ορίζεται στη μεμονωμένη πρόταση ή προσφορά που συμφωνείται για το έργο. Ό,τι δεν αναφέρεται εκεί θεωρείται εκτός αντικειμένου και μπορεί να κοστολογηθεί ξεχωριστά.",
        ],
      },
      {
        heading: "Προσφορές & επιβεβαίωση",
        body: [
          "Οι προσφορές βασίζονται στις πληροφορίες που παρέχετε και ισχύουν για 30 ημέρες, εκτός αν ορίζεται διαφορετικά. Ένα έργο επιβεβαιώνεται μόλις εγκρίνετε γραπτώς την πρόταση και καταβάλετε τυχόν συμφωνημένη προκαταβολή. Ουσιώδεις αλλαγές στις απαιτήσεις μετά την επιβεβαίωση ενδέχεται να επηρεάσουν τόσο την τιμή όσο και το χρονοδιάγραμμα.",
        ],
      },
      {
        heading: "Αμοιβές & πληρωμές",
        body: [
          "Οι τιμές αναφέρονται σε ευρώ και, εκτός αν σημειώνεται, δεν περιλαμβάνουν φόρους και κόστη τρίτων, όπως hosting, domains, plugins, πολυμέσα και γραμματοσειρές.",
          "Εκτός αν μια πρόταση ορίζει διαφορετικά, απαιτείται προκαταβολή πριν την έναρξη, με το υπόλοιπο να καταβάλλεται κατά την ολοκλήρωση και πριν την παράδοση των τελικών αρχείων ή τη δημοσίευση. Τα τιμολόγια εξοφλούνται εντός της αναγραφόμενης προθεσμίας. Ληξιπρόθεσμες πληρωμές ενδέχεται να διακόψουν την εργασία και, όπου το επιτρέπει ο νόμος, να επιφέρουν νόμιμους τόκους.",
        ],
      },
      {
        heading: "Οι υποχρεώσεις σας",
        body: [
          "Συμφωνείτε να παρέχετε εγκαίρως το περιεχόμενο, το υλικό, τις προσβάσεις και την ανατροφοδότηση που απαιτούνται για την ολοκλήρωση του έργου, και να βεβαιώνετε ότι κατέχετε τα δικαιώματα για κάθε κείμενο, εικόνα ή άλλο υλικό που παρέχετε. Είστε υπεύθυνοι για τον έλεγχο των παραδοτέων και την επιβεβαίωση της ορθότητάς τους πριν τη δημοσίευση. Καθυστερήσεις στην παροχή υλικού ή εγκρίσεων ενδέχεται να επιμηκύνουν το χρονοδιάγραμμα.",
        ],
      },
      {
        heading: "Χρονοδιαγράμματα",
        body: [
          "Κάθε χρονοδιάγραμμα σε μια πρόταση αποτελεί εκτίμηση καλής πίστης που εξαρτάται από την έγκαιρη ανατροφοδότηση, το υλικό και την πληρωμή σας. Δεν ευθύνομαι για καθυστερήσεις που οφείλονται σε παράγοντες εκτός του ελέγχου μου, συμπεριλαμβανομένων παρόχων τρίτων.",
        ],
      },
      {
        heading: "Αναθεωρήσεις",
        body: [
          "Κάθε πρόταση ορίζει πόσοι γύροι αναθεωρήσεων περιλαμβάνονται. Εύλογες αναθεωρήσεις εντός του συμφωνημένου αντικειμένου αποτελούν μέρος του έργου· αιτήματα που υπερβαίνουν τις αρχικές απαιτήσεις θεωρούνται πρόσθετη εργασία και κοστολογούνται αναλόγως.",
        ],
      },
      {
        heading: "Πνευματική ιδιοκτησία",
        body: [
          "Μέχρι την πλήρη εξόφληση ενός έργου, όλα τα σχέδια, ο κώδικας και το υλικό που παράγω παραμένουν ιδιοκτησία μου. Με την είσπραξη της τελικής πληρωμής, η κυριότητα των τελικών παραδοτέων που δημιουργήθηκαν ειδικά για εσάς μεταβιβάζεται σε εσάς, με δύο εξαιρέσεις: (α) συστατικά τρίτων, που παραμένουν υπό τις δικές τους άδειες· και (β) τα δικά μου προϋπάρχοντα εργαλεία, βιβλιοθήκες και τεχνογνωσία, που διατηρώ και μπορώ να επαναχρησιμοποιώ.",
          "Εκτός αν συμφωνηθεί διαφορετικά γραπτώς, μπορώ να προβάλλω το ολοκληρωμένο έργο στο portfolio μου και να σας αναφέρω ως πελάτη.",
        ],
      },
      {
        heading: "Υπηρεσίες τρίτων",
        body: [
          "Τα έργα συχνά βασίζονται σε υπηρεσίες και λογισμικό τρίτων (για παράδειγμα hosting, πάροχοι πληρωμών και βιβλιοθήκες ανοιχτού κώδικα). Αυτά διέπονται από τους δικούς τους όρους και δεν ευθύνομαι για τη διαθεσιμότητα, τις αλλαγές ή το κόστος τους. Οι συνεχείς συνδρομές και άδειες είναι δική σας ευθύνη, εκτός αν συμφωνηθεί ότι τις διαχειρίζομαι για λογαριασμό σας.",
        ],
      },
      {
        heading: "Εμπιστευτικότητα",
        body: [
          "Κάθε μέρος συμφωνεί να τηρεί εμπιστευτικές τις μη δημόσιες πληροφορίες που ανταλλάσσονται κατά τη διάρκεια ενός έργου και να τις χρησιμοποιεί μόνο για το έργο αυτό. Αυτό δεν ισχύει για πληροφορίες που είναι ήδη δημόσιες ή που πρέπει να αποκαλυφθούν βάσει νόμου.",
        ],
      },
      {
        heading: "Προστασία δεδομένων",
        body: [
          "Τα προσωπικά δεδομένα που υποβάλλετε μέσω των φορμών μου ή μοιράζεστε κατά τη διάρκεια ενός έργου χρησιμοποιούνται μόνο για να σας απαντήσω και να παραδώσω την εργασία, και δεν πωλούνται ποτέ. Όπου επεξεργάζομαι προσωπικά δεδομένα για λογαριασμό σας, θα συμφωνήσουμε κατάλληλους όρους σύμφωνα με την ισχύουσα νομοθεσία περί προστασίας δεδομένων, συμπεριλαμβανομένου του GDPR.",
        ],
      },
      {
        heading: "Αποποίηση εγγυήσεων",
        body: [
          "Οι εργασίες παραδίδονται με βάση την εύλογη προσπάθεια. Πέραν οποιασδήποτε συγκεκριμένης εγγύησης που αναφέρεται σε πρόταση, τα παραδοτέα παρέχονται \"ως έχουν\", χωρίς εγγυήσεις αδιάλειπτης ή χωρίς σφάλματα λειτουργίας, συγκεκριμένων εμπορικών αποτελεσμάτων ή συμβατότητας με κάθε μελλοντική συσκευή ή ενημέρωση τρίτων.",
        ],
      },
      {
        heading: "Περιορισμός ευθύνης",
        body: [
          "Στον βαθμό που επιτρέπεται από τον νόμο, η συνολική μου ευθύνη από οποιοδήποτε έργο περιορίζεται στις αμοιβές που καταβάλατε για το έργο αυτό. Δεν ευθύνομαι για έμμεσες ή παρεπόμενες ζημίες, συμπεριλαμβανομένων διαφυγόντων κερδών, δεδομένων ή εργασιών, όπως και αν προκύψουν.",
        ],
      },
      {
        heading: "Αποζημίωση",
        body: [
          "Συμφωνείτε να με απαλλάσσετε από αξιώσεις που προκύπτουν από υλικό που παρέχετε ή οδηγίες που δίνετε (για παράδειγμα, περιεχόμενο που προσβάλλει δικαιώματα τρίτων), εκτός αν η αξίωση οφείλεται σε δική μου υπαιτιότητα.",
        ],
      },
      {
        heading: "Καταγγελία",
        body: [
          "Κάθε μέρος μπορεί να τερματίσει ένα έργο γραπτώς. Σε περίπτωση ακύρωσης από εσάς, οι εργασίες που έχουν ολοκληρωθεί και τα κόστη που έχουν προκύψει μέχρι εκείνο το σημείο παραμένουν πληρωτέα, και τυχόν μη επιστρεπτέα προκαταβολή παρακρατείται. Μπορώ να αναστείλω ή να τερματίσω ένα έργο εάν τιμολόγια παραμένουν ανεξόφλητα, ή εάν η συνέχιση θα ήταν παράνομη ή μη εύλογη.",
        ],
      },
      {
        heading: "Εφαρμοστέο δίκαιο",
        body: [
          "Οι παρόντες όροι διέπονται από το ελληνικό δίκαιο. Κάθε διαφορά που δεν μπορεί να επιλυθεί φιλικά υπάγεται στην αρμοδιότητα των αρμόδιων δικαστηρίων της Αθήνας.",
        ],
      },
      {
        heading: "Μερική ακυρότητα",
        body: [
          "Εάν οποιαδήποτε διάταξη των παρόντων όρων κριθεί άκυρη ή μη εκτελεστή, οι υπόλοιπες διατάξεις παραμένουν σε πλήρη ισχύ.",
        ],
      },
      {
        heading: "Αλλαγές στους όρους",
        body: [
          "Ενδέχεται να επικαιροποιώ τους παρόντες όρους κατά καιρούς. Η έκδοση που είναι δημοσιευμένη σε αυτή τη σελίδα κατά τον χρόνο ανάθεσης των υπηρεσιών μου είναι εκείνη που ισχύει για το έργο σας.",
        ],
      },
      {
        heading: "Επικοινωνία",
        body: [
          "Ερωτήσεις σχετικά με τους παρόντες όρους μπορούν να σταλούν στο info@akosds.com ή ταχυδρομικά στη διεύθυνση Επιδάμνου 21, 11254, Αθήνα, Ελλάδα.",
        ],
      },
    ],
  },
};
