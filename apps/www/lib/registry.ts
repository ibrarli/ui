import fs from "node:fs"
import path from "node:path"

// The JSON registry is generated from packages/ui before dev and build.
const REGISTRY_DIR = path.join(process.cwd(), "public/r")
const EXAMPLES_DIR = path.join(process.cwd(), "examples")

export type RegistryFile = { path: string; type: string; content: string }

export type RegistryItem = {
  name: string
  type: string
  title: string
  description?: string
  category?: string
  dependencies: string[]
  registryDependencies: string[]
  files: RegistryFile[]
}

export const categories = [
  { id: "dashboard", label: "Dashboard" },
  { id: "forms", label: "Forms" },
  { id: "display", label: "Display" },
  { id: "feedback", label: "Feedback" },
  { id: "overlay", label: "Overlays" },
  { id: "navigation", label: "Navigation" },
]

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(REGISTRY_DIR, file), "utf8")) as T
}

export function getComponents() {
  return readJson<Omit<RegistryItem, "files">[]>("index.json").filter((item) => item.type === "registry:ui")
}

export function getComponent(name: string) {
  if (!fs.existsSync(path.join(REGISTRY_DIR, `${name}.json`))) return null
  return readJson<RegistryItem>(`${name}.json`)
}

export function getComponentGroups() {
  const components = getComponents()
  return categories
    .map((category) => ({
      ...category,
      items: components.filter((item) => item.category === category.id),
    }))
    .filter((group) => group.items.length > 0)
}

/** Source of the docs example, with the registry alias the user will also have. */
export function getExampleSource(name: string) {
  const file = path.join(EXAMPLES_DIR, `${name}-demo.tsx`)
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8").trim() : null
}
