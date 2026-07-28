import type { Metadata } from "next"
import { Container } from "@/components/primitives/container"
import { ContactContext } from "@/components/contact/contact-context"
import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send a short brief before booking an advisory call. Filters for fit on both sides, so the call is useful from the first minute.",
}

export default function ContactPage() {
  return (
    <main className="pb-4">
      <Container className="flex flex-wrap items-start gap-16 py-24 md:gap-24 md:py-28">
        <ContactContext />
        <div className="min-w-[320px] flex-1">
          <ContactForm />
        </div>
      </Container>
    </main>
  )
}
