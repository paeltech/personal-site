export const SITE_NAME = "Paul Mandele"

/** Primary nav — About/How I Work resolve to homepage anchors from any route. */
export const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "How I Work", href: "/#how-i-work" },
  { label: "Work With Me", href: "/work-with-me" },
  { label: "Thoughts", href: "/thoughts" },
] as const

/** Nav CTA — compact label, same destination as the in-page "Book an advisory call" buttons. */
export const NAV_CTA = { label: "Book a call", href: "/contact" } as const

/**
 * The book has no nav entry by design — it's reached only through
 * "Read the book" / "Get the book" CTAs across the site.
 */
export const BOOK_HREF = "/book"
/** For CTAs that specifically mean "jump to the free chapter reader", not just the book page. */
export const BOOK_CHAPTER_HREF = "/book#read"
/** For CTAs that specifically mean "jump to pricing/pre-order", not just the book page. */
export const BOOK_PRICING_HREF = "/book#get-your-copy"
export const CONTACT_HREF = "/contact"
export const SPEAKING_HREF = "/speaking"

/** Footer secondary sitemap — surfaces the pages that are deliberately off the top nav. */
export const FOOTER_LINKS = [
  { label: "Work With Me", href: "/work-with-me" },
  { label: "Book", href: BOOK_HREF },
  { label: "Speaking", href: SPEAKING_HREF },
  { label: "Thoughts", href: "/thoughts" },
] as const

// Pulled from the live site's old /thoughts footer (app/thoughts/page.tsx
// pre-rebuild). Instagram is dropped on purpose — the positioning brief
// flags it as not serving the corporate/institutional buyer this site
// is now built for.
export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/paul-mandele/" },
  { label: "Email", href: "mailto:business@paulmandele.co" },
  { label: "X", href: "https://x.com/Mandl_P" },
] as const

export const CALENDAR_LINK = "https://calendar.app.google/xTLpKK9TiWRy7ZVY9"
