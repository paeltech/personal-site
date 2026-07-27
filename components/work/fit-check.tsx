"use client"

import { Container } from "@/components/primitives/container"
import { useReveal } from "@/hooks/use-reveal"

const FIT = [
  "You have real capital and commitment behind the venture.",
  "You want an operator who has shipped, not a deck.",
  "You're past the idea stage with a market to win.",
]

const NOT_FIT = [
  "You're at pure ideation with nothing resourced yet.",
  "You want a rubber stamp on a plan already decided.",
  "You're a student after a coffee chat. I answer those on LinkedIn, free.",
]

export function FitCheck() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <Container className="mt-20 pb-4 md:mt-24">
      <div ref={ref} className="reveal grid grid-cols-1 gap-14 md:grid-cols-2">
        <div className="flex flex-col gap-6 md:pr-14">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink">
            This is a fit if
          </span>
          {FIT.map((line) => (
            <div key={line} className="flex items-baseline gap-3.5">
              <span className="text-[16px] text-ink" aria-hidden>
                &rarr;
              </span>
              <span className="text-[18px] leading-[27px] text-ink">{line}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-6 border-t border-hairline pt-14 md:border-l md:border-t-0 md:pt-0 md:pl-14">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            It&rsquo;s probably not if
          </span>
          {NOT_FIT.map((line) => (
            <div key={line} className="flex items-baseline gap-3.5">
              <span className="text-[16px] text-faint" aria-hidden>
                &times;
              </span>
              <span className="text-[18px] leading-[27px] text-muted-foreground">{line}</span>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
