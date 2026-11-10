import { transform as transformTypescript } from "sucrase"

import type { Config } from "./config"

/** Rewrites registry imports to the aliases in the user's apen.json. */
export function transform(content: string, config: Config) {
  let output = content
    .replace(/(["'])@\/components\/ui\//g, `$1${config.aliases.ui}/`)
    .replace(/(["'])@\/lib\/utils\1/g, `$1${config.aliases.utils}$1`)

  if (!config.rsc) output = output.replace(/^["']use client["'];?\s*\n/, "")

  if (!config.tsx) {
    output = transformTypescript(output, {
      transforms: ["typescript", "jsx"],
      jsxRuntime: "preserve",
      disableESTransforms: true,
    }).code
  }

  return output
}
