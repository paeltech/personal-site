"use client"

import { Container } from "@/components/primitives/container"
import { Eyebrow } from "@/components/primitives/eyebrow"
import { Button } from "@/components/primitives/button"
import { ArrowLink } from "@/components/primitives/arrow-link"
import { BOOK_CHAPTER_HREF, BOOK_PRICING_HREF } from "@/lib/constants"
import { useReveal } from "@/hooks/use-reveal"

export function BookHero() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <Container className="pt-24 pb-4 md:pt-28">
      <div ref={ref} className="stagger flex flex-wrap items-start gap-16 md:gap-22">
        <div
          className="flex w-[360px] max-w-full flex-shrink-0 flex-col justify-between rounded-[4px] border-l-4 border-ink-700 bg-linear-to-br from-ink to-black p-[42px] shadow-[0_30px_60px_rgba(0,0,0,0.30)]"
          style={{ aspectRatio: "360/508" }}
        >
          <span className="text-[12px] font-semibold uppercase tracking-[0.24em] text-faint">
            A field method
          </span>
          <div className="flex flex-col gap-5.5">
            <span className="text-[46px] leading-[48px] font-bold tracking-[-0.02em] text-paper">
              Build for the Margins
            </span>
            <div className="h-[3px] w-12 bg-faint" />
            <span className="text-small font-medium tracking-[0.04em] text-faint">Paul Mandele</span>
          </div>
        </div>

        <div className="flex min-w-[320px] flex-1 flex-col gap-6.5">
          <Eyebrow>The Book &middot; Out 2026</Eyebrow>
          <h1 className="text-[60px] leading-[60px] font-semibold tracking-[-0.03em] text-ink text-balance">
            Constraint is the engine of innovation, not its obstacle.
          </h1>
          <p className="max-w-[560px] text-[21px] leading-8 text-muted-foreground">
            A decade of building ventures for patchy connectivity, low trust, and irregular income,
            turned into a method other builders can use. Not a slide deck. A field manual.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-4.5">
            <Button href={BOOK_PRICING_HREF} variant="primary" size="md" className="px-[30px] py-[17px]">
              Pre-order &middot; $24
            </Button>
            <ArrowLink href={BOOK_CHAPTER_HREF}>Read free chapters</ArrowLink>
          </div>
          <div className="mt-3.5 flex flex-wrap items-center gap-6 text-[14px] font-medium text-muted-foreground">
            <span>288 pages</span>
            <span className="text-hairline">&middot;</span>
            <span>Ebook, paperback &amp; audiobook</span>
            <span className="text-hairline">&middot;</span>
            <span>3 chapters free</span>
          </div>
        </div>
      </div>
    </Container>
  )
}
