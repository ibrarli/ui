import fs from "node:fs"
import path from "node:path"
import prompts from "prompts"
import pc from "picocolors"

import { readConfig, resolveAlias } from "../utils/config"
import { installDependencies } from "../utils/install"
import { banner, highlight, logger } from "../utils/logger"
import { detectPackageManager, installedPackages } from "../utils/project"
import { Registry } from "../utils/registry"
import { transform } from "../utils/transform"
import { init } from "./init"

export type AddOptions = {
  cwd: string
  yes?: boolean
  overwrite?: boolean
  all?: boolean
  path?: string
  install?: boolean
  registry?: string
}

export async function add(components: string[], options: AddOptions) {
  const cwd = path.resolve(options.cwd)
  banner()

  const registry = new Registry(options.registry)

  let config = readConfig(cwd)
  if (!config) {
    const { proceed } = options.yes
      ? { proceed: true }
      : await prompts({
          type: "confirm",
          name: "proceed",
          message: "This project is not set up for Apen UI yet. Run init now?",
          initial: true,
        })
    if (!proceed) {
      logger.info(`Run ${pc.bold("npx apen-ui init")} first.`)
      return
    }
    config = await init({ cwd, yes: options.yes, install: options.install, registry: options.registry, silent: true })
  }

  let names = components
  if (options.all || names.length === 0) {
    const index = (await registry.index()).filter((item) => item.type === "registry:ui")
    if (options.all) {
      names = index.map((item) => item.name)
    } else {
      const { selected } = await prompts({
        type: "autocompleteMultiselect",
        name: "selected",
        message: "Which components do you want to add?",
        choices: index.map((item) => ({ title: item.name, description: item.description, value: item.name })),
        hint: "space to select, enter to confirm",
        instructions: false,
      })
      names = selected ?? []
    }
  }

  if (names.length === 0) {
    logger.warn("Nothing selected.")
    return
  }

  const items = await registry.resolve(names)
  const uiDir = options.path ? path.resolve(cwd, options.path) : resolveAlias(cwd, config.aliases.ui)
  const utilsPath = `${resolveAlias(cwd, config.aliases.utils)}.${config.tsx ? "ts" : "js"}`

  const written: string[] = []
  const skipped: string[] = []
  const dependencies = new Set<string>()

  for (const item of items) {
    if (item.type === "registry:style") continue
    item.dependencies.forEach((dep) => dependencies.add(dep))

    for (const file of item.files) {
      const target =
        file.type === "registry:lib"
          ? utilsPath
          : path.join(uiDir, path.basename(file.path).replace(/\.tsx$/, config.tsx ? ".tsx" : ".jsx"))
      const relative = path.relative(cwd, target)

      if (fs.existsSync(target)) {
        // utils and components pulled in as dependencies are never overwritten silently.
        const requested = names.includes(item.name)
        let overwrite = options.overwrite && requested
        if (!overwrite && requested && !options.yes) {
          ;({ overwrite } = await prompts({
            type: "confirm",
            name: "overwrite",
            message: `${relative} already exists. Overwrite it?`,
            initial: false,
          }))
        }
        if (!overwrite) {
          skipped.push(relative)
          continue
        }
      }

      fs.mkdirSync(path.dirname(target), { recursive: true })
      fs.writeFileSync(target, transform(file.content, config))
      written.push(relative)
    }
  }

  written.forEach((file) => logger.success(`Created ${file}`))
  skipped.forEach((file) => logger.dim(`  Skipped ${file} (already exists)`))

  const installed = installedPackages(cwd)
  const missing = [...dependencies].filter((dep) => !installed.has(dep)).sort()
  if (missing.length > 0) {
    if (options.install === false) {
      logger.warn(`Install these packages yourself: ${missing.join(" ")}`)
    } else {
      const pm = detectPackageManager(cwd)
      logger.step(`Installing ${missing.join(", ")} with ${pm}`)
      await installDependencies(cwd, pm, missing)
    }
  }

  logger.break()
  logger.success(`Done. Import from ${highlight(`"${config.aliases.ui}/${names[0]}"`)}.`)
}
