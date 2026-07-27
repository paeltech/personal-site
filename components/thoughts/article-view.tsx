"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { Container } from "@/components/primitives/container"
import { ArrowLink } from "@/components/primitives/arrow-link"
import { useReadingProgress } from "@/hooks/use-reading-progress"
import { estimateReadTime, formatDate, pillarLabel, type MediumPost, type Pillar } from "@/lib/medium"
import { BOOK_HREF } from "@/lib/constants"

type TaggedPost = MediumPost & { pillar: Pillar }

export function ArticleView({ post, related }: { post: TaggedPost; related: TaggedPost[] }) {
  const articleRef = useRef<HTMLElement>(null)
  const progress = useReadingProgress(articleRef)

  return (
    <>
      <div className="sticky top-[101px] z-40 h-[3px] w-full bg-hairline">
        <div className="h-[3px] bg-ink transition-[width]" style={{ width: `${progress}%` }} />
      </div>

      <article ref={articleRef} className="flex flex-col items-center">
        <Container className="flex flex-col items-center pt-16">
          <div className="flex w-full max-w-[720px] flex-col gap-6">
            <Link
              href="/thoughts"
              className="flex items-center gap-2 text-small font-semibold text-muted-foreground hover:text-ink"
            >
              <span aria-hidden>&larr;</span> All thoughts
            </Link>
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {pillarLabel(post.pillar)}
            </span>
            <h1 className="text-[52px] leading-[56px] font-semibold tracking-[-0.03em] text-ink text-balance">
              {post.title}
            </h1>
            <p className="text-body-lg text-muted-foreground">{post.description}</p>

            <div className="mt-3 flex items-center gap-3.5 border-y border-hairline py-5">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-linear-to-br from-ink-700 to-ink-800">
                <span className="text-[14px] font-bold text-paper">PM</span>
              </div>
              <span className="text-small font-semibold text-ink">Paul Mandele</span>
              <span className="text-hairline">&middot;</span>
              <span className="text-small text-muted-foreground">{formatDate(post.pubDate, "long")}</span>
              <span className="text-hairline">&middot;</span>
              <span className="text-small text-muted-foreground">{estimateReadTime(post)} min read</span>
            </div>
          </div>
        </Container>

        {post.thumbnail && (
          <Container className="mt-13 flex justify-center">
            <div className="relative aspect-[960/460] w-full max-w-[960px] overflow-hidden rounded-[10px] bg-panel">
              <Image src={post.thumbnail} alt={post.title} fill className="object-cover" priority />
            </div>
          </Container>
        )}

        <Container className="mt-14 flex justify-center">
          <div
            className="prose-article w-full max-w-[720px]"
            // Medium's own RSS content, from the author's own account — same
            // trust boundary the old article page already relied on.
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Container>
      </article>

      <Container className="mt-14 flex justify-center">
        <div className="flex w-full max-w-[720px] items-start gap-5 rounded-xl bg-panel p-9">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-linear-to-br from-ink-700 to-ink-800">
            <span className="text-[18px] font-bold text-paper">PM</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[18px] font-semibold text-ink">Paul Mandele</span>
            <p className="max-w-[520px] text-small leading-6 text-muted-foreground">
              Venture-building strategist and author of <em className="not-italic text-ink">Build for the Margins</em>.
              A decade building products for Africa&rsquo;s hardest markets, now advising the organisations doing
              the same.
            </p>
            <ArrowLink href={BOOK_HREF} className="mt-1.5" size="sm">
              Get the book
            </ArrowLink>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <Container className="mt-18 flex justify-center pb-4">
          <div className="flex w-full max-w-[960px] flex-col gap-8">
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Continue reading
            </span>
            <div className="grid grid-cols-1 gap-11 md:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="flex flex-col gap-4 border-t-2 border-ink pt-6"
                >
                  <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {pillarLabel(r.pillar)}
                  </span>
                  <h3 className="text-h3 font-semibold text-ink">{r.title}</h3>
                  <span className="text-small font-medium text-muted-foreground">
                    {formatDate(r.pubDate)} &middot; {estimateReadTime(r)} min read
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      )}

      {post.link && (
        <Container className="mt-8 flex justify-center pb-4">
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-small font-medium text-muted-foreground underline underline-offset-4 hover:text-ink"
          >
            Read the original on Medium
          </a>
        </Container>
      )}
    </>
  )
}
