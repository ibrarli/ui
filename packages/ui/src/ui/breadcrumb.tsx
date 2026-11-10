import * as React from "react"
import { Slot } from "radix-ui"
import { ChevronRight, MenuMeatballs } from "apen-icons"

import { cn } from "@/lib/utils"

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav data-slot="breadcrumb" aria-label="Breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn("flex min-w-0 flex-wrap items-center gap-1.5 text-sm text-muted-foreground sm:gap-2", className)}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex min-w-0 max-w-full items-center gap-1.5 [overflow-wrap:anywhere]", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("rounded-sm transition-colors outline-none hover:text-foreground focus-visible:ring-4 focus-visible:ring-ring/25", className)}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn("font-medium text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("shrink-0 [&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight className="rtl:rotate-180" />}
    </li>
  )
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      aria-hidden="true"
      className={cn("flex size-6 items-center justify-center [&>svg]:size-4", className)}
      {...props}
    >
      <MenuMeatballs />
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
