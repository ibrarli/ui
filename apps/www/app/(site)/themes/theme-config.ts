// Presets and the CSS generator behind the theme customizer. The output is
// the same block of variables that `apen-ui init` writes, so it can be
// pasted straight into a project's global CSS.

type Tokens = Record<string, string>

export type Neutral = {
  name: string
  swatch: string
  light: Tokens
  dark: Tokens
}

export const neutrals: Record<string, Neutral> = {
  apen: {
    name: "Apen gray",
    swatch: "#5f6368",
    light: {
      background: "#f4f5f7", foreground: "#111827", card: "#ffffff", popover: "#ffffff",
      secondary: "#eceef1", muted: "#eef0f2", "muted-foreground": "#5f6368", accent: "#eef0f2",
      border: "#e3e6ea", input: "#d5d9de",
    },
    dark: {
      background: "#0a0a0a", foreground: "#ffffff", card: "#171819", popover: "#202123",
      secondary: "#242527", muted: "#222325", "muted-foreground": "#9aa0a6", accent: "#2c2e30",
      border: "#2c2e30", input: "#45494d",
    },
  },
  slate: {
    name: "Slate",
    swatch: "#64748b",
    light: {
      background: "#f1f5f9", foreground: "#0f172a", card: "#ffffff", popover: "#ffffff",
      secondary: "#e7ecf2", muted: "#e9eef4", "muted-foreground": "#64748b", accent: "#e9eef4",
      border: "#e2e8f0", input: "#cbd5e1",
    },
    dark: {
      background: "#020617", foreground: "#f8fafc", card: "#0f172a", popover: "#1e293b",
      secondary: "#1e293b", muted: "#1e293b", "muted-foreground": "#94a3b8", accent: "#273449",
      border: "#1e293b", input: "#334155",
    },
  },
  zinc: {
    name: "Zinc",
    swatch: "#71717a",
    light: {
      background: "#f4f4f5", foreground: "#09090b", card: "#ffffff", popover: "#ffffff",
      secondary: "#ececee", muted: "#ececee", "muted-foreground": "#71717a", accent: "#ececee",
      border: "#e4e4e7", input: "#d4d4d8",
    },
    dark: {
      background: "#09090b", foreground: "#fafafa", card: "#18181b", popover: "#27272a",
      secondary: "#27272a", muted: "#27272a", "muted-foreground": "#a1a1aa", accent: "#323236",
      border: "#27272a", input: "#3f3f46",
    },
  },
  stone: {
    name: "Stone",
    swatch: "#78716c",
    light: {
      background: "#f5f5f4", foreground: "#1c1917", card: "#ffffff", popover: "#ffffff",
      secondary: "#ecebe9", muted: "#ecebe9", "muted-foreground": "#78716c", accent: "#ecebe9",
      border: "#e7e5e4", input: "#d6d3d1",
    },
    dark: {
      background: "#0c0a09", foreground: "#fafaf9", card: "#1c1917", popover: "#292524",
      secondary: "#292524", muted: "#292524", "muted-foreground": "#a8a29e", accent: "#3a3532",
      border: "#292524", input: "#44403c",
    },
  },
}

