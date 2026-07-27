import Link from "next/link"
import type { ButtonHTMLAttributes, ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-[transform,background-color,box-shadow,border-color] duration-200 ease-out disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // The revenue-intent CTA: solid ink, lifts on hover. Used on paper/panel backgrounds.
        primary:
          "bg-ink text-paper hover:-translate-y-0.5 hover:bg-ink-800 hover:shadow-[0_12px_26px_rgba(23,23,23,0.18)] active:translate-y-0 active:shadow-[0_4px_10px_rgba(23,23,23,0.16)]",
        // Same intent, inverted for dark sections (the closing band, book cover panel).
        invert:
          "bg-paper text-ink hover:-translate-y-0.5 hover:bg-hairline hover:shadow-[0_12px_26px_rgba(0,0,0,0.28)]",
        // Secondary action on dark sections, e.g. "Get the book" beside an invert primary.
        ghost:
          "border border-ink-700 bg-transparent text-paper hover:-translate-y-0.5 hover:border-faint hover:bg-white/5",
      },
      size: {
        md: "px-6 py-[15px] text-body",
        sm: "px-[22px] py-3 text-small",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

type ButtonOwnProps = VariantProps<typeof buttonVariants> & {
  className?: string
}

type ButtonAsLink = ButtonOwnProps & { href: string } & Omit<ComponentProps<typeof Link>, "href">
type ButtonAsButton = ButtonOwnProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant, size, className } = props
  const classes = cn(buttonVariants({ variant, size }), className)

  // `typeof` (not truthiness) is the discriminant TypeScript can actually
  // narrow this union on — ButtonAsLink.href is `string`, which can be
  // falsy (""), so an `if (props.href)` check leaves TS unable to rule
  // ButtonAsLink out of the button branch.
  if (typeof props.href === "string") {
    const { href, variant: _v, size: _s, className: _c, ...linkProps } = props
    return <Link href={href} className={classes} {...linkProps} />
  }

  const { href: _h, variant: _v, size: _s, className: _c, ...buttonProps } = props
  return <button className={classes} {...buttonProps} />
}
