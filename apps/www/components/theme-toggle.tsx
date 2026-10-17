"use client"

import { Moon, Sun } from "apen-icons"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark")
    document.documentElement.style.colorScheme = isDark ? "dark" : "light"
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light")
    } catch {
      // Storage can be unavailable in private windows.
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
      <Sun className="hidden dark:block" />
      <Moon className="block dark:hidden" />
    </Button>
  )
}

export const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})()`
