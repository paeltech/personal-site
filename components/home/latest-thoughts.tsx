"use client"

import Link from "next/link"
import { Container } from "@/components/primitives/container"
import { Eyebrow } from "@/components/primitives/eyebrow"
import { SectionHeading } from "@/components/primitives/section-heading"
import { ArrowLink } from "@/components/primitives/arrow-link"
import { useReveal } from "@/hooks/use-reveal"
import type { MediumPost } from "@/lib/medium"

// A proper Constraint/Trust/Operator pillar map lands in PR3 alongside the
// rebuilt /thoughts index. For now this teaser just surfaces the post's own
// first Medium category, with a plain fallback label.
function readTimeFor(post: MediumPost) {
  const words = (post.content || post.description || "").replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

function formatDate(pubDate: string) {
  return new Date(pubDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export function LatestThoughts({ posts }: { posts: MediumPost[] }) {
  const headRef = useReveal<HTMLDivElement>()
  const gridRef = useReveal<HTMLDivElement>()

  if (posts.length === 0) return null

  return (
    <section className="pt-28 pb-4 md:pt-32">
      <Container className="flex flex-col gap-14">
        <div ref={headRef} className="reveal flex flex-wrap items-end justify-between gap-10">
          <div className="flex max-w-[760px] flex-col gap-6">
            <Eyebrow>Thoughts</Eyebrow>
            <SectionHeading>Field notes from where the playbook doesn&rsquo;t apply.</SectionHeading>
          </div>
          <ArrowLink href="/thoughts">All thoughts</ArrowLink>
        </div>

        <div ref={gridRef} className="reveal grid grid-cols-1 gap-11 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-5 border-t-2 border-ink pt-6 transition-transform duration-300 ease-out hover:-translate-y-1"
            >
              <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors group-hover:text-ink">
                {post.categories[0] ?? "Field Notes"}
              </span>
              <h3 className="text-h3 font-semibold text-ink">{post.title}</h3>
              <p className="line-clamp-3 text-small leading-[25px] text-muted-foreground">
                {post.description}
              </p>
              <span className="text-[14px] font-medium text-muted-foreground">
                {formatDate(post.pubDate)} &middot; {readTimeFor(post)} min read
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
