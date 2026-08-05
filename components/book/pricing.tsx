"use client"

import { useState } from "react"
import { Container } from "@/components/primitives/container"
import { Eyebrow } from "@/components/primitives/eyebrow"
import { Button } from "@/components/primitives/button"
import { PreorderDialog } from "@/components/book/preorder-dialog"
import { useReveal } from "@/hooks/use-reveal"
import { cn } from "@/lib/utils"
import type { BookFormat } from "@/lib/preorder-schema"

// TODO: swap for real retailer/checkout links once they exist (see
// plan.md §10, "Assets needed from Paul"). The reserve-your-copy dialog is
// the honest interim mechanism — no storefront to charge these to yet.
const TIERS = [
  {
    name: "Ebook",
    price: "$24",
    body: "EPUB & PDF, DRM-free. Includes all three free chapters and lifetime updates.",
    cta: "Pre-order",
    format: "ebook" as BookFormat,
    featured: false,
  },
  {
    name: "Paperback",
    price: "$32",
    body: "288 pages, matte cover. Ships worldwide. Bundled with the ebook at no extra cost.",
    cta: "Pre-order",
    format: "paperback" as BookFormat,
    featured: true,
  },
  {
    name: "Audiobook",
    price: "$28",
    body: "7h 40m, read by the author. The case studies, in the voice of the person who lived them.",
    cta: "Notify me",
    format: "audiobook" as BookFormat,
    featured: false,
  },
] as const

export function Pricing() {
  const headRef = useReveal<HTMLDivElement>()
  const cardsRef = useReveal<HTMLDivElement>()
  const [activeFormat, setActiveFormat] = useState<BookFormat | null>(null)

  return (
    <Container id="get-your-copy" className="mt-24 flex flex-col gap-12 pb-4 md:mt-28">
      <div ref={headRef} className="reveal">
        <Eyebrow>Get your copy</Eyebrow>
      </div>

      <div ref={cardsRef} className="reveal grid grid-cols-1 gap-6 sm:grid-cols-3">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "relative flex flex-col gap-4.5 rounded-[14px] border p-8.5",
              tier.featured ? "border-[1.5px] border-ink" : "border-hairline",
            )}
          >
            {tier.featured && (
              <span className="absolute -top-[11px] left-8.5 rounded-pill bg-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-paper">
                Most popular
              </span>
            )}
            <span className="text-[20px] font-semibold text-ink">{tier.name}</span>
            <span className="text-[44px] font-bold leading-none tracking-[-0.03em] text-ink">
              {tier.price}
            </span>
            <p className="text-small leading-[23px] text-muted-foreground">{tier.body}</p>
            <Button
              onClick={() => setActiveFormat(tier.format)}
              size="sm"
              className={cn(
                "mt-1.5 w-full",
                !tier.featured && "border border-hairline bg-paper text-ink hover:bg-panel hover:shadow-none",
              )}
            >
              {tier.cta}
            </Button>
          </div>
        ))}
      </div>

      <span className="text-small font-medium text-muted-foreground">
        Also available at Amazon, Apple Books, and Kobo on release.
      </span>

      <PreorderDialog format={activeFormat} onClose={() => setActiveFormat(null)} />
    </Container>
  )
}
