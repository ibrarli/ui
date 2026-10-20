import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getComponent, getComponents, getExampleSource } from "@/lib/registry"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/code-block"
import { CommandTabs } from "@/components/command-tabs"
import { ComponentPreview } from "@/components/component-preview"
import { examples, wideExamples } from "@/examples"
import { PageHeader } from "../../page-header"

export const dynamicParams = false

export function generateStaticParams() {
  return getComponents().map((item) => ({ name: item.name }))
}

export async function generateMetadata({ params }: PageProps<"/docs/components/[name]">): Promise<Metadata> {
  const { name } = await params
  const item = getComponent(name)
  return item ? { title: item.title, description: item.description } : {}
}

export default async function ComponentPage({ params }: PageProps<"/docs/components/[name]">) {
  const { name } = await params
  const item = getComponent(name)
  const Example = examples[name]
  const exampleSource = getExampleSource(name)
  if (!item || !Example || !exampleSource) notFound()

  const localDeps = item.registryDependencies.filter((dep) => dep !== "utils")

  return (
    <>
      <PageHeader title={item.title} description={item.description} />

      <ComponentPreview
        wide={wideExamples.has(name)}
        preview={<Example />}
        code={<CodeBlock code={exampleSource} />}
      />

      <h2>Installation</h2>
      <CommandTabs args={`add ${name}`} className="mt-4" />
      {(item.dependencies.length > 0 || localDeps.length > 0) && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Also installs</span>
          {localDeps.map((dep) => (
            <Badge key={dep} asChild variant="default">
              <Link href={`/docs/components/${dep}`}>{dep}</Link>
            </Badge>
          ))}
          {item.dependencies.map((dep) => (
            <Badge key={dep} variant="secondary" className="font-mono">
              {dep}
            </Badge>
          ))}
        </div>
      )}

      <h3>Manual installation</h3>
      <p>
        Copy the source into <code>components/ui/{name}.tsx</code>
        {item.dependencies.length > 0 && (
          <>
            {" "}
            and install <code>{item.dependencies.join(" ")}</code>
          </>
        )}
        .
      </p>
      {item.files.map((file) => (
        <CodeBlock key={file.path} code={file.content} title={`components/${file.path}`} className="mt-4" />
      ))}
    </>
  )
}
