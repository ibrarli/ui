// Runs init and add against a throwaway project and checks the output.
import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

const cli = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist/index.js")
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "apen-ui-smoke-"))
const run = (...args) => execFileSync("node", [cli, ...args, "--cwd", dir, "--yes", "--no-install"], { encoding: "utf8" })

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
  assert.ok(output.includes("radix-ui") && output.includes("apen-icons"), "reports missing packages")
  assert.ok(!output.includes("clsx"), "skips packages already installed")

  fs.writeFileSync(path.join(dir, "src/components/ui/button.tsx"), "// mine\n")
  run("add", "button")
  assert.equal(fs.readFileSync(path.join(dir, "src/components/ui/button.tsx"), "utf8"), "// mine\n", "keeps existing files")
  run("add", "button", "--overwrite")
  assert.notEqual(fs.readFileSync(path.join(dir, "src/components/ui/button.tsx"), "utf8"), "// mine\n", "--overwrite replaces")

  run("add", "--all")
  const count = fs.readdirSync(path.join(dir, "src/components/ui")).length
  assert.equal(count, 22, "--all writes every component")

  console.log(`smoke test passed (${count} components)`)
} finally {
  fs.rmSync(dir, { recursive: true, force: true })
}
