"use client"

import { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { Field, fieldControlClass } from "@/components/primitives/field"
import { SelectField } from "@/components/primitives/select-field"
import { Button } from "@/components/primitives/button"
import { cn } from "@/lib/utils"
import { CONTACT_EMAIL } from "@/lib/constants"
import { preorderSchema, FORMAT_OPTIONS, type BookFormat, type PreorderFormValues } from "@/lib/preorder-schema"

export function PreorderDialog({ format, onClose }: { format: BookFormat | null; onClose: () => void }) {
  return (
    <Dialog.Root open={format !== null} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 max-h-[calc(100vh-2.5rem)] w-[calc(100%-2.5rem)] max-w-[480px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-hairline bg-paper p-8 shadow-[0_30px_70px_rgba(0,0,0,0.20)] focus:outline-none">
          {format && <PreorderForm key={format} format={format} onClose={onClose} />}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function PreorderForm({ format, onClose }: { format: BookFormat; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PreorderFormValues>({
    resolver: zodResolver(preorderSchema),
    defaultValues: { name: "", email: "", format, note: "", company_website: "" },
  })

  const onSubmit = async (values: PreorderFormValues) => {
    setStatus("submitting")
    try {
      const res = await fetch("/api/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error("Request failed")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <Dialog.Title className="text-h3 font-semibold text-ink">You&rsquo;re on the list.</Dialog.Title>
        <Dialog.Description className="text-body text-muted-foreground">
          I&rsquo;ll email you the moment your copy ships.
        </Dialog.Description>
        <Button onClick={onClose} size="sm" className="mt-3 w-full">
          Close
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <Dialog.Title className="text-h3 font-semibold text-ink">Reserve your copy</Dialog.Title>
          <Dialog.Description className="text-small text-muted-foreground">
            No payment now, I&rsquo;ll email you when it&rsquo;s ready to ship.
          </Dialog.Description>
        </div>
        <Dialog.Close
          aria-label="Close"
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-panel hover:text-ink"
        >
          <X size={18} aria-hidden />
        </Dialog.Close>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <Field label="Format" htmlFor="preorder-format" error={errors.format?.message}>
          <Controller
            name="format"
            control={control}
            render={({ field }) => (
              <SelectField
                id="preorder-format"
                value={field.value ?? ""}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Select a format"
                options={FORMAT_OPTIONS}
                invalid={!!errors.format}
              />
            )}
          />
        </Field>

        <Field label="Full name" htmlFor="preorder-name" error={errors.name?.message}>
          <input
            id="preorder-name"
            type="text"
            placeholder="Jane Doe"
            className={fieldControlClass}
            aria-invalid={!!errors.name || undefined}
            {...register("name")}
          />
        </Field>

        <Field label="Email" htmlFor="preorder-email" error={errors.email?.message}>
          <input
            id="preorder-email"
            type="email"
            placeholder="jane@company.com"
            className={fieldControlClass}
            aria-invalid={!!errors.email || undefined}
            {...register("email")}
          />
        </Field>

        <Field label="Anything else? (optional)" htmlFor="preorder-note" error={errors.note?.message}>
          <textarea
            id="preorder-note"
            rows={3}
            placeholder="Shipping notes, a question, whatever's useful."
            className={cn(fieldControlClass, "resize-none")}
            {...register("note")}
          />
        </Field>

        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="preorder-company-website">Company website</label>
          <input
            id="preorder-company-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("company_website")}
          />
        </div>

        <Button type="submit" disabled={status === "submitting"} size="sm" className="mt-1.5 w-full">
          {status === "submitting" ? "Sending…" : "Reserve my copy"}
        </Button>

        {status === "error" && (
          <span role="alert" className="text-center text-[13px] font-medium text-destructive">
            Something went wrong. Try again, or email {CONTACT_EMAIL} directly.
          </span>
        )}
      </form>
    </>
  )
}
