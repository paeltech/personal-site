"use client"

import Image from "next/image"
import { Container } from "@/components/primitives/container"
import { Eyebrow } from "@/components/primitives/eyebrow"
import { useReveal } from "@/hooks/use-reveal"

export function About() {
  const headRef = useReveal<HTMLDivElement>()
  const bodyRef = useReveal<HTMLDivElement>()

  return (
    <section id="about" className="pt-28 md:pt-32">
      <Container className="flex flex-col gap-16">
        <div ref={headRef} className="reveal flex flex-col gap-8 md:flex-row md:items-start md:gap-20">
          <div className="w-full flex-shrink-0 pt-1 md:w-[200px]">
            <Eyebrow>About</Eyebrow>
          </div>
          <h2 className="max-w-[900px] text-h2 font-normal leading-[1.32] tracking-[-0.02em] text-ink text-balance">
            I made the expensive mistakes myself, with my own capital and reputation on the line. The
            organisations I advise don&rsquo;t have to make them with theirs.
          </h2>
        </div>

        <div ref={bodyRef} className="reveal flex flex-col items-start gap-14 md:flex-row md:gap-20">
          <div className="relative aspect-[420/520] w-full flex-shrink-0 overflow-hidden rounded-lg bg-ink md:w-[420px]">
            <Image
              src="/images/paul-mandele.jpg"
              alt="Paul Mandele at Buni Hub, Dar es Salaam"
              fill
              sizes="(min-width: 768px) 420px, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex max-w-[600px] flex-col gap-7 pt-1">
            <p className="text-body text-ink">
              I built a farmer traceability product from scratch and closed a{" "}
              <strong className="font-semibold">$100K+ government contract</strong>. I raised an{" "}
              <strong className="font-semibold">$80K US Embassy grant</strong>. I led a pivot that grew
              B2B revenue <strong className="font-semibold">57%</strong> across three countries.
            </p>
            <p className="text-body text-ink">
              None of it came from a research report. It came from watching a user&rsquo;s app fail to
              load three times before she gave up, then building around that reality instead of
              apologising for it.
            </p>
            <p className="text-body text-muted-foreground">
              Today I work with corporates, investors, and institutions building into Africa and other
              constrained markets.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
