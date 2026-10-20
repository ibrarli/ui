import { getComponentGroups } from "@/lib/registry"
import { DocsNav, type DocsNavGroup } from "@/components/docs-nav"

export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const groups: DocsNavGroup[] = [
    {
      label: "Getting started",
      items: [
        { href: "/docs", label: "Introduction" },
        { href: "/docs/installation", label: "Installation" },
        { href: "/docs/theming", label: "Theming" },
        { href: "/docs/cli", label: "CLI" },
        { href: "/docs/components", label: "All components" },
      ],
    },
    ...getComponentGroups().map((group) => ({
      label: group.label,
      items: group.items.map((item) => ({ href: `/docs/components/${item.name}`, label: item.title })),
    })),
  ]

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-10 px-4 py-10">
      <aside className="sticky top-24 hidden h-[calc(100svh-7rem)] w-56 shrink-0 overflow-y-auto pb-6 lg:block">
        <DocsNav groups={groups} />
      </aside>
      <main className="prose-docs min-w-0 flex-1 pb-16">{children}</main>
    </div>
  )
}
