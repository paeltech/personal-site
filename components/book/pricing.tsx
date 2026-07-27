"use client"

import { Container } from "@/components/primitives/container"
import { Eyebrow } from "@/components/primitives/eyebrow"
import { Button } from "@/components/primitives/button"
import { useReveal } from "@/hooks/use-reveal"
import { cn } from "@/lib/utils"

// TODO: swap for real retailer/checkout links once they exist (see
// plan.md §10, "Assets needed from Paul"). A mailto expression-of-interest
// is the honest interim mechanism — no storefront to send these to yet.
const TIERS = [
  {
    name: "Ebook",
    price: "$24",
    body: "EPUB & PDF, DRM-free. Includes all three free chapters and lifetime updates.",
    cta: "Pre-order",
    href: "mailto:business@paulmandele.co?subject=Pre-order%20%E2%80%94%20Build%20for%20the%20Margins%20(Ebook)",
    featured: false,
  },
  {
    name: "Paperback",
    price: "$32",
    body: "288 pages, matte cover. Ships worldwide. Bundled with the ebook at no extra cost.",
    cta: "Pre-order",
    href: "mailto:business@paulmandele.co?subject=Pre-order%20%E2%80%94%20Build%20for%20the%20Margins%20(Paperback)",
    featured: true,
  },
  {
    name: "Audiobook",
    price: "$28",
    body: "7h 40m, read by the author. The case studies, in the voice of the person who lived them.",
    cta: "Notify me",
    href: "mailto:business@paulmandele.co?subject=Notify%20me%20%E2%80%94%20Build%20for%20the%20Margins%20(Audiobook)",
    featured: false,
  },
] as const

export function Pricing() {
  const headRef = useReveal<HTMLDivElement>()
  const cardsRef = useReveal<HTMLDivElement>()

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
              href={tier.href}
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
    </Container>
  )
}
