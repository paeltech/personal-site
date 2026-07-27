"use client"

import { Container } from "@/components/primitives/container"
import { Eyebrow } from "@/components/primitives/eyebrow"
import { useReveal } from "@/hooks/use-reveal"

// Ordered by recognisability to the primary audience (corporate innovation
// leaders, investors, DFIs) — not chronologically.
const LOGOS = [
  "World Bank",
  "WFP",
  "US Embassy",
  "Mastercard Foundation",
  "Vodacom",
  "GSMA",
  "Andela",
  "Wikimedia",
] as const

export function ProofStrip() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="border-y border-hairline bg-panel">
      <Container ref={ref} className="reveal flex flex-col gap-8 py-12">
        <Eyebrow>Trusted by, and delivered for</Eyebrow>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          {LOGOS.map((logo) => (
            <span
              key={logo}
              className="text-[21px] font-semibold tracking-[-0.01em] text-faint transition-colors hover:text-ink"
            >
              {logo}
            </span>
          ))}
        </div>
      </Container>
    </section>
  )
}
