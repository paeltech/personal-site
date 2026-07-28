"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, fieldControlClass } from "@/components/primitives/field"
import { SelectField } from "@/components/primitives/select-field"
import { Button } from "@/components/primitives/button"
import { cn } from "@/lib/utils"
import { CONTACT_EMAIL } from "@/lib/constants"
import { contactSchema, TIMELINE_OPTIONS, BUDGET_OPTIONS, type ContactFormValues } from "@/lib/contact-schema"

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      brief: "",
      timeline: undefined,
      budget: undefined,
      company_website: "",
    },
  })

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("submitting")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error("Request failed")
      setStatus("success")
      reset()
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex w-full flex-col gap-3 rounded-2xl border border-hairline bg-paper p-11 text-center shadow-[0_24px_54px_rgba(0,0,0,0.05)]">
        <span className="text-h3 font-semibold text-ink">Got it.</span>
        <p className="text-body text-muted-foreground">
          I&rsquo;ll reply within two business days, personally. If it&rsquo;s a fit, we&rsquo;ll get a call on
          the calendar.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full flex-col gap-5 rounded-2xl border border-hairline bg-paper p-11 shadow-[0_24px_54px_rgba(0,0,0,0.05)]"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" error={errors.name?.message}>
          <input
            id="name"
            type="text"
            placeholder="Jane Doe"
            className={fieldControlClass}
            aria-invalid={!!errors.name || undefined}
            {...register("name")}
          />
        </Field>
        <Field label="Work email" htmlFor="email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            placeholder="jane@company.com"
            className={fieldControlClass}
            aria-invalid={!!errors.email || undefined}
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Company" htmlFor="company" error={errors.company?.message}>
          <input
            id="company"
            type="text"
            placeholder="Company name"
            className={fieldControlClass}
            aria-invalid={!!errors.company || undefined}
            {...register("company")}
          />
        </Field>
        <Field label="Role" htmlFor="role" error={errors.role?.message}>
          <input
            id="role"
            type="text"
            placeholder="Head of Innovation"
            className={fieldControlClass}
            aria-invalid={!!errors.role || undefined}
            {...register("role")}
          />
        </Field>
      </div>

      <Field label="What are you building?" htmlFor="brief" error={errors.brief?.message}>
        <textarea
          id="brief"
          rows={4}
          placeholder="A sentence or two on the venture, market, and where you're stuck."
          className={cn(fieldControlClass, "resize-none")}
          aria-invalid={!!errors.brief || undefined}
          {...register("brief")}
        />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Timeline" htmlFor="timeline" error={errors.timeline?.message}>
          <Controller
            name="timeline"
            control={control}
            render={({ field }) => (
              <SelectField
                id="timeline"
                value={field.value ?? ""}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Select a timeline"
                options={TIMELINE_OPTIONS}
                invalid={!!errors.timeline}
              />
            )}
          />
        </Field>
        <Field label="Engagement budget" htmlFor="budget" error={errors.budget?.message}>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <SelectField
                id="budget"
                value={field.value ?? ""}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Select a range"
                options={BUDGET_OPTIONS}
                invalid={!!errors.budget}
              />
            )}
          />
        </Field>
      </div>

      {/* Honeypot — hidden from real visitors (and skipped by screen readers),
          left visible to bots that fill every field they can find. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" type="text" tabIndex={-1} autoComplete="off" {...register("company_website")} />
      </div>

      <Button type="submit" disabled={status === "submitting"} className="mt-1.5 w-full">
        {status === "submitting" ? "Sending…" : "Request an advisory call"}
      </Button>

      {status === "error" && (
        <span role="alert" className="text-center text-[14px] font-medium text-destructive">
          Something went wrong on my end. Try again, or email {CONTACT_EMAIL} directly.
        </span>
      )}

      <span className="text-center text-[13px] leading-[19px] text-muted-foreground">
        No newsletters, no CRM sequences. Your details are used only to reply to this enquiry.
      </span>
    </form>
  )
}
