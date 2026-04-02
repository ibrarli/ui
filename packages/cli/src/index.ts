#!/usr/bin/env node
import { Command } from "commander";
import { add } from "./commands/add.js";

const program = new Command();

program
  .name("apenui")
  .description("Build your next big project faster with ApenUI")
  .version("0.0.1");

program.addCommand(add);

program.parse();