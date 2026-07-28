import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Shared label + error chrome wrapping a single form control. */
export function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string
  htmlFor: string
  error?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <label htmlFor={htmlFor} className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </label>
      {children}
      {error && (
        <span role="alert" className="text-[13px] font-medium text-destructive">
          {error}
        </span>
      )}
    </div>
  )
}

export const fieldControlClass =
  "w-full rounded-[8px] border border-hairline bg-paper px-4 py-3.5 text-[17px] text-ink placeholder:text-faint outline-none transition-colors focus:border-ink"
