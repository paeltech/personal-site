import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
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

// TODO(PR3): once /thoughts and /blog/[slug] are rebuilt on SiteHeader/
// SiteFooter too, hoist both into app/layout.tsx and drop this per-page
// render. Kept page-local for now so those two untouched routes don't get
// a duplicate header/footer stacked on their own old inline markup.
export default async function Home() {
  const posts = await fetchMediumPosts()

  return (
    <>
      <SiteHeader />
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
      <SiteFooter />
    </>
  )
}
