"use client"

import { ArrowUp } from "lucide-react"
import Image from "next/image"

export default function ContactSection() {
  const calendarLink = "https://calendar.app.google/xTLpKK9TiWRy7ZVY9"

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <section className="py-20 bg-[#f5f5f5]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-16 relative">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 relative">
              <Image
                src="/placeholder.svg?height=96&width=96"
                alt="Profile"
                width={96}
                height={96}
                className="object-cover"
              />
              <div className="absolute top-0 right-0 w-4 h-4 bg-lime-400 rounded-full border-2 border-white"></div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight max-w-4xl">
            Let's talk about a project, collaboration or an idea you may have
          </h2>

          <div className="md:absolute right-0 top-1/2 md:-translate-y-1/2">
            <a
              href={calendarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              Drop me a line
            </a>
          </div>
        </div>

        <footer className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-8">
          <div className="text-sm text-gray-600 mb-4 md:mb-0">© 2022 All Rights Reserved. Design & Coded with ❤️</div>

          <div className="flex space-x-6 mb-4 md:mb-0">
            <a
              href="https://www.linkedin.com/in/paul-mandele/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/paul.mandele/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://x.com/Mandl_P"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
            >
              X
            </a>
            <a href="mailto:business@paulmandele.co" className="text-gray-600 hover:text-black transition-colors">
              Email
            </a>
          </div>

          <button onClick={scrollToTop} className="flex items-center text-gray-600 hover:text-black transition-colors">
            Back to top <ArrowUp className="ml-1 w-4 h-4" />
          </button>
        </footer>
      </div>
    </section>
  )
}
