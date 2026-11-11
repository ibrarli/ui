"use client"

import * as React from "react"

import { Slider } from "@/components/ui/slider"

export default function SliderDemo() {
  const [volume, setVolume] = React.useState([60])
  const [budget, setBudget] = React.useState([20, 80])
  const volumeId = React.useId()
  const budgetId = React.useId()

  return (
    <div className="grid w-full max-w-sm gap-7">
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span id={volumeId} className="font-semibold">Volume</span>
          <output className="text-muted-foreground tabular-nums">{volume[0]}%</output>
        </div>
        <Slider value={volume} onValueChange={setVolume} aria-labelledby={volumeId} thumbLabels={["Volume"]} />
      </div>
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span id={budgetId} className="font-semibold">Budget range</span>
          <output className="text-muted-foreground tabular-nums">${budget[0]}–${budget[1]}</output>
        </div>
        <Slider value={budget} onValueChange={setBudget} step={5} minStepsBetweenThumbs={1} aria-labelledby={budgetId} thumbLabels={["Minimum budget", "Maximum budget"]} />
      </div>
      <div className="grid gap-3">
        <span className="text-sm font-semibold text-muted-foreground">Disabled</span>
        <Slider defaultValue={[35]} disabled thumbLabels={["Disabled slider"]} />
      </div>
    </div>
  )
}
