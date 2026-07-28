import { NextResponse } from "next/server"
import { Resend } from "resend"
import { contactSchema, TIMELINE_OPTIONS, BUDGET_OPTIONS } from "@/lib/contact-schema"
import { CONTACT_EMAIL } from "@/lib/constants"

function labelFor(options: readonly { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 })
  }

  const { name, email, company, role, brief, timeline, budget, company_website } = parsed.data

  // Honeypot tripped — pretend success so the bot moves on, but never send.
  if (company_website) {
    return NextResponse.json({ ok: true })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form cannot send email.")
    return NextResponse.json(
      { error: "The contact form isn't configured yet. Email us directly in the meantime." },
      { status: 500 },
    )
  }

  const resend = new Resend(apiKey)

  // Sends FROM this address, TO the inbox below. onboarding@resend.dev works
  // without a verified domain but only delivers to the Resend account's own
  // email — swap CONTACT_FROM_EMAIL for a verified paulmandele.co address
  // once the domain is added in Resend (see plan.md §10).
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Paul Mandele Website <onboarding@resend.dev>"
  const toEmail = process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL

  try {
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Advisory enquiry — ${company}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company}`,
        `Role: ${role}`,
        `Timeline: ${labelFor(TIMELINE_OPTIONS, timeline)}`,
        `Budget: ${labelFor(BUDGET_OPTIONS, budget)}`,
        "",
        "What they're building:",
        brief,
      ].join("\n"),
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Failed to send contact email:", error)
    return NextResponse.json({ error: "Something went wrong sending your message." }, { status: 500 })
  }
}
