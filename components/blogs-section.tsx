"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { MediumPost } from "@/lib/medium"

interface BlogsSectionProps {
  posts: MediumPost[]
}

export default function BlogsSection({ posts }: BlogsSectionProps) {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null)

  return (
    <section className="py-20 bg-[#f5f5f5]">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-4xl font-medium">
            Latest Thoughts<sup className="text-lg ml-1">({posts.length})</sup>
          </h2>
          <p className="text-gray-700">Insights and ideas from my blog</p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block border-b border-gray-200 pb-8 group"
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <div className="flex justify-between items-start relative">
                <div className="flex-1 pr-8">
                  <h3 className="text-4xl md:text-5xl font-medium mb-2 group-hover:text-gray-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 line-clamp-2">{post.description}</p>
                  {post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.categories.slice(0, 3).map((category, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-gray-200 rounded text-gray-600">
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-3xl font-light">/{new Date(post.pubDate).getFullYear().toString().slice(-2)}</div>

                {/* Hover Image */}
                {hoveredPost === post.id && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <div className="w-64 h-40 md:w-80 md:h-48 rounded-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                      <Image
                        src={post.thumbnail || "/placeholder.svg"}
                        alt={post.title}
                        width={320}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12 text-gray-600">
            <p>No blog posts found. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  )
}
