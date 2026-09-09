import type { MetadataRoute } from "next";
import { sectors } from "@/lib/data";

const BASE_URL = "https://www.akosds.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/request`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/espa`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];

  const sectorRoutes: MetadataRoute.Sitemap = sectors.map((s) => ({
    url: `${BASE_URL}/sectors/${s.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...sectorRoutes];
}
