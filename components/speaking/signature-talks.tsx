"use client"

import { Container } from "@/components/primitives/container"
import { Eyebrow } from "@/components/primitives/eyebrow"
import { useReveal } from "@/hooks/use-reveal"

const TALKS = [
  {
    pillar: "Constraint as Design Input",
    title: "Build for the Margins",
    body: "Why constraint is the engine of innovation, and how the world's hardest markets produce the most durable products.",
  },
  {
    pillar: "Trust as Infrastructure",
    title: "Trust-First Go-to-Market",
    body: "Selling into low-trust markets, where distribution is a relationship problem long before it is a marketing one.",
  },
  {
    pillar: "Operator-to-Advisor Proof",
    title: "Venture Building Without a Playbook",
    body: "What corporates get wrong about innovation, and the operating model that turns programmes into ventures.",
  },
] as const

export function SignatureTalks() {
  const headRef = useReveal<HTMLDivElement>()
  const gridRef = useReveal<HTMLDivElement>()

  return (
    <Container className="mt-20 flex flex-col gap-12 md:mt-24">
      <div ref={headRef} className="reveal">
        <Eyebrow>Signature talks</Eyebrow>
      </div>
      <div ref={gridRef} className="reveal grid grid-cols-1 gap-11 md:grid-cols-3">
        {TALKS.map((talk) => (
          <div key={talk.title} className="flex flex-col gap-4 border-t-2 border-ink pt-6.5">
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink">
              {talk.pillar}
            </span>
            <h3 className="text-h3 font-semibold text-ink">{talk.title}</h3>
            <p className="text-small leading-6 text-muted-foreground">{talk.body}</p>
          </div>
        ))}
      </div>
    </Container>
  )
}
