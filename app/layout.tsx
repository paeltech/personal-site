import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Sora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const SITE_URL = "https://paulmandele.co"
const DESCRIPTION =
  "Venture-building strategist and innovation advisor helping corporates, investors, and development institutions build ventures that survive Africa's toughest market conditions. Author of Build for the Margins."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Paul Mandele | Venture-Building Strategist & Innovation Advisor",
    template: "%s | Paul Mandele",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Paul Mandele",
    title: "Paul Mandele | Venture-Building Strategist & Innovation Advisor",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Mandele | Venture-Building Strategist & Innovation Advisor",
    description: DESCRIPTION,
  },
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
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
