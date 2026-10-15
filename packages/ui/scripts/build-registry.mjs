// Builds the JSON registry served by the docs site (apps/www/public/r)
// and bundled into the CLI (packages/cli/registry).
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { registry } from "../registry.mjs"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const srcDir = path.join(root, "src")
const outDirs = [
  path.join(root, "../../apps/www/public/r"),
  path.join(root, "../cli/registry"),
]

// Packages every React project already has.
const IGNORED = new Set(["react", "react-dom"])

function title(name) {
  return name
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ")
}

function fileType(file) {
  if (file.startsWith("ui/")) return "registry:ui"
  if (file.startsWith("lib/")) return "registry:lib"
  return "registry:style"
}

function readImports(content) {
  const specifiers = new Set()
  for (const match of content.matchAll(/(?:import|export)[^"']*?from\s+["']([^"']+)["']/g)) {
    specifiers.add(match[1])
  }
  return [...specifiers]
}

function packageName(specifier) {
  const parts = specifier.split("/")
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0]
}

const names = new Set(registry.map((item) => item.name))
const items = registry.map((entry) => {
  const files = entry.files ?? [`ui/${entry.name}.tsx`]
  const dependencies = new Set(entry.dependencies ?? [])
  const registryDependencies = new Set()

  const builtFiles = files.map((file) => {
    const content = fs.readFileSync(path.join(srcDir, file), "utf8")

    for (const specifier of readImports(content)) {
      if (specifier === "@/lib/utils") {
        registryDependencies.add("utils")
      } else if (specifier.startsWith("@/components/ui/")) {
        const dep = specifier.replace("@/components/ui/", "")
        if (!names.has(dep)) throw new Error(`${file} imports unknown component "${dep}"`)
        registryDependencies.add(dep)
      } else if (!specifier.startsWith(".") && !specifier.startsWith("@/")) {
        const pkg = packageName(specifier)
        if (!IGNORED.has(pkg)) dependencies.add(pkg)
      }
    }

    return { path: file, type: fileType(file), content }
  })

  return {
    name: entry.name,
    type: entry.type ?? "registry:ui",
    title: entry.title ?? title(entry.name),
    description: entry.description,
    category: entry.category,
    dependencies: [...dependencies].sort(),
    registryDependencies: [...registryDependencies].sort(),
    files: builtFiles,
  }
})

for (const outDir of outDirs) {
  fs.rmSync(outDir, { recursive: true, force: true })
  fs.mkdirSync(outDir, { recursive: true })

  for (const item of items) {
    fs.writeFileSync(path.join(outDir, `${item.name}.json`), JSON.stringify(item, null, 2) + "\n")
  }

  const index = items.map(({ files, ...meta }) => ({ ...meta, files: files.map((f) => f.path) }))
  fs.writeFileSync(path.join(outDir, "index.json"), JSON.stringify(index, null, 2) + "\n")
}

console.log(`Built ${items.length} registry items into ${outDirs.map((d) => path.relative(process.cwd(), d)).join(", ")}`)
