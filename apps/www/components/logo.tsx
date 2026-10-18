import Image from "next/image"

import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <Image src="/logo/apen-logo-light.svg" alt="" width={30} height={25} priority className="block dark:hidden" />
      <Image src="/logo/apen-logo-dark.svg" alt="" width={30} height={25} priority className="hidden dark:block" />
      <span className="font-heading text-lg font-bold tracking-tight">
        Apen <span className="text-brand-gradient">UI</span>
      </span>
    </span>
  )
}
