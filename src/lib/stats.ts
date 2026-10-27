/**
 * First-party page counter. One JSON line per page view in a monthly file:
 * path, referrer host, country (from Cloudflare's header), device class and
 * time. No IP, no cookie, nothing on the visitor's device, so it needs no
 * consent banner. Files live on a Railway volume (STATS_DIR) and are dropped
 * after 13 months, which the privacy policy states.
 *
 * Pure parts (clean, summarise) are tested by scripts/check-stats.ts.
 */
import { appendFile, mkdir, readdir, readFile, stat, unlink } from "node:fs/promises";
import path from "node:path";

export type Hit = { t: number; p: string; r: string; c: string; d: "phone" | "tablet" | "desktop" };

const DIR = process.env.STATS_DIR || path.join(process.cwd(), "data", "stats");
const MAX_FILE_BYTES = 50 * 1024 * 1024; // a hostile loop fills one month's file, never the disk
const KEEP_MONTHS = 13;

// Only the site's own routes are counted; anything else is noise or abuse.
const PATH_RE = /^\/(?:(?:el|en)(?:\/[a-z0-9-]+){0,2}|7mero\.ai)$/;
const BOT_RE = /bot|crawl|spider|slurp|preview|headless|lighthouse|pagespeed|monitor|curl|wget|python|httpclient/i;

/** Turns a beacon body plus request headers into a Hit, or null when it should not count. */
export function clean(
  body: unknown,
  ua: string,
  country: string | null,
  ownHost = "www.akosds.com",
  now = Date.now(),
): Hit | null {
  if (!ua || BOT_RE.test(ua)) return null;
  if (!body || typeof body !== "object") return null;
  const { p, r } = body as Record<string, unknown>;
  if (typeof p !== "string" || p.length > 120 || !PATH_RE.test(p)) return null;
  let ref = "";
  if (typeof r === "string" && r.length < 2000) {
    try {
      const host = new URL(r).hostname.replace(/^www\./, "");
      if (host && host !== ownHost.replace(/^www\./, "")) ref = host.slice(0, 100);
    } catch { /* not a URL: count the view without a referrer */ }
  }
  const c = country && /^[A-Z]{2}$/.test(country) && country !== "XX" ? country : "";
  const d = /iPad|Tablet/i.test(ua) ? "tablet" : /Mobi|Android|iPhone/i.test(ua) ? "phone" : "desktop";
  return { t: now, p, r: ref, c, d };
}

const monthFile = (t: number) => path.join(DIR, `${new Date(t).toISOString().slice(0, 7)}.ndjson`);

export async function record(hit: Hit): Promise<void> {
  const file = monthFile(hit.t);
  await mkdir(DIR, { recursive: true });
  const size = await stat(file).then((s) => s.size, () => 0);
  if (size > MAX_FILE_BYTES) return;
  await appendFile(file, JSON.stringify(hit) + "\n");
}

/** Deletes month files older than the retention window. Named files only, never a directory. */
export async function prune(now = Date.now()): Promise<void> {
  const cutoff = new Date(now);
  cutoff.setUTCMonth(cutoff.getUTCMonth() - KEEP_MONTHS);
  const keepFrom = cutoff.toISOString().slice(0, 7);
  const names = await readdir(DIR).catch(() => [] as string[]);
  for (const n of names) {
    if (/^\d{4}-\d{2}\.ndjson$/.test(n) && n.slice(0, 7) < keepFrom) await unlink(path.join(DIR, n)).catch(() => {});
  }
}

export type Summary = {
  total: number;
  days: { day: string; n: number }[];
  pages: [string, number][];
  refs: [string, number][];
  countries: [string, number][];
  devices: [string, number][];
};

const top = (m: Map<string, number>, n = 12) => [...m].sort((a, b) => b[1] - a[1]).slice(0, n);
const bump = (m: Map<string, number>, k: string) => m.set(k, (m.get(k) ?? 0) + 1);

/** Aggregates hits from the last `days` days. */
export function summarise(hits: Hit[], days: number, now = Date.now()): Summary {
  const from = now - days * 86_400_000;
  const byDay = new Map<string, number>();
  for (let i = days - 1; i >= 0; i--) byDay.set(new Date(now - i * 86_400_000).toISOString().slice(0, 10), 0);
  const pages = new Map<string, number>(), refs = new Map<string, number>(), countries = new Map<string, number>(), devices = new Map<string, number>();
  let total = 0;
  for (const h of hits) {
    if (h.t < from || h.t > now) continue;
    total++;
    const day = new Date(h.t).toISOString().slice(0, 10);
    if (byDay.has(day)) bump(byDay, day);
    bump(pages, h.p);
    bump(refs, h.r || "(direct)");
    bump(countries, h.c || "(unknown)");
    bump(devices, h.d);
  }
  return {
    total,
    days: [...byDay].map(([day, n]) => ({ day, n })),
    pages: top(pages),
    refs: top(refs),
    countries: top(countries),
    devices: top(devices, 3),
  };
}

export async function load(days: number, now = Date.now()): Promise<Hit[]> {
  const months = new Set<string>();
  for (let i = 0; i <= days; i += 1) months.add(monthFile(now - i * 86_400_000));
  const hits: Hit[] = [];
  for (const f of months) {
    const text = await readFile(f, "utf8").catch(() => "");
    for (const line of text.split("\n")) {
      if (!line) continue;
      try { hits.push(JSON.parse(line)); } catch { /* a torn last line after a crash */ }
    }
  }
  return hits;
}

// ponytail: in-memory per-IP limit, per instance, resets on redeploy. Enough for one replica.
const seen = new Map<string, number[]>();
export function tooMany(ip: string, now = Date.now(), max = 120, windowMs = 3_600_000): boolean {
  if (seen.size > 20_000) seen.clear();
  const recent = (seen.get(ip) ?? []).filter((t) => t > now - windowMs);
  recent.push(now);
  seen.set(ip, recent);
  return recent.length > max;
}
