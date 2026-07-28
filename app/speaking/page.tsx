import type { Metadata } from "next"
import { SpeakingHero } from "@/components/speaking/speaking-hero"
import { SignatureTalks } from "@/components/speaking/signature-talks"
import { Appearances } from "@/components/speaking/appearances"

export const metadata: Metadata = {
  title: "Speaking & Workshops",
  description:
    "Direct, evidence-led talks and workshops on constraint-driven design, trust-first go-to-market, and building without a playbook, drawn from named case studies.",
}

export default function SpeakingPage() {
  return (
    <main className="pb-4">
      <SpeakingHero />
      <SignatureTalks />
      <Appearances />
    </main>
  )
}
