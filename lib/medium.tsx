export const MEDIUM_USERNAME = "paulalan"

export interface MediumPost {
  id: string
  title: string
  slug: string
  description: string
  content: string
  link: string
  pubDate: string
  thumbnail: string
  categories: string[]
}

export async function fetchMediumPosts(username: string = MEDIUM_USERNAME): Promise<MediumPost[]> {
  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`, {
      next: { revalidate: 3600 }
    })

    const data = await response.json()

    if (!response.ok || data.status === "error") {
      return getMockPosts()
    }

    if (!data.items || data.items.length === 0) {
      return getMockPosts()
    }

    return data.items.map((item: any, index: number) => ({
      id: item.guid || `post-${index}`,
      title: item.title,
      slug:
        item.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "") || `post-${index}`,
      description: item.description?.replace(/<[^>]*>/g, "").substring(0, 150) + "..." || "",
      content: item.content || item.description || "",
      link: item.link,
      pubDate: item.pubDate,
      thumbnail: item.thumbnail || extractImageFromContent(item.content),
      categories: item.categories || [],
    }))
  } catch (error) {
    console.error("Error fetching Medium posts:", error)
    return getMockPosts()
  }
}

function getMockPosts(): MediumPost[] {
  return [
    {
      id: "mock-1",
      title: "The Future of Web Design: Trends to Watch",
      slug: "future-of-web-design",
      description:
        "Exploring the upcoming trends in web design, from brutalism to glassmorphism, and how they impact user experience.",
      content: "<p>Full content would go here...</p>",
      link: "#",
      pubDate: new Date().toISOString(),
      thumbnail: "/placeholder.svg?height=400&width=600",
      categories: ["Design", "UX"],
    },
    {
      id: "mock-2",
      title: "Building Scalable Applications with Next.js",
      slug: "building-scalable-apps-nextjs",
      description:
        "A comprehensive guide to structuring your Next.js applications for performance, maintainability, and scale.",
      content: "<p>Full content would go here...</p>",
      link: "#",
      pubDate: new Date(Date.now() - 86400000 * 5).toISOString(),
      thumbnail: "/placeholder.svg?height=400&width=600",
      categories: ["Development", "React"],
    },
    {
      id: "mock-3",
      title: "Mastering Tailwind CSS for Rapid UI Development",
      slug: "mastering-tailwind-css",
      description:
        "How to leverage utility-first CSS to build custom designs faster than ever before without leaving your HTML.",
      content: "<p>Full content would go here...</p>",
      link: "#",
      pubDate: new Date(Date.now() - 86400000 * 10).toISOString(),
      thumbnail: "/placeholder.svg?height=400&width=600",
      categories: ["CSS", "Frontend"],
    },
  ]
}

function extractImageFromContent(content: string): string {
  const imgMatch = content?.match(/<img[^>]+src="([^">]+)"/)
  return imgMatch ? imgMatch[1] : "/blog-post-concept.png"
}

/**
 * Short ("Jun 2026") for index/teaser cards, long ("June 12, 2026") for the
 * article header. Replaces the previous `formatDate`, which only ever
 * returned a two-digit year and had no callers left in the app.
 */
export function formatDate(dateString: string, style: "short" | "long" = "short"): string {
  const date = new Date(dateString)
  return date.toLocaleDateString(
    "en-US",
    style === "long" ? { month: "long", day: "numeric", year: "numeric" } : { month: "short", year: "numeric" },
  )
}

/** ~200wpm estimate — Medium's RSS feed doesn't provide a read time. */
export function estimateReadTime(post: Pick<MediumPost, "content" | "description">): number {
  const words = (post.content || post.description || "")
    .replace(/<[^>]*>/g, "")
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

// --- Content pillars ---------------------------------------------------
//
// The three pillars are the forward-looking content strategy from the
// positioning brief, not a taxonomy Medium knows about. Real posts get
// bucketed by a best-effort keyword match against their existing Medium
// categories; anything that doesn't match falls back to "operator", the
// most general of the three (field experience, written up after the
// fact). This is a heuristic, not a guarantee — expect some legacy posts
// to sit in the "wrong" pillar until they're manually retagged.

export type Pillar = "constraint" | "trust" | "operator"

export const PILLARS: { slug: Pillar; label: string }[] = [
  { slug: "constraint", label: "Constraint as Design Input" },
  { slug: "trust", label: "Trust as Infrastructure" },
  { slug: "operator", label: "Operator-to-Advisor Proof" },
]

const PILLAR_KEYWORDS: Record<Pillar, string[]> = {
  constraint: [
    "design",
    "product",
    "ux",
    "ui",
    "ai",
    "technology",
    "tech",
    "data",
    "infrastructure",
    "connectivity",
    "battery",
    "offline",
    "mobile",
  ],
  trust: [
    "trust",
    "payment",
    "finance",
    "fintech",
    "governance",
    "policy",
    "economy",
    "economic",
    "regulation",
    "transformation",
  ],
  operator: [
    "startup",
    "startups",
    "accelerator",
    "venture",
    "founder",
    "corporate",
    "innovation",
    "hub",
    "ecosystem",
    "field notes",
    "field-notes",
    "african-startup",
  ],
}

export function pillarForPost(post: Pick<MediumPost, "categories">): Pillar {
  const cats = post.categories.map((c) => c.toLowerCase())
  for (const pillar of Object.keys(PILLAR_KEYWORDS) as Pillar[]) {
    if (cats.some((c) => PILLAR_KEYWORDS[pillar].some((kw) => c.includes(kw)))) {
      return pillar
    }
  }
  return "operator"
}

export function pillarLabel(slug: Pillar): string {
  return PILLARS.find((p) => p.slug === slug)?.label ?? slug
}
