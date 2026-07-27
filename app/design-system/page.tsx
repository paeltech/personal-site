import type { Metadata } from "next"
import { Container } from "@/components/primitives/container"
import { Eyebrow } from "@/components/primitives/eyebrow"
import { SectionHeading } from "@/components/primitives/section-heading"
import { Rule } from "@/components/primitives/rule"
import { ArrowLink } from "@/components/primitives/arrow-link"
import { Button } from "@/components/primitives/button"

// Internal-only reference page for reviewing PR1's foundation (tokens,
// primitives, header/footer) before the real pages are rebuilt in PR2+.
// Not linked from nav. Remove once every page has shipped.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Design System — internal",
}

const swatches = [
  { name: "paper", className: "bg-paper" },
  { name: "panel", className: "bg-panel" },
  { name: "ink", className: "bg-ink" },
  { name: "ink-800", className: "bg-ink-800" },
  { name: "ink-700", className: "bg-ink-700" },
  { name: "muted-foreground", className: "bg-muted-foreground" },
  { name: "faint", className: "bg-faint" },
  { name: "hairline", className: "bg-hairline" },
] as const

export default function DesignSystemPage() {
  return (
    <main>
      <Container className="flex flex-col gap-16 py-20">
          <div className="flex flex-col gap-4">
            <Eyebrow>Foundation — PR1</Eyebrow>
            <h1 className="text-display font-semibold text-ink">Design system</h1>
            <p className="max-w-[600px] text-body text-muted-foreground">
              Tokens, type scale, and primitives for the rebuild. Internal reference only.
            </p>
          </div>

          <section className="flex flex-col gap-6">
            <SectionHeading>Palette</SectionHeading>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {swatches.map((s) => (
                <div key={s.name} className="flex flex-col gap-2">
                  <div className={`h-20 rounded-lg border border-hairline ${s.className}`} />
                  <span className="text-small text-muted-foreground">{s.name}</span>
                </div>
              ))}
            </div>
          </section>

          <Rule />

          <section className="flex flex-col gap-6">
            <SectionHeading>Type scale</SectionHeading>
            <div className="flex flex-col gap-6">
              <p className="text-display font-semibold text-ink">Display 104</p>
              <p className="text-h1 font-semibold text-ink">Heading 1</p>
              <p className="text-h2 font-semibold text-ink">Heading 2</p>
              <p className="text-h3 font-semibold text-ink">Heading 3</p>
              <p className="text-stat font-bold text-ink">$100K+</p>
              <p className="text-body-lg text-ink">Body large — for hero subheads.</p>
              <p className="text-body text-muted-foreground">Body — the default paragraph size, 34px leading.</p>
              <p className="text-eyebrow font-semibold uppercase text-muted-foreground">Eyebrow label</p>
            </div>
          </section>

          <Rule />

          <section className="flex flex-col gap-6">
            <SectionHeading>Buttons &amp; links</SectionHeading>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="#">Primary</Button>
              <Button href="#" variant="ghost" className="border-hairline text-ink hover:border-ink">
                Ghost (light bg)
              </Button>
              <ArrowLink href="#">Arrow link</ArrowLink>
            </div>
            <div className="flex flex-wrap items-center gap-4 rounded-xl bg-ink p-8">
              <Button href="#" variant="invert">
                Invert
              </Button>
              <Button href="#" variant="ghost">
                Ghost (dark bg)
              </Button>
              <ArrowLink href="#" tone="paper">
                Arrow link
              </ArrowLink>
            </div>
          </section>

          <Rule />

          <section className="flex flex-col gap-6">
            <SectionHeading>Prose</SectionHeading>
            <div className="prose-article max-w-[720px]">
              <p>
                The most important spec in a product I built for rural Tanzania was never written in a
                PRD. It was the battery indicator on a five-year-old Android phone, hovering at 4%.
              </p>
              <h2>A subheading looks like this</h2>
              <p>Body copy continues at the article size, 19px over a 32px line.</p>
              <blockquote>Design for the last 5% of charge, and the other 95% takes care of itself.</blockquote>
            </div>
          </section>
        </Container>
    </main>
  )
}
