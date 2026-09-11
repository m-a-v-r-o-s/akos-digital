# Liquid glass on akos-digital — implementation plan

Target: this repo (Next.js 16 App Router, React 19, Tailwind 3, TS).
Source: `rdev/liquid-glass-react` v1.1.1, MIT (Max Rovensky).
Secondary reference for the filter math: `nikdelvin/liquid-glass` (Astro, pure CSS SVG filters,
zero deps) — worth reading if the vendored filter needs tuning.

Decisions in §3 are settled. Do not re-litigate them.

---

## 0. Read this before writing code

Five findings from reading the library against this codebase. They change the shape of the task.

### 0.1 `npm install liquid-glass-react` will break the build

`src/index.tsx:180` reads `navigator.userAgent` **in the render body**, not in an effect. Next
pre-renders client components on the server, so this throws `navigator is not defined` during
`next build`. The package also ships no `"use client"` directive.

The escape hatch (`next/dynamic` with `ssr: false`) is worse: the glassed element pops in after
hydration, which is layout shift on a CTA above the fold. CWV-green is a hard requirement in the
global CLAUDE.md.

**Vendor a trimmed copy, do not add the dependency.** MIT permits it; keep the copyright header
and a source URL comment. The package is unmaintained (last commit 2025-06-13).

### 0.2 What to keep when vendoring, and what to drop

`src/index.tsx` is 612 lines, `src/shader-utils.ts` 134, `src/utils.ts` 8 lines holding three
base64 JPEG displacement maps (~40KB each, ~120KB total).

Drop:
- `mode: "shader"` and all of `shader-utils.ts` — builds a canvas per instance and calls
  `toDataURL()`. `"standard"` is the right look here.
- `polarDisplacementMap` and `prominentDisplacementMap`; keep only `displacementMap`. Saves ~80KB
  of base64.
- The two `overLight` sibling divs (index.tsx:458-484). They render unconditionally at
  `opacity: 0` on a site with no light backgrounds. Three DOM nodes per instance for a feature
  that never fires.
- Internal mousemove tracking wherever `elasticity === 0` (see §3.3).

Keep: the `GlassFilter` SVG defs, the edge-mask radial gradient, the chromatic-aberration channel
split, the Firefox guard (moved into an effect).

Fix while vendoring: `index.tsx:52` hardcodes `id="feimage"` inside the filter defs, so every
instance emits a duplicate DOM id. Derive it from the existing `useId()` filter id.

### 0.3 The layout model is not drop-in

`LiquidGlass` renders itself at `position: relative; top: 50%; left: 50%` with a
`translate(-50%, -50%)` transform and explicit measured width/height. It is built for one
floating element pinned over a background image, not for an element inside a
`flex flex-wrap gap-2` row.

Every tag pill here lives in exactly such a row (`src/app/[lang]/page.tsx:200`,
`src/components/SectorDetail.tsx:182`, `src/components/MobileScrollSections.tsx:228`).

The vendored component needs a flow-friendly variant: no `top/left/translate`, size driven by
content via `ResizeObserver` rather than the upstream mount-and-resize-only measurement.

### 0.4 Performance: 73 tag pills on the homepage

Counted: 14 tag arrays in `src/lib/data.ts`, **73 pills total**, nearly all rendered on
`/[lang]` in one pass.

Per instance the upstream component attaches a `mousemove` listener that calls `setState` on
every event. 73 instances = 73 listeners and 73 React re-renders per pointer move, each
recomputing an SVG `feDisplacementMap` backdrop. INP catastrophe, and CWV-green is a hard gate.

It is also the aesthetic answer to "not cheese": 73 refracting pills is the cheese.

**Tags do not get the JS component.** See §1 Tier 2.

### 0.5 The backdrop problem — refraction needs something to refract

`--ink: #0d0d0d` is the page ground (`globals.css:6`). Displacing flat near-black yields flat
near-black. The effect is invisible across most of this site.

What actually sits behind things here:
- the cursor spotlight, a 600px radial gradient following the mouse (`SpotlightWrapper.tsx`,
  `.spotlight-bg` at `globals.css:88`) — moving, so glass over it reads as the cursor passes;
- the theta watermark at 7% opacity (`ThetaBackground.tsx`);
- real imagery: project thumbnails, the `.device-pair` case-study screenshots, the ESPA emblem.

Glass belongs where one of those three is behind it. Everywhere else it is a hairline border with
extra steps.

---

## 1. Where the glass goes

### Tier 1

**A. The sticky mobile tab bar.** `MobileScrollSections.tsx:149-152` already carries an inline
`backdropFilter: "blur(12px)"` applied on scroll. It floats over scrolling content, the one
canonical Apple liquid-glass use on this site. One instance, always over moving content. Upgrade
the inline blur to the real component, keep the existing scroll-gated fade-in.
`elasticity={0}`.

**B. The `/request` CTA — as a frame, not a fill.** `.cta-button` (`globals.css:447`) is a solid
accent fill with `--ink` text. That solid fill is what `scripts/check-accent-contrast.ts` proves
is AA-legible; making it translucent destroys the proof.

Keep the solid pill exactly as it is and wrap it in a glass ring that refracts the spotlight
gradient behind it. Apply on the **homepage hero and the mobile sticky bar only** — the eight
other `cta-button` instances (`ServicesIndex:135`, `ServiceDetail:192`, `WorkIndex:138`,
`CaseStudyDetail:227`, `SectorDetail:236`, `InternationalDetail:320`) sit at the bottom of long
pages on flat ink, where glass shows nothing and costs an SVG filter each.

This is the only element that gets elasticity. See §3.3.

