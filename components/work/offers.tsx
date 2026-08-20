"use client"

import { Container } from "@/components/primitives/container"
// import { ArrowLink } from "@/components/primitives/arrow-link"
import { useReveal } from "@/hooks/use-reveal"
import { SPEAKING_HREF } from "@/lib/constants"

const OFFERS = [
  {
    index: "01",
    title: "Venture-Building & Market-Entry Advisory",
    format: "Monthly retainer, 3-month minimum. Joint venture & co-ownership options throughout the venture lifecycle",
    forWhom: "Corporates & investors entering Africa",
    body: "I help you design and validate ventures for constrained markets before a full budget cycle teaches you the hard way. Hands-on from thesis to first traction, built from a decade of doing it with my own capital on the line.",
    included: [
      "Market-entry thesis and validation plan",
      "Hands-on venture design sprints",
      "Rolling six-week roadmaps with direct product guidance",
    ],
    link: null,
  },
  {
    index: "02",
    title: "Corporate Innovation Programmes",
    format: "Project or retainer, scoped per programme",
    forWhom: "Institutions, DFIs & corporate studios",
    body: "I design and run innovation programmes, from hubs and accelerators to internal venture-building capability, for institutions that need operators who have actually shipped, not just facilitators.",
    included: [
      "Programme and operating-model design",
      "Accelerator or hub setup, end to end",
      "Internal capability building and operator network",
    ],
    link: null,
  },
  {
    index: "03",
    title: "Speaking & Workshops",
    format: "Per engagement",
    forWhom: "Conferences & corporate teams",
    body: "Talks and workshops on constraint-driven design, trust-first go-to-market, and building without a playbook, all drawn from named case studies rather than borrowed theory.",
    included: ["Keynotes and fireside conversations", "Hands-on team workshops", "A post-session playbook the team keeps"],
    link: SPEAKING_HREF,
  },
] as const

export function Offers() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <Container className="mt-20 md:mt-24">
      <div ref={ref} className="reveal flex flex-col">
        {OFFERS.map((offer) => (
          <div
            key={offer.index}
            className="flex flex-wrap items-start gap-14 border-t border-hairline py-13 last:border-b"
          >
            <div className="flex w-full flex-shrink-0 flex-col gap-5 md:w-[360px]">
              <span className="text-[19px] font-semibold text-faint">{offer.index}</span>
              <h2 className="text-[32px] leading-[37px] font-semibold tracking-[-0.02em] text-ink">
                {offer.title}
              </h2>
              <div className="mt-2 flex flex-col gap-2.5">
                <span className="text-[14px] text-muted-foreground">
                  <strong className="font-semibold text-ink">Format</strong> &nbsp; {offer.format}
                </span>
                <span className="text-[14px] text-muted-foreground">
                  <strong className="font-semibold text-ink">For</strong> &nbsp; {offer.forWhom}
                </span>
              </div>
              {/* {offer.link && (
                <ArrowLink href={offer.link} className="mt-1">
                  See speaking
                </ArrowLink>
              )} */}
            </div>

            <div className="flex min-w-[320px] flex-1 flex-col gap-6.5">
              <p className="max-w-[600px] text-body text-muted-foreground">{offer.body}</p>
              <div className="flex flex-col gap-3.5">
                <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  What&rsquo;s included
                </span>
                {offer.included.map((item) => (
                  <div key={item} className="flex items-baseline gap-3">
                    <span className="text-[15px] text-ink" aria-hidden>
                      &rarr;
                    </span>
                    <span className="text-[17px] text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
