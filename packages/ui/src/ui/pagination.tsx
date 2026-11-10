"use client"

import * as React from "react"
import { Slot } from "radix-ui"
import { ChevronLeft, ChevronRight, MenuMeatballs } from "apen-icons"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="pagination"
      aria-label="Pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-wrap items-center justify-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = React.ComponentProps<"a"> & {
  asChild?: boolean
  isActive?: boolean
  disabled?: boolean
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"
}

function PaginationLink({
  asChild = false,
  isActive = false,
  disabled = false,
  size = "icon",
  className,
  href,
  tabIndex,
  onClick,
  ...props
}: PaginationLinkProps) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="pagination-link"
      data-active={isActive}
      aria-current={isActive ? "page" : undefined}
      aria-disabled={disabled || undefined}
      href={disabled ? undefined : href}
      tabIndex={disabled ? -1 : tabIndex}
      className={cn(
        buttonVariants({ variant: isActive ? "default" : "ghost", size }),
        "aria-disabled:pointer-events-none aria-disabled:opacity-50",
        className
      )}
      onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
          event.preventDefault()
          return
        }
        onClick?.(event)
      }}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  children,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-3 sm:px-4", className)}
      {...props}
    >
      <ChevronLeft aria-hidden="true" className="rtl:rotate-180" />
      <Slot.Slottable>{children ?? <span className="sr-only sm:not-sr-only">Previous</span>}</Slot.Slottable>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  children,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-3 sm:px-4", className)}
      {...props}
    >
      <Slot.Slottable>{children ?? <span className="sr-only sm:not-sr-only">Next</span>}</Slot.Slottable>
      <ChevronRight aria-hidden="true" className="rtl:rotate-180" />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn("flex size-10 items-center justify-center text-muted-foreground", className)}
      {...props}
    >
      <MenuMeatballs aria-hidden="true" className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
