"use client"

import { Container } from "@/components/primitives/container"
import { Eyebrow } from "@/components/primitives/eyebrow"
import { useReveal } from "@/hooks/use-reveal"

const APPEARANCES = [
  { year: "2026", name: "WFP Innovation Accelerator", role: "Workshop facilitator" },
  { year: "2025", name: "GSMA Africa", role: "Speaker, side stage" },
  { year: "2024", name: "Sahara Sparks", role: "Keynote" },
  { year: "2023", name: "Slush Tanzania", role: "Panellist & producer" },
  { year: "2022", name: "Southern Africa Innovation Support", role: "Programme talk" },
] as const

export function Appearances() {
  const headRef = useReveal<HTMLDivElement>()
  const listRef = useReveal<HTMLDivElement>()

  return (
    <Container className="mt-20 flex flex-col gap-12 pb-4 md:mt-24">
      <div ref={headRef} className="reveal flex flex-wrap items-end justify-between gap-10">
        <Eyebrow>Selected appearances</Eyebrow>
        <span className="max-w-[280px] text-small font-medium text-muted-foreground">
          Also on camera &mdash; direct-to-camera and fireside formats.
        </span>
      </div>

      <div ref={listRef} className="reveal flex flex-col">
        {APPEARANCES.map((a) => (
          <div
            key={a.name}
            className="flex flex-wrap items-baseline gap-8 border-t border-hairline py-6 last:border-b"
          >
            <span className="w-20 flex-shrink-0 text-[16px] font-semibold text-muted-foreground">
              {a.year}
            </span>
            <span className="flex-1 text-[22px] font-semibold tracking-[-0.01em] text-ink">
              {a.name}
            </span>
            <span className="flex-shrink-0 text-small text-muted-foreground">{a.role}</span>
          </div>
        ))}
      </div>
    </Container>
  )
}
