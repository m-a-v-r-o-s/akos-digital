# akosds.com

Studio site of Akos Digital Services (Θεόδωρος Ι. Μαύρος), Greek at `/el` (default) and English at `/en`.

Astro, every page prerendered to static HTML, served by one Node process on Railway (`server.mjs` wrapping
`@astrojs/node`). About 11 KB of JavaScript on the whole site, no framework runtime in the browser.

```bash
npm install
npm run dev        # astro dev on :3001 (never 3000)
npm run preview    # production build + server.mjs on :3001, the way Railway runs it
npm run check      # lead route, locale routing, accent contrast, stats, spring self-checks
```

Node 24 (pinned in `package.json` so Railway picks a version Astro supports).

## Where things live

| What | Where |
| --- | --- |
| Projects, services, sectors, case studies, education (both languages) | `src/lib/data.ts` |
| Long-form case studies with no public link (International Rentals, Olympus Marathon) | `src/lib/international.ts`, `src/lib/olympus.ts` |
| Interface copy shared by the layout and homepage | `src/lib/ui.ts` |
| Quote wizard and ΕΣΠΑ form copy and options | `src/lib/requestForm.ts`, `src/lib/espa.ts` |
| Privacy policy, terms | `src/lib/privacy.ts`, `src/lib/terms.ts` |
| Screenshots (resized into srcsets at build) | `src/assets/work/<shot>.webp` and `<shot>-mobile.webp`, `src/assets/studies/` |
| Videos (Smile Design) | `public/work/` |
| Design system, motion tokens | `src/styles/global.css`, `src/lib/spring.js` (Akos DS mobile feel) |
| Shared interaction (menu, accent, θ, magnetic buttons, work preview, lightbox, counter beacon) | `src/scripts/site.ts` |
| Redirects, rewrites for the static folders, security headers, CSP | `server.mjs`, `src/lib/routes.mjs` |

The θ mark comes from `scripts/gen-theta-path.py`, which writes `src/lib/thetaPath.ts` (filled paths for the
small mark, outline edges for the 3D hero).

## Server routes

Everything is static except:

- `POST /api/lead`: the quote wizard, the ΕΣΠΑ form and the 7μερο order form. No database: a submission is an
  email to `LEAD_ALERT_EMAIL` through Resend. Honeypot, per-IP rate limit, CORS allowlist for 7μερο's own domain.
- `GET /api/health/mail`: ops probe for an uptime monitor, behind the `x-health-token` header.
- `GET /healthz`: bare liveness for Railway's health check.
- `POST /api/hit` and `/stats`: the first-party page counter (below).

## Page counter (/stats)

Each page view is one JSON line in `STATS_DIR/YYYY-MM.ndjson`: path, referrer domain, country (Cloudflare's
`cf-ipcountry`), phone/tablet/desktop, time. No IP, no cookie, nothing on the visitor's device, so no consent
banner. Files older than 13 months are deleted, as the privacy policy says.

`/stats` signs in with a six-digit code emailed to `STATS_EMAIL` (no password). On Railway, attach a volume
and point `STATS_DIR` at it, or the counts reset on every deploy.

## Static folders under public/

Served as-is, never edited by hand: `7mero.ai/` (built from `~/Downloads/7mero`, see the `akosds-7mero` skill)
and the client pitches `olympus/`, `elaiotriveio/`, `3d-eshop/`, `pediada/` (noindex). They keep the older,
looser CSP they need for their inline scripts.

## Environment

See `.env.example`.
