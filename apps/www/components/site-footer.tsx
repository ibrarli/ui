import { siteConfig } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="px-4 pb-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 rounded-3xl bg-card px-6 py-5 text-sm text-muted-foreground sm:flex-row">
        <p>
          Built by{" "}
          <a href={siteConfig.links.apenApps} target="_blank" rel="noreferrer" className="font-semibold text-foreground hover:text-primary">
            Apen Apps
          </a>
          . MIT licensed.
        </p>
        <div className="flex items-center gap-5">
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="hover:text-foreground">
            GitHub
          </a>
          <a href={siteConfig.links.npm} target="_blank" rel="noreferrer" className="hover:text-foreground">
            npm
          </a>
          <a href={siteConfig.links.createApen} target="_blank" rel="noreferrer" className="hover:text-foreground">
            create-apen
          </a>
        </div>
      </div>
    </footer>
  )
}
