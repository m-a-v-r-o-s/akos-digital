// Production entry (npm start). Wraps the Astro node adapter because it
// serves prerendered pages and public/ files before any Astro middleware
// runs, so redirects, rewrites and headers have to happen here to reach
// every response.
import http from 'node:http';
import { STATIC_DIRS, NOINDEX, REWRITES, under, redirectFor } from './src/lib/routes.mjs';

process.env.ASTRO_NODE_AUTOSTART = 'disabled';
const { handler } = await import('./dist/server/entry.mjs');

const APEX = 'akosds.com';
const ORIGIN = 'https://www.akosds.com';

// The site's own pages: no inline script at all.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  // style="" attributes only (the θ slices' depth, the stats bars): they
  // cannot run script. <style> blocks stay locked to 'self'.
  "style-src-attr 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

// The static builds copied into public/ (7μερο.ai and the pitch mockups) carry
// inline scripts, the Olympus mockup loads Google Fonts and calls open-meteo,
// and the 3d-eshop mockup instantiates WebAssembly. Same policy they had
// under Next.
const LEGACY_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "media-src 'self' blob:",
  "connect-src 'self' https://api.open-meteo.com",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const HEADERS = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
};

function cacheControl(path) {
  // Content-hashed by Astro; the adapter marks these immutable itself.
  if (path.startsWith('/_astro/')) return null;
  if (path.startsWith('/api/') || path === '/stats') return 'private, no-store';
  return 'public, max-age=0, must-revalidate';
}

const server = http.createServer((req, res) => {
  const host = (req.headers.host || '').split(':')[0].toLowerCase();
  const [path, query = ''] = (req.url || '/').split('?');
  const qs = query ? '?' + query : '';

  // Liveness for Railway's health check: no data, no work, nothing to cache.
  if (path === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' });
    return res.end('ok');
  }
  if (host === APEX) {
    res.writeHead(308, { Location: ORIGIN + req.url });
    return res.end();
  }
  const to = redirectFor(path);
  if (to) {
    res.writeHead(308, { Location: to + qs });
    return res.end();
  }

  const legacy = STATIC_DIRS.some((d) => under(path, d));
  for (const [k, v] of Object.entries(HEADERS)) res.setHeader(k, v);
  res.setHeader('Content-Security-Policy', legacy ? LEGACY_CSP : CSP);
  if (NOINDEX.some((d) => under(path, d))) res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  const cc = cacheControl(path);
  if (cc) res.setHeader('Cache-Control', cc);

  if (REWRITES[path]) req.url = REWRITES[path] + qs;
  handler(req, res);
});

const port = Number(process.env.PORT) || 8080;
server.listen(port, '0.0.0.0', () => console.log(`Listening on http://0.0.0.0:${port}`));
