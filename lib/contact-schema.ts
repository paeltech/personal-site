import { z } from "zod"

export const TIMELINE_OPTIONS = [
  { value: "this-quarter", label: "This quarter" },
  { value: "next-quarter", label: "Next quarter" },
  { value: "later-this-year", label: "Later this year" },
  { value: "just-exploring", label: "Just exploring" },
] as const

export const BUDGET_OPTIONS = [
  { value: "under-10k", label: "Under $10k / mo" },
  { value: "10k-30k", label: "$10k–$30k / mo" },
  { value: "30k-60k", label: "$30k–$60k / mo" },
  { value: "60k-plus", label: "$60k+ / mo" },
  { value: "not-sure", label: "Not sure yet" },
] as const

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid work email."),
  company: z.string().trim().min(1, "Enter your company name."),
  role: z.string().trim().min(1, "Enter your role."),
  brief: z.string().trim().min(20, "A sentence or two is enough, just tell me what you're building."),
  timeline: z.enum(TIMELINE_OPTIONS.map((o) => o.value) as [string, ...string[]], {
    message: "Choose a timeline.",
  }),
  budget: z.enum(BUDGET_OPTIONS.map((o) => o.value) as [string, ...string[]], {
    message: "Choose a budget range.",
  }),
  // Honeypot: real visitors never see or fill this field (see ContactForm).
  // Any non-empty value here is treated as a bot submission.
  company_website: z.string().max(0).optional().or(z.literal("")),
})

export type ContactFormValues = z.infer<typeof contactSchema>
