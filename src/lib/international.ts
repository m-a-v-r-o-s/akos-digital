import type { BL, BLA } from "@/lib/data";

/**
 * The long-form content for the International Rentals build.
 *
 * It lives here rather than in the caseStudies collection because this one is
 * not a live site with a link at the end of it: it is an internal tool behind
 * a login, so the page has to carry the whole thing itself. Every claim below
 * is taken from the project's own decisions, architecture and security docs.
 */

export type Chapter = {
  eyebrow: BL;
  title: BL;
  body: BLA;
  /** A board from the gallery, laid out 16:9. */
  image?: string;
  alt?: BL;
  caption?: BL;
  /** Shown as a code block under the prose, when the mechanism is the point. */
  code?: { label: BL; lines: string[] };
};

export const international = {
  slug: "international-rentals",
  client: "International Rentals",

  status: { en: "In development", el: "Σε εξέλιξη" } as BL,

  title: {
    en: "A hundred cars, ten hotel desks, and a paper day sheet",
    el: "Εκατό αυτοκίνητα, δέκα ξενοδοχεία και ένα χάρτινο φύλλο ημέρας",
  } as BL,

  summary: {
    en: "A Greek rent-a-car company runs roughly 100 cars through reps stationed at hotel desks. Availability, prices, contracts and cash all live on paper and in phone calls. This is the operations platform replacing that, end to end.",
    el: "Ελληνική εταιρεία rent-a-car κινεί περίπου 100 αυτοκίνητα μέσα από αντιπροσώπους σε ξενοδοχεία. Η διαθεσιμότητα, οι τιμές, τα συμφωνητικά και τα μετρητά ζουν σε χαρτί και σε τηλεφωνήματα. Αυτή είναι η πλατφόρμα που τα αντικαθιστά, από άκρη σε άκρη.",
  } as BL,

  /** Why this entry has no link when every other one does. */
  noLink: {
    en: "There is nothing to open. This is an internal tool behind a login, holding a real company's fleet, customers and money, so the build itself is what this page shows: the screens, the rules underneath them and the reasoning that got there.",
    el: "Δεν υπάρχει κάτι να ανοίξεις. Πρόκειται για εσωτερικό εργαλείο πίσω από σύνδεση, που κρατά τον στόλο, τους πελάτες και τα χρήματα μιας πραγματικής εταιρείας. Οπότε αυτή η σελίδα δείχνει το ίδιο το έργο: τις οθόνες, τους κανόνες από κάτω και τη σκέψη που οδήγησε εκεί.",
  } as BL,

  facts: [
    {
      n: { en: "~100", el: "~100" } as BL,
      k: { en: "cars, held to the day rather than to the hour", el: "αυτοκίνητα, δεσμευμένα ανά ημέρα και όχι ανά ώρα" } as BL,
    },
    {
      n: { en: "6-10", el: "6-10" } as BL,
      k: { en: "reps at hotel desks, plus one manager", el: "αντιπρόσωποι σε ξενοδοχεία, συν έναν ιδιοκτήτη" } as BL,
    },
    {
      n: { en: "2", el: "2" } as BL,
      k: { en: "languages, 1,082 strings each, kept in step by a test", el: "γλώσσες, 1.082 κείμενα η καθεμία, με τεστ που τις κρατά ίσες" } as BL,
    },
    {
      n: { en: "47", el: "47" } as BL,
      k: { en: "test files, 31 of them against a real Postgres", el: "αρχεία τεστ, τα 31 πάνω σε πραγματική Postgres" } as BL,
    },
  ],

  chapters: [
    {
      eyebrow: { en: "The problem", el: "Το πρόβλημα" } as BL,
      title: {
        en: "Everything worked, and nothing was written down twice",
        el: "Όλα δούλευαν, και τίποτα δεν ήταν γραμμένο δύο φορές",
      } as BL,
      body: {
        en: [
          "The company works the way a lot of island rental businesses work. A guest asks at a hotel desk, the rep phones the office, someone looks at a sheet of paper, and a car is either free or it is not. It holds together because the same people have done it for years.",
          "What it cannot do is answer a question twice the same way. Two reps can promise the same car within the same minute. A price quoted at one desk can differ from the price at the next. A guest who returns a car early frees a car that nobody knows is free. And every one of those failures costs money at exactly the moment the season is busiest.",
          "So the brief was not really software. It was: replace the paper without breaking the day, and never be the reason a car gets promised twice.",
        ],
        el: [
          "Η εταιρεία δουλεύει όπως δουλεύουν πολλές νησιωτικές επιχειρήσεις ενοικιάσεων. Ο επισκέπτης ρωτά στη ρεσεψιόν, ο αντιπρόσωπος τηλεφωνεί στο γραφείο, κάποιος κοιτά ένα χαρτί, και το αυτοκίνητο είτε είναι ελεύθερο είτε όχι. Στέκει επειδή οι ίδιοι άνθρωποι το κάνουν χρόνια.",
          "Αυτό που δεν μπορεί να κάνει είναι να απαντήσει την ίδια ερώτηση δύο φορές με τον ίδιο τρόπο. Δύο αντιπρόσωποι μπορούν να υποσχεθούν το ίδιο αυτοκίνητο μέσα στο ίδιο λεπτό. Μια τιμή που δόθηκε σε ένα ξενοδοχείο μπορεί να διαφέρει από την τιμή στο επόμενο. Ένας επισκέπτης που επιστρέφει νωρίς ελευθερώνει ένα αυτοκίνητο που κανείς δεν ξέρει ότι είναι ελεύθερο. Και καθένα από αυτά κοστίζει ακριβώς τη στιγμή που η σεζόν είναι στο φόρτε της.",
          "Οπότε το ζητούμενο δεν ήταν στην ουσία λογισμικό. Ήταν: αντικατέστησε το χαρτί χωρίς να χαλάσεις τη μέρα, και μη γίνεις ποτέ ο λόγος που ένα αυτοκίνητο υπόσχεται σε δύο ανθρώπους.",
        ],
      } as BLA,
    },
    {
      eyebrow: { en: "Two users", el: "Δύο χρήστες" } as BL,
      title: {
        en: "One codebase for two people who must not see the same thing",
        el: "Ένας κώδικας για δύο ανθρώπους που δεν πρέπει να βλέπουν τα ίδια",
      } as BL,
      body: {
        en: [
          "A rep works one-handed, on a phone, at a hotel desk, in sunlight, with a guest standing there. The manager works on a desktop and needs the whole company at once. Same app, same deploy, two completely different jobs.",
          "The commercial rule is blunt: a rep never sees an aggregate. Not a count, not a sum, not an average. If a number on a rep's screen would let company revenue be worked out, it does not go on the screen. The single exception is their own cash in hand today, because they are the person carrying it.",
          "That rule is not enforced by hiding buttons. Authorisation lives in the database: row-level security is on for every table, with policies a rep's own session is tested against. A rep who edits an API call by hand reaches exactly the same wall, because the wall is not in the route handler.",
        ],
        el: [
          "Ο αντιπρόσωπος δουλεύει με το ένα χέρι, σε κινητό, σε μια ρεσεψιόν, στον ήλιο, με τον πελάτη μπροστά του. Ο ιδιοκτήτης δουλεύει σε desktop και χρειάζεται όλη την εταιρεία μαζί. Ίδια εφαρμογή, ίδιο deploy, δύο εντελώς διαφορετικές δουλειές.",
          "Ο εμπορικός κανόνας είναι ωμός: ο αντιπρόσωπος δεν βλέπει ποτέ συγκεντρωτικό στοιχείο. Ούτε πλήθος, ούτε άθροισμα, ούτε μέσο όρο. Αν ένας αριθμός στην οθόνη του επιτρέπει να συναχθεί ο τζίρος της εταιρείας, δεν μπαίνει στην οθόνη. Η μόνη εξαίρεση είναι τα δικά του μετρητά της ημέρας, γιατί αυτός είναι που τα κουβαλά.",
          "Ο κανόνας δεν επιβάλλεται κρύβοντας κουμπιά. Η εξουσιοδότηση ζει στη βάση: row-level security ενεργό σε κάθε πίνακα, με πολιτικές που δοκιμάζονται από τη συνεδρία του ίδιου του αντιπροσώπου. Όποιος πειράξει ένα API call με το χέρι βρίσκει τον ίδιο ακριβώς τοίχο, γιατί ο τοίχος δεν είναι στον route handler.",
        ],
      } as BLA,
      image: "/projects/international/01-two-users.jpg",
      alt: {
        en: "The rep's phone app beside the manager's desktop day sheet",
        el: "Η εφαρμογή του αντιπροσώπου στο κινητό δίπλα στο φύλλο ημέρας του ιδιοκτήτη",
      } as BL,
      caption: {
        en: "The rep's day and the manager's day sheet, from one deploy. Every plate, guest and hotel shown here is invented.",
        el: "Η μέρα του αντιπροσώπου και το φύλλο ημέρας του ιδιοκτήτη, από ένα deploy. Κάθε πινακίδα, επισκέπτης και ξενοδοχείο εδώ είναι επινοημένα.",
      } as BL,
    },
    {
      eyebrow: { en: "Correctness", el: "Ορθότητα" } as BL,
      title: {
        en: "Two reps race for the last car, and the database refuses",
        el: "Δύο αντιπρόσωποι κυνηγούν το τελευταίο αυτοκίνητο, και η βάση αρνείται",
      } as BL,
      body: {
        en: [
          "Double-booking is the failure that matters, so it is not left to application logic that a later change could undo. Rentals and admin blocks live in one table, and one Postgres exclusion constraint covers both. Two overlapping holds on the same car cannot exist, because the write itself is refused.",
          "A failed insert therefore means something true: the car is genuinely taken. The rep is told that in plain language instead of being handed a car that is gone.",
          "The other half of correctness is the day rule. A day here runs morning to night, so a Monday pickup returned on Wednesday is three days and the car is held through all of Wednesday. Every date calculation in the codebase is inclusive of both ends. Two bookings may touch and not overlap: one ending on the 15th and the next starting on the 16th is legal.",
          "Reps never query the bookings table for availability at all. They call one function that returns car ids and occupied dates and nothing else, so learning that a car is taken cannot also leak who took it, from which hotel, for how much, or why.",
        ],
        el: [
          "Η διπλή κράτηση είναι η αποτυχία που μετράει, οπότε δεν αφήνεται σε κώδικα εφαρμογής που μια μελλοντική αλλαγή μπορεί να αναιρέσει. Οι ενοικιάσεις και τα διοικητικά μπλοκαρίσματα ζουν σε έναν πίνακα, και ένα exclusion constraint της Postgres καλύπτει και τα δύο. Δύο επικαλυπτόμενες δεσμεύσεις στο ίδιο αυτοκίνητο δεν μπορούν να υπάρξουν, γιατί η ίδια η εγγραφή απορρίπτεται.",
          "Μια αποτυχημένη εγγραφή σημαίνει λοιπόν κάτι αληθινό: το αυτοκίνητο είναι όντως πιασμένο. Ο αντιπρόσωπος το μαθαίνει με απλά λόγια, αντί να του δοθεί ένα αυτοκίνητο που έχει φύγει.",
          "Το άλλο μισό της ορθότητας είναι ο κανόνας της ημέρας. Η μέρα εδώ είναι από το πρωί ως το βράδυ, οπότε παραλαβή Δευτέρα με επιστροφή Τετάρτη είναι τρεις ημέρες και το αυτοκίνητο κρατιέται όλη την Τετάρτη. Κάθε υπολογισμός ημερομηνίας στον κώδικα περιλαμβάνει και τα δύο άκρα. Δύο κρατήσεις μπορούν να ακουμπούν χωρίς να επικαλύπτονται: μία που λήγει στις 15 και μία που αρχίζει στις 16 είναι νόμιμες.",
          "Οι αντιπρόσωποι δεν ρωτούν ποτέ τον πίνακα κρατήσεων για διαθεσιμότητα. Καλούν μία συνάρτηση που επιστρέφει ids αυτοκινήτων και πιασμένες ημερομηνίες και τίποτε άλλο, ώστε το να μάθεις ότι ένα αυτοκίνητο είναι πιασμένο να μην αποκαλύπτει και ποιος το πήρε, από ποιο ξενοδοχείο, με πόσα ή γιατί.",
        ],
      } as BLA,
      code: {
        label: { en: "The guarantee, in one constraint", el: "Η εγγύηση, σε ένα constraint" } as BL,
        lines: [
          "EXCLUDE USING gist (",
          "  car_id WITH =,",
          "  daterange(start_date, end_date, '[]') WITH &&",
          ") WHERE (status IN ('booked','out','blocked'))",
        ],
      },
      image: "/projects/international/02-correctness.jpg",
      alt: {
        en: "The exclusion constraint, the Postgres error it raises, and the message the rep is shown",
        el: "Το exclusion constraint, το σφάλμα της Postgres και το μήνυμα που βλέπει ο αντιπρόσωπος",
      } as BL,
      caption: {
        en: "A database error nobody should ever read, translated into one sentence a rep can act on.",
        el: "Ένα σφάλμα βάσης που κανείς δεν πρέπει να διαβάσει, μεταφρασμένο σε μία πρόταση που ο αντιπρόσωπος μπορεί να χρησιμοποιήσει.",
      } as BL,
    },
    {
      eyebrow: { en: "Pricing", el: "Τιμολόγηση" } as BL,
      title: {
        en: "The price list is never shipped to a rep's phone",
        el: "Ο τιμοκατάλογος δεν φτάνει ποτέ στο κινητό του αντιπροσώπου",
      } as BL,
      body: {
        en: [
          "Pricing runs on the server and only on the server. The rep's device asks for a quote and displays the number it gets back. It cannot recompute that number, and it never holds the table the number came from.",
          "The rules are the client's own, so the app follows them rather than improving on them. Totals are typed in per season, per category and per day count, and they already contain the first-day premium, so the app adds nothing on top. Past seven days it falls to a per-extra-day rate. Baby seats and additional drivers are free and stay free.",
          "Two details keep the money honest over time. Money is integer cents everywhere, from the database through to the PDF, so no float ever touches a total. And the pricing period is stored on the booking itself, so editing next season's price list cannot quietly rewrite what a guest already agreed to pay.",
          "If a pickup date falls in no defined period, quoting fails loudly. It does not guess, and it does not borrow a neighbouring period's numbers.",
        ],
        el: [
          "Η τιμολόγηση τρέχει στον server και μόνο εκεί. Η συσκευή του αντιπροσώπου ζητά προσφορά και εμφανίζει τον αριθμό που παίρνει πίσω. Δεν μπορεί να τον ξαναϋπολογίσει, και δεν κρατά ποτέ τον πίνακα από τον οποίο προέκυψε.",
          "Οι κανόνες είναι του ίδιου του πελάτη, οπότε η εφαρμογή τους ακολουθεί αντί να τους βελτιώνει. Τα σύνολα καταχωρούνται ανά περίοδο, κατηγορία και αριθμό ημερών, και περιέχουν ήδη την προσαύξηση της πρώτης ημέρας, οπότε η εφαρμογή δεν προσθέτει τίποτα από πάνω. Πέρα από τις επτά ημέρες ισχύει χρέωση ανά επιπλέον ημέρα. Τα παιδικά καθίσματα και οι πρόσθετοι οδηγοί είναι δωρεάν και παραμένουν δωρεάν.",
          "Δύο λεπτομέρειες κρατούν τα χρήματα τίμια στον χρόνο. Τα ποσά είναι ακέραια λεπτά παντού, από τη βάση ως το PDF, ώστε κανένα δεκαδικό να μην αγγίζει σύνολο. Και η περίοδος τιμολόγησης αποθηκεύεται πάνω στην ίδια την κράτηση, ώστε η επεξεργασία του τιμοκαταλόγου της επόμενης σεζόν να μην ξαναγράφει σιωπηλά αυτό που ένας επισκέπτης έχει ήδη συμφωνήσει.",
          "Αν η ημερομηνία παραλαβής δεν πέφτει σε καμία ορισμένη περίοδο, η προσφορά αποτυγχάνει θορυβωδώς. Δεν μαντεύει, και δεν δανείζεται τους αριθμούς της διπλανής περιόδου.",
        ],
      } as BLA,
      image: "/projects/international/03-pricing.jpg",
      alt: {
        en: "A new booking on the rep's phone beside the server-side quote rule",
        el: "Μια νέα κράτηση στο κινητό του αντιπροσώπου δίπλα στον κανόνα τιμολόγησης του server",
      } as BL,
      caption: {
        en: "The rep sees one number for the booking in front of them, with the days it was built from.",
        el: "Ο αντιπρόσωπος βλέπει έναν αριθμό για την κράτηση που έχει μπροστά του, με τις ημέρες από τις οποίες προέκυψε.",
      } as BL,
    },
    {
      eyebrow: { en: "The paper", el: "Το χαρτί" } as BL,
      title: {
        en: "Everything the clipboard did, in the order it happens",
        el: "Ό,τι έκανε το ντοσιέ, με τη σειρά που συμβαίνει",
      } as BL,
      body: {
        en: [
          "A pickup is a sequence, one thing per screen, and it survives the app being closed halfway through. Licence photographs, then the eligibility check, then fuel, then existing damage on a car diagram, then the agreement and the signature, then payment.",
          "Driving licences are read server-side by vision OCR, and the fields come back editable. The extracted text is treated as untrusted input from a stranger's card, parsed into a strict schema with anything outside it discarded, and rate limited per user. A failed scan costs nothing: typing the fields in always works.",
          "The eligibility check is a hard stop. Age against the category minimum, licence held at least a year, expiry beyond the return date. The screen names the rule that failed and offers the rep nothing but a request for an admin override, and the override is recorded when it is granted.",
          "The agreement is generated as a bilingual PDF with both drivers, the fuel level, the damage diagram and the guest's signature captured on the glass. It is built deterministically on the server, with no headless browser to keep alive in production.",
        ],
        el: [
          "Η παραλαβή είναι μια ακολουθία, ένα πράγμα ανά οθόνη, και επιβιώνει αν η εφαρμογή κλείσει στη μέση. Φωτογραφίες διπλώματος, μετά ο έλεγχος καταλληλότητας, μετά τα καύσιμα, μετά οι υπάρχουσες ζημιές πάνω σε διάγραμμα του οχήματος, μετά το συμφωνητικό και η υπογραφή, και τέλος η πληρωμή.",
          "Τα διπλώματα διαβάζονται στον server με vision OCR, και τα πεδία γυρίζουν επεξεργάσιμα. Το κείμενο που εξάγεται αντιμετωπίζεται ως μη έμπιστη είσοδος από την κάρτα ενός αγνώστου: περνά σε αυστηρό σχήμα, ό,τι δεν ανήκει εκεί απορρίπτεται, και υπάρχει όριο κλήσεων ανά χρήστη. Μια αποτυχημένη σάρωση δεν κοστίζει τίποτα, η πληκτρολόγηση δουλεύει πάντα.",
          "Ο έλεγχος καταλληλότητας είναι απόλυτο στοπ. Ηλικία σε σχέση με το ελάχιστο της κατηγορίας, δίπλωμα τουλάχιστον ενός έτους, λήξη μετά την ημερομηνία επιστροφής. Η οθόνη ονομάζει τον κανόνα που απέτυχε και δίνει στον αντιπρόσωπο μόνο ένα αίτημα έγκρισης προς τον διαχειριστή, και η έγκριση καταγράφεται όταν δοθεί.",
          "Το συμφωνητικό παράγεται ως δίγλωσσο PDF με τους δύο οδηγούς, τη στάθμη καυσίμου, το διάγραμμα ζημιών και την υπογραφή του επισκέπτη στην οθόνη. Χτίζεται ντετερμινιστικά στον server, χωρίς headless browser να συντηρείται στην παραγωγή.",
        ],
      } as BLA,
      image: "/projects/international/04-pickup.jpg",
      alt: {
        en: "The pickup sequence, a failed eligibility check, and the bilingual rental agreement",
        el: "Η ακολουθία παραλαβής, ένας αποτυχημένος έλεγχος καταλληλότητας και το δίγλωσσο συμφωνητικό",
      } as BL,
      caption: {
        en: "A guest who is too young for the category cannot be given the car, and the rep is not asked to decide that.",
        el: "Ένας επισκέπτης πολύ νέος για την κατηγορία δεν μπορεί να πάρει το αυτοκίνητο, και ο αντιπρόσωπος δεν καλείται να το κρίνει.",
      } as BL,
    },
    {
      eyebrow: { en: "Two languages", el: "Δύο γλώσσες" } as BL,
      title: {
        en: "Greek and English from the first commit",
        el: "Ελληνικά και αγγλικά από το πρώτο commit",
      } as BL,
      body: {
        en: [
          "The reps are Greek. Half the guests are not. Retrofitting a second language into a working app is a rewrite, so there has never been a hard-coded user-facing string in this codebase.",
          "Both languages carry 1,082 strings, and a test fails the build if one of them grows a key the other does not have. Language is a per-user setting rather than a browser guess, because a rep's phone is theirs and a guest's expectations are not.",
          "The rental agreement is bilingual on the same page rather than in two documents, which is what a guest signing at a desk actually needs, and what a Greek company issuing it needs too.",
        ],
        el: [
          "Οι αντιπρόσωποι είναι Έλληνες. Οι μισοί επισκέπτες δεν είναι. Το να προστεθεί δεύτερη γλώσσα σε μια εφαρμογή που ήδη δουλεύει είναι ξαναγράψιμο, οπότε σε αυτόν τον κώδικα δεν υπήρξε ποτέ κείμενο χρήστη γραμμένο μέσα στον κώδικα.",
          "Και οι δύο γλώσσες κρατούν 1.082 κείμενα, και ένα τεστ ρίχνει το build αν η μία αποκτήσει κλειδί που δεν έχει η άλλη. Η γλώσσα είναι ρύθμιση ανά χρήστη και όχι εικασία του browser, γιατί το κινητό του αντιπροσώπου είναι δικό του, ενώ οι προσδοκίες του επισκέπτη δεν είναι.",
          "Το συμφωνητικό είναι δίγλωσσο στην ίδια σελίδα και όχι σε δύο έγγραφα, που είναι αυτό που πραγματικά χρειάζεται ο επισκέπτης που υπογράφει σε μια ρεσεψιόν, και το ίδιο χρειάζεται και η ελληνική εταιρεία που το εκδίδει.",
        ],
      } as BLA,
    },
    {
      eyebrow: { en: "The room it is used in", el: "Ο χώρος όπου χρησιμοποιείται" } as BL,
      title: {
        en: "A phone, one hand, sunlight, and a guest waiting",
        el: "Ένα κινητό, ένα χέρι, ήλιος, και ένας επισκέπτης που περιμένει",
      } as BL,
      body: {
        en: [
          "This is an operational tool used twenty times a day, not a showcase. Motion exists to explain a state change and then get out of the way. Legibility beats elegance, and large targets beat density.",
          "WCAG 2.1 AA is the floor, not the ambition: every foreground and background pair in the design tokens clears it, and a unit test computes those ratios from the token values rather than trusting a comment that may have gone stale. The camera and signature steps have non-visual paths, because a flow that only works by sight is a flow that excludes people.",
          "It ships to Android as a Trusted Web Activity rather than a second native codebase, which keeps the Play listing, the camera and push notifications while letting a mid-season fix deploy in minutes instead of waiting in a review queue.",
        ],
        el: [
          "Είναι εργαλείο λειτουργίας που χρησιμοποιείται είκοσι φορές τη μέρα, όχι βιτρίνα. Η κίνηση υπάρχει για να εξηγήσει μια αλλαγή κατάστασης και μετά να φύγει από τη μέση. Η αναγνωσιμότητα κερδίζει την κομψότητα, και οι μεγάλοι στόχοι κερδίζουν την πυκνότητα.",
          "Το WCAG 2.1 AA είναι το δάπεδο, όχι η φιλοδοξία: κάθε ζεύγος χρώματος και φόντου στα design tokens το περνά, και ένα unit test υπολογίζει τους λόγους από τις ίδιες τις τιμές αντί να εμπιστεύεται ένα σχόλιο που μπορεί να έχει παλιώσει. Τα βήματα της κάμερας και της υπογραφής έχουν μη οπτικές διαδρομές, γιατί μια ροή που δουλεύει μόνο με την όραση είναι μια ροή που αποκλείει ανθρώπους.",
          "Διατίθεται στο Android ως Trusted Web Activity αντί για δεύτερο native κώδικα, κάτι που κρατά την καταχώριση στο Play, την κάμερα και τις ειδοποιήσεις, ενώ επιτρέπει μια διόρθωση μέσα στη σεζόν να βγει σε λεπτά αντί να περιμένει σε ουρά ελέγχου.",
        ],
      } as BLA,
    },
    {
      eyebrow: { en: "What holds it up", el: "Τι το κρατά όρθιο" } as BL,
      title: {
        en: "The tests are the part that lets it be changed",
        el: "Τα τεστ είναι αυτό που επιτρέπει να αλλάξει",
      } as BL,
      body: {
        en: [
          "47 test files, 31 of which run against a real Postgres with the same policies that ship. No service-role shortcuts and no route handlers in the way: a rep session doing its worst, checked against what it is allowed to see.",
          "The two engines were written before the screens that use them, because a wrong availability answer or a wrong price is not a visual bug and would not have been caught by looking.",
          "45 migrations, every write audit-logged, and a permanent read-only audit trail the manager can filter by actor, entity and date. When something is disputed in August, the answer exists.",
        ],
        el: [
          "47 αρχεία τεστ, τα 31 από τα οποία τρέχουν πάνω σε πραγματική Postgres με τις ίδιες πολιτικές που βγαίνουν στην παραγωγή. Χωρίς παρακάμψεις service-role και χωρίς route handlers στη μέση: μια συνεδρία αντιπροσώπου που κάνει ό,τι χειρότερο μπορεί, ελεγμένη απέναντι σε αυτό που της επιτρέπεται να δει.",
          "Οι δύο μηχανές γράφτηκαν πριν από τις οθόνες που τις χρησιμοποιούν, γιατί μια λάθος απάντηση διαθεσιμότητας ή μια λάθος τιμή δεν είναι οπτικό σφάλμα και δεν θα φαινόταν με το μάτι.",
          "45 migrations, κάθε εγγραφή καταγεγραμμένη, και ένα μόνιμο αρχείο ελέγχου μόνο για ανάγνωση που ο ιδιοκτήτης φιλτράρει ανά χρήστη, οντότητα και ημερομηνία. Όταν κάτι αμφισβητηθεί τον Αύγουστο, η απάντηση υπάρχει.",
        ],
      } as BLA,
    },
  ] as Chapter[],

  stack: [
    {
      group: { en: "App", el: "Εφαρμογή" } as BL,
      items: ["Next.js App Router", "TypeScript", "Tailwind", "next-intl"],
    },
    {
      group: { en: "Data and auth", el: "Δεδομένα και πρόσβαση" } as BL,
      items: ["Postgres", "Row Level Security", "Zod"],
    },
    {
      group: { en: "Documents and vision", el: "Έγγραφα και όραση" } as BL,
      items: ["@react-pdf/renderer", "Claude vision OCR", "Canvas signature"],
    },
    {
      group: { en: "Delivery", el: "Διάθεση" } as BL,
      items: ["Railway", "Android TWA", "Web Push", "Vitest"],
    },
  ],

  timeline: [
    {
      when: { en: "Phase 0 to 1", el: "Φάση 0 ως 1" } as BL,
      what: {
        en: "Foundations, the full schema, row-level security on every table, and the availability and pricing engines with their tests written first.",
        el: "Θεμέλια, πλήρες σχήμα, row-level security σε κάθε πίνακα, και οι μηχανές διαθεσιμότητας και τιμολόγησης με τα τεστ τους γραμμένα πρώτα.",
      } as BL,
      done: true,
    },
    {
      when: { en: "Phase 2 to 3", el: "Φάση 2 ως 3" } as BL,
      what: {
        en: "Booking, availability and the manager's screens. Then pickup and return end to end, incidents, cash in hand and hand-over.",
        el: "Κρατήσεις, διαθεσιμότητα και οι οθόνες του ιδιοκτήτη. Έπειτα παραλαβή και επιστροφή από άκρη σε άκρη, συμβάντα, μετρητά και παράδοση ταμείου.",
      } as BL,
      done: true,
    },
    {
      when: { en: "Phase 4", el: "Φάση 4" } as BL,
      what: {
        en: "The bilingual contract, the on-screen signature and licence OCR with a manual fallback that always works.",
        el: "Το δίγλωσσο συμφωνητικό, η υπογραφή στην οθόνη και το OCR διπλώματος με χειροκίνητη εναλλακτική που δουλεύει πάντα.",
      } as BL,
      done: true,
    },
    {
      when: { en: "October 2026", el: "Οκτώβριος 2026" } as BL,
      what: {
        en: "Test build at one hotel, running in parallel with paper for a fortnight. Paper is the safety net, and the comparison is the test.",
        el: "Δοκιμαστική έκδοση σε ένα ξενοδοχείο, παράλληλα με το χαρτί για δεκαπέντε ημέρες. Το χαρτί είναι το δίχτυ ασφαλείας, και η σύγκριση είναι το τεστ.",
      } as BL,
      done: false,
    },
    {
      when: { en: "1 March 2027", el: "1 Μαρτίου 2027" } as BL,
      what: {
        en: "Season launch, with the winter spent on what the pilot exposed: reports, push notifications and the Play Store listing.",
        el: "Έναρξη σεζόν, με τον χειμώνα αφιερωμένο σε ό,τι έδειξε η πιλοτική χρήση: αναφορές, ειδοποιήσεις και η καταχώριση στο Play Store.",
      } as BL,
      done: false,
    },
  ],
};
