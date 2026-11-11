"use client"

import * as React from "react"
import { ChevronDown } from "apen-icons"

import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function CollapsibleDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="max-w-md rounded-3xl bg-card p-5 shadow-soft">
      <div className="flex min-w-0 items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold">Website redesign</p>
          <p className="text-sm text-muted-foreground">3 project milestones</p>
        </div>
        <CollapsibleTrigger aria-label="Toggle project milestones" className="size-10 shrink-0 px-0">
          <ChevronDown aria-hidden="true" className={open ? "rotate-180 transition-transform motion-reduce:transition-none" : "transition-transform motion-reduce:transition-none"} />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="grid gap-2 pt-4">
          {["Discovery and planning", "Design review", "Launch checklist"].map((milestone, index) => (
            <div key={milestone} className="flex min-w-0 items-center justify-between gap-3 rounded-2xl bg-muted px-4 py-3">
              <span className="min-w-0 break-words">{milestone}</span>
              <Badge variant={index === 0 ? "success" : "secondary"} className="shrink-0">{index === 0 ? "Done" : "Upcoming"}</Badge>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
