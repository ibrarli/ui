import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

export type RegistryFile = {
  path: string
  type: "registry:ui" | "registry:lib" | "registry:style"
  content: string
}

export type RegistryItem = {
  name: string
  type: "registry:ui" | "registry:lib" | "registry:style"
  title: string
  description?: string
  category?: string
  dependencies: string[]
  registryDependencies: string[]
  files: RegistryFile[]
}

export type RegistryIndexItem = Omit<RegistryItem, "files"> & { files: string[] }

// dist/index.js -> ../registry
const BUNDLED_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../registry")

export class Registry {
  private cache = new Map<string, RegistryItem>()

  constructor(private readonly source = process.env.APEN_UI_REGISTRY) {}

  get label() {
    return this.source ?? "bundled registry"
  }

  private async read<T>(file: string): Promise<T> {
    if (this.source) {
      const url = `${this.source.replace(/\/$/, "")}/${file}`
      const response = await fetch(url)
      if (!response.ok) throw new Error(`Could not fetch ${url} (${response.status})`)
      return (await response.json()) as T
    }
    return JSON.parse(await fs.readFile(path.join(BUNDLED_DIR, file), "utf8")) as T
  }

  index() {
    return this.read<RegistryIndexItem[]>("index.json")
  }

  async item(name: string) {
    const cached = this.cache.get(name)
    if (cached) return cached
    try {
      const item = await this.read<RegistryItem>(`${name}.json`)
      this.cache.set(name, item)
      return item
    } catch {
      throw new Error(`Component "${name}" was not found in the ${this.label}. Run "apen-ui list" to see what is available.`)
    }
  }

  /** Returns the items plus everything they depend on, dependencies first. */
  async resolve(names: string[]) {
    const ordered: RegistryItem[] = []
    const seen = new Set<string>()

    const visit = async (name: string) => {
      if (seen.has(name)) return
      seen.add(name)
      const item = await this.item(name)
      for (const dep of item.registryDependencies) await visit(dep)
      ordered.push(item)
    }

    for (const name of names) await visit(name)
    return ordered
  }
}
