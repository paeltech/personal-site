import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArticleView } from "@/components/thoughts/article-view"
import { fetchMediumPosts, pillarForPost } from "@/lib/medium"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const posts = await fetchMediumPosts()
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} | Paul Mandele`,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const posts = await fetchMediumPosts()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const tagged = posts.map((p) => ({ ...p, pillar: pillarForPost(p) }))
  const current = tagged.find((p) => p.slug === slug)!

  // Same pillar first (still a decent read for this reader), then whatever's left.
  const others = tagged.filter((p) => p.slug !== slug)
  const related = [...others.filter((p) => p.pillar === current.pillar), ...others.filter((p) => p.pillar !== current.pillar)].slice(0, 2)

  return (
    <main className="pb-8">
      <ArticleView post={current} related={related} />
    </main>
  )
}
