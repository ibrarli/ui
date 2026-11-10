"use client"

import * as React from "react"
import { Dialog as DialogPrimitive, Slot } from "radix-ui"
import { MenuHamburger, X } from "apen-icons"

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
const MOBILE_QUERY = "(width < 48rem)"

type SidebarContextValue = {
  sidebarId: string
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
  const sidebarId = React.useId()
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
    if (!isMobile) setOpenMobile(false)
  }, [isMobile])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target
      const isEditing = target instanceof HTMLElement &&
        (target.isContentEditable || !!target.closest("input, textarea, select"))
      if (
        !event.defaultPrevented &&
        !isEditing &&
        event.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const value = React.useMemo<SidebarContextValue>(
    () => ({
      sidebarId,
      collapsed,
      setCollapsed,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }),
    [sidebarId, collapsed, setCollapsed, openMobile, isMobile, toggleSidebar]
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
        className={cn("flex min-h-svh w-full min-w-0", className)}
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
  style,
  children,
  ...props
}: React.ComponentProps<"aside"> & {
  variant?: "floating" | "flush"
}) {
  const { sidebarId, collapsed, isMobile, openMobile, setOpenMobile } = useSidebar()
  const restoreFocusRef = React.useRef<HTMLElement | null>(null)

  if (isMobile) {
    return (
      <DialogPrimitive.Root open={openMobile} onOpenChange={setOpenMobile}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            data-slot="sidebar-overlay"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          />
          <DialogPrimitive.Content
            asChild
            aria-describedby={undefined}
            onOpenAutoFocus={() => {
              restoreFocusRef.current = document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null
            }}
            onCloseAutoFocus={(event) => {
              event.preventDefault()
              restoreFocusRef.current?.focus()
            }}
          >
            <aside
              id={sidebarId}
              data-slot="sidebar"
              data-variant={variant}
              data-collapsed={false}
              data-mobile-open={openMobile}
              {...props}
              style={{ "--sidebar-width": SIDEBAR_WIDTH, ...style } as React.CSSProperties}
              className={cn(
                "group/sidebar fixed inset-y-0 left-0 z-50 flex h-dvh w-(--sidebar-width) max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-r-3xl bg-sidebar text-sidebar-foreground shadow-2xl outline-none data-[state=open]:animate-in data-[state=open]:slide-in-from-left data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left motion-reduce:animate-none",
                className
              )}
            >
              <DialogPrimitive.Title data-slot="sidebar-title" className="sr-only">Sidebar navigation</DialogPrimitive.Title>
              {children}
              <DialogPrimitive.Close
                type="button"
                aria-label="Close sidebar"
                className="absolute top-4 right-3 inline-flex size-8 items-center justify-center rounded-full bg-sidebar text-muted-foreground outline-none hover:bg-sidebar-accent focus-visible:ring-4 focus-visible:ring-ring/25 [&_svg]:size-4"
              >
                <X />
              </DialogPrimitive.Close>
            </aside>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    )
  }

  return (
    <aside
      id={sidebarId}
      data-slot="sidebar"
      data-variant={variant}
      data-collapsed={collapsed}
      data-mobile-open={openMobile}
      style={style}
      className={cn(
        "group/sidebar sticky hidden w-(--sidebar-width) shrink-0 self-start flex-col overflow-hidden bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-out motion-reduce:transition-none md:flex md:data-[collapsed=true]:w-(--sidebar-width-collapsed)",
        variant === "floating" &&
          "md:top-3 md:m-3 md:mr-0 md:h-[calc(100svh-1.5rem)] md:rounded-3xl md:shadow-soft",
        variant === "flush" && "md:top-0 md:h-svh md:rounded-none",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex min-w-0 shrink-0 flex-col gap-2 p-3 pr-12 md:pr-3", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        "scrollbar-soft flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto p-3",
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
      className={cn("flex min-w-0 shrink-0 flex-col gap-2 p-3", className)}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn("flex min-w-0 flex-col gap-1", className)}
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
      className={cn("flex min-w-0 flex-col gap-1", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn("relative min-w-0 md:group-data-[collapsed=true]/sidebar:mx-auto md:group-data-[collapsed=true]/sidebar:w-10 md:group-data-[collapsed=true]/sidebar:max-w-full", className)}
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
      type={asChild ? undefined : "button"}
      data-slot="sidebar-menu-button"
      data-active={isActive}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (isMobile && !event.defaultPrevented) setOpenMobile(false)
      }}
      className={cn(
        "flex h-10 w-full min-w-0 items-center gap-3 overflow-hidden rounded-full px-3 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-4 focus-visible:ring-ring/25 disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-primary/10 data-[active=true]:font-semibold data-[active=true]:text-primary [&_svg]:size-4.5 [&_svg]:shrink-0 [&>span:last-child]:truncate",
        "md:group-data-[collapsed=true]/sidebar:justify-center md:group-data-[collapsed=true]/sidebar:gap-0 md:group-data-[collapsed=true]/sidebar:px-0 md:group-data-[collapsed=true]/sidebar:[&>span]:sr-only",
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
  const { sidebarId, collapsed, isMobile, openMobile, toggleSidebar } = useSidebar()

  return (
    <Button
      data-slot="sidebar-trigger"
      type="button"
      aria-controls={sidebarId}
      aria-expanded={isMobile ? openMobile : !collapsed}
      variant="ghost"
      size="icon-sm"
      className={className}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) toggleSidebar()
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
