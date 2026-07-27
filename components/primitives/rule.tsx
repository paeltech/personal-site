import { cn } from "@/lib/utils"

/** A hairline divider — the recurring `border-t border-hairline` rule between rows/sections. */
export function Rule({ className }: { className?: string }) {
  return <div role="separator" className={cn("h-px w-full bg-hairline", className)} />
}
