import type { BL, BLA } from "./data.ts";
import type { LongStudy } from "./international.ts";

/**
 * The long-form content for the Olympus Marathon build, in the same shape as
 * the International Rentals page: the platform goes live after the winter race
 * on 13 December 2026, so there is nothing public to open yet and the page
 * carries the build itself. Every claim is taken from the project's README and
 * its decisions doc; the commercial terms stay out.
 */
export const olympus: LongStudy = {
  slug: "olympus-marathon",

  noLink: {
    en: "Nothing to open yet. The platform is built and tested, and goes live right after the winter race on 13 December 2026, so this page shows the build itself: the screens, the rules underneath them and why they are there.",
    el: "Δεν υπάρχει ακόμη κάτι να ανοίξεις. Η πλατφόρμα είναι χτισμένη και δοκιμασμένη, και βγαίνει ζωντανά αμέσως μετά τον χειμερινό αγώνα στις 13 Δεκεμβρίου 2026. Οπότε αυτή η σελίδα δείχνει το ίδιο το έργο: τις οθόνες, τους κανόνες από κάτω και γιατί υπάρχουν.",
  } as BL,

  facts: [
    {
      n: { en: "7", el: "7" } as BL,
      k: { en: "mountain races in Litochoro, each with its own entry form", el: "ορεινοί αγώνες στο Λιτόχωρο, ο καθένας με τη δική του φόρμα" } as BL,
    },
    {
      n: { en: "13,089", el: "13.089" } as BL,
      k: { en: "athletes in a registry going back to 2004", el: "αθλητές σε μητρώο που φτάνει ως το 2004" } as BL,
    },
    {
      n: { en: "~21,000", el: "~21.000" } as BL,
      k: { en: "archived results, linked to their athletes", el: "αρχειακά αποτελέσματα, συνδεδεμένα με τους αθλητές τους" } as BL,
    },
    {
      n: { en: "1,000", el: "1.000" } as BL,
      k: { en: "concurrent checkouts in the load test, no place oversold", el: "ταυτόχρονες πληρωμές στο τεστ φόρτου, καμία θέση παραπάνω" } as BL,
    },
  ],

  chapters: [
    {
      eyebrow: { en: "The brief", el: "Το ζητούμενο" } as BL,
      title: {
        en: "One platform instead of a site and a drawer of tools",
        el: "Μία πλατφόρμα αντί για ένα site και ένα συρτάρι εργαλεία",
      } as BL,
      body: {
        en: [
          "The organiser ran the races on an old Drupal site, with registrations, results, the athlete history and the live leaderboard each living somewhere else.",
          "The new platform puts all of it in one place the secretariat runs itself: the public site, entries and payment, approvals and bib numbers, start lists for the timing company, results with splits and a live page, the registry since 2004, finisher certificates as PDF, news, photos, sponsors and a newsletter. Greek first, English alongside, and every old URL redirects to its new page.",
        ],
        el: [
          "Ο διοργανωτής έτρεχε τους αγώνες σε ένα παλιό site Drupal, με τις εγγραφές, τα αποτελέσματα, το ιστορικό των αθλητών και το ζωντανό leaderboard να βρίσκονται το καθένα κάπου αλλού.",
          "Η νέα πλατφόρμα τα βάζει όλα σε ένα σημείο που η γραμματεία διαχειρίζεται μόνη της: το δημόσιο site, δηλώσεις και πληρωμές, εγκρίσεις και αριθμούς συμμετοχής, λίστες εκκίνησης για την εταιρεία χρονομέτρησης, αποτελέσματα με ενδιάμεσους χρόνους και ζωντανή σελίδα, το μητρώο από το 2004, πιστοποιητικά τερματισμού σε PDF, νέα, φωτογραφίες, χορηγούς και newsletter. Ελληνικά πρώτα, αγγλικά δίπλα, και κάθε παλιό URL οδηγεί στη νέα του σελίδα.",
        ],
      } as BLA,
    },
    {
      eyebrow: { en: "Registration", el: "Εγγραφή" } as BL,
      title: {
        en: "An entry counts only once it is paid",
        el: "Μια δήλωση μετράει μόνο όταν πληρωθεί",
      } as BL,
      body: {
        en: [
          "The form is built per edition from its own config and saved on the device as the athlete types, so a dropped connection loses nothing.",
          "At checkout the place is held for fifteen minutes and the price is computed on the server, in SQL, never taken from the browser. Every checkout gets its own merchant reference, and the bank's callback is signed and idempotent, so a repeated or replayed callback can't pay twice or confirm a place that was never held.",
        ],
        el: [
          "Η φόρμα χτίζεται για κάθε διοργάνωση από τη δική της ρύθμιση και αποθηκεύεται στη συσκευή όσο γράφει ο αθλητής, οπότε μια διακοπή σύνδεσης δεν χάνει τίποτα.",
          "Στην πληρωμή η θέση δεσμεύεται για δεκαπέντε λεπτά και η τιμή υπολογίζεται στον server, σε SQL, ποτέ από τον browser. Κάθε πληρωμή έχει το δικό της αναγνωριστικό, και η επιστροφή της τράπεζας είναι υπογεγραμμένη και idempotent, ώστε μια επανάληψη να μην μπορεί να πληρώσει δύο φορές ή να επιβεβαιώσει θέση που δεν δεσμεύτηκε ποτέ.",
        ],
      } as BLA,
      image: "olympus/signup-flow",
      alt: {
        en: "The athlete's registration in five steps, from the form to the confirmation email with the bib number",
        el: "Η εγγραφή του αθλητή σε πέντε βήματα, από τη φόρμα ως το email επιβεβαίωσης με τον αριθμό συμμετοχής",
      } as BL,
      caption: {
        en: "The athlete's path, with the four cases that used to need a phone call answered on screen.",
        el: "Η διαδρομή του αθλητή, με τις τέσσερις περιπτώσεις που ήθελαν παλιά τηλεφώνημα να απαντώνται στην οθόνη.",
      } as BL,
    },
    {
      eyebrow: { en: "Load", el: "Φόρτος" } as BL,
      title: {
        en: "Tested for the morning registrations open",
        el: "Δοκιμασμένο για το πρωί που ανοίγουν οι εγγραφές",
      } as BL,
      body: {
        en: [
          "Capacity, bib uniqueness and duplicate entries are enforced by Postgres itself, not by application code that two requests arriving together could both slip past. Every constraint and SQL function has its own database test, 324 checks in pgTAP.",
          "Before summer registrations open, a load test fires a thousand checkouts at the same moment. The race fills to exactly its capacity, and not one place more.",
        ],
        el: [
          "Η χωρητικότητα, η μοναδικότητα των αριθμών και οι διπλές δηλώσεις ελέγχονται από την ίδια την Postgres, όχι από κώδικα εφαρμογής που δύο αιτήματα μαζί θα μπορούσαν να προσπεράσουν. Κάθε περιορισμός και κάθε συνάρτηση SQL έχει το δικό της τεστ στη βάση, 324 έλεγχοι σε pgTAP.",
          "Πριν ανοίξουν οι καλοκαιρινές εγγραφές, ένα τεστ φόρτου στέλνει χίλιες πληρωμές την ίδια στιγμή. Ο αγώνας γεμίζει ακριβώς ως τη χωρητικότητά του, και ούτε μία θέση παραπάνω.",
        ],
      } as BLA,
    },
    {
      eyebrow: { en: "The registry", el: "Το μητρώο" } as BL,
      title: {
        en: "Twenty years of results, one athlete each",
        el: "Είκοσι χρόνια αποτελέσματα, ένας αθλητής ο καθένας",
      } as BL,
      body: {
        en: [
          "About 13,000 athletes and 21,000 results came over from the old system and the organiser's timing archives. The old system had often created several records for the same person, so duplicates with the same name, birth date and sex are merged, and anything uncertain lands on a review screen for the secretariat instead of being guessed.",
          "Each athlete gets a page with every result since 2004, and a finisher can download a certificate for any race they completed.",
          "The same archive feeds a records page for every race, with the fastest men and women overall, per age group and the best Greek and foreign finishers, and a statistics page per year built from aggregates only, with no names and no one's age on it.",
        ],
        el: [
          "Περίπου 13.000 αθλητές και 21.000 αποτελέσματα μεταφέρθηκαν από το παλιό σύστημα και τα αρχεία χρονομέτρησης του διοργανωτή. Το παλιό σύστημα συχνά είχε φτιάξει πολλές εγγραφές για το ίδιο πρόσωπο, οπότε τα διπλότυπα με ίδιο όνομα, ημερομηνία γέννησης και φύλο ενώνονται, και ό,τι είναι αβέβαιο πηγαίνει σε οθόνη ελέγχου για τη γραμματεία αντί να μαντεύεται.",
          "Κάθε αθλητής έχει σελίδα με κάθε αποτέλεσμα από το 2004, και όποιος τερμάτισε κατεβάζει πιστοποιητικό για κάθε αγώνα που ολοκλήρωσε.",
          "Το ίδιο αρχείο τροφοδοτεί μια σελίδα ρεκόρ για κάθε αγώνα, με τους ταχύτερους άνδρες και γυναίκες συνολικά, ανά ηλικιακή ομάδα και τον καλύτερο Έλληνα και ξένο αθλητή, και μια σελίδα στατιστικών ανά χρονιά φτιαγμένη μόνο από συγκεντρωτικά στοιχεία, χωρίς ονόματα και χωρίς την ηλικία κανενός.",
        ],
      } as BLA,
      image: "olympus/results",
      alt: {
        en: "Results by year, from 2004 to 2026, with filters for sex and category",
        el: "Αποτελέσματα ανά έτος, από το 2004 ως το 2026, με φίλτρα για φύλο και κατηγορία",
      } as BL,
      caption: {
        en: "Every year since 2004 is one tap away, and filtering keeps the reader's place instead of jumping back to the top.",
        el: "Κάθε χρονιά από το 2004 είναι ένα πάτημα μακριά, και το φιλτράρισμα κρατά τη θέση του αναγνώστη αντί να γυρίζει στην αρχή.",
      } as BL,
    },
    {
      eyebrow: { en: "The secretariat", el: "Η γραμματεία" } as BL,
      title: {
        en: "The people who run the race run the site",
        el: "Όσοι τρέχουν τον αγώνα τρέχουν και το site",
      } as BL,
      body: {
        en: [
          "Staff sign in with a code sent to their email, with admin and secretariat roles. They open and close registrations by date, set fees and add-ons, approve entries with registry matches suggested and the next bib number filled in, export start lists for the timing company, import teams from Excel, and manage news, race pages, sponsors, photos and the newsletter.",
          "Every change goes to an audit log, so the question of who changed what always has an answer.",
        ],
        el: [
          "Το προσωπικό συνδέεται με κωδικό που έρχεται στο email του, με ρόλους διαχειριστή και γραμματείας. Ανοίγει και κλείνει εγγραφές ανά ημερομηνία, ορίζει τέλη και πρόσθετα, εγκρίνει δηλώσεις με προτεινόμενη αντιστοίχιση στο μητρώο και τον επόμενο αριθμό συμμετοχής συμπληρωμένο, εξάγει λίστες εκκίνησης για τη χρονομέτρηση, εισάγει ομάδες από Excel, και διαχειρίζεται νέα, σελίδες αγώνων, χορηγούς, φωτογραφίες και newsletter.",
          "Κάθε αλλαγή καταγράφεται σε ημερολόγιο ελέγχου, οπότε το ποιος άλλαξε τι έχει πάντα απάντηση.",
        ],
      } as BLA,
      image: "olympus/bib-decision",
      alt: {
        en: "The approval screen, with the next free bib number filled in and the elite block reserved",
        el: "Η οθόνη έγκρισης, με τον επόμενο ελεύθερο αριθμό συμμετοχής συμπληρωμένο και το ελίτ μπλοκ δεσμευμένο",
      } as BL,
      caption: {
        en: "Approval fills in the next free bib and keeps the elite block for numbers chosen by hand.",
        el: "Η έγκριση συμπληρώνει τον επόμενο ελεύθερο αριθμό και κρατά το ελίτ μπλοκ για αριθμούς που δίνονται με το χέρι.",
      } as BL,
    },
    {
      eyebrow: { en: "Privacy", el: "Ιδιωτικότητα" } as BL,
      title: {
        en: "Public lists show only what an athlete agreed to",
        el: "Οι δημόσιες λίστες δείχνουν μόνο ό,τι δέχτηκε ο αθλητής",
      } as BL,
      body: {
        en: [
          "Participant lists show only the columns each athlete consented to, and every consent is stored with the exact version of the text they agreed to. Nothing non-essential loads before cookie consent, and no secret ever reaches the browser.",
          "Athlete accounts are optional and never required to register: an emailed code or a password shows your entries, your results since 2004 and your stats, and fills in the form for the next race.",
        ],
        el: [
          "Οι λίστες συμμετεχόντων δείχνουν μόνο τις στήλες που αποδέχτηκε κάθε αθλητής, και κάθε συναίνεση αποθηκεύεται με την ακριβή έκδοση του κειμένου που αποδέχτηκε. Τίποτα μη απαραίτητο δεν φορτώνει πριν τη συναίνεση στα cookies, και κανένα μυστικό δεν φτάνει ποτέ στον browser.",
          "Οι λογαριασμοί αθλητών είναι προαιρετικοί και δεν απαιτούνται ποτέ για την εγγραφή: με κωδικό στο email ή με συνθηματικό βλέπεις τις δηλώσεις σου, τα αποτελέσματά σου από το 2004 και τα στατιστικά σου, και η φόρμα του επόμενου αγώνα συμπληρώνεται μόνη της.",
        ],
      } as BLA,
    },
  ],

  stack: [
    {
      group: { en: "Site", el: "Site" } as BL,
      items: ["Astro", "TypeScript", "Plain CSS", "Node on Railway", "Cloudflare"],
    },
    {
      group: { en: "Data", el: "Δεδομένα" } as BL,
      items: ["Supabase Postgres", "Row Level Security", "pgTAP", "Storage"],
    },
    {
      group: { en: "Money", el: "Πληρωμές" } as BL,
      items: ["Piraeus e-POS", "wrapp.ai myDATA receipts"],
    },
    {
      group: { en: "Mail and tests", el: "Email και τεστ" } as BL,
      items: ["Resend", "Vitest", "k6"],
    },
  ],

  timeline: [
    {
      when: { en: "October 2026", el: "Οκτώβριος 2026" } as BL,
      what: {
        en: "Contract signed. The platform is built and tested: registration and payment, the admin, results, the registry and the imported archive.",
        el: "Υπογραφή σύμβασης. Η πλατφόρμα είναι χτισμένη και δοκιμασμένη: εγγραφές και πληρωμές, διαχείριση, αποτελέσματα, μητρώο και το εισηγμένο αρχείο.",
      } as BL,
      done: true,
    },
    {
      when: { en: "13 December 2026", el: "13 Δεκεμβρίου 2026" } as BL,
      what: {
        en: "Live right after the winter race, which runs on the old site to the end.",
        el: "Ζωντανά αμέσως μετά τον χειμερινό αγώνα, που τρέχει στο παλιό site ως το τέλος.",
      } as BL,
      done: false,
    },
    {
      when: { en: "January 2027", el: "Ιανουάριος 2027" } as BL,
      what: {
        en: "Summer registrations open on the new platform, load-tested and rehearsed with the secretariat beforehand.",
        el: "Οι καλοκαιρινές εγγραφές ανοίγουν στη νέα πλατφόρμα, με τεστ φόρτου και πρόβα με τη γραμματεία από πριν.",
      } as BL,
      done: false,
    },
  ],
};
