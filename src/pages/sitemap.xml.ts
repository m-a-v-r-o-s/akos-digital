import type { APIRoute } from "astro";
import { sectors, servicePages, caseStudies } from "../lib/data.ts";
import { LANGS } from "../lib/i18n.ts";
import { SITE_URL } from "../lib/seo.ts";

/** Locale-independent paths, with the crawl priority for each. */
const PATHS: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, freq: "weekly" },
  { path: "/request", priority: 0.9, freq: "monthly" },
  { path: "/espa", priority: 0.8, freq: "monthly" },
  { path: "/services", priority: 0.9, freq: "monthly" },
  ...caseStudies.map((c) => ({ path: `/work/${c.slug}`, priority: 0.7, freq: "monthly" as const })),
  ...servicePages.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8, freq: "monthly" as const })),
  ...sectors.map((s) => ({ path: `/sectors/${s.slug}`, priority: 0.6, freq: "monthly" as const })),
  { path: "/privacy", priority: 0.3, freq: "yearly" },
  { path: "/terms", priority: 0.3, freq: "yearly" },
];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  // Every URL carries the full hreflang set, so a crawler that reaches one
  // locale from the sitemap alone still learns the other exists.
  const urls = LANGS.flatMap((lang) =>
    PATHS.map(({ path, priority, freq }) => `  <url>
    <loc>${SITE_URL}/${lang}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="el" href="${SITE_URL}/el${path}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en${path}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/el${path}"/>
  </url>`),
  );
  // 7μερο.ai is a static build served from public/, both languages on one URL.
  urls.push(`  <url>\n    <loc>${SITE_URL}/7mero.ai</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`);
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
