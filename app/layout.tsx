import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Sora } from "next/font/google"

const sora = Sora({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Paul Mandele | Tech & Innovation Leader",
  description:
    "Tech & Innovation Leader specialized in Product Management, Venture Building, innovation, digital transformation, Big Data & Analytics",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={sora.className}>{children}</body>
    </html>
  )
}
