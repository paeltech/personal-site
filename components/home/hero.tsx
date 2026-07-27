"use client"

import { Container } from "@/components/primitives/container"
import { Eyebrow } from "@/components/primitives/eyebrow"
import { Button } from "@/components/primitives/button"
import { ArrowLink } from "@/components/primitives/arrow-link"
import { BOOK_HREF, CONTACT_HREF } from "@/lib/constants"
import { useReveal } from "@/hooks/use-reveal"

export function Hero() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <Container as="header" className="pt-24 pb-20 md:pt-28 md:pb-24">
      <div ref={ref} className="stagger flex flex-col gap-10">
        <Eyebrow>Venture-Building Strategist &amp; Innovation Advisor</Eyebrow>

        <h1 className="max-w-[1180px] text-display font-semibold text-ink text-balance">
          I build ventures that survive constraint,{" "}
          <span className="font-light text-muted-foreground">then teach the method.</span>
        </h1>

        <div className="flex flex-wrap items-end justify-between gap-10">
          <p className="max-w-[600px] text-body-lg text-ink">
            For a decade I&rsquo;ve built ventures in Africa&rsquo;s hardest markets: patchy connectivity, low
            trust, irregular income. I turned the lessons into a method. Now I advise the corporates,
            investors, and institutions doing the same.
          </p>
          <div className="flex flex-shrink-0 items-center gap-5">
            <Button href={CONTACT_HREF}>Book an advisory call</Button>
            <ArrowLink href={BOOK_HREF}>Read the book</ArrowLink>
          </div>
        </div>
      </div>
    </Container>
  )
}
