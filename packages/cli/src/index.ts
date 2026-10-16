import { Command } from "commander"

import { add } from "./commands/add"
import { init } from "./commands/init"
import { list } from "./commands/list"
import { logger } from "./utils/logger"
import pkg from "../package.json"

const program = new Command()
  .name("apen-ui")
  .description("Add rounded, dashboard-ready Apen UI components to your project.")
  .version(pkg.version, "-v, --version")

program
  .command("init")
  .description("set up Apen UI: apen.json, the cn() helper and the theme tokens")
  .option("-c, --cwd <path>", "the project directory", process.cwd())
  .option("-y, --yes", "accept the detected defaults", false)
  .option("-f, --force", "overwrite existing config, utils and theme", false)
  .option("--no-install", "do not install dependencies")
  .option("-r, --registry <url>", "use a hosted registry instead of the bundled one")
  .action(async (options) => {
    await init(options)
  })

program
  .command("add")
  .description("add components to your project")
  .argument("[components...]", "the components to add, e.g. button card sidebar")
  .option("-c, --cwd <path>", "the project directory", process.cwd())
  .option("-a, --all", "add every component", false)
  .option("-y, --yes", "skip confirmation prompts", false)
  .option("-o, --overwrite", "overwrite files that already exist", false)
  .option("-p, --path <path>", "write components to this folder instead of the ui alias")
  .option("--no-install", "do not install dependencies")
  .option("-r, --registry <url>", "use a hosted registry instead of the bundled one")
  .action((components, options) => add(components, options))

program
  .command("list")
  .description("list every available component")
  .option("-r, --registry <url>", "use a hosted registry instead of the bundled one")
  .action((options) => list(options))

program.parseAsync().catch((error: unknown) => {
  logger.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
