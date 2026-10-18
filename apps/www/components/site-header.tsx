"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { mainNav, siteConfig } from "@/lib/site"
import { Button } from "@/components/ui/button"
import {
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarContent,
  NavbarLink,
  NavbarMobileMenu,
  NavbarToggle,
} from "@/components/ui/navbar"
import { GitHubIcon } from "@/components/icons"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === "/docs" ? pathname === "/docs" || (pathname.startsWith("/docs/") && !pathname.startsWith("/docs/components")) : pathname.startsWith(href)

  return (
    <Navbar>
      <NavbarBrand asChild>
        <Link href="/">
          <Logo />
        </Link>
      </NavbarBrand>
      <NavbarContent>
        {mainNav.map((item) => (
          <NavbarLink key={item.href} asChild active={isActive(item.href)}>
            <Link href={item.href}>{item.label}</Link>
          </NavbarLink>
        ))}
      </NavbarContent>
      <NavbarActions>
        <Button variant="ghost" size="icon" asChild>
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubIcon />
          </a>
        </Button>
        <ThemeToggle />
        <Button variant="brand" size="sm" asChild className="hidden sm:inline-flex">
          <Link href="/docs/installation">Get started</Link>
        </Button>
        <NavbarToggle />
      </NavbarActions>
      <NavbarMobileMenu>
        {mainNav.map((item) => (
          <NavbarLink key={item.href} asChild active={isActive(item.href)}>
            <Link href={item.href}>{item.label}</Link>
          </NavbarLink>
        ))}
        <NavbarLink asChild>
          <Link href="/docs/installation">Get started</Link>
        </NavbarLink>
      </NavbarMobileMenu>
    </Navbar>
  )
}
