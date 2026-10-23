import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowDown, ArrowUp } from "apen-icons"

import { cn } from "@/lib/utils"

function StatCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-card"
      className={cn(
        "flex flex-col gap-4 rounded-3xl bg-card p-6 text-card-foreground shadow-soft",
        className
      )}
      {...props}
    />
  )
}

function StatCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-card-header"
      className={cn("flex items-center justify-between gap-3", className)}
      {...props}
    />
  )
}

function StatCardLabel({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="stat-card-label"
      className={cn("text-sm font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

const statCardIconVariants = cva(
  "flex size-10 shrink-0 items-center justify-center rounded-2xl [&_svg]:size-5",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary",
        brand: "bg-brand-gradient text-white",
        info: "bg-info/10 text-info",
        success: "bg-success/10 text-success",
        muted: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function StatCardIcon({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof statCardIconVariants>) {
  return (
    <div
      data-slot="stat-card-icon"
      className={cn(statCardIconVariants({ variant }), className)}
      {...props}
    />
  )
}

function StatCardValue({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="stat-card-value"
      className={cn(
        "font-heading text-3xl font-bold tracking-tight tabular-nums",
        className
      )}
      {...props}
    />
  )
}

function StatCardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-card-footer"
      className={cn(
        "flex items-center gap-2 text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

const statCardTrendVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums [&_svg]:size-2.5",
  {
    variants: {
      trend: {
        up: "bg-success/12 text-success",
        down: "bg-destructive/12 text-destructive",
        neutral: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      trend: "up",
    },
  }
)

function StatCardTrend({
  className,
  trend = "up",
  children,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof statCardTrendVariants>) {
  return (
    <span
      data-slot="stat-card-trend"
      data-trend={trend}
      className={cn(statCardTrendVariants({ trend }), className)}
      {...props}
    >
      {trend === "up" && <ArrowUp strokeWidth={2.5} />}
      {trend === "down" && <ArrowDown strokeWidth={2.5} />}
      {children}
    </span>
  )
}

export {
  StatCard,
  StatCardHeader,
  StatCardLabel,
  StatCardIcon,
  StatCardValue,
  StatCardFooter,
  StatCardTrend,
}
