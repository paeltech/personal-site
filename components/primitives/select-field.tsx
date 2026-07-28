"use client"

import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"
import { fieldControlClass } from "@/components/primitives/field"
import { cn } from "@/lib/utils"

export function SelectField({
  id,
  value,
  onValueChange,
  onBlur,
  placeholder,
  options,
  invalid,
}: {
  id: string
  value: string
  onValueChange: (value: string) => void
  onBlur?: () => void
  placeholder: string
  options: readonly { value: string; label: string }[]
  invalid?: boolean
}) {
  return (
    <SelectPrimitive.Root value={value || undefined} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        id={id}
        onBlur={onBlur}
        aria-invalid={invalid || undefined}
        className={cn(
          fieldControlClass,
          "flex items-center justify-between gap-2 text-left",
          !value && "text-faint",
          invalid && "border-destructive",
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDown size={16} className="text-muted-foreground" aria-hidden />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className="z-50 max-h-(--radix-select-content-available-height) w-(--radix-select-trigger-width) overflow-hidden rounded-[8px] border border-hairline bg-paper shadow-[0_16px_40px_rgba(0,0,0,0.10)]"
        >
          <SelectPrimitive.Viewport className="p-1.5">
            {options.map((opt) => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                className="flex cursor-pointer items-center justify-between gap-2 rounded-[6px] px-3 py-2.5 text-[16px] text-ink outline-none data-[highlighted]:bg-panel"
              >
                <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator>
                  <Check size={15} aria-hidden />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
