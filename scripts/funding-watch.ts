/**
 * Weekly watch for Greek SME funding announcements we could sell into.
 *
 *   npm run funding-watch          # fetch, match, email if anything is new
 *   npm run funding-watch -- --dry # print the digest instead of sending
 *
 * Why it exists: the €300 e-invoicing voucher (Ψηφιακές Συναλλαγές Β') closed
 * on 30 Sep 2025 and nobody noticed until it was long over. Supplier
 * registration for those programmes closes months before the client-side
 * deadline, so catching the announcement week is the whole game.
 *
 * Runs on Railway as its own cron service (same repo, start command
 * `npm run funding-watch`, schedule `0 7 * * 1`). Silence means nothing
 * matched; if every source fails it emails about that instead, so a dead
 * watch can never look like a quiet week.
 */
import { fileURLToPath } from "node:url";

import { sendMail } from "../src/lib/email.ts";

export type Item = {
  source: string;
  title: string;
  link: string;
  summary: string;
  date: Date | null;
};

/**
 * RSS feeds that actually exist and carry programme announcements. `broad`
 * marks a general-news outlet: those publish conference speeches and public
 * tenders whose prose contains every funding word there is, so only a
 * programme-specific term may qualify an item from them.
 */
export const SOURCES: { name: string; url: string; broad?: boolean }[] = [
  // The voucher programmes themselves (Ψηφιακά Εργαλεία, Ψηφιακές Συναλλαγές).
  { name: "digitalsme.gov.gr", url: "https://digitalsme.gov.gr/feed/" },
  // Ελλάδα 2.0 calls for funding, the custom post type the site's own menu uses.
  { name: "Ελλάδα 2.0 (calls)", url: "https://greece20.gov.gr/feed/?post_type=calls" },
  { name: "mindigital.gr", url: "https://www.mindigital.gr/feed", broad: true },
  { name: "mindev.gov.gr", url: "https://mindev.gov.gr/feed/", broad: true },
  // ponytail: espa.gr and antagonistikotita.gr publish no feed, so ΕΣΠΑ calls
  // are caught only via the two ministries above. Add an HTML scrape of
  // espa.gr/el/Pages/Proclamations.aspx if something is ever missed there.
];

/** A week plus slack: a skipped run must not create a blind week. */
export const WINDOW_DAYS = Number(process.env.WATCH_WINDOW_DAYS) || 9;

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  laquo: "«",
  raquo: "»",
};

/** CDATA, tags and entities out; whitespace collapsed. */
function clean(raw: string): string {
  return raw
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}

function tag(block: string, name: string): string {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return m ? clean(m[1]) : "";
}

export function parseFeed(xml: string, source: string): Item[] {
  return [...xml.matchAll(/<item[\s>][\s\S]*?<\/item>/gi)].map((m) => {
    const block = m[0];
    const raw = tag(block, "pubDate");
    const date = raw ? new Date(raw) : null;
    return {
      source,
      title: tag(block, "title"),
      link: tag(block, "link"),
      summary: tag(block, "description").slice(0, 400),
      // An unparseable date must not hide an item, so it stays in and the
      // keyword filter alone decides.
      date: date && !Number.isNaN(date.getTime()) ? date : null,
    };
  });
}

