"use client"

import { Container } from "@/components/primitives/container"
import { useReveal } from "@/hooks/use-reveal"

export function PullQuote() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="mt-28 bg-ink md:mt-32">
      <Container ref={ref} className="reveal flex flex-col gap-11 py-24 md:py-28">
        <span aria-hidden className="text-[64px] font-bold leading-[0.3] text-ink-700">
          &ldquo;
        </span>
        <h2 className="max-w-[1080px] text-h1 font-light leading-[1.16] tracking-[-0.025em] text-paper text-balance">
          Constraint is the engine of innovation,{" "}
          <span className="font-semibold">not its obstacle.</span>
        </h2>
        <div className="mt-2 flex items-center gap-3.5">
          <span className="h-0.5 w-7 bg-faint" aria-hidden />
          <span className="text-small font-medium tracking-[0.02em] text-faint">
            The argument at the centre of <em className="not-italic text-paper">Build for the Margins</em>
          </span>
        </div>
      </Container>
    </section>
  )
}
