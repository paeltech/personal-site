import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** H2-scale section heading, e.g. "Owned outcomes, not job titles." */
export function SectionHeading({
  children,
  className,
  tone = "ink",
}: {
  children: ReactNode
  className?: string
  tone?: "ink" | "paper"
}) {
  return (
    <h2
      className={cn(
        "text-h2 font-semibold",
        tone === "ink" ? "text-ink" : "text-paper",
        className,
      )}
    >
      {children}
    </h2>
  )
}
