"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
// Import icons directly from your registered icon pack
import { MenuHamburger, X, Search } from "apen-icons"

export interface NavItem {
  label: string
  href: string
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  items?: NavItem[]
  logoSrc?: string
  logoText?: string
  theme?: "basic" | "glass" | "bordered"
  layout?: "center-nav" | "left-nav" | "search-focused"
  showActionButton?: boolean
  actionButtonText?: string
  onActionClick?: () => void
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      items = [],
      logoSrc,
      logoText = "Apen System",
      theme = "basic",
      layout = "center-nav",
      showActionButton = true,
      actionButtonText = "Get Started",
      onActionClick,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)

    // Theme Class Builder Maps
    const themeClasses = {
      basic: "bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900",
      glass: "bg-white/60 dark:bg-zinc-950/60 backdrop-blur-md border-b border-white/20 dark:border-zinc-800/40 sticky top-0 z-50",
      bordered: "bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-7xl mx-auto mt-4 shadow-sm"
    }

    const hasLogo = logoSrc || logoText

    return (
      <nav
        ref={ref}
        className={cn(
          "w-full px-6 py-3 transition-all duration-200",
          themeClasses[theme],
          className
        )}
        {...props}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* LEFT CONTAINER LAYER */}
          {hasLogo && (
            <div className={cn("flex items-center gap-2 shrink-0", layout === "left-nav" && "mr-4")}>
              {logoSrc ? (
                <img src={logoSrc} alt="Logo" className="h-6 w-auto object-contain" />
              ) : (
                <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-50">
                  {logoText}
                </span>
              )}
            </div>
          )}

          {/* INTERNAL ROUTING LAYER (Left Aligned Next to Logo) */}
          {layout === "left-nav" && (
            <div className="hidden md:flex items-center gap-1 flex-1">
              {items.map((item) => (
                <a key={item.label} href={item.href}>
                  <Button variant="ghost" size="sm">{item.label}</Button>
                </a>
              ))}
            </div>
          )}

          {/* MID CONTAINER LAYER (Centered Navigation Links) */}
          {layout === "center-nav" && (
            <div className="hidden md:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2">
              {items.map((item) => (
                <a key={item.label} href={item.href}>
                  <Button variant="ghost" size="sm">{item.label}</Button>
                </a>
              ))}
            </div>
          )}

          {/* CORE SEARCH ARCHITECTURE LAYER */}
          {layout === "search-focused" && (
            <div className="hidden md:flex items-center flex-1 max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full h-9 pl-9 pr-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400"
              />
            </div>
          )}

          {/* RIGHT UTILITY CONTAINER */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {layout === "search-focused" && items.map((item) => (
              <a key={item.label} href={item.href}>
                <Button variant="ghost" size="sm">{item.label}</Button>
              </a>
            ))}
            {showActionButton && (
              <Button 
                variant={theme === "glass" ? "glass" : "default"} 
                size="sm"
                onClick={onActionClick}
              >
                {actionButtonText}
              </Button>
            )}
          </div>

          {/* MOBILE TOGGLE BUTTON LAYER */}
          <div className="flex md:hidden items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <MenuHamburger className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* MOBILE DROPDOWN DRAWERS CONTAINER */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-2 border-t border-zinc-100 dark:border-zinc-900 mt-3 animate-in fade-in slide-in-from-top-2 duration-150">
            {layout === "search-focused" && (
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full h-10 pl-9 pr-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 text-sm focus-visible:outline-none"
                />
              </div>
            )}
            {items.map((item) => (
              <a key={item.label} href={item.href} className="block w-full">
                <Button variant="ghost" className="w-full justify-start h-10">
                  {item.label}
                </Button>
              </a>
            ))}
            {showActionButton && (
              <div className="pt-2">
                <Button className="w-full h-10" onClick={onActionClick}>
                  {actionButtonText}
                </Button>
              </div>
            )}
          </div>
        )}
      </nav>
    )
  }
)
Navbar.displayName = "Navbar"

export { Navbar }