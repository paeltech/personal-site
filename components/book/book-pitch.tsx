"use client"

import { Container } from "@/components/primitives/container"
import { useReveal } from "@/hooks/use-reveal"

const COLUMNS = [
  {
    kicker: "Who it's for",
    body: "Founders, corporate innovators, investors, and DFIs building into Africa and other resource-constrained markets, and anyone tired of playbooks written for conditions they'll never operate in.",
  },
  {
    kicker: "What you'll take away",
    body: "A repeatable method for turning constraint into design input, a trust-first go-to-market model, and the rolling roadmap that replaces the 18-month plan that never survives contact.",
  },
  {
    kicker: "How it's built",
    body: "Twelve chapters, each anchored to a named case study, from a $100K farmer-traceability contract to a hub that produced 40+ startups. Field notes, not frameworks.",
  },
] as const

export function BookPitch() {
  const headRef = useReveal<HTMLHeadingElement>()
  const colsRef = useReveal<HTMLDivElement>()

  return (
    <Container className="mt-24 flex flex-col gap-14 md:mt-28">
      <h2
        ref={headRef}
        className="reveal max-w-[900px] text-h2 font-semibold text-ink text-balance"
      >
        What a decade of building actually taught me, written down so you don&rsquo;t have to learn it
        the expensive way.
      </h2>
      <div ref={colsRef} className="reveal grid grid-cols-1 border-t border-hairline sm:grid-cols-3">
        {COLUMNS.map((col, i) => (
          <div
            key={col.kicker}
            className={`flex flex-col gap-3.5 pt-8 pb-2 sm:px-11 ${i === 0 ? "sm:pl-0" : ""} ${
              i === COLUMNS.length - 1 ? "sm:pr-0" : ""
            } ${i > 0 ? "sm:border-l sm:border-hairline" : ""}`}
          >
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink">
              {col.kicker}
            </span>
            <p className="text-[17px] leading-[27px] text-muted-foreground">{col.body}</p>
          </div>
        ))}
      </div>
    </Container>
  )
}
