import Link from "next/link"
import Typewriter from "@/components/typewriter"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import ProcessSection from "@/components/process-section"
import SelectedWorkSection from "@/components/selected-work-section"
import BlogsSection from "@/components/blogs-section"
import ContactSection from "@/components/contact-section"
import { fetchMediumPosts } from "@/lib/medium"

export default async function Home() {
  const mediumPosts = await fetchMediumPosts()
  const headlines = ["Tech & Innovation Leader.", "Innovation Consultant.", "Venture Builder.", "Product Manager."]
  const calendarLink = "https://calendar.app.google/xTLpKK9TiWRy7ZVY9"

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black flex flex-col">
      <header className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="text-lg font-medium">
          <Link href="/">Paul Mandele</Link>
        </div>

        <nav className="hidden md:flex space-x-8">
          <a href="#about" className="text-gray-700 hover:text-black transition-colors">
            About
          </a>
          <a href="#work" className="text-gray-700 hover:text-black transition-colors">
            Work
          </a>
          <a href="#process" className="text-gray-700 hover:text-black transition-colors">
            Process
          </a>
          <Link href="/thoughts" className="text-gray-700 hover:text-black transition-colors">
            Thoughts
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black transition-colors"
          >
            Let's talk
          </a>
        </div>
      </header>

      <main className="flex flex-col">
        {/* Fixed hero section with proper h-screen and removed duplicate padding classes */}
        <div className="container mx-auto px-6 flex items-end pb-36 h-screen">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
            <div className="md:col-span-8">
              <h1 className="text-4xl md:text-8xl lg:text-9xl font-medium leading-[0.9] tracking-tight">
                <Typewriter headlines={headlines} />
              </h1>
            </div>
            <div className="md:col-span-4 md:self-end">
              <p className="text-gray-700 text-sm md:text-base mt-4 md:mt-0 md:mb-4">
                Specialized in Product Management, Venture Building, Innovation Planning & Management, digital transformation, Big Data &
                Analytics.
              </p>
            </div>
          </div>
        </div>

        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <SelectedWorkSection />
        <BlogsSection posts={mediumPosts.slice(0, 3)} />
        <ContactSection />
      </main>
    </div>
  )
}
