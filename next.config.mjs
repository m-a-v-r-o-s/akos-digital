/** @type {import('next').NextConfig} */

// The pre-locale paths. Each one 301s to its Greek equivalent so the pages
// Google already knows (/, /request, /sectors/artists) hand their history to
// the new URL instead of turning into 404s.
const LEGACY_PATHS = [
  "/request",
  "/espa",
  "/privacy",
  "/terms",
  "/sectors/:slug",
];

const nextConfig = {
  // The 7μερο offer is a static Astro build copied into public/7mero.ai (see that
  // repo's `npm run deploy`). Next serves files from public/ by exact path, so
  // the directory index needs saying out loud, otherwise /7mero.ai is a 404.
  async rewrites() {
    return [
      { source: "/7mero.ai", destination: "/7mero.ai/index.html" },
      // The Olympus Marathon redesign mockup (static pages in public/olympus,
      // built from ~/olympus/mockup-src with `node deploy.mjs`). Two pages.
      { source: "/olympus", destination: "/olympus/index.html" },
      { source: "/olympus/race", destination: "/olympus/race.html" },
    ];
  },
  // A client pitch, not public content: keep it out of search results.
  async headers() {
    return [
      {
        source: "/olympus/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    return [
      // Apex to www first, so a request to the apex is not redirected twice.
      {
        source: "/:path*",
        has: [{ type: "host", value: "akosds.com" }],
        destination: "https://www.akosds.com/:path*",
        permanent: true,
      },
      // The offer moved from /7mero to /7mero.ai. :path* also matches the
      // bare /7mero, so old links and the indexed URL keep their history.
      {
        source: "/7mero/:path*",
        destination: "/7mero.ai/:path*",
        permanent: true,
      },
      // Bare root to the default locale. Greece is the primary market, so
      // Greek is the default rather than negotiating on Accept-Language,
      // which would make the entry page uncacheable and vary per visitor.
      { source: "/", destination: "/el", permanent: true },
      // The work index merged into the homepage's projects list. The old URL
      // was sent to clients, so it lands on that section instead of a 404.
      // Case studies under /work/:slug are untouched.
      {
        source: "/:lang(el|en)/work",
        destination: "/:lang#projects",
        permanent: true,
      },
      ...LEGACY_PATHS.map((source) => ({
        source,
        destination: `/el${source}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
