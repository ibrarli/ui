import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("font-heading text-lg font-bold tracking-tight", className)}>
      Apen <span className="text-brand-gradient">UI</span>
    </span>
  )
}
