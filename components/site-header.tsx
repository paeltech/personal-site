"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Container } from "@/components/primitives/container"
import { Button } from "@/components/primitives/button"
import { NAV_CTA, NAV_LINKS, SITE_NAME } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
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

        {/* TODO(PR7): replace with a real mobile menu — links just hide below md for now,
            matching the current site's behaviour until PR7's mobile-nav pass. */}
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

        <Button href={NAV_CTA.href} size="sm">
          {NAV_CTA.label}
        </Button>
      </Container>
    </header>
  )
}
