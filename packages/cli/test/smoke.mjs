// Runs init and add against a throwaway project and checks the output.
import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { transform } from "sucrase"

const cli = process.env.APEN_UI_CLI_PATH ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist/index.js")
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "apen-ui-smoke-"))
const jsDir = fs.mkdtempSync(path.join(os.tmpdir(), "apen-ui-smoke-js-"))
const runIn = (cwd, ...args) => execFileSync("node", [cli, ...args, "--cwd", cwd, "--yes", "--no-install"], { encoding: "utf8" })
const run = (...args) => runIn(dir, ...args)
const checkJavaScript = (source) => execFileSync("node", ["--check", "--input-type=module"], { input: source, encoding: "utf8" })

try {
  fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify({ name: "smoke", dependencies: { clsx: "*" } }))
  fs.writeFileSync(path.join(dir, "next.config.ts"), "export default {}\n")
  fs.writeFileSync(
    path.join(dir, "tsconfig.json"),
    `{
  // comments and trailing commas are allowed
  "compilerOptions": { "paths": { "~/*": ["./src/*"], }, },
}`
  )
  fs.mkdirSync(path.join(dir, "src/app"), { recursive: true })
  fs.writeFileSync(path.join(dir, "src/app/globals.css"), `@import "tailwindcss";\n\n.custom { color: red; }\n`)

  run("init")
  const config = JSON.parse(fs.readFileSync(path.join(dir, "apen.json"), "utf8"))
  assert.equal(config.css, "src/app/globals.css")
  assert.equal(config.aliases.ui, "~/components/ui")
  assert.equal(config.rsc, true)
  assert.ok(fs.existsSync(path.join(dir, "src/lib/utils.ts")))

  const css = fs.readFileSync(path.join(dir, "src/app/globals.css"), "utf8")
  assert.ok(css.startsWith(`@import "tailwindcss";`))
  assert.ok(css.includes("Apen UI theme"))
  assert.ok(css.includes(".custom { color: red; }"), "keeps existing CSS")

  const output = run("add", "sidebar")
  for (const name of ["sidebar", "button", "tooltip"]) {
    assert.ok(fs.existsSync(path.join(dir, `src/components/ui/${name}.tsx`)), `${name}.tsx written`)
  }
  const sidebar = fs.readFileSync(path.join(dir, "src/components/ui/sidebar.tsx"), "utf8")
  assert.ok(sidebar.includes(`from "~/lib/utils"`), "rewrites the utils alias")
  assert.ok(sidebar.includes(`from "~/components/ui/button"`), "rewrites the ui alias")
  assert.ok(!sidebar.includes("@/"), "no registry aliases left")
  assert.ok(sidebar.startsWith(`"use client"`), "keeps client directives for RSC projects")
  assert.ok(output.includes("radix-ui") && output.includes("apen-icons"), "reports missing packages")
  assert.ok(!output.includes("clsx"), "skips packages already installed")

  fs.writeFileSync(path.join(dir, "src/components/ui/button.tsx"), "// mine\n")
  run("add", "button")
  assert.equal(fs.readFileSync(path.join(dir, "src/components/ui/button.tsx"), "utf8"), "// mine\n", "keeps existing files")
  run("add", "button", "--overwrite")
  assert.notEqual(fs.readFileSync(path.join(dir, "src/components/ui/button.tsx"), "utf8"), "// mine\n", "--overwrite replaces")

  run("add", "--all")
  const count = fs.readdirSync(path.join(dir, "src/components/ui")).length
  assert.equal(count, 25, "--all writes every component")
  for (const name of ["accordion", "breadcrumb", "pagination"]) {
    assert.ok(fs.existsSync(path.join(dir, `src/components/ui/${name}.tsx`)), `${name}.tsx installed`)
  }

  fs.writeFileSync(path.join(jsDir, "package.json"), JSON.stringify({ name: "smoke-js", type: "module" }))
  fs.writeFileSync(
    path.join(jsDir, "jsconfig.json"),
    JSON.stringify({ compilerOptions: { paths: { "@/*": ["./src/*"] } } })
  )
  fs.mkdirSync(path.join(jsDir, "src"), { recursive: true })
  fs.writeFileSync(path.join(jsDir, "src/index.css"), `@import "tailwindcss";\n`)

  runIn(jsDir, "init")
  const jsConfig = JSON.parse(fs.readFileSync(path.join(jsDir, "apen.json"), "utf8"))
  assert.equal(jsConfig.tsx, false, "detects JavaScript projects")
  assert.equal(jsConfig.rsc, false)
  const jsUtils = fs.readFileSync(path.join(jsDir, "src/lib/utils.js"), "utf8")
  checkJavaScript(jsUtils)

  runIn(jsDir, "add", "--all")
  const jsUiDir = path.join(jsDir, "src/components/ui")
  const jsFiles = fs.readdirSync(jsUiDir)
  assert.equal(jsFiles.length, count, "--all writes every JavaScript component")
  for (const name of jsFiles) {
    assert.ok(name.endsWith(".jsx"), `${name} uses the JSX extension`)
    const source = fs.readFileSync(path.join(jsUiDir, name), "utf8")
    assert.ok(!/^["']use client["']/.test(source), `${name} omits client directives outside RSC projects`)
    // The JSX-only parser rejects TypeScript syntax while compiling the JSX for node --check.
    const { code } = transform(source, { transforms: ["jsx"], disableESTransforms: true })
    checkJavaScript(code)
  }
  const jsButton = fs.readFileSync(path.join(jsUiDir, "button.jsx"), "utf8")
  assert.ok(jsButton.includes("<Comp"), "preserves JSX in JavaScript components")
  const jsSidebar = fs.readFileSync(path.join(jsUiDir, "sidebar.jsx"), "utf8")
  assert.ok(jsSidebar.includes(`from "@/lib/utils"`), "preserves the configured JavaScript alias")

  jsConfig.rsc = true
  fs.writeFileSync(path.join(jsDir, "apen.json"), JSON.stringify(jsConfig))
  runIn(jsDir, "add", "sidebar", "--overwrite")
  assert.ok(
    fs.readFileSync(path.join(jsUiDir, "sidebar.jsx"), "utf8").startsWith(`"use client"`),
    "keeps client directives for JavaScript RSC projects"
  )

  console.log(`smoke test passed (${count} TypeScript and ${jsFiles.length} JavaScript components)`)
} finally {
  fs.rmSync(dir, { recursive: true, force: true })
  fs.rmSync(jsDir, { recursive: true, force: true })
}
