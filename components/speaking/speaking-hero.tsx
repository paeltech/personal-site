"use client"

import { Container } from "@/components/primitives/container"
import { Eyebrow } from "@/components/primitives/eyebrow"
import { useReveal } from "@/hooks/use-reveal"

export function SpeakingHero() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <Container className="pt-24 pb-4 md:pt-28">
      <div ref={ref} className="stagger flex flex-col gap-7">
        <Eyebrow>Speaking &amp; Workshops</Eyebrow>
        <h1 className="max-w-[1080px] text-[76px] leading-[76px] font-semibold tracking-[-0.03em] text-ink text-balance">
          Talks built from named case studies, not borrowed theory.
        </h1>
        <p className="max-w-[640px] text-body-lg text-muted-foreground">
          Direct, evidence-led sessions on building ventures where the standard playbook doesn&rsquo;t
          apply. Comfortable on a keynote stage, a workshop table, or on camera.
        </p>
      </div>
    </Container>
  )
}
