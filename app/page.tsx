import Link from "next/link"
import { Sun } from "lucide-react"
import Typewriter from "@/components/typewriter"
import ServicesSection from "@/components/services-section"
import ProcessSection from "@/components/process-section"

export default function Home() {
  const headlines = ["Tech & Innovation Leader.", "Innovation Consultant.", "Venture Builder.", "Product Manager."]

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black flex flex-col">
      <header className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="text-lg font-medium">
          <Link href="/">Paul Mandele</Link>
        </div>

        <nav className="hidden md:flex space-x-8">
          <Link href="/about" className="text-gray-700 hover:text-black transition-colors">
            About
          </Link>
          <Link href="/work" className="text-gray-700 hover:text-black transition-colors">
            Work
          </Link>
          <Link href="/process" className="text-gray-700 hover:text-black transition-colors">
            Process
          </Link>
          <Link href="/process" className="text-gray-700 hover:text-black transition-colors">
            Thoughts
          </Link>
        </nav>

        <div className="flex items-center gap-2">
           <Link href="/contact" className="text-gray-700 hover:text-black transition-colors">
            Drop me a line
          </Link>
        </div>
      </header>

      <main className="flex flex-col">
        <div className="container mx-auto px-6 flex-grow flex items-end pb-16 min-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
            <div className="md:col-span-8">
              <h1 className="text-4xl md:text-8xl lg:text-9xl font-medium leading-[0.9] tracking-tight">
                <Typewriter headlines={headlines} />
              </h1>
            </div>
            <div className="md:col-span-4 md:self-end">
              <p className="text-gray-700 text-sm md:text-base mt-4 md:mt-0 md:mb-4">
                Specialized in Product Management, Venture Building, innovation, digital transformation, Big Data &
                Analytics.
              </p>
            </div>
          </div>
        </div>

        <ServicesSection />
        <ProcessSection />
      </main>
    </div>
  )
}
