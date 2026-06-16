#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_commander = require("commander");
var import_fs_extra = __toESM(require("fs-extra"));
var import_path = __toESM(require("path"));
var program = new import_commander.Command();
program.name("apen-ui").description("Add components directly to your codebase").version("0.1.0");
program.command("add").argument("[component]", "component name to add").action(async (componentName) => {
  try {
    const response = await fetch("https://apen-ui.com/registry.json");
    const registry = await response.json();
    const component = registry.find((c) => c.name === componentName);
    if (!component) {
      console.error(`\u274C Component "${componentName}" not found in registry.`);
      return;
    }
    const targetDir = import_path.default.join(process.cwd(), "components/ui");
    await import_fs_extra.default.ensureDir(targetDir);
    for (const file of component.files) {
      const filePath = import_path.default.join(targetDir, file.name);
      await import_fs_extra.default.writeFile(filePath, file.content);
      console.log(`\u2705 Created: ${file.name} at ${targetDir}`);
    }
    console.log("\n\u{1F449} Don't forget to install missing dependencies mentioned in your docs!");
  } catch (error) {
    console.error("\u274C Failed to fetch or write the component:", error);
  }
});
program.parse();
