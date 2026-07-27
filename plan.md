# Rebuild Plan — paeltech/personal-site → "Paul website" design

Living document. We track the rebuild through the PRs below; check items off as they land.

---

## 1. Goal

Rebuild the existing personal site with the **"Paul website"** Paper design: a world-class, minimal, editorial site in a monochrome neutral system, single typeface (Sora). This is a **design + information-architecture replacement on top of the existing stack** — we keep the framework and tooling, replace the design layer, and expand the pages.

## 2. Source of truth for the design

Paper's MCP has a weekly limit, so we port from assets already in hand (no Paper access required):

- **Homepage** → the published interactive artifact (production-faithful HTML/CSS/JS) is the direct reference.
- **Thoughts, Article, Book, Work With Me, Speaking, Contact** → the authored markup, tokens, and copy from Paper + review screenshots.
- *Optional later:* when Paper's weekly MCP limit resets, use `get_jsx` / `get_computed_styles` to pixel-verify.

## 3. Existing stack (keep)

- **Next.js 15.5.9** App Router, **React 19**
- **Tailwind CSS v4** (`@tailwindcss/postcss`) — note leftover `tailwind.config.ts` to reconcile toward v4 `@theme`
- **shadcn/ui** + Radix primitives, `lucide-react`
- **Sora** via `next/font/google` (the "same font" requirement is already satisfied)
- **Medium** as CMS (`@paulalan` via rss2json, `revalidate: 3600`, mock fallback in `lib/medium.tsx`)
- pnpm, Vercel (`@vercel/analytics`)
- `react-hook-form` + `zod` + `@hookform/resolvers` already in deps (used for Contact)

## 4. Locked decisions

| Decision | Choice |
|---|---|
| Theme | **Light only.** Remove `next-themes` / `theme-provider`, force the light neutral palette, drop dark-mode token branches. |
| Contact form | **Resend + route handler** (`app/api/contact/route.ts`). Needs `RESEND_API_KEY` + verified sending domain. |
| Blog content | **Keep Medium** (`@paulalan`), add a `categories → pillar` map with fallback. |
| Work route | `/work-with-me` (with `/work` → redirect). |

## 5. Global navigation & IA

**Top nav (all pages):**

`About` · `How I Work` · `Work With Me` · `Thoughts` · **`Book a call`** (CTA)

- `About` → homepage `#about`
- `How I Work` → homepage `#how-i-work` (the offers + process area; folds the old "How I Help" + "Process")
- `Work With Me` → `/work-with-me`
- `Thoughts` → `/thoughts`
- `Book a call` (CTA, primary/ink) → `/contact`

**Not in the nav (by design):**

- **Book page (`/book`)** is reached **only through Book CTAs** — "Read the book" (hero), "Get the book" (book teaser, article author bio, footer). No nav entry.
- **Speaking (`/speaking`)** is reached from the Work With Me page (offer 03 "See speaking →") and the footer.

**In-page revenue CTA** stays worded **"Book an advisory call"** (same destination `/contact`); the compact **nav** CTA is **"Book a call."**

**Footer** carries the secondary sitemap for discoverability: Work With Me · Book · Speaking · Thoughts, plus LinkedIn · Email · X.

### Routes map

| Route | Status | Notes |
|---|---|---|
| `/` | rebuild | Homepage |
| `/thoughts` | rebuild | Index + pillar filter tabs |
| `/blog/[slug]` | rebuild | Article layout |
| `/work-with-me` | new | Offers in depth |
| `/speaking` | new | Talks + appearances |
| `/book` | new | Selling page + free-chapter reader |
| `/contact` | new | Qualifying form |
| `/work` | new | redirect → `/work-with-me` |
| `/api/contact` | new | Resend route handler |

## 6. Design tokens

Neutral scale (Tailwind `neutral`), encoded in `globals.css` `@theme` and mapped onto the shadcn CSS variables so primitives inherit.

| Token | Hex | Role |
|---|---|---|
| `--color-paper` | `#FAFAFA` | page background (`--background`) |
| `--color-panel` | `#F5F5F5` | recessed sections, cards |
| `--color-ink` | `#171717` | text + `--primary` (ink buttons) |
| `--color-ink-800` | `#262626` | button hover, dark accents |
| `--color-ink-700` | `#404040` | borders on dark |
| `--color-muted` | `#737373` | secondary text (`--muted-foreground`) |
| `--color-faint` | `#A3A3A3` | logos, meta, on-dark muted |
| `--color-hairline` | `#E5E5E5` | rules + `--border` |
| prose body | `#2A2A2A` | long-form article text |

**Type — Sora only**, weights 300–700:
- Display (hero H1): `clamp(42px, 6.9vw, 104px)` / 600 / `-0.03em`
- Page H1: `clamp(40px, 6vw, 88px)` / 600
- Section H2: `clamp(30px, 4vw, 52px)` / 600 / `-0.025em`
- H3: 27px / 600
- Stat numeral: `clamp(46px, 5vw, 76px)` / 700 / tabular-nums
- Body: 20px / 34px; Body-lg: 22px
- Small: 16px; Eyebrow: 13px / 600 / uppercase / `+0.14em`
- Radii: pill 999, sm 6, card 12–16

## 7. Interaction layer (dependency-free)

