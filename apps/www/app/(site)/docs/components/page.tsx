import Link from "next/link"

import { getComponentGroups } from "@/lib/registry"
import { PageHeader } from "../page-header"

export const metadata = { title: "Components" }

export default function ComponentsPage() {
  const groups = getComponentGroups()

  return (
    <>
      <PageHeader
        title="Components"
        description="Every component is a single file you can add on its own with npx apen-ui add <name>."
      />
      {groups.map((group) => (
        <section key={group.id}>
          <h2>{group.label}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {group.items.map((item) => (
              <Link
                key={item.name}
                href={`/docs/components/${item.name}`}
                data-slot="component-link"
                className="group flex flex-col gap-1 rounded-3xl bg-card p-5 shadow-soft transition-colors hover:bg-primary/8"
              >
                <span className="font-heading font-bold group-hover:text-primary">{item.title}</span>
                <span className="text-sm text-muted-foreground">{item.description}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
