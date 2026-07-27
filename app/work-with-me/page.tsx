import type { Metadata } from "next"
import { WorkHero } from "@/components/work/work-hero"
import { Offers } from "@/components/work/offers"
import { FitCheck } from "@/components/work/fit-check"

export const metadata: Metadata = {
  title: "Work With Me | Paul Mandele",
  description:
    "Three ways to work together: venture-building and market-entry advisory, corporate innovation programmes, and speaking and workshops. Retainer-based, hands-on, proven operators.",
}

export default function WorkWithMePage() {
  return (
    <main className="pb-4">
      <WorkHero />
      <Offers />
      <FitCheck />
    </main>
  )
}
