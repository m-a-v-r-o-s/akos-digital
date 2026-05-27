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

## Deploy

```bash
npm run build
```

Deploy to [Vercel](https://vercel.com/) with zero configuration.
