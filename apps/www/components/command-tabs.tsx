"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

const runners = {
  pnpm: "pnpm dlx",
  npm: "npx",
  yarn: "yarn dlx",
  bun: "bunx --bun",
} as const

type Runner = keyof typeof runners

/** An `apen-ui` command shown for each package manager. */
export function CommandTabs({ args, className }: { args: string; className?: string }) {
  const [runner, setRunner] = React.useState<Runner>("pnpm")
  const command = `${runners[runner]} apen-ui@latest ${args}`

  return (
    <div className={cn("overflow-hidden rounded-3xl bg-[#17191c] text-white", className)}>
      <div className="flex gap-1 px-3 pt-3">
        {(Object.keys(runners) as Runner[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setRunner(key)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
              runner === key ? "bg-white/15 text-white" : "text-white/50 hover:text-white"
            )}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 py-3 pr-3 pl-5 font-mono text-sm">
        <span aria-hidden="true" className="text-brand-orange">
          $
        </span>
        <code className="flex-1 overflow-x-auto whitespace-nowrap">{command}</code>
        <CopyButton value={command} className="bg-white/10 text-white hover:bg-white/20 hover:text-white" />
      </div>
    </div>
  )
}
