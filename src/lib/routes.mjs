// Routing rules for server.mjs, in their own module so scripts/check-locale-routing.ts
// can test them without starting the server.

export const STATIC_DIRS = ['/7mero.ai', '/olympus', '/elaiotriveio', '/3d-eshop', '/pediada', '/2001', '/x-svolis.gr'];
// Client pitches, not public content.
export const NOINDEX = ['/olympus', '/elaiotriveio', '/3d-eshop', '/pediada', '/2001', '/x-svolis.gr'];
export const under = (p, dir) => p === dir || p.startsWith(dir + '/');

// Pitch mockups come down one calendar month after they first went up (7mero.ai is
// the product page and never expires). From that day (Athens time) the whole folder
// answers 410 Gone with a short notice. To bring one back, move its date.
export const EXPIRES = {
  '/olympus': '2026-11-02',
  '/elaiotriveio': '2026-11-19',
  '/3d-eshop': '2026-11-19',
  '/pediada': '2026-11-19',
  '/2001': '2026-11-30',
  '/x-svolis.gr': '2026-12-05',
};
export const expired = (p, now = Date.now()) =>
  Object.entries(EXPIRES).some(([dir, day]) => under(p, dir) && now >= Date.parse(`${day}T00:00:00+02:00`));

// Static folders are served by exact file path, so their directory indexes
// have to be named.
export const REWRITES = {
  '/7mero.ai': '/7mero.ai/index.html',
  '/7mero.ai/': '/7mero.ai/index.html',
  '/olympus': '/olympus/index.html',
  '/olympus/race': '/olympus/race.html',
  '/elaiotriveio': '/elaiotriveio/index.html',
  '/3d-eshop': '/3d-eshop/index.html',
  '/pediada': '/pediada/index.html',
  '/2001': '/2001/index.html',
  '/2001/mystiki': '/2001/mystiki/index.html',
  '/x-svolis.gr': '/x-svolis.gr/index.html',
};

/** Permanent redirects carried over from next.config.mjs, so indexed and shared URLs keep their history. */
export function redirectFor(path) {
  if (path === '/') return '/el';
  // The offer moved from /7mero to /7mero.ai.
  if (path === '/7mero' || path.startsWith('/7mero/')) return '/7mero.ai' + path.slice('/7mero'.length);
  // The old work index merged into the homepage's work list.
  const work = path.match(/^\/(el|en)\/work\/?$/);
  if (work) return `/${work[1]}#work`;
  // Pre-locale paths go to their Greek equivalent.
  if (['/request', '/espa', '/privacy', '/terms'].includes(path) || /^\/sectors\/[\w-]+$/.test(path)) return '/el' + path;
  // trailingSlash 'never': one URL per page.
  if (path.length > 1 && path.endsWith('/') && !under(path, '/7mero.ai')) return path.slice(0, -1);
  return null;
}
