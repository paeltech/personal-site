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
export const CONTACT_HREF = "/contact"
export const SPEAKING_HREF = "/speaking"

/** Footer secondary sitemap — surfaces the pages that are deliberately off the top nav. */
export const FOOTER_LINKS = [
  { label: "Work With Me", href: "/work-with-me" },
  { label: "Book", href: BOOK_HREF },
  { label: "Speaking", href: SPEAKING_HREF },
  { label: "Thoughts", href: "/thoughts" },
] as const

// TODO: placeholder handles/domain — confirm real LinkedIn/X URLs and the
// hello@ inbox before PR7 ships (see plan.md §10, "Assets needed from Paul").
export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/paulmandele" },
  { label: "Email", href: "mailto:hello@paulmandele.co" },
  { label: "X", href: "https://x.com/paulmandele" },
] as const
