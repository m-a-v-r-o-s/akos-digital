import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/crm", "/hello"],
    },
    sitemap: "https://www.akosds.com/sitemap.xml",
  };
}
