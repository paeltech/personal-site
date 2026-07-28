"use client"

import { Eyebrow } from "@/components/primitives/eyebrow"
import { useReveal } from "@/hooks/use-reveal"
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/constants"

const STEPS = [
  "You send the brief.",
  "I reply within two business days, personally.",
  "If it's a fit, we book a 45-minute advisory call.",
]

export function ContactContext() {
  const ref = useReveal<HTMLDivElement>()
  const linkedin = SOCIAL_LINKS.find((l) => l.label === "LinkedIn")

  return (
    <div ref={ref} className="stagger flex w-full max-w-[460px] flex-shrink-0 flex-col gap-8">
      <Eyebrow>Contact</Eyebrow>
      <h1 className="text-[56px] leading-[56px] font-semibold tracking-[-0.03em] text-ink text-balance">
        Let&rsquo;s talk about what you&rsquo;re building.
      </h1>
      <p className="text-body-lg text-muted-foreground">
        A few details before the calendar. It filters for fit on both sides, so the call is useful from the
        first minute.
      </p>

      <div className="flex flex-col gap-5.5 border-t border-hairline pt-4">
        {STEPS.map((step, i) => (
          <div key={step} className="flex gap-4">
            <span className="w-5 flex-shrink-0 text-[15px] font-semibold text-ink">{i + 1}</span>
            <span className="text-[16px] leading-6 text-muted-foreground">{step}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3.5 border-t border-hairline pt-5.5">
        <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Or reach me directly
        </span>
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-[18px] font-medium text-ink hover:text-ink-800">
          {CONTACT_EMAIL}
        </a>
        {linkedin && (
          <a
            href={linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[18px] font-medium text-ink hover:text-ink-800"
          >
            LinkedIn
          </a>
        )}
      </div>
    </div>
  )
}
