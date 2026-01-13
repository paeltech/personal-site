import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchMediumPosts } from "@/lib/medium"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const posts = await fetchMediumPosts()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      <header className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="text-lg font-medium">
          <Link href="/">Paul Mandele</Link>
        </div>

        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-black transition-colors">
            Home
          </Link>
          <Link href="/#services" className="text-gray-700 hover:text-black transition-colors">
            Services
          </Link>
          <Link href="/#process" className="text-gray-700 hover:text-black transition-colors">
            Process
          </Link>
          <Link href="/#work" className="text-gray-700 hover:text-black transition-colors">
            Work
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Light
          </button>
        </div>
      </header>

      <div className="relative w-full h-[60vh] md:h-[70vh] mb-16">
        {post.thumbnail && (
          <Image src={post.thumbnail || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-12 md:pb-16">
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((category, index) => (
                <span
                  key={index}
                  className="text-xs px-3 py-1.5 bg-white text-black rounded-full uppercase tracking-wider font-medium"
                >
                  {category}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-white drop-shadow-2xl">
              {post.title}
            </h1>

            <div className="flex items-center text-white/90 text-sm md:text-base drop-shadow-lg">
              <span>
                {new Date(post.pubDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-6 max-w-4xl pb-24">
        <div
          className="prose prose-lg md:prose-xl max-w-none
            prose-headings:font-bold prose-headings:text-black prose-headings:tracking-tight
            prose-h1:text-5xl prose-h1:leading-tight prose-h1:mt-16 prose-h1:mb-8
            prose-h2:text-4xl prose-h2:leading-snug prose-h2:mt-14 prose-h2:mb-6
            prose-h3:text-3xl prose-h3:leading-snug prose-h3:mt-12 prose-h3:mb-5
            prose-h4:text-2xl prose-h4:mt-10 prose-h4:mb-4
            prose-h5:text-xl prose-h5:mt-8 prose-h5:mb-3
            prose-h6:text-lg prose-h6:mt-6 prose-h6:mb-3
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg prose-p:mt-2 prose-p:mb-4
            prose-a:text-black prose-a:font-medium prose-a:underline prose-a:decoration-gray-300 hover:prose-a:decoration-black prose-a:underline-offset-4 prose-a:transition-colors
            prose-img:rounded-xl prose-img:my-8 prose-img:shadow-md prose-img:w-full prose-img:h-auto
            prose-figure:my-8
            prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-gray-500 prose-figcaption:mt-3 prose-figcaption:italic
            prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:text-lg prose-blockquote:leading-relaxed prose-blockquote:my-6
            prose-strong:font-semibold prose-strong:text-black
            prose-em:italic prose-em:text-gray-700
            prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-black prose-code:font-mono prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-6 prose-pre:my-8 prose-pre:overflow-x-auto
            prose-ul:my-6 prose-ul:pl-8 prose-ul:list-disc prose-ul:space-y-3
            prose-ol:my-6 prose-ol:pl-8 prose-ol:list-decimal prose-ol:space-y-3
            prose-li:text-gray-700 prose-li:leading-relaxed prose-li:text-lg prose-li:mt-2 prose-li:mb-2
            prose-li:marker:text-black prose-li:marker:font-bold
            prose-hr:border-gray-200 prose-hr:my-12
            [&>figure:first-child]:hidden [&>img:first-child]:hidden
            [&_ul]:my-6 [&_ul]:pl-8 [&_ul]:list-disc [&_ul]:space-y-3
            [&_ol]:my-6 [&_ol]:pl-8 [&_ol]:list-decimal [&_ol]:space-y-3
            [&_li]:mt-2 [&_li]:mb-2 [&_li]:text-gray-700 [&_li]:leading-relaxed
            [&_ul>li]:marker:text-black [&_ul>li]:marker:font-bold
            [&_ol>li]:marker:text-black [&_ol>li]:marker:font-semibold"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-24 pt-12 border-t border-gray-200">
          <Link
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all font-medium text-base"
          >
            Read original on Medium
          </Link>
        </div>
      </article>
    </div>
  )
}
