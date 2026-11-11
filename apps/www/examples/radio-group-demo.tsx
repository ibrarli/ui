"use client"

import * as React from "react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const plans = [
  { value: "starter", label: "Starter", description: "For personal projects", disabled: false },
  { value: "growth", label: "Growth", description: "For growing teams", disabled: false },
  { value: "enterprise", label: "Enterprise", description: "Contact sales to enable", disabled: true },
]

export default function RadioGroupDemo() {
  const id = React.useId()

  return (
    <RadioGroup defaultValue="growth" aria-label="Billing plan" className="w-full max-w-sm">
      {plans.map((plan) => (
        <div key={plan.value} data-disabled={plan.disabled} className="group flex items-center gap-3 rounded-2xl border bg-card p-4 data-[disabled=true]:opacity-60">
          <RadioGroupItem id={`${id}-${plan.value}`} value={plan.value} disabled={plan.disabled} />
          <div className="min-w-0 space-y-1.5">
            <Label htmlFor={`${id}-${plan.value}`}>{plan.label}</Label>
            <p className="text-xs text-muted-foreground">{plan.description}</p>
          </div>
        </div>
      ))}
    </RadioGroup>
  )
}
