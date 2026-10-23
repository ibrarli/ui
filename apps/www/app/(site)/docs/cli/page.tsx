import { CodeBlock } from "@/components/code-block"
import { CommandTabs } from "@/components/command-tabs"
import { PageHeader } from "../page-header"

export const metadata = { title: "CLI" }

const config = `{
  "$schema": "https://cdn.jsdelivr.net/npm/apen-ui@latest/schema.json",
  "tsx": true,
  "rsc": true,
  "css": "app/globals.css",
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui",
    "utils": "@/lib/utils"
  }
}`

const initHelp = `Options:
  -c, --cwd <path>       the project directory
  -y, --yes              accept the detected defaults
  -f, --force            overwrite existing config, utils and theme
  --no-install           do not install dependencies
  -r, --registry <url>   use a hosted registry instead of the bundled one`

const addHelp = `Options:
  -c, --cwd <path>       the project directory
  -a, --all              add every component
  -y, --yes              skip confirmation prompts
  -o, --overwrite        overwrite files that already exist
  -p, --path <path>      write components to this folder instead of the ui alias
  --no-install           do not install dependencies
  -r, --registry <url>   use a hosted registry instead of the bundled one`

export default function CliPage() {
  return (
    <>
      <PageHeader title="CLI" description="Use the apen-ui CLI to set up your project and add components." />

      <h2>init</h2>
      <p>Detects your import alias, global CSS file and package manager, then sets everything up.</p>
      <CommandTabs args="init" className="mt-4" />
      <CodeBlock code={initHelp} lang="txt" className="mt-4" />

      <h2>add</h2>
      <p>
        Adds components and everything they depend on. For example, <code>sidebar</code> also adds{" "}
        <code>button</code> and <code>tooltip</code>. Imports are rewritten to the aliases in{" "}
        <code>apen.json</code>. Files you already have are never overwritten unless you pass{" "}
        <code>--overwrite</code>. Run it with no arguments to pick from a list.
      </p>
      <CommandTabs args="add sidebar stat-card table" className="mt-4" />
      <CodeBlock code={addHelp} lang="txt" className="mt-4" />

      <h2>list</h2>
      <p>Prints every available component, grouped by category.</p>
      <CommandTabs args="list" className="mt-4" />

      <h2>apen.json</h2>
      <p>
        Created by <code>init</code>. Change the aliases here if your project keeps components somewhere else.
      </p>
      <CodeBlock code={config} lang="json" title="apen.json" className="mt-4" />

      <h2>Registry</h2>
      <p>
        The registry ships inside the CLI, so it works offline and always matches the CLI version. This site also
        serves it as JSON at <code>/r/index.json</code> and <code>/r/[name].json</code>. Point the CLI at a hosted
        copy with <code>--registry https://your-site.com/r</code> or the <code>APEN_UI_REGISTRY</code> environment
        variable.
      </p>
    </>
  )
}
