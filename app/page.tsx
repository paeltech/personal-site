import { Hero } from "@/components/home/hero"
import { ProofStrip } from "@/components/home/proof-strip"
import { About } from "@/components/home/about"
import { Stats } from "@/components/home/stats"
import { HowIWork } from "@/components/home/how-i-work"
import { PullQuote } from "@/components/home/pull-quote"
import { TrackRecord } from "@/components/home/track-record"
import { BookTeaser } from "@/components/home/book-teaser"
import { LatestThoughts } from "@/components/home/latest-thoughts"
import { fetchMediumPosts } from "@/lib/medium"

export default async function Home() {
  const posts = await fetchMediumPosts()

  return (
    <main>
      <Hero />
      <ProofStrip />
      <About />
      <Stats />
      <HowIWork />
      <PullQuote />
      <TrackRecord />
      <BookTeaser />
      <LatestThoughts posts={posts} />
    </main>
  )
}
