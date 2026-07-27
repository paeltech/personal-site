import Link from "next/link"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type ArrowLinkProps = {
  href: string
  tone?: "ink" | "paper"
  size?: "sm" | "md"
  external?: boolean
} & Omit<ComponentProps<typeof Link>, "href">

/** "Read the essay →" style link; the arrow nudges right on hover. */
export function ArrowLink({
  href,
  tone = "ink",
  size = "md",
  external,
  className,
  children,
  ...props
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-semibold",
        size === "md" ? "text-body" : "text-small",
        tone === "ink" ? "text-ink" : "text-paper",
        className,
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "inline-block transition-transform duration-200 ease-out group-hover:translate-x-1",
          tone === "ink" ? "text-ink-800" : "text-faint",
        )}
      >
        &rarr;
      </span>
    </Link>
  )
}
