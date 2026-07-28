import type { Metadata } from "next"
import { ThoughtsIndex } from "@/components/thoughts/thoughts-index"
import { fetchMediumPosts } from "@/lib/medium"

export const metadata: Metadata = {
  title: "Thoughts",
  description:
    "Field notes on constraint-driven product design, trust-first go-to-market, and a decade of building in Africa's hardest markets.",
}

export default async function ThoughtsPage() {
  const posts = await fetchMediumPosts()

  return (
    <main className="pb-8">
      <ThoughtsIndex posts={posts} />
    </main>
  )
}
