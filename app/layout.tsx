import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Sora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

// TODO(PR7): title/description are the old keyword-list copy the
// redesign brief flags for removal. Rewritten with the new positioning
// and OG images in PR7 — left untouched here to keep PR1 to foundation.
export const metadata: Metadata = {
  title: "Paul Mandele | Tech & Innovation Leader",
  description:
    "Tech & Innovation Leader specialized in Product Management, Venture Building, innovation, digital transformation, Big Data & Analytics",
  generator: "v0.app",
}

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={sora.variable}>
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
