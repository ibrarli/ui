"use client"

import * as React from "react"
import { Slot } from "radix-ui"
import { MenuHamburger, X } from "apen-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type NavbarContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const NavbarContext = React.createContext<NavbarContextValue | null>(null)

function useNavbar() {
  const context = React.useContext(NavbarContext)
  if (!context) {
    throw new Error("useNavbar must be used within a Navbar.")
  }
  return context
}

function Navbar({
  variant = "floating",
  className,
  children,
  ...props
}: React.ComponentProps<"header"> & {
  variant?: "floating" | "bar"
}) {
  const [open, setOpen] = React.useState(false)
  const value = React.useMemo(() => ({ open, setOpen }), [open])

  return (
    <NavbarContext.Provider value={value}>
      <header
        data-slot="navbar"
        data-variant={variant}
        className={cn(
          "sticky top-0 z-40 w-full",
          variant === "floating" && "px-4 pt-4",
          variant === "bar" &&
            "border-b border-border/60 bg-background/80 backdrop-blur-xl",
          className
        )}
        {...props}
      >
        <nav
          className={cn(
            "relative mx-auto flex w-full max-w-6xl items-center justify-between gap-4",
            variant === "floating" &&
              "h-14 rounded-full border border-border/60 bg-background/80 pr-2 pl-5 shadow-sm backdrop-blur-xl",
            variant === "bar" && "h-16 px-6"
          )}
        >
          {children}
        </nav>
      </header>
    </NavbarContext.Provider>
  )
}

function NavbarBrand({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="navbar-brand"
      className={cn(
        "flex shrink-0 items-center gap-2 font-heading text-lg font-bold tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function NavbarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="navbar-content"
      className={cn("hidden items-center gap-1 md:flex", className)}
      {...props}
    />
  )
}

function NavbarLink({
  asChild = false,
  active = false,
  className,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean; active?: boolean }) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="navbar-link"
      data-active={active}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-foreground focus-visible:ring-4 focus-visible:ring-ring/25 data-[active=true]:bg-accent data-[active=true]:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function NavbarActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="navbar-actions"
      className={cn("flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  )
}

function NavbarToggle({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { open, setOpen } = useNavbar()

  return (
    <Button
      data-slot="navbar-toggle"
      variant="ghost"
      size="icon"
      aria-expanded={open}
      className={cn("md:hidden", className)}
      onClick={(event) => {
        onClick?.(event)
        setOpen(!open)
      }}
      {...props}
    >
      {open ? <X className="size-3.5" /> : <MenuHamburger />}
      <span className="sr-only">Toggle menu</span>
    </Button>
  )
}

function NavbarMobileMenu({
  className,
  onClick,
  ...props
}: React.ComponentProps<"div">) {
  const { open, setOpen } = useNavbar()

  if (!open) return null

  return (
    <div
      data-slot="navbar-mobile-menu"
      onClick={(event) => {
        onClick?.(event)
        if ((event.target as HTMLElement).closest("a")) setOpen(false)
      }}
      className={cn(
        "absolute inset-x-0 top-full mt-2 flex flex-col gap-1 rounded-3xl border border-border/60 bg-popover p-2 text-popover-foreground shadow-xl animate-in fade-in-0 slide-in-from-top-2 md:hidden [&_[data-slot=navbar-link]]:w-full",
        className
      )}
      {...props}
    />
  )
}

export {
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarContent,
  NavbarLink,
  NavbarMobileMenu,
  NavbarToggle,
  useNavbar,
}
