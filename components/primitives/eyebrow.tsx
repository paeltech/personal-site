import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** The small tick-and-label kicker used above section headings sitewide. */
export function Eyebrow({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode
  tone?: "muted" | "ink" | "accent-on-dark"
  className?: string
}) {
  const toneClass = {
    muted: "text-muted-foreground",
    ink: "text-ink",
    "accent-on-dark": "text-faint",
  }[tone]

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="h-[2px] w-7 bg-current text-ink" aria-hidden />
      <span
        className={cn(
          "text-eyebrow font-semibold tracking-[0.14em] uppercase",
          toneClass,
        )}
      >
        {children}
      </span>
    </div>
  )
}
