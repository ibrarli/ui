#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs-extra";
import path from "path";

const program = new Command();

program
  .name("apen-ui")
  .description("Add components directly to your codebase")
  .version("0.1.0");

program
  .command("add")
  .argument("[component]", "component name to add")
  .action(async (componentName) => {
    try {
      // 1. Fetch registry.json hosted on your live doc site
      const response = await fetch("https://apen-ui.com/registry.json");
      const registry = (await response.json()) as any[];

      // 2. Find target component
      const component = registry.find((c: any) => c.name === componentName);
      if (!component) {
        console.error(`❌ Component "${componentName}" not found in registry.`);
        return;
      }

      // 3. Write file locally to user's directory
      const targetDir = path.join(process.cwd(), "components/ui");
      await fs.ensureDir(targetDir);

      for (const file of component.files) {
        const filePath = path.join(targetDir, file.name);
        await fs.writeFile(filePath, file.content);
        console.log(`✅ Created: ${file.name} at ${targetDir}`);
      }
      
      console.log("\n👉 Don't forget to install missing dependencies mentioned in your docs!");
    } catch (error) {
      console.error("❌ Failed to fetch or write the component:", error);
    }
  });

program.parse();