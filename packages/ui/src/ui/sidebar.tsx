"use client"

import * as React from "react"
import { Slot } from "radix-ui"
import { MenuHamburger } from "apen-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_COLLAPSED = "4.75rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"
const MOBILE_QUERY = "(max-width: 767px)"

type SidebarContextValue = {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

function useIsMobile() {
  return React.useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(MOBILE_QUERY)
      query.addEventListener("change", onChange)
      return () => query.removeEventListener("change", onChange)
    },
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false
  )
}

function SidebarProvider({
  defaultCollapsed = false,
  collapsed: collapsedProp,
  onCollapsedChange,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultCollapsed?: boolean
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)
  const [internalCollapsed, setInternalCollapsed] =
    React.useState(defaultCollapsed)
  const collapsed = collapsedProp ?? internalCollapsed

  const setCollapsed = React.useCallback(
    (value: boolean) => {
      onCollapsedChange?.(value)
      if (collapsedProp === undefined) setInternalCollapsed(value)
    },
    [collapsedProp, onCollapsedChange]
  )

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) setOpenMobile((open) => !open)
    else setCollapsed(!collapsed)
  }, [isMobile, collapsed, setCollapsed])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
      if (event.key === "Escape") setOpenMobile(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const value = React.useMemo<SidebarContextValue>(
    () => ({
      collapsed,
      setCollapsed,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }),
    [collapsed, setCollapsed, openMobile, isMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-collapsed": SIDEBAR_WIDTH_COLLAPSED,
            ...style,
          } as React.CSSProperties
        }
        className={cn("flex min-h-svh w-full", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  variant = "floating",
  className,
  children,
  ...props
}: React.ComponentProps<"aside"> & {
  variant?: "floating" | "flush"
}) {
  const { collapsed, openMobile, setOpenMobile } = useSidebar()

  return (
    <>
      <div
        data-slot="sidebar-overlay"
        aria-hidden="true"
        onClick={() => setOpenMobile(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity md:hidden",
          openMobile ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <aside
        data-slot="sidebar"
        data-variant={variant}
        data-collapsed={collapsed}
        data-mobile-open={openMobile}
        className={cn(
          "group/sidebar fixed inset-y-0 left-0 z-50 flex w-(--sidebar-width) shrink-0 -translate-x-full flex-col rounded-r-3xl bg-sidebar text-sidebar-foreground shadow-2xl transition-[width,translate] duration-300 ease-out data-[mobile-open=true]:translate-x-0",
          "md:sticky md:z-auto md:translate-x-0 md:shadow-none md:data-[collapsed=true]:w-(--sidebar-width-collapsed)",
          variant === "floating" &&
            "md:top-3 md:m-3 md:mr-0 md:h-[calc(100svh-1.5rem)] md:rounded-3xl",
          variant === "flush" &&
            "md:top-0 md:h-svh md:rounded-none",
          className
        )}
        {...props}
      >
        {children}
      </aside>
    </>
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex flex-col gap-2 p-3", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto p-3",
        className
      )}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("flex flex-col gap-2 p-3", className)}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        "px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-muted-foreground md:group-data-[collapsed=true]/sidebar:sr-only",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  )
}

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  tooltip,
  className,
  onClick,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string
}) {
  const Comp = asChild ? Slot.Root : "button"
  const { collapsed, isMobile, setOpenMobile } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-active={isActive}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (isMobile) setOpenMobile(false)
      }}
      className={cn(
        "flex h-10 w-full items-center gap-3 rounded-full px-3 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-4 focus-visible:ring-ring/25 data-[active=true]:bg-primary/10 data-[active=true]:font-semibold data-[active=true]:text-primary [&_svg]:size-4.5 [&_svg]:shrink-0 [&>span:last-child]:truncate",
        "md:group-data-[collapsed=true]/sidebar:size-10 md:group-data-[collapsed=true]/sidebar:justify-center md:group-data-[collapsed=true]/sidebar:px-0 md:group-data-[collapsed=true]/sidebar:[&>span]:sr-only",
        className
      )}
      {...props}
    />
  )

  if (!tooltip || !collapsed || isMobile) return button

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right">{tooltip}</TooltipContent>
    </Tooltip>
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="sidebar-menu-badge"
      className={cn(
        "pointer-events-none absolute top-1/2 right-2 flex h-5 min-w-5 -translate-y-1/2 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground tabular-nums md:group-data-[collapsed=true]/sidebar:top-1 md:group-data-[collapsed=true]/sidebar:right-1 md:group-data-[collapsed=true]/sidebar:h-2 md:group-data-[collapsed=true]/sidebar:min-w-2 md:group-data-[collapsed=true]/sidebar:translate-y-0 md:group-data-[collapsed=true]/sidebar:p-0 md:group-data-[collapsed=true]/sidebar:text-[0px]",
        className
      )}
      {...props}
    />
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={className}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <MenuHamburger />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn("flex min-h-svh min-w-0 flex-1 flex-col", className)}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
}
