"use client"

import * as React from "react"
import { Slot } from "radix-ui"
import { MenuHamburger, X } from "apen-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type NavbarContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  menuId: string
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
  ref,
  ...props
}: React.ComponentProps<"header"> & {
  variant?: "floating" | "bar"
}) {
  const [open, setOpen] = React.useState(false)
  const menuId = React.useId()
  const headerRef = React.useRef<HTMLElement>(null)
  React.useImperativeHandle(ref, () => headerRef.current!, [])

  React.useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)")
    const closeOnDesktop = () => {
      if (query.matches) setOpen(false)
    }
    query.addEventListener("change", closeOnDesktop)
    return () => query.removeEventListener("change", closeOnDesktop)
  }, [])

  React.useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented) {
        event.preventDefault()
        setOpen(false)
        headerRef.current?.querySelector<HTMLElement>('[data-slot="navbar-toggle"]')?.focus()
      }
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  const value = React.useMemo(() => ({ open, setOpen, menuId }), [open, menuId])

  return (
    <NavbarContext.Provider value={value}>
      <header
        ref={headerRef}
        data-slot="navbar"
        data-variant={variant}
        className={cn(
          "sticky top-0 z-40 w-full",
          variant === "floating" && "px-4 pt-4 md:px-6",
          variant === "bar" &&
            "bg-background/80 backdrop-blur-xl",
          className
        )}
        {...props}
      >
        <nav
          className={cn(
            "relative flex w-full min-w-0 items-center justify-between gap-2 sm:gap-4",
            variant === "floating" &&
              "h-14 rounded-full bg-card/85 pr-2 pl-5 shadow-soft backdrop-blur-xl",
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
      className={cn("scrollbar-soft hidden min-w-0 items-center gap-1 overflow-x-auto md:flex", className)}
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
        "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-foreground focus-visible:ring-4 focus-visible:ring-ring/25 data-[active=true]:bg-accent data-[active=true]:text-foreground",
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
  type = "button",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { open, setOpen, menuId } = useNavbar()

  return (
    <Button
      data-slot="navbar-toggle"
      variant="ghost"
      size="icon"
      type={type}
      aria-expanded={open}
      aria-controls={menuId}
      className={cn("md:hidden", className)}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) setOpen(!open)
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
  const { open, setOpen, menuId } = useNavbar()

  if (!open) return null

  return (
    <div
      data-slot="navbar-mobile-menu"
      id={menuId}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && (event.target as HTMLElement).closest("a")) setOpen(false)
      }}
      className={cn(
        "scrollbar-soft absolute inset-x-0 top-full mt-2 flex max-h-[calc(100dvh-6rem)] flex-col gap-1 overflow-y-auto overscroll-contain rounded-3xl bg-popover p-2 text-popover-foreground shadow-xl animate-in fade-in-0 slide-in-from-top-2 md:hidden [&_[data-slot=navbar-link]]:w-full [&_[data-slot=navbar-link]]:shrink-0",
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
