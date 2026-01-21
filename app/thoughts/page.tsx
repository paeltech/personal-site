import Link from "next/link"
import BlogsSection from "@/components/blogs-section"
import { fetchMediumPosts } from "@/lib/medium"
import BackToTop from "@/components/back-to-top"

export default async function ThoughtsPage() {
  const mediumPosts = await fetchMediumPosts()

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      <header className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="text-lg font-medium">
          <Link href="/">Paul Mandele</Link>
        </div>

        <nav className="hidden md:flex space-x-8">
          <Link href="/#about" className="text-gray-700 hover:text-black transition-colors">
            About
          </Link>
          <Link href="/#work" className="text-gray-700 hover:text-black transition-colors">
            Work
          </Link>
          <Link href="/#process" className="text-gray-700 hover:text-black transition-colors">
            Process
          </Link>
          <Link href="/thoughts" className="text-black font-medium transition-colors">
            Thoughts
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://calendar.app.google/xTLpKK9TiWRy7ZVY9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black transition-colors"
          >
            Let's talk
          </a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-16 md:py-24">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-medium leading-tight mb-6">Latest Thoughts</h1>
            <p className="text-xl text-gray-700">
              Insights on innovation, venture building, product management, and digital transformation from my journey
              in the tech ecosystem.
            </p>
          </div>
        </section>

        <BlogsSection posts={mediumPosts} />
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">© 2025 Paul Mandele. All Rights Reserved.</p>

          <div className="flex gap-6">
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

        </div>
      </footer>

      <BackToTop />
    </div>
  )
}
