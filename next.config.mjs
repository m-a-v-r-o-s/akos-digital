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
  async redirects() {
    return [
      // Apex to www first, so a request to the apex is not redirected twice.
      {
        source: "/:path*",
        has: [{ type: "host", value: "akosds.com" }],
        destination: "https://www.akosds.com/:path*",
        permanent: true,
      },
      // Bare root to the default locale. Greece is the primary market, so
      // Greek is the default rather than negotiating on Accept-Language,
      // which would make the entry page uncacheable and vary per visitor.
      { source: "/", destination: "/el", permanent: true },
      ...LEGACY_PATHS.map((source) => ({
        source,
        destination: `/el${source}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
