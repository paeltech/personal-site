"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { Container } from "@/components/primitives/container"
import { Button } from "@/components/primitives/button"
import { NAV_CTA, NAV_LINKS, SITE_NAME } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll and trap Escape while the mobile panel is open.
  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    firstLinkRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
    toggleRef.current?.focus()
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b border-transparent bg-paper/80 backdrop-blur-md transition-colors duration-300",
          scrolled && "border-hairline",
        )}
      >
        <Container as="nav" className="flex items-center justify-between py-[26px]" aria-label="Primary">
          <Link href="/" className="text-[19px] font-bold tracking-[-0.02em] text-ink">
            {SITE_NAME}
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-small font-medium text-muted-foreground hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button href={NAV_CTA.href} size="sm">
              {NAV_CTA.label}
            </Button>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-panel"
              aria-label="Open menu"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-ink hover:bg-panel md:hidden"
            >
              <Menu aria-hidden size={22} />
            </button>
          </div>
        </Container>
      </header>

      {/* Rendered as a sibling of <header>, not a descendant: the header's
          backdrop-blur (a backdrop-filter) creates a new containing block
          for position:fixed descendants, which broke this panel's
          fixed+inset-0 viewport positioning when it lived inside <header>. */}
      {menuOpen && (
        <div
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-paper md:hidden"
        >
          <Container className="flex items-center justify-between py-[26px]">
            <Link href="/" className="text-[19px] font-bold tracking-[-0.02em] text-ink" onClick={closeMenu}>
              {SITE_NAME}
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-ink hover:bg-panel"
            >
              <X aria-hidden size={22} />
            </button>
          </Container>

          <Container className="flex flex-1 flex-col justify-between pt-6 pb-12">
            <nav className="flex flex-col" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={closeMenu}
                  className="border-t border-hairline py-5 text-[28px] font-semibold tracking-[-0.02em] text-ink last:border-b"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Button href={NAV_CTA.href} onClick={closeMenu} className="mt-10 w-full">
              {NAV_CTA.label}
            </Button>
          </Container>
        </div>
      )}
    </>
  )
}
