"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export type DocsNavGroup = {
  label: string
  items: { href: string; label: string }[]
}

export function DocsNav({ groups }: { groups: DocsNavGroup[] }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Docs" className="flex flex-col gap-6">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-1">
          <p className="px-3 pb-1 text-xs font-semibold text-muted-foreground">{group.label}</p>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-active={pathname === item.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                "data-[active=true]:bg-primary/10 data-[active=true]:font-semibold data-[active=true]:text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  )
}
