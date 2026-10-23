"use client"

import * as React from "react"
import { Check, Refresh } from "apen-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "@/components/copy-button"
import {
  defaultTheme,
  fonts,
  fontsToCode,
  googleFontsUrl,
  gradients,
  neutrals,
  primaries,
  themeToCss,
  type ThemeSettings,
} from "./theme-config"
import { ThemePreview } from "./theme-preview"

const STORAGE_KEY = "apen-ui-theme"

function loadSettings(): ThemeSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return { ...defaultTheme, ...JSON.parse(stored) }
  } catch {
    // Storage can be unavailable; fall back to the default theme.
  }
  return defaultTheme
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase">{title}</p>
      {children}
    </div>
  )
}

function Swatch({
  active,
  label,
  style,
  onClick,
}: {
  active: boolean
  label: string
  style: React.CSSProperties
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      title={label}
      style={style}
      className={cn(
        "flex size-9 items-center justify-center rounded-full text-white shadow-sm transition-transform hover:scale-110",
        active && "ring-4 ring-ring/30"
      )}
    >
      {active && <Check className="size-3.5" strokeWidth={3} />}
    </button>
  )
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const id = React.useId()
  return (
    <div className="flex items-center justify-between gap-3">
      <Label htmlFor={id} className="font-medium">
        {label}
      </Label>
      <label className="flex h-9 cursor-pointer items-center gap-2 rounded-full border border-input bg-card py-1 pr-3 pl-1 font-mono text-xs">
        <span className="size-7 rounded-full shadow-inner" style={{ background: value }} />
        {value}
        <input id={id} type="color" value={value} onChange={(e) => onChange(e.target.value)} className="sr-only" />
      </label>
    </div>
  )
}

function FontSelect({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div className="grid gap-2">
      <Label className="font-medium">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {fonts.map((font) => (
            <SelectItem key={font} value={font}>
              <span style={{ fontFamily: `"${font}"` }}>{font}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export function ThemeCustomizer() {
  const [settings, setSettings] = React.useState<ThemeSettings>(defaultTheme)
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    // Restoring from localStorage has to wait for the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSettings(loadSettings())
    setLoaded(true)
  }, [])

  const update = <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) =>
    setSettings((current) => ({ ...current, [key]: value }))

  const css = React.useMemo(() => themeToCss(settings), [settings])
  const fontCode = React.useMemo(() => fontsToCode(settings), [settings])

  // Apply the theme to the whole page while the customizer is open.
  React.useEffect(() => {
    if (!loaded) return
    const style = document.createElement("style")
    style.id = "apen-theme-preview"
    style.textContent = css
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = googleFontsUrl(settings)
    document.head.append(link, style)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      // Not being able to remember the theme is fine.
    }
    return () => {
      style.remove()
      link.remove()
    }
  }, [css, settings, loaded])

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[22rem_minmax(0,1fr)]">
      <aside className="scrollbar-soft flex flex-col gap-7 rounded-3xl bg-card p-6 shadow-soft lg:sticky lg:top-24 lg:max-h-[calc(100svh-7rem)] lg:overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Customize</h2>
          <Button variant="ghost" size="sm" onClick={() => setSettings(defaultTheme)}>
            <Refresh /> Reset
          </Button>
        </div>

        <Section title="Primary colour">
          <div className="flex flex-wrap gap-2">
            {primaries.map((color) => (
              <Swatch
                key={color.value}
                label={color.name}
                active={settings.primary === color.value}
                style={{ background: color.value }}
                onClick={() => update("primary", color.value)}
              />
            ))}
          </div>
          <ColorField label="Custom" value={settings.primary} onChange={(value) => update("primary", value)} />
        </Section>

        <Section title="Brand gradient">
          <div className="flex flex-wrap gap-2">
            {gradients.map((gradient) => (
              <Swatch
                key={gradient.name}
                label={gradient.name}
                active={settings.gradientFrom === gradient.from && settings.gradientTo === gradient.to}
                style={{ backgroundImage: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                onClick={() => setSettings((current) => ({ ...current, gradientFrom: gradient.from, gradientTo: gradient.to }))}
              />
            ))}
          </div>
          <ColorField label="Start" value={settings.gradientFrom} onChange={(value) => update("gradientFrom", value)} />
          <ColorField label="End" value={settings.gradientTo} onChange={(value) => update("gradientTo", value)} />
        </Section>

        <Section title="Neutral">
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(neutrals).map(([key, neutral]) => (
              <button
                key={key}
                type="button"
                onClick={() => update("neutral", key)}
                aria-pressed={settings.neutral === key}
                className={cn(
                  "flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                  settings.neutral === key && "bg-primary/10 text-primary hover:bg-primary/15"
                )}
              >
                <span className="size-4 rounded-full" style={{ background: neutral.swatch }} />
                {neutral.name}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Radius">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={1.5}
              step={0.125}
              value={settings.radius}
              onChange={(e) => update("radius", Number(e.target.value))}
              aria-label="Radius"
              className="h-2 flex-1 cursor-pointer appearance-auto accent-(--primary)"
            />
            <span className="w-16 rounded-full bg-muted py-1 text-center font-mono text-xs">{settings.radius}rem</span>
          </div>
          <p className="text-xs text-muted-foreground">Buttons, inputs and badges stay pill-shaped. Cards and menus follow this value.</p>
        </Section>

        <Section title="Fonts">
          <FontSelect label="Headings" value={settings.headingFont} onChange={(value) => update("headingFont", value)} />
          <FontSelect label="Body" value={settings.bodyFont} onChange={(value) => update("bodyFont", value)} />
        </Section>
      </aside>

      <div className="flex min-w-0 flex-col gap-6">
        <ThemePreview />

        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold">Use it in your project</h2>
          <p className="text-muted-foreground">
            Paste the CSS after the theme block in your global CSS file (the one <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">apen-ui init</code> edited). Then load the fonts.
          </p>
          <Tabs defaultValue="css">
            <TabsList>
              <TabsTrigger value="css">globals.css</TabsTrigger>
              <TabsTrigger value="fonts">Fonts</TabsTrigger>
            </TabsList>
            {[
              ["css", css],
              ["fonts", fontCode],
            ].map(([value, code]) => (
              <TabsContent key={value} value={value}>
                <div className="relative rounded-2xl bg-card shadow-soft">
                  <CopyButton value={code} className="absolute top-2.5 right-2.5" />
                  <pre className="scrollbar-soft max-h-[28rem] overflow-auto p-5 pr-14 font-mono text-[13px] leading-6">
                    <code>{code}</code>
                  </pre>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
