import fs from "node:fs"
import path from "node:path"

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun"

export function readJson<T = Record<string, unknown>>(file: string): T | null {
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, "utf8")
  try {
    return JSON.parse(raw) as T
  } catch {
    // tsconfig files may contain comments and trailing commas.
    const cleaned = raw
      .replace(/("(?:\\.|[^"\\])*")|\/\/[^\n]*|\/\*[\s\S]*?\*\//g, (_, str) => str ?? "")
      .replace(/,(\s*[}\]])/g, "$1")
    return JSON.parse(cleaned) as T
  }
}

export function detectPackageManager(cwd: string): PackageManager {
  const lockfiles: [string, PackageManager][] = [
    ["pnpm-lock.yaml", "pnpm"],
    ["bun.lockb", "bun"],
    ["bun.lock", "bun"],
    ["yarn.lock", "yarn"],
    ["package-lock.json", "npm"],
  ]
  let dir = cwd
  while (true) {
    for (const [file, pm] of lockfiles) {
      if (fs.existsSync(path.join(dir, file))) return pm
    }
    const parent = path.dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  const agent = process.env.npm_config_user_agent ?? ""
  if (agent.startsWith("pnpm")) return "pnpm"
  if (agent.startsWith("yarn")) return "yarn"
  if (agent.startsWith("bun")) return "bun"
  return "npm"
}

type TsConfig = { compilerOptions?: { baseUrl?: string; paths?: Record<string, string[]> } }

/** Finds the import alias (e.g. "@") and the folder it points at (e.g. "src"). */
export function detectAlias(cwd: string) {
  const config = readJson<TsConfig>(path.join(cwd, "tsconfig.json")) ?? readJson<TsConfig>(path.join(cwd, "jsconfig.json"))
  const paths = config?.compilerOptions?.paths ?? {}
  const baseUrl = config?.compilerOptions?.baseUrl ?? "."

  for (const [key, targets] of Object.entries(paths)) {
    if (!key.endsWith("/*") || !targets[0]?.endsWith("/*")) continue
    const prefix = key.slice(0, -2)
    const dir = path.normalize(path.join(baseUrl, targets[0].slice(0, -2)))
    return { prefix, dir: dir === "." ? "" : dir }
  }

  return { prefix: "@", dir: fs.existsSync(path.join(cwd, "src")) ? "src" : "" }
}

export function detectCssFile(cwd: string) {
  const candidates = [
    "app/globals.css",
    "src/app/globals.css",
    "styles/globals.css",
    "src/styles/globals.css",
    "src/index.css",
    "src/globals.css",
    "app/app.css",
  ]
  return candidates.find((file) => fs.existsSync(path.join(cwd, file))) ?? (fs.existsSync(path.join(cwd, "src")) ? "src/app/globals.css" : "app/globals.css")
}

export function installedPackages(cwd: string) {
  const pkg = readJson<{ dependencies?: Record<string, string>; devDependencies?: Record<string, string> }>(
    path.join(cwd, "package.json")
  )
  return new Set([...Object.keys(pkg?.dependencies ?? {}), ...Object.keys(pkg?.devDependencies ?? {})])
}