/** Accents and case out, so «Ψηφιακές» and «ψηφιακες» are the same word. */
function fold(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * A term matches only at the start of a word. Substring matching looks
 * harmless until «ΜμΕ» matches inside «συμμετοχής», which appears in every
 * Greek call for applications ever written: the audience test then means
 * "any call at all", and the mail fills with reskilling and social
 * programmes. Greek needs a lookbehind here, JS `\b` is ASCII-only.
 *
 * The terms are literals defined below, so none needs regex escaping.
 */
function term(s: string): RegExp {
  return new RegExp(`(?<!\\p{L})${fold(s)}`, "u");
}

/** Terms that qualify an item on their own. */
const STRONG = [
  "voucher",
  "επιταγ",
  "ψηφιακα εργαλεια",
  "ψηφιακες συναλλαγες",
  "ψηφιακος μετασχηματισμος",
  "ψηφιακου μετασχηματισμου",
  "ηλεκτρονικη τιμολογηση",
  "ηλεκτρονικης τιμολογησης",
  // Not a bare "παροχ": that matches «παροχή υπηρεσιών» in every tender notice.
  "παροχου ηλεκτρονικης",
  "παροχων ηλεκτρονικης",
  "mydata",
].map(term);

/** Otherwise it takes one word from each list: a funding act, aimed at firms. */
const FUNDING = ["χρηματοδοτ", "επιδοτ", "ενισχυσ", "προσκλησ", "δρασ", "προγραμμα", "κυκλο"].map(term);
const AUDIENCE = ["επιχειρησ", "επιχειρησε", "μικρομεσαι", "μμε", "εσπα", "ψηφιακ", "τιμολογ", "ταμειακ", "pos"].map(
  term
);

/**
 * Programmes for individuals rather than for a firm buying digital work:
 * training, reskilling, and social inclusion. «Πρόγραμμα» plus «ψηφιακές
 * δεξιότητες» satisfies the pair rule perfectly while being no use to us, so
 * upskilling the workforce and digital-empowerment hubs for the elderly are
 * what the mail fills with once nothing stops them.
 *
 * This only filters the weak pair rule, never a STRONG term: a real voucher
 * round stays in even if the word «κατάρτιση» shows up somewhere in its
 * summary. Excluding is the more dangerous direction, so it gets the
 * narrower power.
 */
const EXCLUDE = [
  "καταρτισ",
  "επιμορφωσ",
  "δεξιοτητ",
  "ανεργ",
  "μαθητ",
  "φοιτητ",
  "ηλικιωμεν",
  "αναπηρι",
  "παιδι",
  "διαμεσολαβ",
].map(term);

/**
 * True when an item is worth a line in the weekly mail. On a `broad` source
 * only a STRONG term counts.
 *
 * ponytail: that trades recall for a mail worth opening. A new programme
 * announced only in a ministry speech, in words none of STRONG covers, is
 * missed; the programme sites below carry the call itself, which is what
 * actually has a deadline.
 */
export function matches(item: Pick<Item, "title" | "summary">, broad = false): boolean {
  const text = fold(`${item.title} ${item.summary}`);
  if (STRONG.some((re) => re.test(text))) return true;
  if (broad) return false;
  if (EXCLUDE.some((re) => re.test(text))) return false;
  return FUNDING.some((re) => re.test(text)) && AUDIENCE.some((re) => re.test(text));
}

export function withinWindow(item: Item, now: Date, days = WINDOW_DAYS): boolean {
  if (!item.date) return true;
  return now.getTime() - item.date.getTime() <= days * 86_400_000;
}

export function buildDigest(items: Item[], now: Date): { subject: string; text: string } {
  const lines: string[] = [
    `${items.length} new funding announcement${items.length === 1 ? "" : "s"} in the last ${WINDOW_DAYS} days.`,
    "",
  ];

  for (const item of items) {
    const when = item.date ? item.date.toISOString().slice(0, 10) : "date unknown";
    lines.push(`• ${item.title}`, `  ${item.source} · ${when}`, `  ${item.link}`);
    if (item.summary) lines.push(`  ${item.summary.slice(0, 220)}`);
    lines.push("");
  }

  lines.push(
    "———",
    "Check first: is it open to suppliers, and by when? Supplier registration",
    "closes months before the beneficiary deadline.",
    `Run: ${now.toISOString()}`
  );

  return {
    subject: `Funding watch: ${items.length} new announcement${items.length === 1 ? "" : "s"}`,
    text: lines.join("\n"),
  };
}

async function fetchFeed(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "user-agent": "akosds-funding-watch/1.0 (+https://www.akosds.com)" },
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function main(): Promise<void> {
  const dry = process.argv.includes("--dry");
  const to = process.env.WATCH_ALERT_EMAIL || "digitalaakos@gmail.com";
  const now = new Date();

  const found: Item[] = [];
  const failures: string[] = [];

  for (const source of SOURCES) {
    try {
      const items = parseFeed(await fetchFeed(source.url), source.name);
      found.push(...items.filter((i) => withinWindow(i, now) && matches(i, source.broad)));
    } catch (err) {
      failures.push(`${source.name}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // Every source down is itself the news: a silent watch is worse than none.
  if (failures.length === SOURCES.length) {
    const text = `The funding watch could not read any of its ${SOURCES.length} sources:\n\n${failures.join("\n")}`;
    console.error(text);
    if (!dry) await sendMail({ to, subject: "Funding watch: all sources failed", text });
    process.exit(1);
  }

  for (const f of failures) console.warn(`funding-watch: ${f}`);

  if (!found.length) {
    console.log(`funding-watch: nothing new in ${WINDOW_DAYS} days, no mail sent`);
    return;
  }

  found.sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));
  const { subject, text } = buildDigest(found, now);

  if (dry) {
    console.log(`To: ${to}\nSubject: ${subject}\n\n${text}`);
    return;
  }

  if (!(await sendMail({ to, subject, text }))) {
    console.error("funding-watch: send failed");
    process.exit(1);
  }
  console.log(`funding-watch: emailed ${found.length} item(s) to ${to}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
