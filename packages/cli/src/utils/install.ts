import { spawn } from "node:child_process"

import type { PackageManager } from "./project"

export function installDependencies(cwd: string, pm: PackageManager, packages: string[]) {
  if (packages.length === 0) return Promise.resolve()

  const command = pm === "npm" ? "install" : "add"
  return new Promise<void>((resolve, reject) => {
    const child = spawn(pm, [command, ...packages], {
      cwd,
      stdio: "inherit",
      shell: process.platform === "win32",
    })
    child.on("error", reject)
    child.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`${pm} ${command} exited with code ${code}`))
    )
  })
}
