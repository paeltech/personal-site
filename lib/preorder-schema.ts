import { z } from "zod"

export const FORMAT_OPTIONS = [
  { value: "ebook", label: "Ebook — $24" },
  { value: "paperback", label: "Paperback — $32" },
  { value: "audiobook", label: "Audiobook — $28" },
] as const

export type BookFormat = (typeof FORMAT_OPTIONS)[number]["value"]

export const preorderSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email."),
  format: z.enum(FORMAT_OPTIONS.map((o) => o.value) as [string, ...string[]], {
    message: "Choose a format.",
  }),
  note: z.string().trim().max(500, "Keep it under 500 characters.").optional().or(z.literal("")),
  // Honeypot: real visitors never see or fill this field (see PreorderDialog).
  // Any non-empty value here is treated as a bot submission.
  company_website: z.string().max(0).optional().or(z.literal("")),
})

export type PreorderFormValues = z.infer<typeof preorderSchema>
