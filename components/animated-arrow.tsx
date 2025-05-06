"use client"

import { ArrowDownRight } from "lucide-react"
import { useState, useEffect } from "react"

interface AnimatedArrowProps {
  targetId: string
  className?: string
}

export default function AnimatedArrow({ targetId, className = "" }: AnimatedArrowProps) {
  const [isVisible, setIsVisible] = useState(true)

  // Handle scroll to target section
  const scrollToTarget = () => {
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Hide arrow when scrolled past a certain point
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      // Hide arrow when scrolled down more than 200px
      setIsVisible(scrollPosition < 200)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTarget}
      className={`inline-flex items-center justify-center animate-bounce ${className}`}
      aria-label="Scroll down"
    >
      <ArrowDownRight className="w-8 h-8" />
    </button>
  )
}
