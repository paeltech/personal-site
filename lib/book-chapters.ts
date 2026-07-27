export interface BookChapter {
  number: number
  title: string
  /** Only free chapters carry body paragraphs — locked chapters are TOC-only. */
  free: boolean
  paragraphs?: string[]
}

export const FREE_CHAPTER_COUNT = 3

export const BOOK_CHAPTERS: BookChapter[] = [
  {
    number: 1,
    title: "The margin is the market",
    free: true,
    paragraphs: [
      "The first venture I built failed in a way I didn't have language for. The product worked. The demo landed. The pilot funding came through. And then, in the field, nothing moved.",
      "I spent months looking for the bug. There wasn't one. The bug was in my assumptions. I had built for a user who had reliable power, a data plan she didn't have to think about, and a reason to trust a stranger's app with her livelihood. None of those users existed in the market I was actually selling to.",
      "What I learned, slowly and at my own expense, is that the constraints I kept apologising for were not obstacles to the product. They were its real specification. The patchy connection, the shared phone, the fifteen-shilling data top-up, the rational distrust of institutions that had failed before: these were not edge cases to handle later. They were the centre of the brief.",
    ],
  },
  {
    number: 2,
    title: "Constraint as design input",
    free: true,
    paragraphs: [
      "Once you accept the margin as the market, the next question is mechanical, not philosophical: what does a constraint actually do to a product decision? The honest answer is that it makes most of your decisions for you, if you let it.",
      "When we rebuilt the farmer traceability product that became AgriMark, we didn't start with a feature list. We started with a single number: how many seconds of connectivity a user could reliably expect in a single session, in the field, on the worst network day of the month. That number, not a mood board, decided the architecture. Every screen had to earn its place inside it.",
      "The product that came out the other side was smaller than the one we'd originally pitched investors. It was also the one that closed a six-figure government contract, because it was the first version that actually worked where the farmers were standing, not where our engineers were sitting.",
      "Constraint as design input means the limitation is the first thing you design for, not the last thing you patch around. Everything else, the interface, the onboarding, the data model, follows from that one decision.",
    ],
  },
  {
    number: 5,
    title: "Trust is infrastructure",
    free: true,
    paragraphs: [
      "Somewhere around my third venture, I stopped treating distribution as a marketing problem. It isn't one, not in a market where the last three apps that asked for a phone number and a small deposit disappeared with both.",
      "Trust, in a low-institutional-trust market, behaves exactly like infrastructure. It has to be built before anything can be built on top of it, it's expensive to lay down, and nobody notices it's there until it's missing. You cannot buy your way past this with a bigger ad budget. You have to earn it, in public, in a way people can verify.",
      "The channel that actually worked for us wasn't paid acquisition. It was referral, because a referral is a form of collateral: the person vouching for you is putting their own reputation against yours. That is the only kind of trust transfer that scales in a market where trust itself doesn't, by default.",
      "Once we started designing the product to be vouch-for-able, cash-on-delivery options, visible proof the last transaction actually worked, a real human to call, growth stopped being a spend problem and started being a design problem. That's the argument of this chapter: trust isn't a feeling you generate with messaging. It's infrastructure you build with product decisions.",
    ],
  },
  { number: 3, title: "Designing for the dying battery", free: false },
  { number: 4, title: "Offline-first as a default, not a feature", free: false },
  { number: 6, title: "Cash and the trust ladder", free: false },
  { number: 7, title: "Referral at scale", free: false },
  { number: 8, title: "The rolling roadmap", free: false },
  { number: 9, title: "Field research, not focus groups", free: false },
  { number: 10, title: "Putting a team on the ground", free: false },
  { number: 11, title: "From operator to advisor", free: false },
  { number: 12, title: "What compounds", free: false },
]

export const FREE_CHAPTERS = BOOK_CHAPTERS.filter((c) => c.free)
