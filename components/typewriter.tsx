"use client"

import { useState, useEffect, useRef } from "react"

interface TypewriterProps {
  headlines: string[]
  className?: string
}

export default function Typewriter({ headlines, className }: TypewriterProps) {
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(100)

  const typingDelayRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const currentHeadline = headlines[currentHeadlineIndex]

    const handleTyping = () => {
      // If deleting
      if (isDeleting) {
        setDisplayText((prev) => prev.substring(0, prev.length - 1))
        setTypingSpeed(50) // Faster when deleting

        // When fully deleted, start typing the next headline
        if (displayText === "") {
          setIsDeleting(false)
          setCurrentHeadlineIndex((prev) => (prev + 1) % headlines.length)
          setTypingSpeed(100)
        }
      }
      // If typing
      else {
        setDisplayText(currentHeadline.substring(0, displayText.length + 1))

        // When fully typed, pause before deleting
        if (displayText === currentHeadline) {
          // Pause at the end of typing before deleting
          setTypingSpeed(2000) // Longer pause at the end
          setIsDeleting(true)
        }
      }
    }

    typingDelayRef.current = setTimeout(handleTyping, typingSpeed)

    // Cleanup timeout on unmount or when dependencies change
    return () => {
      if (typingDelayRef.current) {
        clearTimeout(typingDelayRef.current)
      }
    }
  }, [displayText, isDeleting, currentHeadlineIndex, headlines, typingSpeed])

  return <span className={className}>{displayText}</span>
}
