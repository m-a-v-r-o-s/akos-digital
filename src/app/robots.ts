import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/olympus",
    },
    sitemap: "https://www.akosds.com/sitemap.xml",
  };
}
