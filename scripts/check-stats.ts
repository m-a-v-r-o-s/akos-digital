/**
 * Self-check for the first-party page counter and its sign-in.
 *   node --experimental-strip-types scripts/check-stats.ts
 */
import assert from "node:assert/strict";
import { clean, summarise, tooMany, type Hit } from "../src/lib/stats.ts";
import { newCode, checkCode, sessionCookie, validSession, sameOrigin, COOKIE } from "../src/lib/statsAuth.ts";

const UA_PHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148";
const UA_DESK = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/140.0 Safari/537.36";

// ── what gets counted ──
const h = clean({ p: "/el/work/blessed-coffee", r: "https://www.google.com/search?q=x" }, UA_PHONE, "GR", "www.akosds.com", 1000)!;
assert.deepEqual(h, { t: 1000, p: "/el/work/blessed-coffee", r: "google.com", c: "GR", d: "phone" });
assert.equal(clean({ p: "/el", r: "https://www.akosds.com/en" }, UA_DESK, null)!.r, "", "own-site referrers are not referrers");
assert.equal(clean({ p: "/el", r: "not a url" }, UA_DESK, "XX")!.c, "", "unknown country is blank, and junk referrers are dropped");
assert.equal(clean({ p: "/el" }, "Googlebot/2.1", "US"), null, "bots are not visits");
assert.equal(clean({ p: "/el" }, "", "US"), null, "no user agent, no count");
for (const p of ["/wp-admin", "/el/../etc/passwd", "/el?x=1", "https://evil.example", "/" + "a".repeat(200), "/de"]) {
  assert.equal(clean({ p }, UA_DESK, "GR"), null, `${p} is not a page on this site`);
}
assert.equal(clean({ p: "/7mero.ai" }, UA_DESK, "GR")!.p, "/7mero.ai");
// Nothing that identifies a person is ever kept.
assert.deepEqual(Object.keys(h).sort(), ["c", "d", "p", "r", "t"], "a hit holds no IP, no UA, no id");

// ── the summary ──
const day = 86_400_000, now = 100 * day + day / 2; // noon, so "a second ago" is still today
const hits: Hit[] = [
  { t: now - 1000, p: "/el", r: "", c: "GR", d: "phone" },
  { t: now - 2000, p: "/el", r: "google.com", c: "GR", d: "desktop" },
  { t: now - 3 * day, p: "/en", r: "", c: "DE", d: "phone" },
  { t: now - 40 * day, p: "/en", r: "", c: "DE", d: "phone" }, // outside a 30-day window
];
const s = summarise(hits, 30, now);
assert.equal(s.total, 3);
assert.equal(s.days.length, 30);
assert.equal(s.days.at(-1)!.n, 2, "today's views land on the last day");
assert.deepEqual(s.pages[0], ["/el", 2]);
assert.deepEqual(s.refs.find(([k]) => k === "(direct)"), ["(direct)", 2]);

// ── per-IP limit ──
for (let i = 0; i < 120; i++) assert.equal(tooMany("9.9.9.9", 5000), false);
assert.equal(tooMany("9.9.9.9", 5000), true, "the 121st hit in an hour is dropped");
assert.equal(tooMany("9.9.9.9", 5000 + 3_600_001), false, "the window slides");

// ── sign-in ──
const t0 = 1_000_000;
const code = newCode(t0)!;
assert.match(code, /^\d{6}$/);
assert.equal(checkCode("000000" === code ? "111111" : "000000", t0), "bad");
assert.equal(checkCode(code, t0 + 500), "locked", "a wrong guess locks sign-in for a moment");
assert.equal(checkCode(code, t0 + 3000), "ok", "the right code works once the pause is over");
assert.equal(checkCode(code, t0 + 6000), "bad", "a code works once");
const fresh = newCode(t0 + 10_000)!;
assert.equal(checkCode(fresh, t0 + 10_000 + 11 * 60_000), "bad", "codes expire after 10 minutes");
assert.ok(newCode(t0 + 20_000), "a third code is still allowed");
assert.equal(newCode(t0 + 30_000), null, "no more than three codes per 15 minutes");

const cookie = sessionCookie(t0);
assert.match(cookie, /HttpOnly/);
assert.match(cookie, /Secure/);
assert.match(cookie, /SameSite=Strict/);
const pair = cookie.split(";")[0];
assert.equal(validSession(`other=1; ${pair}`, t0 + 1000), true);
assert.equal(validSession(pair.replace(/.$/, (c) => (c === "0" ? "1" : "0")), t0), false, "a tampered signature is refused");
assert.equal(validSession(`${COOKIE}=99999999999999.abc`, t0), false, "a forged expiry is refused");
assert.equal(validSession(pair, t0 + 31 * day), false, "sessions expire");

const req = (o: string | null, host = "www.akosds.com") =>
  new Request("http://x/api", { method: "POST", headers: { host, ...(o ? { origin: o } : {}) } });
assert.equal(sameOrigin(req("https://www.akosds.com")), true);
assert.equal(sameOrigin(req("https://evil.example")), false);
assert.equal(sameOrigin(req(null)), false, "no Origin, no sign-in");

console.log("✓ stats counter and sign-in OK");
