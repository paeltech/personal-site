"use client"

import { useMemo, useState, type ReactNode } from "react"
import Link from "next/link"
import { Container } from "@/components/primitives/container"
import { Eyebrow } from "@/components/primitives/eyebrow"
import { ArrowLink } from "@/components/primitives/arrow-link"
import { useReveal } from "@/hooks/use-reveal"
import { cn } from "@/lib/utils"
import {
  PILLARS,
  estimateReadTime,
  formatDate,
  pillarForPost,
  pillarLabel,
  type MediumPost,
  type Pillar,
} from "@/lib/medium"

type TaggedPost = MediumPost & { pillar: Pillar }

export function ThoughtsIndex({ posts }: { posts: MediumPost[] }) {
  const tagged: TaggedPost[] = useMemo(
    () => posts.map((post) => ({ ...post, pillar: pillarForPost(post) })),
    [posts],
  )

  const [filter, setFilter] = useState<Pillar | "all">("all")

  const counts = useMemo(() => {
    const c: Record<Pillar, number> = { constraint: 0, trust: 0, operator: 0 }
    for (const post of tagged) c[post.pillar]++
    return c
  }, [tagged])

  const filtered = filter === "all" ? tagged : tagged.filter((p) => p.pillar === filter)
  const [featured, ...rest] = filtered

  const headRef = useReveal<HTMLDivElement>()
  const featuredRef = useReveal<HTMLDivElement>()
  const listRef = useReveal<HTMLDivElement>()

  return (
    <>
      <Container as="header" className="flex flex-col gap-8 pt-24 pb-0 md:pt-28">
        <Eyebrow>Thoughts</Eyebrow>
        <h1 className="max-w-[1000px] text-[84px] leading-[82px] font-semibold tracking-[-0.03em] text-ink text-balance">
          Field notes from where the playbook doesn&rsquo;t apply.
        </h1>
        <p className="max-w-[640px] text-body-lg text-muted-foreground">
          Constraint-driven product design, trust-first go-to-market, and what a decade in Africa&rsquo;s
          hardest markets teaches organisations trying to do the same.
        </p>
      </Container>

      <Container className="mt-14 flex items-center gap-9 overflow-x-auto border-b border-hairline">
        <FilterTab active={filter === "all"} onClick={() => setFilter("all")}>
          All <span className="text-faint">{tagged.length}</span>
        </FilterTab>
        {PILLARS.map((p) => (
          <FilterTab key={p.slug} active={filter === p.slug} onClick={() => setFilter(p.slug)}>
            {p.label} <span className="text-faint">{counts[p.slug]}</span>
          </FilterTab>
        ))}
      </Container>

      {featured && (
        <div ref={featuredRef} className="reveal">
          <Container className="mt-14 flex flex-wrap items-center gap-16">
            <Link
              href={`/blog/${featured.slug}`}
              className="aspect-[560/380] w-full max-w-[560px] flex-shrink-0 rounded-[10px] bg-linear-to-br from-ink-800 to-ink"
            />
            <div className="flex min-w-[320px] flex-1 flex-col gap-5">
              <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {pillarLabel(featured.pillar)}
              </span>
              <Link href={`/blog/${featured.slug}`}>
                <h2 className="text-[40px] leading-[46px] font-semibold tracking-[-0.025em] text-ink">
                  {featured.title}
                </h2>
              </Link>
              <p className="max-w-[520px] text-[19px] leading-[29px] text-muted-foreground">
                {featured.description}
              </p>
              <div className="flex items-center gap-3 text-small font-medium text-muted-foreground">
                <span>{formatDate(featured.pubDate)}</span>
                <span className="text-hairline">&middot;</span>
                <span>{estimateReadTime(featured)} min read</span>
              </div>
              <ArrowLink href={`/blog/${featured.slug}`} className="mt-1.5">
                Read the essay
              </ArrowLink>
            </div>
          </Container>
        </div>
      )}

      {rest.length > 0 && (
        <Container ref={listRef} as="div" className="reveal mt-20 flex flex-col">
          {rest.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-wrap items-start gap-8 border-t border-hairline py-8 last:border-b md:gap-12"
            >
              <span className="w-full flex-shrink-0 pt-1.5 text-small font-medium text-muted-foreground md:w-[150px]">
                {formatDate(post.pubDate)}
              </span>
              <div className="flex max-w-[760px] flex-1 flex-col gap-2">
                <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {pillarLabel(post.pillar)}
                </span>
                <h3 className="text-[26px] leading-[32px] font-semibold tracking-[-0.02em] text-ink group-hover:text-ink-800">
                  {post.title}
                </h3>
                <p className="max-w-[600px] text-small leading-6 text-muted-foreground">{post.description}</p>
              </div>
              <span className="w-full flex-shrink-0 text-right text-small font-medium text-muted-foreground md:w-[110px]">
                {estimateReadTime(post)} min read
              </span>
            </Link>
          ))}
        </Container>
      )}

      {filtered.length === 0 && (
        <Container className="mt-20 text-body text-muted-foreground">
          No posts in this pillar yet.
        </Container>
      )}
    </>
  )
}

function FilterTab({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "-mb-px flex-shrink-0 whitespace-nowrap border-b-2 py-4 text-[15px] font-semibold transition-colors",
        active ? "border-ink text-ink" : "border-transparent text-muted-foreground hover:text-ink",
      )}
    >
      {children}
    </button>
  )
}
