import { codeToHtml } from "shiki"

import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

export async function CodeBlock({
  code,
  lang = "tsx",
  title,
  className,
}: {
  code: string
  lang?: string
  title?: string
  className?: string
}) {
  const html = await codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  })

  return (
    <div className={cn("group relative overflow-hidden rounded-2xl border border-border/60 bg-card", className)}>
      {title && (
        <div className="border-b border-border/60 px-5 py-2.5 font-mono text-xs text-muted-foreground">{title}</div>
      )}
      <CopyButton value={code} className="absolute top-2.5 right-2.5" />
      <div
        className="max-h-[32rem] overflow-auto p-5 pr-14 font-mono text-[13px] leading-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
