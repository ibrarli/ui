"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { ChevronDown } from "apen-icons"

import { cn } from "@/lib/utils"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("w-full space-y-3", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("min-w-0 rounded-2xl border bg-card px-5 text-card-foreground shadow-soft", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header data-slot="accordion-header" className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex min-w-0 flex-1 items-center justify-between gap-4 rounded-lg py-5 text-left text-sm font-semibold transition-colors outline-none hover:text-primary focus-visible:ring-4 focus-visible:ring-ring/25 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
        <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none",
        className
      )}
      {...props}
    >
      <div className="pb-5 leading-relaxed [overflow-wrap:anywhere]">{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
