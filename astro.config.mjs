import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// Every page is prerendered at build time. Only the endpoints that opt out
// with `export const prerender = false` run on the server: /api/lead (form
// mail), /api/health/mail, /api/hit and /stats (first-party page counter).
export default defineConfig({
  site: 'https://www.akosds.com',
  output: 'static',
  adapter: node({ mode: 'standalone', bodySizeLimit: 64 * 1024 }),
  // Next served /el/privacy, not /el/privacy/. Keep the indexed URLs as they are.
  trailingSlash: 'never',
  build: { inlineStylesheets: 'never' },
  // Small scripts stay files too, so the CSP can be script-src 'self'.
  vite: { build: { assetsInlineLimit: 0 } },
  // server.mjs answers / with a 308 in production; this covers astro dev.
  redirects: { '/': '/el' },
  devToolbar: { enabled: false },
  // TLS ends at Railway's proxy, so Astro's own origin check sees http while
  // browsers send an https Origin. /api/lead does its own CORS allowlist.
  security: { checkOrigin: false },
  server: { port: 3001, host: true },
});