**C. The ESPA button — full glass, decided.** `MobileScrollSections.tsx:142` and
`ServiceDetail.tsx:140`, wrapping `/1915943-2048448176.jpg`.

The owner has chosen full displacement across the whole element, emblem included, with the EU
reproduction constraint stated and in front of them. Build it as asked. Two things stay intact
regardless, because they are not part of that trade: the `aria-label="ΕΣΠΑ"`, and the link's hit
area and focus ring. Do not shrink either to fit the effect.

**D. Over the case-study device imagery — deferred.** `.device-pair` (`globals.css:173`) shows
real screenshots at large size, and a glass panel over it (the "Built with" row, a caption, the
status badge) is where this effect is most convincing on the whole site. It is also a layout
change to `CaseStudyDetail.tsx`, and below `sm` the monitor drops out and needs its own fallback.

**Do not build this yet.** Ship phases 1-4, screenshot a case study page, then put it to the
owner with the real thing on screen.

### Tier 2 — the tags, done cheaply

73 pills rule out the component. Give `.tag-pill` a CSS-only glass treatment instead
(`globals.css:155-160`):

```css
.tag-pill {
  @apply inline-flex items-center rounded-full px-3 py-1 text-xs font-mono tracking-wide;
  background: rgb(var(--accent-rgb) / 0.1);
  color: rgb(var(--accent-rgb));
  border: 1px solid rgb(var(--accent-rgb) / 0.2);
  /* added: */
  backdrop-filter: blur(6px) saturate(140%);
  -webkit-backdrop-filter: blur(6px) saturate(140%);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.08),
              inset 0 -1px 0 rgb(0 0 0 / 0.2);
}
```

One property pair and one inset highlight. Reads as glass, GPU-cheap at 73 instances, no
component and no JS, keeps the flow layout and the contrast proof intact. `backdrop-filter`
without `url()` is fully supported in Safari and Firefox, unlike the displacement filter.

The case-study "Built with" row (`CaseStudyDetail.tsx:171-179`, plain bordered pills, ~8 per
page) stays as it is until decision D is made.

### Do not apply

- Every `cta-button` site-wide. Eight extra SVG filters for no visible effect.
- The status badges — a state signal; glass would fight the dot.
- `section-card`, nav links, the accent switcher swatches (contrast-checked surfaces, keep flat).
- Anything inside the request wizard. Form fields need unambiguous focus states.

---

## 2. Phases

**Phase 1 — vendor the component.** New file `src/components/LiquidGlass.tsx`, `"use client"`,
MIT attribution header naming `rdev/liquid-glass-react`. Trim per §0.2, fix the duplicate
`feimage` id, move the Firefox check into an effect with a `useState` default of "filter on" so
SSR and first paint match. Add a `flow` prop that drops the `top/left/translate` positioning and
measures with `ResizeObserver`. Skip internal mousemove wiring entirely when `elasticity === 0`.

**Phase 2 — accessibility and degradation.** There is currently **no** `prefers-reduced-motion` or
`prefers-reduced-transparency` handling anywhere in `globals.css`; grep confirms zero matches.
Both must gate this:

```css
@media (prefers-reduced-transparency: reduce), (prefers-reduced-motion: reduce) {
  /* glass elements fall back to the current opaque styles */
}
```

The component must render children in a plain, already-legible container when the filter is
unsupported — Safari and Firefox show no displacement, per the upstream README — so the fallback
is the normal path, not an edge case.

**Phase 3 — the CSS tag treatment (§1 Tier 2).** Smallest diff, no dependency on Phase 1. Ship it
first if you want something visible early.

**Phase 4 — apply A, B, C in that order**, screenshotting each against `npm run dev` on **port
3001** (never touch 3000) before moving on.

**Phase 5 — gates.** All must pass before committing:
- `npm run build` — where an SSR `navigator` slip surfaces. Do not trust `next dev`.
- `npm run check` — four self-check scripts including `check-accent-contrast.ts`.
- Extend `check-accent-contrast.ts` if any glassed surface carries accent-coloured text: it
  flattens a translucent foreground over opaque ink (`over()`, ~line 36), so the glass overlay
  alpha has to enter that calculation or the AA proof is no longer true. If no glassed surface
  carries text, say so explicitly rather than silently skipping.
- Core Web Vitals, specifically INP, measured on `/[lang]` with the 73 pills present.
- `accesslint:scan` against localhost:3001 on the homepage and one case study.
- Per ponytail, one runnable check for the non-trivial bit: assert the filter id is unique across
  two mounted instances, or that the flow variant reports a non-zero measured size.

**Phase 6 — put decision D to the owner** with a screenshot of the case study page as built.

---

## 3. Settled decisions

1. **Case-study "Built with" row (Tier 1 D): deferred**, not cancelled. Build everything else,
   screenshot, then ask. Do not restructure `CaseStudyDetail.tsx` before that conversation.
2. **ESPA button: full glass over the whole element, emblem included.** The owner made this call
   with the EU emblem-reproduction constraint stated. It is their site and their compliance
   judgement. Keep `aria-label` and the focus ring intact; nothing else is off limits.
3. **Elasticity: `0.12` on the `/request` CTA only, `0` everywhere else.** One element earns the
   lean toward the cursor; nothing else pays a mousemove listener for it. This makes the
   "skip mousemove wiring when elasticity is 0" branch from Phase 1 load-bearing, so it needs to
   actually work, not just be written.

---

## 4. Ground rules from the global CLAUDE.md

- Dev server on **port 3001**, never 3000, never kill what is on 3000.
- No em dashes in code, comments or commit messages.
- Commit when the task wraps clean; **never push**.
- Mobile-first; WCAG 2.1 AA is a floor, not a goal.
