import Link from "next/link"

import { Button } from "@/components/ui/button"
import { PageHeader } from "./page-header"

export const metadata = { title: "Introduction" }

export default function DocsPage() {
  return (
    <>
      <PageHeader
        title="Introduction"
        description="Apen UI is a set of rounded, dashboard-ready React components that you copy into your project and own."
      />
      <p>
        It works the way shadcn/ui does: there is no component package to install and keep up to date. The{" "}
        <code>apen-ui</code> CLI writes the source of each component into your codebase, so you can change any
        class, variant or behaviour without fighting a library.
      </p>
      <p>
        What makes it Apen: softer, rounder shapes (pill buttons and inputs, <code>rounded-3xl</code> cards), tonal
        surfaces instead of borders, the orange-to-blue Apen gradient, Quicksand headings and{" "}
        <a href="https://www.npmjs.com/package/apen-icons">apen-icons</a>. It also ships the blocks a dashboard
        needs out of the box: a collapsible sidebar, a floating navbar, stat cards and data tables.
      </p>

      <h2>Principles</h2>
      <ul>
        <li>
          <strong className="text-foreground">You own the code.</strong> Components land in{" "}
          <code>components/ui</code>. Edit them freely.
        </li>
        <li>
          <strong className="text-foreground">Add one at a time.</strong> <code>npx apen-ui add button</code> adds
          just the button and the helpers it needs.
        </li>
        <li>
          <strong className="text-foreground">Accessible by default.</strong> Interactive parts are built on Radix
          primitives.
        </li>
        <li>
          <strong className="text-foreground">Themeable with CSS variables.</strong> The tokens use shadcn names, so
          anything you know about shadcn theming applies.
        </li>
      </ul>

      <h2>Stack</h2>
      <p>React 19, Tailwind CSS v4, Radix UI, class-variance-authority and apen-icons.</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button variant="brand" asChild>
          <Link href="/docs/installation">Installation</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/docs/components">Browse components</Link>
        </Button>
      </div>
    </>
  )
}
