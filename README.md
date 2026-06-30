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

## Deploy

```bash
npm run build
```

Deploy to [Vercel](https://vercel.com/) with zero configuration.
