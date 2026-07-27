"use client"

import { useState } from "react"
import { Container } from "@/components/primitives/container"
import { Eyebrow } from "@/components/primitives/eyebrow"
import { SectionHeading } from "@/components/primitives/section-heading"
import { Button } from "@/components/primitives/button"
import { useReveal } from "@/hooks/use-reveal"
import { BOOK_CHAPTERS, FREE_CHAPTERS } from "@/lib/book-chapters"
import { BOOK_PRICING_HREF } from "@/lib/constants"

const ORDINAL = ["One", "Two", "Three", "Four", "Five"]

export function ChaptersSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const headRef = useReveal<HTMLDivElement>()
  const tocRef = useReveal<HTMLDivElement>()
  const readerRef = useReveal<HTMLDivElement>()

  const openChapter = (freeIndex: number) => {
    setActiveIndex(freeIndex)
    document.getElementById("read")?.scrollIntoView({ block: "start" })
  }

  const early = BOOK_CHAPTERS.filter((c) => c.number <= 5)
  const rest = BOOK_CHAPTERS.filter((c) => c.number > 5)
  const chapter = FREE_CHAPTERS[activeIndex]
  const isLast = activeIndex === FREE_CHAPTERS.length - 1

  return (
    <>
      <Container className="mt-24 flex flex-col gap-12 md:mt-28">
        <div ref={headRef} className="reveal flex flex-wrap items-end justify-between gap-10">
          <div className="flex max-w-[620px] flex-col gap-6">
            <Eyebrow>Contents</Eyebrow>
            <SectionHeading>Twelve chapters. Three are free.</SectionHeading>
          </div>
          <p className="max-w-[280px] text-small font-medium text-muted-foreground">
            Read the first two and the pivotal chapter on trust, in your browser, no email required.
          </p>
        </div>

        <div ref={tocRef} className="reveal flex flex-col">
          {early.map((ch) => {
            const number = <span className="w-8.5 flex-shrink-0 text-[16px] font-semibold text-faint">{String(ch.number).padStart(2, "0")}</span>

            if (ch.free) {
              const freeIndex = FREE_CHAPTERS.findIndex((f) => f.number === ch.number)
              return (
                <button
                  key={ch.number}
                  onClick={() => openChapter(freeIndex)}
                  className="group flex w-full items-center gap-7 border-t border-hairline py-5.5 text-left"
                >
                  {number}
                  <span className="flex-1 text-[20px] font-semibold text-ink group-hover:text-ink-800">
                    {ch.title}
                  </span>
                  <span className="flex flex-shrink-0 items-center gap-2.5">
                    <span className="rounded-pill border border-ink px-3 py-[5px] text-[11px] font-semibold uppercase tracking-[0.1em] text-ink">
                      Free
                    </span>
                    <span className="text-small text-ink-800">&rarr;</span>
                  </span>
                </button>
              )
            }

            return (
              <div key={ch.number} className="flex items-center gap-7 border-t border-hairline py-5.5">
                {number}
                <span className="flex-1 text-[20px] font-semibold text-ink">{ch.title}</span>
                <span className="flex-shrink-0 text-small text-muted-foreground">Locked</span>
              </div>
            )
          })}
          <div className="flex items-center gap-7 border-t border-b border-hairline py-5.5">
            <span className="w-8.5 flex-shrink-0 text-[16px] font-semibold text-faint">06&ndash;12</span>
            <span className="flex-1 text-[16px] text-muted-foreground">
              {rest.map((c) => c.title).join(" · ")}
            </span>
            <span className="flex-shrink-0 text-small text-muted-foreground">In the book</span>
          </div>
        </div>
      </Container>

      <section id="read" className="mt-24 border-y border-hairline bg-panel md:mt-28">
        <Container className="flex justify-center py-24 md:py-28">
          <div
            ref={readerRef}
            className="reveal w-full max-w-[860px] overflow-hidden rounded-[14px] border border-hairline bg-paper shadow-[0_30px_70px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-center justify-between border-b border-hairline px-[30px] py-5">
              <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Reading &mdash; Free Preview
              </span>
              <span className="text-[13px] text-muted-foreground">
                Chapter {activeIndex + 1} of {FREE_CHAPTERS.length} free
              </span>
            </div>

            <div className="flex flex-col gap-6 px-[70px] pt-13 pb-10">
              <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-800">
                Chapter {ORDINAL[activeIndex] ?? activeIndex + 1}
              </span>
              <h3 className="text-[36px] leading-[42px] font-semibold tracking-[-0.025em] text-ink">
                {chapter.title}
              </h3>
              {chapter.paragraphs?.map((p, i) => (
                <p key={i} className="text-[19px] leading-[33px] text-prose">
                  {p}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline bg-panel px-[30px] py-6">
              {isLast ? (
                <>
                  <span className="text-small font-medium text-muted-foreground">
                    That&rsquo;s all three free chapters.
                  </span>
                  <Button href={BOOK_PRICING_HREF} size="sm">
                    Get the book
                  </Button>
                </>
              ) : (
                <>
                  <span className="text-small font-medium text-muted-foreground">
                    Keep reading, free, no email required.
                  </span>
                  <button
                    onClick={() => setActiveIndex((i) => i + 1)}
                    className="flex items-center gap-2.5 text-[15px] font-semibold text-ink hover:text-ink-800"
                  >
                    Continue to Chapter {ORDINAL[activeIndex + 1] ?? activeIndex + 2}
                    <span aria-hidden>&rarr;</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
