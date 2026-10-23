import fs from "node:fs"
import path from "node:path"
import prompts from "prompts"
import pc from "picocolors"

import { CONFIG_FILE, readConfig, resolveAlias, writeConfig, type Config } from "../utils/config"
import { installDependencies } from "../utils/install"
import { banner, highlight, logger } from "../utils/logger"
import { detectAlias, detectCssFile, detectPackageManager, installedPackages } from "../utils/project"
import { Registry } from "../utils/registry"
import { transform } from "../utils/transform"

const THEME_MARKER = "Apen UI theme"

export type InitOptions = {
  cwd: string
  yes?: boolean
  force?: boolean
  install?: boolean
  registry?: string
  silent?: boolean
}

export async function init(options: InitOptions) {
  const cwd = path.resolve(options.cwd)
  if (!options.silent) banner()

  if (!fs.existsSync(path.join(cwd, "package.json"))) {
    throw new Error(`No package.json found in ${cwd}. Run this inside a React project.`)
  }

  const existing = readConfig(cwd)
  if (existing && !options.force && !options.silent) {
    logger.info(`${CONFIG_FILE} already exists. Use ${pc.bold("--force")} to set it up again.`)
    return existing
  }

  const { prefix } = detectAlias(cwd)
  const defaults: Config = {
    $schema: "https://cdn.jsdelivr.net/npm/apen-ui@latest/schema.json",
    tsx: fs.existsSync(path.join(cwd, "tsconfig.json")),
    rsc: fs.existsSync(path.join(cwd, "next.config.ts")) || fs.existsSync(path.join(cwd, "next.config.js")) || fs.existsSync(path.join(cwd, "next.config.mjs")),
    css: detectCssFile(cwd),
    aliases: {
      components: `${prefix}/components`,
      ui: `${prefix}/components/ui`,
      utils: `${prefix}/lib/utils`,
    },
  }

  let config = defaults
  if (!options.yes) {
    const answers = await prompts(
      [
        { type: "text", name: "css", message: "Where is your global CSS file?", initial: defaults.css },
        { type: "text", name: "ui", message: "Import alias for components:", initial: defaults.aliases.ui },
        { type: "text", name: "utils", message: "Import alias for utils:", initial: defaults.aliases.utils },
        { type: "toggle", name: "rsc", message: "Are you using React Server Components?", initial: defaults.rsc, active: "yes", inactive: "no" },
      ],
      { onCancel: () => process.exit(1) }
    )
    config = {
      ...defaults,
      css: answers.css,
      rsc: answers.rsc,
      aliases: {
        components: answers.ui.replace(/\/ui$/, ""),
        ui: answers.ui,
        utils: answers.utils,
      },
    }
  }

  writeConfig(cwd, config)
  logger.success(`Wrote ${CONFIG_FILE}`)

  const registry = new Registry(options.registry)
  const [utils, theme] = await Promise.all([registry.item("utils"), registry.item("theme")])

  // lib/utils.ts
  const utilsPath = `${resolveAlias(cwd, config.aliases.utils)}.${config.tsx ? "ts" : "js"}`
  if (!fs.existsSync(utilsPath) || options.force) {
    fs.mkdirSync(path.dirname(utilsPath), { recursive: true })
    fs.writeFileSync(utilsPath, transform(utils.files[0].content, config))
    logger.success(`Created ${path.relative(cwd, utilsPath)}`)
  }

  // Theme tokens in the global CSS file.
  const cssPath = path.join(cwd, config.css)
  const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, "utf8") : ""
  if (css.includes(THEME_MARKER) && !options.force) {
    logger.info(`Theme already present in ${config.css}`)
  } else {
    const withoutTailwind = css.replace(/@import\s+["']tailwindcss["'];?\s*\n?/, "")
    const next = `@import "tailwindcss";\n${theme.files[0].content}\n${withoutTailwind.trim() ? `\n${withoutTailwind.trim()}\n` : ""}`
    fs.mkdirSync(path.dirname(cssPath), { recursive: true })
    fs.writeFileSync(cssPath, next)
    logger.success(`Added the Apen theme to ${config.css}`)
  }

  const installed = installedPackages(cwd)
  const missing = [...utils.dependencies, ...theme.dependencies].filter((dep) => !installed.has(dep))
  if (options.install !== false && missing.length > 0) {
    const pm = detectPackageManager(cwd)
    logger.step(`Installing ${missing.join(", ")} with ${pm}`)
    await installDependencies(cwd, pm, missing)
  } else if (missing.length > 0) {
    logger.warn(`Install these packages yourself: ${missing.join(" ")}`)
  }

  if (!options.silent) {
    logger.break()
    logger.success(`${highlight("Apen UI")} is ready. Add your first component:`)
    logger.info(`\n  ${pc.bold("npx apen-ui add button card")}\n`)
    logger.dim("Tip: the theme uses Quicksand for headings and Plus Jakarta Sans for text.")
    logger.dim("Load them with next/font and expose --font-quicksand and --font-jakarta.")
  }

  return config
}
