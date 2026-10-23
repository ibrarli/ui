import { ThemeCustomizer } from "./theme-customizer"

export const metadata = {
  title: "Themes",
  description: "Pick colours, radius and fonts, preview them live, then copy the CSS into your project.",
}

export default function ThemesPage() {
  return (
    <main className="flex flex-col gap-8 px-4 py-10 md:px-6">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight">Make it yours</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Pick colours, radius and fonts. The whole page updates as you go. Copy the CSS when you are happy and paste
          it into your project. Use the moon or sun icon in the header to check dark mode.
        </p>
      </div>
      <ThemeCustomizer />
    </main>
  )
}
