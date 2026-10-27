import type { APIRoute } from "astro";

// The pitch mockups under public/ are client work, not public content.
export const GET: APIRoute = () =>
  new Response(
    ["User-agent: *", "Allow: /", "Disallow: /olympus", "Disallow: /elaiotriveio", "Disallow: /3d-eshop", "Disallow: /pediada", "Disallow: /api/", "Disallow: /stats", "", "Sitemap: https://www.akosds.com/sitemap.xml", ""].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
