// Production entry (npm start). Wraps the Astro node adapter because it
// serves prerendered pages and public/ files before any Astro middleware
// runs, so redirects, rewrites and headers have to happen here to reach
// every response.
import http from 'node:http';
import { STATIC_DIRS, NOINDEX, REWRITES, under, redirectFor, expired } from './src/lib/routes.mjs';

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

// Shown for a pitch mockup past its date (see EXPIRES in routes.mjs).
const EXPIRED_CSP = "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'";
const EXPIRED_PAGE = `<!doctype html><html lang="el"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow">
<title>Η πρόταση δεν είναι πλέον διαθέσιμη · Akos Digital Services</title>
<style>:root{color-scheme:light dark;--bg:#f6f5f2;--fg:#1a1a1a;--mut:#5c5a55}@media (prefers-color-scheme:dark){:root{--bg:#121212;--fg:#efede8;--mut:#a9a6a0}}
body{margin:0;min-height:100vh;min-height:100svh;display:grid;place-items:center;background:var(--bg);color:var(--fg);font:17px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif;padding:24px max(20px,env(safe-area-inset-right)) 24px max(20px,env(safe-area-inset-left));box-sizing:border-box}
main{max-width:34rem}h1{font-size:clamp(26px,5vw,36px);line-height:1.15;margin:0 0 14px;text-wrap:balance}p{margin:0 0 10px;color:var(--mut)}a{color:var(--fg);font-weight:600}.en{font-size:14px;margin-top:22px}</style></head>
<body><main><h1>Αυτή η πρόταση δεν είναι πλέον διαθέσιμη</h1>
<p>Το δείγμα και η προσφορά ίσχυαν για έναν μήνα και έχουν λήξει.</p>
<p>Για νέα προσφορά γράψτε μου στο <a href="mailto:info@akosds.com">info@akosds.com</a> ή δείτε το <a href="https://www.akosds.com/el">akosds.com</a>.</p>
<p class="en" lang="en">This proposal is no longer available.</p></main></body></html>`;

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

  if (expired(path)) {
    for (const [k, v] of Object.entries(HEADERS)) res.setHeader(k, v);
    res.writeHead(410, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow', 'Content-Security-Policy': EXPIRED_CSP });
    return res.end(EXPIRED_PAGE);
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