export const primaries = [
  { name: "Apen orange", value: "#f15a29" },
  { name: "Apen blue", value: "#00aeef" },
  { name: "Indigo", value: "#4f46e5" },
  { name: "Violet", value: "#7c3aed" },
  { name: "Rose", value: "#e11d48" },
  { name: "Emerald", value: "#059669" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Ink", value: "#111827" },
]

export const gradients = [
  { name: "Apen", from: "#f15a29", to: "#00aeef" },
  { name: "Sunset", from: "#f43f5e", to: "#f59e0b" },
  { name: "Ocean", from: "#06b6d4", to: "#3b82f6" },
  { name: "Aurora", from: "#22c55e", to: "#06b6d4" },
  { name: "Grape", from: "#a855f7", to: "#ec4899" },
  { name: "Night", from: "#1e293b", to: "#6366f1" },
]

export const fonts = [
  "Plus Jakarta Sans",
  "Quicksand",
  "Inter",
  "Poppins",
  "Nunito",
  "DM Sans",
  "Manrope",
  "Outfit",
  "Space Grotesk",
  "Geist",
]

export type ThemeSettings = {
  neutral: keyof typeof neutrals
  primary: string
  gradientFrom: string
  gradientTo: string
  radius: number
  bodyFont: string
  headingFont: string
}

export const defaultTheme: ThemeSettings = {
  neutral: "apen",
  primary: "#f15a29",
  gradientFrom: "#f15a29",
  gradientTo: "#00aeef",
  radius: 1,
  bodyFont: "Plus Jakarta Sans",
  headingFont: "Quicksand",
}

function toRgb(hex: string) {
  const value = parseInt(hex.slice(1), 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

function toHex(rgb: number[]) {
  return `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`
}

function mix(hex: string, target: string, amount: number) {
  const a = toRgb(hex)
  const b = toRgb(target)
  return toHex(a.map((c, i) => c + (b[i] - c) * amount))
}

function luminance(hex: string) {
  const [r, g, b] = toRgb(hex).map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** White or near-black, whichever reads better on the colour. */
function readableOn(hex: string) {
  return luminance(hex) > 0.4 ? "#111827" : "#ffffff"
}

function primaryFor(mode: "light" | "dark", primary: string) {
  if (mode === "light") return primary
  // Very dark primaries (like Ink) flip to near-white in dark mode.
  if (luminance(primary) < 0.03) return "#f4f5f7"
  return mix(primary, "#ffffff", 0.1)
}

function block(mode: "light" | "dark", settings: ThemeSettings) {
  const neutral = neutrals[settings.neutral][mode]
  const primary = primaryFor(mode, settings.primary)
  const tokens: Tokens = {
    ...neutral,
    "card-foreground": neutral.foreground,
    "popover-foreground": neutral.foreground,
    "secondary-foreground": neutral.foreground,
    "accent-foreground": neutral.foreground,
    primary,
    "primary-foreground": readableOn(primary),
    ring: primary,
    sidebar: neutral.card,
    "sidebar-foreground": neutral.foreground,
    "sidebar-accent": neutral.accent,
    "sidebar-accent-foreground": neutral.foreground,
    "sidebar-border": neutral.border,
  }
  return Object.entries(tokens)
    .map(([name, value]) => `  --${name}: ${value};`)
    .join("\n")
}

export function themeToCss(settings: ThemeSettings) {
  return `:root {
  --radius: ${settings.radius}rem;
  --font-body: "${settings.bodyFont}";
  --font-display: "${settings.headingFont}";
  --brand-orange: ${settings.gradientFrom}; /* gradient start */
  --brand-blue: ${settings.gradientTo}; /* gradient end */
${block("light", settings)}
}

.dark {
${block("dark", settings)}
}`
}

/** next/font setup for the chosen fonts. */
export function fontsToCode(settings: ThemeSettings) {
  const names = [...new Set([settings.bodyFont, settings.headingFont])]
  const ident = (font: string) => font.replace(/\s+/g, "_")
  const variable = (font: string) => (font === settings.bodyFont ? "--font-jakarta" : "--font-quicksand")
  const both = settings.bodyFont === settings.headingFont

  const declarations = names
    .map((font) => {
      const name = font.replace(/\s+/g, "").replace(/^./, (c) => c.toLowerCase())
      return `const ${name} = ${ident(font)}({ subsets: ["latin"], variable: "${variable(font)}" })`
    })
    .join("\n")
  const classNames = names.map((font) => `\${${font.replace(/\s+/g, "").replace(/^./, (c) => c.toLowerCase())}.variable}`).join(" ")

  return `// app/layout.tsx
import { ${names.map(ident).join(", ")} } from "next/font/google"

${declarations}

// <html className={\`${classNames}\`}>
${both ? `// Both fonts are the same, so also set --font-display: var(--font-jakarta) in your CSS.\n` : ""}// Then remove the --font-body and --font-display lines from the CSS above:
// the theme picks the fonts up from these variables.`
}

export function googleFontsUrl(settings: ThemeSettings) {
  const families = [...new Set([settings.bodyFont, settings.headingFont])]
    .map((font) => `family=${font.replace(/\s+/g, "+")}:wght@400;500;600;700`)
    .join("&")
  return `https://fonts.googleapis.com/css2?${families}&display=swap`
}