Small hooks + CSS, **all gated by `prefers-reduced-motion`**:
- `useReveal` — IntersectionObserver fade-up on scroll
- `useCountUp` — homepage stat strip ($100K+ · $80K · 57% · 40+)
- `useReadingProgress` — article top bar
- CSS: sticky-nav hairline on scroll · nav underline-grow · **logo strip hover-to-ink** · Track Record row hover (tint + left rule + indent) · Thought card lift · arrow-nudge · button lift · smooth scroll

---

## 8. PRs

Each PR = its own branch off `main` + a Vercel preview; merge on approval.

### PR1 · Foundation
- [ ] Neutral tokens in `globals.css` `@theme`; map shadcn CSS vars (`--background`, `--foreground`, `--muted-foreground`, `--border`, `--primary`, …)
- [ ] Reconcile the Tailwind v4 vs `tailwind.config.ts` leftover
- [ ] Remove `next-themes` + `theme-provider`; force light
- [ ] Wire Sora weights 300–700
- [ ] Primitives: `Button` (primary-ink / invert / ghost), `Eyebrow`, `Container`, `SectionHeading`, `ArrowLink`, `Rule`
- [ ] Interaction hooks: `useReveal`, `useCountUp`, `useReadingProgress` + base motion CSS
- [ ] `SiteHeader` (new nav) + `SiteFooter` (with secondary sitemap)

### PR2 · Homepage (`app/page.tsx`)
- [ ] Hero → proof strip → About + portrait + **stat count-up** → How I Work (offers + rolling-horizon process) → thesis pull-quote band → Track Record → book teaser → latest Thoughts → closing CTA
- [ ] Retire old components: `about/services/process/selected-work/contact/blogs-section`, `typewriter`, `animated-arrow`
- [ ] Section anchors `#about`, `#how-i-work`

### PR3 · Thoughts + Article
- [ ] `/thoughts`: header, **pillar filter tabs** (client), featured post, list
- [ ] `categories → pillar` map (Constraint / Trust / Operator) + fallback in `lib/medium.tsx`
- [ ] `/blog/[slug]`: reading-progress, hero image, neutral `.prose` theme for Medium HTML, pull-quotes, author bio (with "Get the book" CTA), related posts

### PR4 · Book (`/book`)
- [ ] Selling hero (cover + headline + "Pre-order" + "Read free chapters")
- [ ] TOC with free/locked chapters
- [ ] **In-browser free-chapter reader** (client; chapters as local MDX/JSON; 3 free)
- [ ] Pricing tiers (Ebook / Paperback / Audiobook)
- [ ] Ensure all Book CTAs across the site route here

### PR5 · Work With Me + Speaking
- [ ] `/work-with-me`: three offers in depth (format · for · what's included) + "fit / not a fit"; offer 03 links to `/speaking`
- [ ] `/speaking`: signature talks (3 pillars) + selected appearances + request CTA
- [ ] `/work` → `/work-with-me` redirect

### PR6 · Contact + Resend
- [ ] `/contact`: qualifying form (name, email, company, role, brief, timeline, budget) via shadcn `Form` + `react-hook-form` + `zod`
- [ ] `app/api/contact/route.ts` → Resend send; `RESEND_API_KEY` in Vercel env
- [ ] Success / error states; spam honeypot

### PR7 · Content, SEO, a11y, polish
- [ ] Real documentary photography (replace placeholders + `placeholder.svg` avatar)
- [ ] SEO/meta + OG images per new positioning (drop the old keyword-list title/description)
- [ ] Mobile nav (menu currently just hides links)
- [ ] Focus states, reduced-motion, Lighthouse pass, responsive audit

---

## 9. Data & integrations

- **Medium → pillars:** map `categories` to `Constraint as Design Input` / `Trust as Infrastructure` / `Operator-to-Advisor Proof`; unmatched posts fall back to a default pillar. Featured = most recent.
- **Book chapters:** local MDX/JSON; 3 marked free, rest locked.
- **Contact:** Resend via route handler; env `RESEND_API_KEY`; verified domain for the `from` address.

## 10. Assets needed from Paul

- Resend API key + verified sending domain (needed by PR6; everything before is unblocked)
- Documentary photography: Buni Hub, a Sahara Sparks stage, the ASA contract signing, Rifaly's team, and a portrait (needed by PR7; placeholders until then)
- Final book cover art + real chapter text (PR4 uses the sample chapters until provided)
- Real book retailer / pre-order links, real calendar link for `/contact`

## 11. Copy

Use the refined, em-dash-free copy from the Paper design deck (hero, About with the headline numbers, How I Work, Track Record with outcomes, book blurb, Thoughts, closing CTA). Homepage numbers to keep prominent: **$100K+ · $80K · 57% · $230K+ · 40+**.

## 12. Risks

- Tailwind v4 `@theme` vs the leftover `tailwind.config.ts` — standardize early (PR1)
- Medium/rss2json reliability + rate limits — keep cache + mock fallback
- Contact-form deliverability — verify domain, test end to end
- Real imagery pending — don't block; ship tasteful placeholders

## 13. Working method

- One PR per phase off `main`; Vercel preview per PR; merge on approval.
- Keep this `plan.md` updated — check boxes as PRs land, note deviations.
- Match existing code conventions (shadcn primitives where they fit; bespoke components for hero/editorial sections).
