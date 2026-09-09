import type { MetadataRoute } from "next";
import { sectors } from "@/lib/data";
import { LANGS } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

/** Locale-independent paths, with the crawl priority for each. */
const PATHS: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/request", priority: 0.9, changeFrequency: "monthly" },
  { path: "/espa", priority: 0.8, changeFrequency: "monthly" },
  ...sectors.map((s) => ({
    path: `/sectors/${s.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  })),
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Every URL carries the full hreflang set, so a crawler that reaches one
  // locale from the sitemap alone still learns the other exists.
  return LANGS.flatMap((lang) =>
    PATHS.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          el: `${SITE_URL}/el${path}`,
          en: `${SITE_URL}/en${path}`,
        },
      },
    }))
  );
}
