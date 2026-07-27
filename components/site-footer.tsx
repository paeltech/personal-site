import Link from "next/link"
import { Container } from "@/components/primitives/container"
import { Button } from "@/components/primitives/button"
import { CONTACT_HREF, BOOK_HREF, FOOTER_LINKS, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink">
      <Container className="flex flex-col gap-10 py-24 md:py-28">
        <div className="flex items-center gap-4">
          <div
            aria-hidden
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-ink-700 to-ink-800"
          >
            <span className="text-[18px] font-bold tracking-[0.02em] text-paper">PM</span>
          </div>
          <div>
            <div className="text-[17px] font-semibold text-paper">{SITE_NAME}</div>
            <div className="text-small text-faint">Venture-Building Strategist &amp; Advisor</div>
          </div>
        </div>

        <h2 className="max-w-[1060px] text-h1 font-semibold tracking-[-0.03em] text-paper text-balance">
          If your organisation is about to learn these lessons the expensive way,{" "}
          <span className="font-light text-faint">I&rsquo;d rather help you skip that part.</span>
        </h2>

        <div className="flex flex-wrap items-center gap-5">
          <Button href={CONTACT_HREF} variant="invert">
            Book an advisory call
          </Button>
          <Button href={BOOK_HREF} variant="ghost">
            Get the book
          </Button>
        </div>

        <div className="flex flex-col gap-6 border-t border-ink-800 pt-10 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Secondary" className="flex flex-wrap gap-x-8 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-small font-medium text-faint hover:text-paper"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-6 md:justify-end md:gap-8">
            <span className="text-small text-faint">
              &copy; {year} {SITE_NAME}. Built for the margins.
            </span>
            <div className="flex items-center gap-8">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link text-small font-medium text-paper"
                  {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
