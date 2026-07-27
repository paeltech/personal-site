import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// tailwind-merge doesn't know our custom @theme tokens by default, so
// `text-paper` (a color) and `text-small` (a font size) both get bucketed
// into its generic "text" heuristic and silently conflict-resolve against
// each other. Registering our token names against the right theme scale
// fixes that: color tokens feed every color-based group (bg-*, text-*,
// border-*, ring-*, ...), font-size tokens feed only the text-size group.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: ["paper", "panel", "ink", "ink-800", "ink-700", "faint", "hairline", "prose"],
      text: ["display", "h1", "h2", "h3", "stat", "body-lg", "body", "small", "eyebrow"],
      radius: ["pill"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
