import fs from "node:fs"
import path from "node:path"

import { detectAlias, readJson } from "./project"

export const CONFIG_FILE = "apen.json"

export type Config = {
  $schema?: string
  tsx: boolean
  rsc: boolean
  css: string
  aliases: {
    components: string
    ui: string
    utils: string
  }
}

export function readConfig(cwd: string) {
  return readJson<Config>(path.join(cwd, CONFIG_FILE))
}

export function writeConfig(cwd: string, config: Config) {
  fs.writeFileSync(path.join(cwd, CONFIG_FILE), JSON.stringify(config, null, 2) + "\n")
}

/** Turns an alias such as "@/components/ui" into a path on disk. */
export function resolveAlias(cwd: string, alias: string) {
  const { prefix, dir } = detectAlias(cwd)
  const relative = alias === prefix ? "" : alias.startsWith(`${prefix}/`) ? alias.slice(prefix.length + 1) : alias
  return path.join(cwd, dir, relative)
}
