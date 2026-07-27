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

### PR1 · Foundation — ✅ done, branch `pr1/foundation`
- [x] Neutral tokens in `globals.css` `@theme`; map shadcn CSS vars (`--background`, `--foreground`, `--muted-foreground`, `--border`, `--primary`, …)
- [x] Reconcile the Tailwind v4 vs `tailwind.config.ts` leftover — deleted `tailwind.config.ts` and the orphaned `styles/globals.css` (both unreferenced; v4 is CSS-first via `@theme`)
- [x] Remove `next-themes` + `theme-provider`; force light — `theme-provider.tsx` was already dead code (never imported); dependency dropped from `package.json`
- [x] Wire Sora weights 300–700 — exposed as `--font-sora` CSS var via `next/font`, consumed through `--font-sans`
- [x] Primitives: `Button` (primary-ink / invert / ghost), `Eyebrow`, `Container`, `SectionHeading`, `ArrowLink`, `Rule` — in `components/primitives/`
- [x] Interaction hooks: `useReveal`, `useCountUp`, `useReadingProgress` + base motion CSS — in `hooks/`, motion CSS in `globals.css` `@layer components`
- [x] `SiteHeader` (new nav) + `SiteFooter` (with secondary sitemap)
- [x] `lib/constants.ts` — nav/footer links, `NAV_CTA` ("Book a call" → `/contact`), `BOOK_HREF`/`SPEAKING_HREF` (intentionally off-nav)
- [x] `app/design-system` — internal, `noindex` preview route for reviewing tokens/primitives before PR2 rewires the real pages (not linked from nav; remove once all pages ship)
- Verified: `tsc --noEmit` clean, `pnpm build` succeeds (`/`, `/thoughts`, `/blog/[slug]`, `/design-system` all prerender), visually reviewed every primitive + both header/footer in a live dev server
- Fixed in review: `tailwind-merge` didn't know our custom `@theme` tokens, so `text-paper` (color) and `text-small` (font size) were silently colliding — `lib/utils.ts` now extends `tailwind-merge`'s theme scale with our token names
- Not done here (by design, deferred to later PRs): homepage/`layout.tsx` not yet wired to `SiteHeader`/`SiteFooter` (PR2, to avoid a duplicate nav on the still-old homepage); `title`/`description` in `layout.tsx` are untouched old copy (PR7); no mobile menu yet (PR7); `next lint` has never been configured on this repo (pre-existing, out of scope)

### PR2 · Homepage (`app/page.tsx`) — ✅ done, branch `pr2/homepage`
- [x] Hero → proof strip → About + portrait + **stat count-up** → How I Work (offers + rolling-horizon process) → thesis pull-quote band → Track Record → book teaser → latest Thoughts → closing CTA — built as `components/home/*` (one file per section)
- [x] Retire old components: `about/services/process/selected-work/contact-section`, `typewriter`, `animated-arrow` — confirmed via dependency grep before deleting each
- [x] Section anchors `#about`, `#how-i-work`
- Deviation from the original checklist wording: **`blogs-section.tsx` was NOT retired here.** `/thoughts` (untouched until PR3) still imports it, along with `back-to-top.tsx` and `lib/medium.tsx`'s `fetchMediumPosts`. Deleting it now would have broken `/thoughts`. PR3 retires it when `/thoughts` is rebuilt.
- `SiteHeader`/`SiteFooter` are rendered directly in `app/page.tsx`, not hoisted into `app/layout.tsx` yet — `/thoughts` and `/blog/[slug]` still render their own old inline header/footer, so a root-layout header/footer would have doubled up on those two routes. PR3 hoists both into the layout once every route wants them (see `TODO(PR3)` comment in `app/page.tsx`).
- `lib/constants.ts`: replaced the placeholder `SOCIAL_LINKS`/email from PR1 with the real values pulled from the old `/thoughts` footer (LinkedIn, X, `business@paulmandele.co`); Instagram dropped on purpose per the positioning brief. Added `CALENDAR_LINK` (the real Google Calendar link the old site used) for `/contact` to consume in PR6.
- Latest Thoughts pulls 3 live Medium posts via the existing `fetchMediumPosts()`; pillar tag is a lightweight fallback (`categories[0]`, else "Field Notes") — the real Constraint/Trust/Operator mapping is PR3 scope, not duplicated here.
- Fixed in review: `Container` couldn't accept a `ref` (typed with `ComponentPropsWithoutRef`, and not forwarding it) even though several sections need one for `useReveal`/`useCountUp` — widened to `ComponentPropsWithRef` and confirmed React 19 forwards it to the underlying element with no `forwardRef` wrapper needed. Also made `useCountUp` generic over the element type (matching `useReveal`) instead of a hardcoded `HTMLElement` cast at each call site.
- Verified: `tsc --noEmit` clean, `pnpm build` succeeds, and the full page was checked end-to-end — every section screenshot-verified pixel-correct at desktop width (1440px) from the hero through Track Record; Book Teaser/Latest Thoughts/Footer content and every link verified via full-page-text and accessibility-tree checks (all hrefs correct) after the Browser pane's screenshot capture became unreliable at deep scroll positions late in the session (environment issue, unrelated to the code — confirmed via computed styles and `elementFromPoint` hit-testing that the DOM/CSS was correct regardless). Footer itself is the same component already pixel-verified in PR1.

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
