import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchMediumPosts, formatDate } from "@/lib/medium"
import { ArrowLeft } from "lucide-react"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // In a real app with a database, we would fetch just the single post.
  // With RSS, we fetch all and filter.
  const posts = await fetchMediumPosts()
  const post = posts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      <header className="container mx-auto px-6 py-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>
      </header>

      <article className="container mx-auto px-6 max-w-4xl py-12">
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.categories.map((category, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-gray-200 rounded text-gray-600 uppercase tracking-wide">
                {category}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-medium mb-6 leading-tight">{post.title}</h1>

          <div className="flex items-center text-gray-500 text-sm border-b border-gray-200 pb-8">
            <span>Published on {new Date(post.pubDate).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>/{formatDate(post.pubDate)}</span>
          </div>
        </div>

        {post.thumbnail && (
          <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={post.thumbnail || "/placeholder.svg"}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        <div
          className="prose prose-lg prose-gray max-w-none
            prose-headings:font-medium prose-headings:text-black
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-black prose-a:underline prose-a:decoration-gray-400 hover:prose-a:decoration-black
            prose-img:rounded-lg prose-img:shadow-md
            prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-20 pt-10 border-t border-gray-200">
          <Link
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            Read original on Medium
          </Link>
        </div>
      </article>
    </div>
  )
}
