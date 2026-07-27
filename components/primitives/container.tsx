import type { ComponentPropsWithRef, ElementType } from "react"
import { cn } from "@/lib/utils"

type ContainerProps<T extends ElementType> = {
  as?: T
} & ComponentPropsWithRef<T>

/** Page-width wrapper matching the Paper design's 130px side margins on desktop. */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div"
  return (
    <Component
      className={cn("mx-auto w-full max-w-[1440px] px-6 md:px-[80px] lg:px-[130px]", className)}
      {...props}
    />
  )
}
