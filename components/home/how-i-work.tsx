"use client"

import { Container } from "@/components/primitives/container"
import { Eyebrow } from "@/components/primitives/eyebrow"
import { SectionHeading } from "@/components/primitives/section-heading"
import { useReveal } from "@/hooks/use-reveal"
import { cn } from "@/lib/utils"

const OFFERS = [
  {
    index: "01",
    title: "Venture-Building & Market-Entry Advisory",
    body: "I help corporates and investors design and validate ventures for constrained markets before a full budget cycle teaches them the hard way. Hands-on and retainer-based, built from a decade of doing it with my own capital on the line.",
  },
  {
    index: "02",
    title: "Corporate Innovation Programmes",
    body: "I design and run innovation programmes, from hubs and accelerators to internal venture-building capability, for institutions that need operators, not frameworks.",
  },
  {
    index: "03",
    title: "Speaking & Workshops",
    body: "I speak and run workshops on constraint-driven design, trust-first go-to-market, and building without a playbook, drawing on named case studies from a decade of building.",
  },
] as const

const HORIZONS = [
  {
    length: "6 weeks",
    kicker: "Firm commitment",
    body: "A concrete, costed plan the team executes against.",
    numClass: "text-ink",
    kickerClass: "text-ink",
    dotClass: "bg-ink",
  },
  {
    length: "3 months",
    kicker: "Directional view",
    body: "A direction, revised as the market answers back.",
    numClass: "text-ink-700",
    kickerClass: "text-muted-foreground",
    dotClass: "bg-faint",
  },
  {
    length: "12 months",
    kicker: "Working thesis",
    body: "A thesis held loosely, tested against real signals.",
    numClass: "text-faint",
    kickerClass: "text-muted-foreground",
    dotClass: "bg-hairline",
  },
] as const

const METHODS = [
  {
    title: "Design Sprints",
    body: "Compress months of validation into days, tested against real market constraints.",
  },
  {
    title: "Field-Based Research",
    body: "Observation over interviews. The truest signal is what people actually do.",
  },
  {
    title: "Innovation Workshops",
    body: "Align teams around what's true in the market, not what the org chart assumes.",
  },
  {
    title: "Rolling Roadmapping",
    body: "Firm six weeks, directional three months, a twelve-month working thesis.",
  },
  {
    title: "Product Delivery",
    body: "Offline-first architecture, lean instrumentation, built for the devices users own.",
  },
] as const

export function HowIWork() {
  const headRef = useReveal<HTMLDivElement>()
  const offersRef = useReveal<HTMLDivElement>()
  const processHeadRef = useReveal<HTMLDivElement>()
  const horizonsRef = useReveal<HTMLDivElement>()
  const methodsRef = useReveal<HTMLDivElement>()

  return (
    <section id="how-i-work" className="pt-28 md:pt-32">
      <Container className="flex flex-col gap-15">
        {/* Offers */}
        <div ref={headRef} className="reveal flex flex-wrap items-end justify-between gap-10">
          <div className="flex max-w-[760px] flex-col gap-6">
            <Eyebrow>How I Work</Eyebrow>
            <SectionHeading>Three ways I work with organisations building into hard markets.</SectionHeading>
          </div>
          <p className="max-w-[300px] text-body text-muted-foreground">
            Retainer-based and hands-on. Proven operators, not just frameworks.
          </p>
        </div>

        <div ref={offersRef} className="reveal">
          {OFFERS.map((offer) => (
            <div
              key={offer.index}
              className="flex flex-wrap items-start gap-8 border-t border-hairline py-11 last:border-b md:gap-14"
            >
              <span className="w-11 flex-shrink-0 pt-1.5 text-[19px] font-semibold text-faint">
                {offer.index}
              </span>
              <h3 className="w-full flex-shrink-0 text-h3 font-semibold text-ink md:w-[380px]">
                {offer.title}
              </h3>
              <p className="max-w-[560px] flex-1 text-body text-muted-foreground">{offer.body}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div ref={processHeadRef} className="reveal flex flex-wrap items-end justify-between gap-10 pt-8">
          <div className="flex max-w-[620px] flex-col gap-6">
            <Eyebrow>Process</Eyebrow>
            <SectionHeading>A rolling model, not an 18-month plan pretending to be certain.</SectionHeading>
          </div>
          <p className="max-w-[420px] text-body text-muted-foreground">
            I don&rsquo;t plan eighteen months out in markets that change in six. The plan tightens as real
            signals come in, not assumptions.
          </p>
        </div>

        <div ref={horizonsRef} className="reveal flex flex-wrap border-t-2 border-ink">
          {HORIZONS.map((h, i) => (
            <div
              key={h.length}
              className={cn(
                "relative flex-1 basis-[200px] border-l border-hairline pt-8 pl-11",
                i === 0 && "border-l-0 pl-0",
              )}
            >
              <span className={cn("absolute -top-[7px] h-3 w-3 rounded-full", h.dotClass, i === 0 ? "left-0" : "left-11")} />
              <div className="flex flex-col gap-4">
                <span className={cn("text-[44px] font-bold leading-none tracking-[-0.03em]", h.numClass)}>
                  {h.length}
                </span>
                <span className={cn("text-small font-semibold", h.kickerClass)}>{h.kicker}</span>
                <span className="text-[17px] leading-[26px] text-muted-foreground">{h.body}</span>
              </div>
            </div>
          ))}
        </div>

        <div ref={methodsRef} className="reveal flex flex-col gap-10">
          <Eyebrow>What that looks like in an engagement</Eyebrow>
          <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {METHODS.map((m) => (
              <div key={m.title} className="flex flex-col gap-3 border-t border-hairline pt-7 pb-7">
                <h4 className="text-[19px] font-semibold tracking-[-0.01em] text-ink">{m.title}</h4>
                <p className="text-small leading-6 text-muted-foreground">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
