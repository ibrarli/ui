import pc from "picocolors"

import { accent, banner, logger } from "../utils/logger"
import { Registry } from "../utils/registry"

const CATEGORY_ORDER = ["forms", "display", "feedback", "overlay", "navigation", "dashboard"]

export async function list(options: { registry?: string }) {
  banner()
  const index = (await new Registry(options.registry).index()).filter((item) => item.type === "registry:ui")

  const groups = new Map<string, typeof index>()
  for (const item of index) {
    const category = item.category ?? "other"
    groups.set(category, [...(groups.get(category) ?? []), item])
  }

  const categories = [...groups.keys()].sort(
    (a, b) => (CATEGORY_ORDER.indexOf(a) + 1 || 99) - (CATEGORY_ORDER.indexOf(b) + 1 || 99)
  )
  const width = Math.max(...index.map((item) => item.name.length)) + 2

  for (const category of categories) {
    logger.info(accent(pc.bold(category[0].toUpperCase() + category.slice(1))))
    for (const item of groups.get(category)!) {
      logger.info(`  ${item.name.padEnd(width)}${pc.dim(item.description ?? "")}`)
    }
    logger.break()
  }

  logger.info(`Add one with ${pc.bold("npx apen-ui add <name>")}`)
}
