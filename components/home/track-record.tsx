"use client"

import { Container } from "@/components/primitives/container"
import { Eyebrow } from "@/components/primitives/eyebrow"
import { SectionHeading } from "@/components/primitives/section-heading"
import { useReveal } from "@/hooks/use-reveal"

const RECORD = [
  {
    company: "AgriMark",
    aside: "(Hakiki)",
    role: "Co-Founder & Product Manager",
    outcome: (
      <>
        Built a farmer traceability product from zero. Closed a{" "}
        <strong className="font-semibold text-ink">$100K+ Agricultural Seed Agency contract</strong>,
        owned pilot to close.
      </>
    ),
  },
  {
    company: "Smart Foundry",
    aside: null,
    role: "Director, Venture Building & Operations",
    outcome: (
      <>
        Ran hypothesis-driven experiments across three ventures, secured an{" "}
        <strong className="font-semibold text-ink">$80K US Embassy grant</strong>, and owned the studio
        P&amp;L.
      </>
    ),
  },
  {
    company: "Rifaly",
    aside: "(formerly M-Paper)",
    role: "Product Manager, Venture Studio",
    outcome: (
      <>
        Led the offline-first pivot and scaled across Tanzania, Kenya, and Uganda. Grew revenue{" "}
        <strong className="font-semibold text-ink">57% B2B</strong> and 20.77% B2C.
      </>
    ),
  },
  {
    company: "Vodacom Innovation Hub",
    aside: null,
    role: "Product Manager, Venture Studio",
    outcome: "Ran TAM and competitive analysis for new product lines, and led agile squads through rapid cycles.",
  },
  {
    company: "Buni Hub",
    aside: "(COSTECH)",
    role: "Co-Hub Manager & Innovation Lead",
    outcome: (
      <>
        Raised <strong className="font-semibold text-ink">$230K+ in grants</strong> and built a programme
        that produced 40+ startups, at a 70%+ graduate success rate.
      </>
    ),
  },
] as const

export function TrackRecord() {
  const headRef = useReveal<HTMLDivElement>()
  const listRef = useReveal<HTMLDivElement>()

  return (
    <section className="pt-28 md:pt-32">
      <Container className="flex flex-col gap-14">
        <div ref={headRef} className="reveal flex flex-wrap items-end justify-between gap-10">
          <div className="flex flex-col gap-6">
            <Eyebrow>Track Record</Eyebrow>
            <SectionHeading>Owned outcomes, not job titles.</SectionHeading>
          </div>
          <span className="pb-2.5 text-small font-medium uppercase tracking-[0.02em] text-muted-foreground">
            Since 2014
          </span>
        </div>

        <div ref={listRef} className="reveal">
          {RECORD.map((row) => (
            <div
              key={row.company}
              className="flex flex-wrap items-start gap-8 border-t border-hairline py-9 last:border-b md:gap-14"
            >
              <div className="flex w-full flex-shrink-0 flex-col gap-2 md:w-[400px]">
                <span className="text-[23px] font-semibold tracking-[-0.02em] text-ink">
                  {row.company} {row.aside && <span className="font-normal text-muted-foreground">{row.aside}</span>}
                </span>
                <span className="text-[15px] font-medium tracking-[0.02em] text-muted-foreground">{row.role}</span>
              </div>
              <p className="max-w-[600px] flex-1 text-[19px] leading-[30px] text-ink">{row.outcome}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
