import type { Metadata } from "next"
import { BookHero } from "@/components/book/book-hero"
import { BookPitch } from "@/components/book/book-pitch"
import { ChaptersSection } from "@/components/book/chapters-section"
import { Pricing } from "@/components/book/pricing"

export const metadata: Metadata = {
  title: "Build for the Margins | Paul Mandele",
  description:
    "A decade of building ventures for patchy connectivity, low trust, and irregular income, turned into a method other builders can use. Read three chapters free.",
}

export default function BookPage() {
  return (
    <main className="pb-4">
      <BookHero />
      <BookPitch />
      <ChaptersSection />
      <Pricing />
    </main>
  )
}
