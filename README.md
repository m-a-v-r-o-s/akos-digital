# Akos Digital Services — Portfolio Website

Personal portfolio for **Θεόδωρος Ι. Μαύρος** / Akos Digital Services.

Built with [Next.js](https://nextjs.org/) (App Router) and [Tailwind CSS](https://tailwindcss.com/).

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Features

- **Cursor spotlight effect** — radial gradient follows the mouse on desktop
- **Split layout** — sticky left sidebar (name, role, nav) + scrollable right content
- **Active section tracking** — nav links highlight as you scroll through sections
- **Mobile-first responsive** — on mobile: stacked header + horizontal swipe sections with tab bar
- **Smooth transitions** — hover cards, underline link animations, page fade-in
- **Greek + English** — bilingual identity elements

## Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout, fonts, metadata
│   ├── page.tsx         # Main page (desktop layout)
│   └── globals.css      # Design tokens, custom classes
├── components/
│   ├── SpotlightWrapper.tsx    # Mouse-tracking radial gradient
│   ├── NavLinks.tsx            # Desktop sticky nav with active tracking
│   ├── MobileScrollSections.tsx # Mobile horizontal scroll panels
│   └── Icons.tsx               # SVG icon set
└── lib/
    └── data.ts          # All content (person, experience, projects, services)
```

## Customisation

All content lives in `src/lib/data.ts` — edit the exported objects to update the site copy, links, experience entries, and projects without touching any component code.

The **/request** lead-capture wizard's questions, options, and bilingual copy live in `src/lib/requestForm.ts`.

## Lead capture (/request)

The `/request` page is a multi-step, bilingual wizard that stores every submission in a Supabase table so you can follow up with potential clients. Setup takes a few minutes:

1. **Create a Supabase project** at [supabase.com](https://supabase.com) (free tier is fine).
2. **Create the table** — open the project's *SQL Editor*, paste the contents of [`supabase/schema.sql`](supabase/schema.sql), and run it.
3. **Add credentials** — copy `.env.example` to `.env.local` and fill in the two values from *Supabase → Settings → API*:

   ```bash
   cp .env.example .env.local
   ```

   - `SUPABASE_URL` — your project URL
   - `SUPABASE_SERVICE_ROLE_KEY` — the **service_role** key (server-side only; never expose it to the browser)

4. **On Railway**, add those same two variables under the service's *Variables* tab, then redeploy.

### Where the leads go

Every submission lands in the `public.leads` table. View them in *Supabase → Table Editor → leads*, or export to CSV from there. Each row includes what the person needs, their budget, timeline, contact details, and preferred contact method.

> Until the env vars are set, the form will report a friendly error and the API logs `Supabase env vars are not set`. The rest of the site works regardless.

### Privacy note

The wizard includes a consent checkbox and a short data-use note, which covers basic GDPR consent for contacting leads. If you collect data at scale, consider adding a full privacy policy page and linking it from the consent text in `src/lib/requestForm.ts`.

## CRM (/crm) — viewing your leads

A lightweight, hidden dashboard built into the same app (no second deployment) that lists every lead. It is reached through a deliberately obscure chain so there are no public links to it:

1. On the main site, click the **δ** (Greek) or **d** (English) in the name **Θεόδωρος**. A numeric keypad appears.
2. Enter **1289** → you're taken to a plain "Hello there" page.
3. Click the page → a one-time **passkey is emailed to `CRM_ALERT_EMAIL`** (info@akosds.com). Enter it.
4. You land on **/crm**, the lead list.

**Security model:** the keypad code and the meme are just obscurity. The real lock is the email passkey (only you can read that inbox) plus a signed, HTTP-only session cookie that lasts 8 hours. Without a valid session, `/crm` returns a 404 and reveals nothing.

### CRM setup

Add these to `.env.local` (and to Railway's *Variables*) in addition to the Supabase keys above:

| Variable | What it is |
| --- | --- |
| `CRM_SESSION_SECRET` | Long random string that signs the session cookie. Generate with `openssl rand -hex 32`. **The CRM won't unlock until this is set.** |
| `RESEND_API_KEY` | [Resend](https://resend.com) API key, used to email the passkey. |
| `CRM_MAIL_FROM` | Sender address (default `onboarding@resend.dev`). |
| `CRM_ALERT_EMAIL` | Where the passkey is sent (default `info@akosds.com`). |

> **Easiest email path:** sign up to Resend with `info@akosds.com`. You can then send from `onboarding@resend.dev` to that same address with no domain verification. To send from your own domain, verify `akosds.com` in Resend and set `CRM_MAIL_FROM=you@akosds.com`.
>
> Before `RESEND_API_KEY` is set, the passkey is **printed to the server logs** instead of emailed — useful for local testing.

### Optional: the meme image

The `/hello` page looks for an image at `public/hello-there.jpg` (the Obi-Wan "Hello there" meme). Drop one in to show it; without it, the page still works and just shows the styled "Hello there." text.

### Changing the keypad code

The keypad checks a SHA-256 hash so the code never appears in the shipped JavaScript. To change it from `1289`, run `node -e "console.log(require('crypto').createHash('sha256').update('NEWCODE').digest('hex'))"` and paste the result into `CODE_HASH` in `src/components/Keypad.tsx`.

## Funding watch (weekly email)

`scripts/funding-watch.ts` reads the RSS feeds where Greek SME funding
programmes are announced, keeps only what could turn into work or a
subsidised sale, and emails a digest. Nothing new means no email.

Why: the €300 e-invoicing voucher (Ψηφιακές Συναλλαγές Β') closed to
applications on 30 Sep 2025, and supplier registration closed even earlier.
Programmes like that are only useful if you hear about them in the week they
open.

Sources: [digitalsme.gov.gr](https://digitalsme.gov.gr/feed/) (the voucher
programmes themselves), [Ελλάδα 2.0 calls](https://greece20.gov.gr/feed/?post_type=calls),
[mindigital.gr](https://www.mindigital.gr/feed) and
[mindev.gov.gr](https://mindev.gov.gr/feed/). The two ministries publish
speeches and tenders too, so from those only a programme-specific term counts
(voucher, επιταγ, ψηφιακά εργαλεία, ηλεκτρονική τιμολόγηση, mydata, ...).
espa.gr and antagonistikotita.gr publish no feed and are not covered.

Programmes for individuals rather than for a firm buying digital work are
dropped: κατάρτιση, επιμόρφωση, δεξιότητες, and the social ones (ηλικιωμένοι,
ΑμεΑ, παιδιά, διαμεσολάβηση). Those clear the generic pair rule easily,
«πρόγραμμα» plus «ψηφιακές δεξιότητες» being the usual shape. The exclusion
applies only to that weak rule, never to a programme-specific term, so a real
voucher round is never dropped because «κατάρτιση» appears in its summary.

mindigital.gr answers 403 to Railway's egress IP while serving the same feed
fine from a Greek connection, so in practice the watch runs on three of the
four sources. It is a `broad` source (only a programme-specific term qualifies
an item from it), and the calls themselves land on digitalsme.gov.gr and the
Ελλάδα 2.0 feed, so the loss is recall at the edges rather than a missed
programme. A failing source is warned about per run and only turns into an
email if all four die.

```bash
npm run funding-watch -- --dry   # print what would be sent
npm run funding-watch            # send it
```

There is no database: each run looks back `WATCH_WINDOW_DAYS` (default 9, a
week plus slack) so a skipped run cannot create a blind week. An item can
therefore appear in two consecutive mails, which is the cheap side of the
trade. If every source fails it emails about that instead, so silence always
means "nothing new" and never "the watch is dead".

### Railway setup

The watch is a second service in the same Railway project (`funding-watch`),
not part of the web service. It is live; this is what it took, and what to
repeat if it ever has to be rebuilt:

1. **New** → **GitHub Repo** → this repo, in the project that already runs the
   site. Railway builds from GitHub, so the commit has to be on `origin/master`
   first: a local commit alone gets you a build of the previous master.
2. Settings → **Start Command**: `npm run funding-watch`
3. Settings → **Cron Schedule**: `0 7 * * 1`. Railway cron is UTC, so that is
   10:00 Athens in summer and 09:00 in winter.
4. Settings → **Restart Policy**: `Never`. A cron service is expected to exit
   after each run, and the script exits 0 on success, 1 on failure. No
   healthcheck, no public domain.
5. Settings → **Build Command**: something trivial such as
   `echo "cron service: no build, the script runs from source"`. Railpack still
   runs `npm install` in its own install phase, so this only skips the
   `next build` the cron would never serve. The script itself imports nothing
   outside `node:` and `src/lib/email.ts`, so it needs no dependencies at all.
6. Variables: `RESEND_API_KEY` and `LEAD_MAIL_FROM`. Set these as Railway
   references to the web service, `${{akos-digital.RESEND_API_KEY}}` and
   `${{akos-digital.LEAD_MAIL_FROM}}`, rather than pasting the values: one key
   in one place, and rotating it on the web service carries over. Optionally
   `WATCH_ALERT_EMAIL` to send somewhere other than `digitalaakos@gmail.com`,
   and `WATCH_WINDOW_DAYS` if the schedule changes.

Node comes from `engines` (`>=22`), which Railpack resolves to a 22.x release.
That matters: `--experimental-strip-types` is what runs the `.ts` file, and it
does not exist before Node 22.

**Deploying does not run the job.** A cron service builds and then waits for
its next tick, so a fresh deploy produces an empty deploy log rather than a
run. To force a run, point the schedule at a time a few minutes out, redeploy,
and put `0 7 * * 1` back afterwards. Railway is also loose about the minute:
a tick set for 14:20 UTC fired at 14:23.

Changing the schedule means changing the window: keep `WATCH_WINDOW_DAYS`
a day or two longer than the gap between runs.

## Deploy

```bash
npm run build
```

Deploy to [Vercel](https://vercel.com/) with zero configuration.
