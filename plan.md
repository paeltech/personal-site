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

### PR3 · Thoughts + Article — ✅ done, branch `pr3/thoughts`
- [x] `/thoughts`: header, **pillar filter tabs** (client), featured post, list — `components/thoughts/thoughts-index.tsx`
- [x] `categories → pillar` map (Constraint / Trust / Operator) + fallback in `lib/medium.tsx` — keyword-heuristic `pillarForPost()`; unmatched posts default to "operator" (the most general pillar). This is a best-effort match against Paul's *existing* Medium categories, not a guarantee — some legacy posts may sit in the "wrong" pillar until manually retagged. Verified live: 10 real posts split 3 constraint / 1 trust / 6 operator, counts match the "All 10" tab.
- [x] `/blog/[slug]`: reading-progress, hero image, neutral `.prose-article` theme for Medium HTML, pull-quotes, author bio (with "Get the book" CTA), related posts (same-pillar first, falls back to others when the pillar has no siblings) — `components/thoughts/article-view.tsx`
- [x] Consolidated `lib/medium.tsx`: added `estimateReadTime` and fixed `formatDate` (the old export only ever returned a 2-digit year and had zero callers — replaced with a real `short`/`long` formatter); `components/home/latest-thoughts.tsx` now imports these instead of carrying its own duplicate copies from PR2.
- [x] Retired `blogs-section.tsx` and `back-to-top.tsx` — confirmed via grep that `/thoughts` (rebuilt here) was their last consumer.
- [x] **Hoisted `SiteHeader`/`SiteFooter` into `app/layout.tsx`** now that every route wants them — removed the duplicate per-page renders from `app/page.tsx`, `app/thoughts/page.tsx`, `app/blog/[slug]/page.tsx`, and `app/design-system/page.tsx` (this was the PR2 `TODO(PR3)`).
- [x] Added `app/not-found.tsx` — not on the original checklist, but `notFound()` in `/blog/[slug]` was hitting Next's completely unstyled default 404 (a stray full-viewport black block); a minimal on-brand version was a cheap, directly-related fix so left it out of scope for PR7.
- Fixed in review: the old article page's Medium content included a leading `<figure>` image that duplicates the hero image now rendered separately — the old site hid this via Tailwind Typography `prose-*` classes that, it turns out, were never actually active (`@tailwindcss/typography` isn't installed, so all of that styling was already dead on the live site). Replicated the intent as a plain CSS rule in `.prose-article` (`globals.css`) instead. Also added `.prose-article` styles for `h1/h3/h4` and lists, since real posts use heading levels beyond the `h2` PR1 originally styled.
- Verified live against Paul's actual Medium feed (not mock data): filter tabs, featured post, list, full article render (a real ~3,500-word post), reading-progress bar (sticky under nav, correct fill math), author bio, related posts, and the 404 page all screenshot-verified correctly in a dev server.

