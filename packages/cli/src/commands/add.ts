import { Command } from "commander";
import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const add = new Command()
  .name("add")
  .argument("<component>", "Component to add (e.g. dashboard-01)")
  .action(async (component) => {
    const cwd = process.cwd();
    
    // 1. Locate the template inside your package
    const templatePath = path.resolve(__dirname, "../templates", `${component}.tsx`);
    
    // 2. Define the user's target path
    const targetPath = path.join(cwd, "src", "components", "apenui", `${component}.tsx`);

    if (!fs.existsSync(templatePath)) {
      console.log(chalk.red(`Error: Component "${component}" not found.`));
      return;
    }

    try {
      await fs.ensureDir(path.dirname(targetPath));
      await fs.copy(templatePath, targetPath);
      console.log(chalk.green(`✔ Added ${component} to src/components/apenui/`));
    } catch (err) {
      console.log(chalk.red("Error copying files."));
    }
  });