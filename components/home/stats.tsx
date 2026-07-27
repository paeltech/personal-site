"use client"

import { Container } from "@/components/primitives/container"
import { useCountUp } from "@/hooks/use-count-up"
import { cn } from "@/lib/utils"

const STATS = [
  { target: 100, prefix: "$", suffix: "K+", label: "Government contract closed,\nowned pilot to close" },
  { target: 80, prefix: "$", suffix: "K", label: "US Embassy grant\nraised" },
  { target: 57, prefix: "", suffix: "%", label: "B2B revenue growth\nacross three countries" },
  { target: 40, prefix: "", suffix: "+", label: "Startups from one\ninnovation hub" },
] as const

function Stat({ target, prefix, suffix, label, first }: (typeof STATS)[number] & { first?: boolean }) {
  const { ref, value } = useCountUp<HTMLDivElement>(target)

  return (
    <div
      ref={ref}
      className={cn("flex flex-1 basis-[200px] flex-col gap-2.5 border-l border-hairline px-10 py-13", first && "border-l-0 pl-0")}
    >
      <span className="text-stat font-bold text-ink">
        {prefix}
        {value}
        {suffix}
      </span>
      <span className="whitespace-pre-line text-small font-medium leading-[22px] text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

export function Stats() {
  return (
    <section className="mt-16 md:mt-24">
      <Container>
        <div className="flex flex-wrap border-y border-hairline">
          {STATS.map((stat, i) => (
            <Stat key={stat.label} {...stat} first={i === 0} />
          ))}
        </div>
      </Container>
    </section>
  )
}
