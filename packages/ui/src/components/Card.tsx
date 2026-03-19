import { cn } from "../lib/utils"

export function Card({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={cn(
      "glass rounded-xl p-6 shadow-xl transition-all hover:scale-[1.02]", 
      className
    )}>
      {children}
    </div>
  )
}