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
      image: "olympus/01-cover",
      alt: {
        en: "Olympus Marathon, race entries and results: the new home page on desktop and phone, with the countdown to the winter race",
        el: "Olympus Marathon, εγγραφές και αποτελέσματα αγώνων: η νέα αρχική σε desktop και κινητό, με την αντίστροφη μέτρηση για τον χειμερινό αγώνα",
      } as BL,
      caption: {
        en: "The new home page, with the countdown to the next race and registration one tap away. Shown from the test deploy, before launch.",
        el: "Η νέα αρχική, με αντίστροφη μέτρηση για τον επόμενο αγώνα και την εγγραφή ένα πάτημα μακριά. Από το δοκιμαστικό περιβάλλον, πριν το λανσάρισμα.",
      } as BL,
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
      image: "olympus/03-registration",
      alt: {
        en: "The price comes only from the server: two phone screens of the entry form, personal details and race-specific fields",
        el: "Η τιμή βγαίνει μόνο στον server: δύο οθόνες κινητού της φόρμας εγγραφής, προσωπικά στοιχεία και πεδία του αγώνα",
      } as BL,
      caption: {
        en: "The form is built from each race's settings, saves on the device as the athlete types, and never sends an amount: the price is computed in SQL. Payment goes through Piraeus e-POS, by card or IRIS.",
        el: "Η φόρμα στήνεται από τις ρυθμίσεις κάθε αγώνα, αποθηκεύεται στη συσκευή όσο γράφει ο αθλητής, και δεν στέλνει ποτέ ποσό: η τιμή υπολογίζεται σε SQL. Η πληρωμή γίνεται μέσω Πειραιώς e-POS, με κάρτα ή IRIS.",
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
      image: "olympus/04-capacity",
      alt: {
        en: "A thousand payments at once, not one place too many: the checkout SQL that locks the race and counts taken places, and the unique index on bibs",
        el: "Χίλιες πληρωμές μαζί, καμία θέση παραπάνω: το SQL του checkout που κλειδώνει τον αγώνα και μετρά τις πιασμένες θέσεις, και το μοναδικό index για τα bib",
      } as BL,
      caption: {
        en: "The check runs inside Postgres with the race row locked, so two checkouts can't both take the last place, and a unique index means two athletes never share a bib.",
        el: "Ο έλεγχος τρέχει μέσα στην Postgres με τη γραμμή του αγώνα κλειδωμένη, οπότε δύο πληρωμές δεν παίρνουν και οι δύο την τελευταία θέση, και ένα μοναδικό index σημαίνει ότι δύο αθλητές δεν μοιράζονται ποτέ bib.",
      } as BL,
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
        ],
        el: [
          "Περίπου 13.000 αθλητές και 21.000 αποτελέσματα μεταφέρθηκαν από το παλιό σύστημα και τα αρχεία χρονομέτρησης του διοργανωτή. Το παλιό σύστημα συχνά είχε φτιάξει πολλές εγγραφές για το ίδιο πρόσωπο, οπότε τα διπλότυπα με ίδιο όνομα, ημερομηνία γέννησης και φύλο ενώνονται, και ό,τι είναι αβέβαιο πηγαίνει σε οθόνη ελέγχου για τη γραμματεία αντί να μαντεύεται.",
          "Κάθε αθλητής έχει σελίδα με κάθε αποτέλεσμα από το 2004, και όποιος τερμάτισε κατεβάζει πιστοποιητικό για κάθε αγώνα που ολοκλήρωσε.",
        ],
      } as BLA,
      image: "olympus/05-results",
      alt: {
        en: "Results since 2004, one table: the results archive by year and a race's results table with search and filters",
        el: "Αποτελέσματα από το 2004, ένας πίνακας: το αρχείο αποτελεσμάτων ανά χρονιά και ο πίνακας ενός αγώνα με αναζήτηση και φίλτρα",
      } as BL,
      caption: {
        en: "The old site kept results in more than seven table layouts. Now they are data: search by name or bib, filter by category and sex, with split times, a live page on race day and a certificate link the moment an athlete finishes.",
        el: "Το παλιό site είχε τα αποτελέσματα σε πάνω από επτά μορφές πινάκων. Τώρα είναι δεδομένα: αναζήτηση με όνομα ή bib, φίλτρα ανά κατηγορία και φύλο, ενδιάμεσοι χρόνοι, live σελίδα την ημέρα του αγώνα και link στο πιστοποιητικό μόλις τερματίσει ο αθλητής.",
      } as BL,
    },
    {
      eyebrow: { en: "Records", el: "Ρεκόρ" } as BL,
      title: {
        en: "Worked out from the archive, never typed in",
        el: "Υπολογίζονται από το αρχείο, δεν γράφονται με το χέρι",
      } as BL,
      body: {
        en: [
          "The same archive feeds a records page for every race, with the fastest men and women overall, per age group and the best Greek and foreign finishers, and a statistics page per year built from aggregates only, with no names and no one's age on it.",
        ],
        el: [
          "Το ίδιο αρχείο τροφοδοτεί μια σελίδα ρεκόρ για κάθε αγώνα, με τους ταχύτερους άνδρες και γυναίκες συνολικά, ανά ηλικιακή ομάδα και τον καλύτερο Έλληνα και ξένο αθλητή, και μια σελίδα στατιστικών ανά χρονιά φτιαγμένη μόνο από συγκεντρωτικά στοιχεία, χωρίς ονόματα και χωρίς την ηλικία κανενός.",
        ],
      } as BLA,
      image: "olympus/06-records",
      alt: {
        en: "Records and statistics, worked out from the archive: the top ten times for men and women, and a phone showing one edition's statistics",
        el: "Ρεκόρ και στατιστικά, υπολογισμένα από το αρχείο: οι δέκα καλύτεροι χρόνοι ανδρών και γυναικών, και ένα κινητό με τα στατιστικά μίας έκδοσης",
      } as BL,
      caption: {
        en: "Best times per race, sex and age group, and each edition's numbers: starters, finishers, median time and average age. Nobody updates them by hand.",
        el: "Καλύτεροι χρόνοι ανά αγώνα, φύλο και ηλικιακή ομάδα, και τα νούμερα κάθε έκδοσης: εκκινήσαντες, τερματίσαντες, διάμεσος χρόνος και μέση ηλικία. Κανείς δεν τα ενημερώνει με το χέρι.",
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
      image: "olympus/07-secretariat",
      alt: {
        en: "Made for the secretariat, not for developers: what the secretariat does from one place, with 324 database checks and 456 app tests",
        el: "Φτιαγμένο για τη γραμματεία, όχι για developers: τι κάνει η γραμματεία από ένα σημείο, με 324 ελέγχους στη βάση και 456 tests εφαρμογής",
      } as BL,
      caption: {
        en: "Approvals with registry matches, automatic bibs with an elite block, start lists for timing, team imports from Excel, live results, merged duplicate profiles, and the newsletter, all without a developer.",
        el: "Εγκρίσεις με προτάσεις από το μητρώο, αυτόματα bib με μπλοκ για τους elite, start list για τη χρονομέτρηση, εισαγωγή ομάδων από Excel, live αποτελέσματα, ενοποίηση διπλών προφίλ και newsletter, όλα χωρίς developer.",
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
