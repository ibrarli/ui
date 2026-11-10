"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  max = 100,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const maximum = Number.isFinite(max) && max > 0 ? max : 100
  const progress =
    typeof value === "number" && Number.isFinite(value)
      ? Math.min(Math.max(value, 0), maximum)
      : null

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted",
        className
      )}
      value={progress}
      max={maximum}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 rounded-full bg-brand-gradient transition-transform duration-500 data-[state=indeterminate]:w-1/2 data-[state=indeterminate]:animate-pulse motion-reduce:animate-none motion-reduce:transition-none"
        style={{ transform: `translateX(-${progress === null ? 0 : 100 - (progress / maximum) * 100}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
