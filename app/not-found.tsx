import type { Metadata } from "next"
import { Container } from "@/components/primitives/container"
import { Eyebrow } from "@/components/primitives/eyebrow"
import { Button } from "@/components/primitives/button"
import { ArrowLink } from "@/components/primitives/arrow-link"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main>
      <Container className="flex flex-col gap-8 py-32">
        <Eyebrow>404</Eyebrow>
        <h1 className="max-w-[700px] text-h1 font-semibold text-ink text-balance">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="max-w-[500px] text-body text-muted-foreground">
          The link might be old, or the page might have moved. Here are two places that definitely
          still exist.
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-6">
          <Button href="/">Back to home</Button>
          <ArrowLink href="/thoughts">Read the thoughts</ArrowLink>
        </div>
      </Container>
    </main>
  )
}