### PR4 · Book (`/book`) — ✅ done, branch `pr4/book`
- [x] Selling hero (cover + headline + "Pre-order" + "Read free chapters") — `components/book/book-hero.tsx`
- [x] TOC with free/locked chapters — `components/book/chapters-section.tsx`; chapters 1, 2, 5 free (clickable), 3, 4 locked individually, 6–12 grouped into one "In the book" row
- [x] **In-browser free-chapter reader** — same file, sharing `activeIndex` state with the TOC (clicking a free chapter scrolls to and opens it; "Continue to Chapter N" advances; the last free chapter swaps its footer to a "Get the book" CTA). All three chapter-switching paths (TOC → reader, Continue → next, last-chapter fallback) verified via direct DOM interaction.
- [x] Pricing tiers (Ebook $24 / Paperback $32 "Most popular" / Audiobook $28) — `components/book/pricing.tsx`
- [x] Ensure all Book CTAs across the site route here — added `BOOK_CHAPTER_HREF` (`/book#read`) and `BOOK_PRICING_HREF` (`/book#get-your-copy`) to `lib/constants.ts` so "Read a chapter" / "Read free chapters" and "Pre-order" land on the right section, not just the top of the page
- **Deviation from the plan wording:** chapters are **local TypeScript data** (`lib/book-chapters.ts`), not MDX. The plan said "chapters as local MDX/JSON" — MDX tooling (`@next/mdx` or similar) isn't in this repo and the reader only needs plain paragraphs, so adding an MDX pipeline for three chapters' worth of prose was a toolchain addition with no real payoff. A plain typed array does the same job with less surface area.
- Chapters 2 ("Constraint as design input") and 3 ("Trust is infrastructure") are original prose written to match Chapter 1's voice and the site's established case studies (AgriMark, referral-over-paid-acquisition) — real chapter text doesn't exist yet, these are the same kind of placeholder-but-substantive copy as the rest of the site pending the actual manuscript.
- Pricing CTAs go to `mailto:business@paulmandele.co` with tier-specific subject lines, not `/contact` (that's for advisory calls) and not a real storefront (none exists yet — flagged in §10, "Assets needed from Paul"). Swap for real retailer/checkout links once they exist.
- Fixed in review: found and fixed a **stale Tailwind JIT cache** on the long-running dev server used across PR2–PR4 — `w-[360px]` on the book cover had literally never been compiled into CSS, so the cover rendered at ~4x its intended size. Confirmed via `getComputedStyle` + scanning `document.styleSheets` that no rule existed for that class, then confirmed the real code was correct by booting a completely independent `next dev` on a second port (added a `next-dev-verify` config to `.claude/launch.json`, gitignored/local-only) — clean there, and `pnpm build` (which always compiles fresh) was clean throughout. If chasing a "class is in the markup but doing nothing" bug again, restart the dev server before assuming the code is wrong.
- Verified: `tsc --noEmit` clean, `pnpm build` succeeds, `/book` prerenders. Full page content confirmed via `elementFromPoint`/computed-style checks and direct DOM interaction (the Browser pane's screenshot capture was intermittently unreliable again this session — confirmed via multiple independent methods, same as PR2, that this is a tooling artifact and not a rendering bug).

### PR5 · Work With Me + Speaking — ✅ done, branch `pr5/work-speaking`
- [x] `/work-with-me`: three offers in depth (format · for · what's included) + "fit / not a fit"; offer 03 links to `/speaking` — `components/work/{work-hero,offers,fit-check}.tsx`
- [x] `/speaking`: signature talks (3 pillars) + selected appearances + request CTA — `components/speaking/{speaking-hero,signature-talks,appearances}.tsx`. "Request CTA" is the standard `SiteFooter` closing band (already global via the layout) rather than a dedicated request-to-book form — a real form belongs to PR6, which is where the form infrastructure (react-hook-form/zod/Resend) actually gets built; a second bespoke form here would duplicate that.
- [x] `/work` → `/work-with-me` redirect — added to `next.config.mjs` `redirects()` (permanent/308), verified on an independent server: `/work` resolves to `window.location.pathname === "/work-with-me"`.
- Fixed in review: caught myself twice reaching for the wrong pattern with primitives that don't forward refs — first passing `ref={headRef as never}` to `Eyebrow` (masking a real type error instead of fixing it; `Eyebrow` has a fixed prop type, no ref forwarding, unlike `Container`), then separately duplicating `Eyebrow`'s own tick mark with a second manual one wrapped around it. Both fixed before verification; grepped the new files afterward for any other `as never`/manual-ref misuse on non-`Container` primitives — none found.
- Verified: `tsc --noEmit` clean, `pnpm build` succeeds, both routes prerender. Full content and the `/work-with-me` → `/speaking` link (`See speaking` → `/speaking`, confirmed via href) verified via `get_page_text` and `elementFromPoint`/computed-opacity checks on an independent server — the Browser pane's screenshot capture was unreliable again this session (same recurring tooling artifact as PR2–PR4, not a rendering bug).

### PR6 · Contact + Resend — ✅ done, branch `pr6/contact`
- [x] `/contact`: two-column layout — `ContactContext` (eyebrow, H1, subhead, numbered "what happens next" steps, direct email/LinkedIn) + `ContactForm`, a qualifying form (name, email, company, role, brief, timeline, budget) via `react-hook-form` + `zod` — `app/contact/page.tsx`, `components/contact/{contact-context,contact-form}.tsx`. **Deviation from plan wording:** built with bespoke primitives (`components/primitives/field.tsx`, `components/primitives/select-field.tsx` wrapping the existing `@radix-ui/react-select` dependency) instead of shadcn's `Form` — no `components/ui/*` exist anywhere in this repo (every prior PR used hand-built primitives styled to match `components.json`'s conventions instead of generating shadcn output), so this stays consistent with that established pattern rather than introducing a one-off dependency on generated shadcn code.
- [x] Shared validation source of truth — `lib/contact-schema.ts` exports `contactSchema` (zod) plus the `TIMELINE_OPTIONS`/`BUDGET_OPTIONS` used by both the client select fields and the server's plain-text email formatting, so client and server can never drift.
- [x] `app/api/contact/route.ts` → validates with the same `contactSchema`, sends via `resend` (new dependency, v6.18.0). Reads `RESEND_API_KEY` (required), `CONTACT_TO_EMAIL`/`CONTACT_FROM_EMAIL` (optional overrides, sensible defaults) from env — none of these are set in this environment, so the route's "not configured" path (HTTP 500 with a clear message, logged server-side) is what's actually exercised here; documented in the new `.env.example` for Paul to fill in via `.env.local` (dev) and Vercel project env vars (prod).
- [x] Success / error states — success replaces the form with a confirmation card ("Got it." + reply-time expectation); error shows an inline message with a direct-email fallback using the real `CONTACT_EMAIL` constant (see fix below). Both verified end-to-end (see Verification).
- [x] Spam honeypot — hidden `company_website` field (visually + `aria-hidden`, off-screen via `absolute -left-[9999px]` + `h-0 w-0 overflow-hidden`, `tabIndex={-1}`), validated server-side as `z.string().max(0)`; any non-empty value returns a fake success without sending mail. Confirmed no horizontal overflow and correct off-screen positioning (`getBoundingClientRect().left === -9999`).
- Fixed in review: (1) the form's error-state fallback email was hardcoded to a stale `hello@paulmandele.co` instead of the real `business@paulmandele.co` — added a `CONTACT_EMAIL` constant to `lib/constants.ts`, used it in both `contact-form.tsx` and `contact-context.tsx`, and fixed `SOCIAL_LINKS`' "Email" entry to derive from it instead of duplicating the address; (2) an em dash in the `brief` field's zod error message, inconsistent with the site's established no-em-dash house style — reworded to a comma; (3) `.gitignore`'s blanket `.env*` was also ignoring the new `.env.example` documentation file (which holds no real secrets) — added a `!.env.example` exception so it can be committed.
- **Verification note — a real testing-tooling pitfall worth recording:** early attempts to fill the form programmatically (raw JS native-setter+dispatchEvent, then simulated typing at a screenshot-derived pixel coordinate) appeared to leave react-hook-form's validation errors stuck even after the DOM's `.value` visibly updated. Traced this all the way down to `document.activeElement` after a click — it was `BODY`, not the input — proving the click coordinate no longer matched the field's actual position because the layout shifts (fields move down/up as validation error text appears/disappears above and below them). It was **not** a form bug: switching to ref-based interaction (`read_page` → live `ref_N` → `computer` click/type against the ref, which re-resolves position at click time instead of trusting a stale screenshot coordinate) immediately fixed it — typing into a genuinely-focused field correctly cleared that field's error in real time, exactly like the Radix `Select` fields already did.
- **Verified end-to-end:** filled every field via ref-based interaction (name, email, company, role, brief as text; timeline/budget via the Radix `Select`s) — all 7 zod errors cleared correctly and no errors remained pre-submit (`document.querySelectorAll('[role="alert"]')` empty). Submitting POSTed to `/api/contact`, which correctly returned `500` (no `RESEND_API_KEY` in this environment) — confirmed via `read_network_requests` — and the client correctly rendered the graceful error state with the real `business@paulmandele.co` fallback. `tsc --noEmit` clean, `pnpm build` succeeds (`/api/contact` builds as a dynamic `ƒ` route, `/contact` as static `○`).

### PR7 · Content, SEO, a11y, polish — ✅ mostly done, branch `pr7/polish`; note the one blocked item below
- [ ] **Real documentary photography — still blocked.** No real photos of Paul exist yet (see §10, "Assets needed from Paul"); the styled gradient placeholders (About portrait, book cover) stay until they're provided. The specific issue the original audit flagged — a broken literal `placeholder.svg` <img> near the final CTA — was already resolved organically back in PR1 (the SiteFooter "PM" gradient monogram replaced it). Confirmed via grep this session that nothing in `app`/`components` references the old placeholder image files anymore.
- [x] SEO/meta + OG images per new positioning — root `app/layout.tsx` now carries the real positioning copy (title/description from the brief), a proper `title: { default, template: "%s | Paul Mandele" }` so child pages set short titles instead of hand-appending the suffix, `metadataBase`, and Open Graph/Twitter card metadata. `/blog/[slug]` gets per-article OG data (`post.thumbnail` as the share image). Added `app/opengraph-image.tsx` (1200×630, generated via `ImageResponse`, on-brand ink/paper) as the fallback OG image for every other page, plus `app/icon.tsx`/`app/apple-icon.tsx` generating the "PM" monogram — replacing `public/icon.svg` and friends, which turned out to be a **generic, unrelated placeholder mark** (looked like a default Vercel/Next template icon) that was never actually wired to any metadata and had zero real favicon working on the live site before this. Deleted the 8 now-superseded/orphaned files in `public/` (confirmed unused via grep first).
- [x] Mobile nav — `components/site-header.tsx` now has a real hamburger toggle (`lucide-react` `Menu`/`X`, already a dependency) opening a full-screen panel: stacked nav links + CTA, body-scroll lock, Escape-to-close, focus moves into the panel on open and returns to the toggle on close, correct `aria-expanded`/`aria-controls`/`aria-modal`.
- [x] Focus states — audited `:focus-visible` across the site and fixed a real bug: the global ink-coloured ring is invisible against `SiteFooter`'s ink background. Added `:where(.bg-ink, .bg-ink-800) :focus-visible { outline-color: var(--color-paper) }`, verified via computed style that a focused footer link now renders a paper-coloured ring.
- [x] Reduced-motion — already covered by PR1's global `@media (prefers-reduced-motion: reduce)` block; the new mobile-nav panel has no motion to begin with (instant show/hide), so it's compliant by construction, nothing further needed.
- [x] Responsive audit — checked every route (`/`, `/thoughts`, `/blog/[slug]`, `/book`, `/work-with-me`, `/speaking`) at mobile width for horizontal overflow (`document.documentElement.scrollWidth` vs `innerWidth`) — all clean.
- [x] Single-`<h1>` check across every page-level component and both shared `SiteHeader`/`SiteFooter` — confirmed via grep, no duplicates.
- **Lighthouse pass** — not run as an actual Lighthouse audit (no reliable way to invoke it in this environment); covered the same ground structurally instead (metadata, focus states, heading hierarchy, alt text already present on real `<Image>` usage, no horizontal overflow).
- Fixed in review, the big one: the mobile nav panel was rendered as a *child* of `<header>`, which has `backdrop-blur-md` — a `backdrop-filter`, which per spec creates a new containing block for `position: fixed` descendants. That silently broke `fixed inset-0` on the panel, confining its actual painted background to the ~101px header box while its content still visually overflowed past it — so the homepage bled through behind the nav links below that point. Moved the panel to be a *sibling* of `<header>` (both returned from a fragment) instead of nesting it inside. Verified via `getBoundingClientRect()` before/after: was effectively confined near the header's height, now correctly spans the full `innerHeight`.
- Also fixed: the automation tool's simulated coordinate-click reliably failed on the small hamburger button (it has a nested SVG icon) despite the coordinates matching the button's bounding rect exactly — a real DOM `.click()` on the same element worked immediately. Confirmed this is a tooling gap, not a code issue, then used direct `.click()` for the remainder of the mobile-nav verification (open, close via ×, close via Escape, focus-return, body-scroll-lock — all confirmed correct).
- Screenshot capture was unreliable yet again this session (same recurring artifact as every PR since PR2) — one specific case looked exactly like a real bug (text bleeding through the mobile panel) and *was* investigated as one first via `elementFromPoint`/computed-style/rect checks before concluding it was real, which is how the backdrop-filter bug above actually got caught. Screenshots remain useful as a first signal here, just never sufficient on their own to declare something broken or fixed.

---

## 9. Data & integrations

- **Medium → pillars:** map `categories` to `Constraint as Design Input` / `Trust as Infrastructure` / `Operator-to-Advisor Proof`; unmatched posts fall back to a default pillar. Featured = most recent.
- **Book chapters:** local MDX/JSON; 3 marked free, rest locked.
- **Contact:** Resend via route handler; env `RESEND_API_KEY`; verified domain for the `from` address.

## 10. Assets needed from Paul

- Resend API key + verified sending domain — PR6 is built and works end-to-end against the "not configured" path; add `RESEND_API_KEY` (and optionally `CONTACT_FROM_EMAIL`/`CONTACT_TO_EMAIL`) to `.env.local` for local testing and to Vercel's project env vars for production to make `/contact` actually send mail (see `.env.example`)
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
