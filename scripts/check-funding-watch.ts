/**
 * Self-check for the funding watch.
 *   node --experimental-strip-types scripts/check-funding-watch.ts
 *
 * The failure modes are silent ones: a parser that returns nothing, a filter
 * that matches everything (mail nobody reads) or nothing (a missed voucher
 * round). Samples below are real headlines from the four feeds.
 */
import assert from "node:assert/strict";

import { buildDigest, matches, parseFeed, withinWindow } from "./funding-watch.ts";

const XML = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>digitalsme.gov.gr</title>
  <item>
    <title><![CDATA[Παράταση περιόδου εξαργυρώσεων επιταγών Προγράμματος «Ψηφιακές Συναλλαγές Β&#8217;»]]></title>
    <link>https://digitalsme.gov.gr/paratasi/</link>
    <pubDate>Fri, 30 Jan 2026 16:51:11 +0000</pubDate>
    <description><![CDATA[<p>Παρατείνονται τα χρονικά ορόσημα &amp; οι ημερομηνίες.</p>]]></description>
  </item>
  <item>
    <title>Βραβεία Ψηφιακής Διακυβέρνησης</title>
    <link>https://example.gov.gr/vraveia/</link>
    <description>Διακρίσεις σε στελέχη που καινοτομούν.</description>
  </item>
</channel></rss>`;

const items = parseFeed(XML, "test");

// ── Parsing ──────────────────────────────────────────────────────────────
assert.equal(items.length, 2, "both <item> blocks must be found");
assert.match(items[0].title, /^Παράταση περιόδου εξαργυρώσεων επιταγών/, "CDATA must be unwrapped");
assert.match(items[0].title, /Συναλλαγές Β’»$/, "numeric entities must decode");
assert.equal(items[0].link, "https://digitalsme.gov.gr/paratasi/");
assert.equal(items[0].summary, "Παρατείνονται τα χρονικά ορόσημα & οι ημερομηνίες.", "tags out, &amp; decoded");
assert.equal(items[0].date?.getUTCFullYear(), 2026);
assert.equal(items[1].date, null, "a missing pubDate is null, not an invalid Date");

// ── Window ───────────────────────────────────────────────────────────────
const now = new Date("2026-02-05T00:00:00Z");
assert.equal(withinWindow(items[0], now), true, "6 days old is inside a 9 day window");
assert.equal(withinWindow(items[0], new Date("2026-03-01T00:00:00Z")), false, "a month old is out");
assert.equal(withinWindow(items[1], now), true, "an undated item must never be silently dropped");

// ── Matching: things we must catch ───────────────────────────────────────
for (const title of [
  "Παράταση περιόδου εξαργυρώσεων επιταγών Προγράμματος «Ψηφιακές Συναλλαγές Β’»",
  "Νέο voucher για μικρομεσαίες επιχειρήσεις",
  "Πρόσκληση υποβολής αιτήσεων χρηματοδότησης για τον ψηφιακό μετασχηματισμό επιχειρήσεων",
  "Επιδότηση για υπηρεσίες παρόχου ηλεκτρονικής τιμολόγησης",
]) {
  assert.equal(matches({ title, summary: "" }), true, `must match: ${title}`);
}

// ── Matching: noise we must not forward ──────────────────────────────────
for (const title of [
  "Βραβεία Ψηφιακής Διακυβέρνησης: Διακρίσεις σε στελέχη και ομάδες",
  "Τάκης Θεοδωρικάκος: «Σταθερή πολιτική μας η μείωση των φόρων»",
  "Πρόσκληση υποβολής αιτήσεων χρηματοδότησης για το Πρόγραμμα Ημιαυτόνομης διαβίωσης ατόμων",
]) {
  assert.equal(matches({ title, summary: "" }), false, `must not match: ${title}`);
}

// Accented and unaccented spellings are the same word.
assert.equal(matches({ title: "ΨΗΦΙΑΚΕΣ ΣΥΝΑΛΛΑΓΕΣ Γ'", summary: "" }), true, "caps must fold");

// ── Broad sources take only programme-specific terms ─────────────────────
// A ministry speech and a public tender both carry funding words and the word
// «ψηφιακ», which is why the pair rule is off for those feeds.
const speech = {
  title: "«Η Ελλάδα του 2030 θέλουμε να είναι ψηφιακά κυρίαρχη»",
  summary: "να ενισχύσει τις υποδομές, την έρευνα και τις επιχειρήσεις",
};
const tender = { title: "Διεθνής διαγωνισμός για σύμβαση παροχής υπηρεσιών", summary: "Ψηφιακές κάμερες" };
assert.equal(matches(speech), true, "the pair rule alone would let a speech through");
assert.equal(matches(speech, true), false, "a broad source must reject it");
assert.equal(matches(tender, true), false, "«παροχής υπηρεσιών» is not a πάροχος");
assert.equal(
  matches({ title: "Νέο πρόγραμμα voucher για επιχειρήσεις", summary: "" }, true),
  true,
  "a broad source must still pass a programme-specific term"
);

// ── Digest ───────────────────────────────────────────────────────────────
const digest = buildDigest([items[0]], now);
assert.match(digest.subject, /^Funding watch: 1 new announcement$/, "singular subject");
assert.match(digest.text, /https:\/\/digitalsme\.gov\.gr\/paratasi\//, "the link is the point of the mail");
assert.match(digest.text, /2026-01-30/, "each item carries its date");
assert.match(buildDigest([items[0], items[1]], now).subject, /2 new announcements/, "plural subject");

console.log("funding-watch: checks passed");
