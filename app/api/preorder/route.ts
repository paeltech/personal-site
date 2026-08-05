import { NextResponse } from "next/server"
import { Resend } from "resend"
import { preorderSchema, FORMAT_OPTIONS } from "@/lib/preorder-schema"
import { CONTACT_EMAIL } from "@/lib/constants"

function labelFor(value: string) {
  return FORMAT_OPTIONS.find((o) => o.value === value)?.label ?? value
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const parsed = preorderSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 })
  }

  const { name, email, format, note, company_website } = parsed.data

  // Honeypot tripped — pretend success so the bot moves on, but never send.
  if (company_website) {
    return NextResponse.json({ ok: true })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — pre-order form cannot send email.")
    return NextResponse.json(
      { error: "The pre-order form isn't configured yet. Email us directly in the meantime." },
      { status: 500 },
    )
  }

  const resend = new Resend(apiKey)

  // Same sender/recipient convention as app/api/contact/route.ts — see that
  // file's comment for the domain-verification caveat.
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Paul Mandele Website <onboarding@resend.dev>"
  const toEmail = process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL

  try {
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Pre-order — Build for the Margins (${labelFor(format)})`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Format: ${labelFor(format)}`,
        ...(note ? ["", "Note:", note] : []),
      ].join("\n"),
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Failed to send pre-order email:", error)
    return NextResponse.json({ error: "Something went wrong sending your request." }, { status: 500 })
  }
}
