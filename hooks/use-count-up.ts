"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Counts a number up from 0 to `target` once its element scrolls into view —
 * used for the homepage stat strip ($100K+, $80K, 57%, 40+). Renders the
 * final value immediately when the browser prefers reduced motion.
 */
export function useCountUp(target: number, { duration = 1100 }: { duration?: number } = {}) {
  const ref = useRef<HTMLElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const animate = () => {
      if (reduceMotion) {
        setValue(target)
        return
      }
      let start: number | null = null
      const step = (timestamp: number) => {
        if (start === null) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    if (reduceMotion || !("IntersectionObserver" in window)) {
      animate()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animate()
            observer.disconnect()
          }
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { ref, value }
}
