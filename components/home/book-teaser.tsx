"use client"

import { Container } from "@/components/primitives/container"
import { Eyebrow } from "@/components/primitives/eyebrow"
import { Button } from "@/components/primitives/button"
import { ArrowLink } from "@/components/primitives/arrow-link"
import { BOOK_HREF } from "@/lib/constants"
import { useReveal } from "@/hooks/use-reveal"

export function BookTeaser() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="mt-28 border-y border-hairline bg-panel md:mt-32">
      <Container ref={ref} className="reveal flex flex-wrap items-center gap-16 py-24 md:gap-24 md:py-28">
        <div className="flex w-[320px] max-w-full flex-shrink-0 flex-col justify-between rounded-[4px] border-l-4 border-ink-700 bg-linear-to-br from-ink to-black p-9 shadow-[0_24px_50px_rgba(0,0,0,0.28)]" style={{ aspectRatio: "320/452" }}>
          <span className="text-[12px] font-semibold uppercase tracking-[0.24em] text-faint">A field method</span>
          <div className="flex flex-col gap-5">
            <span className="text-[42px] font-bold leading-[44px] tracking-[-0.02em] text-paper">
              Build for the Margins
            </span>
            <div className="h-[3px] w-11 bg-faint" />
            <span className="text-small font-medium tracking-[0.04em] text-faint">Paul Mandele</span>
          </div>
        </div>

        <div className="flex max-w-[620px] flex-col gap-7">
          <Eyebrow>The Book</Eyebrow>
          <h2 className="text-h2 font-semibold text-ink text-balance">
            A decade of hard-won lessons, written down so you don&rsquo;t have to learn them the expensive
            way.
          </h2>
          <p className="text-body text-muted-foreground">
            Not a slide deck. One argument runs through it: constraint is the engine of innovation, not
            its obstacle. Earned by building for patchy connectivity, low trust, and irregular income,
            with named case studies throughout.
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-5">
            <Button href={BOOK_HREF}>Get the book</Button>
            <ArrowLink href={BOOK_HREF}>Read a chapter</ArrowLink>
          </div>
        </div>
      </Container>
    </section>
  )
}
