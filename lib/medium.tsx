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
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error(`Medium API Error (${response.status}):`, errorBody)
      console.log("[v0] Falling back to mock data due to API error")
      return getMockPosts()
    }

    const data = await response.json()

    if (data.status === "error") {
      console.error("Medium RSS2JSON Error:", data.message)
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

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear().toString().slice(-2)
  return year
}
