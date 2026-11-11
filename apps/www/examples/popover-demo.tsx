"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function PopoverDemo() {
  const titleId = React.useId()
  const descriptionId = React.useId()
  const nameId = React.useId()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Workspace settings</Button>
      </PopoverTrigger>
      <PopoverContent aria-labelledby={titleId} aria-describedby={descriptionId}>
        <div className="grid gap-4">
          <div className="space-y-1">
            <h3 id={titleId} className="font-heading text-base font-bold">Workspace settings</h3>
            <p id={descriptionId} className="text-sm text-muted-foreground">Choose how your workspace appears to your team.</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor={nameId}>Workspace name</Label>
            <Input id={nameId} defaultValue="Acme Studio" />
          </div>
          <PopoverClose asChild>
            <Button className="justify-self-end">Done</Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  )
}
