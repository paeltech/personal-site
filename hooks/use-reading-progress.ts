"use client"

import { useEffect, useState } from "react"

/** Returns 0-100, the reader's scroll progress through `articleRef`'s content. Used by the article top bar. */
export function useReadingProgress(articleRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = articleRef.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const viewport = window.innerHeight
      const total = rect.height - viewport
      if (total <= 0) {
        setProgress(100)
        return
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      setProgress(Math.round((scrolled / total) * 100))
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [articleRef])

  return progress
}
