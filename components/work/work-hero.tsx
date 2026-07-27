"use client"

import { Container } from "@/components/primitives/container"
import { Eyebrow } from "@/components/primitives/eyebrow"
import { useReveal } from "@/hooks/use-reveal"

export function WorkHero() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <Container className="pt-24 pb-4 md:pt-28">
      <div ref={ref} className="stagger flex flex-col gap-7">
        <Eyebrow>Work With Me</Eyebrow>
        <h1 className="max-w-[1040px] text-[80px] leading-[78px] font-semibold tracking-[-0.03em] text-ink text-balance">
          Proven operators, not just frameworks.
        </h1>
        <p className="max-w-[660px] text-body-lg text-muted-foreground">
          Three ways to work together, all retainer-based, all hands-on, all drawn from a decade of
          building with my own capital on the line.
        </p>
      </div>
    </Container>
  )
}
