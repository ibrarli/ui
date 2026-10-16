import pc from "picocolors"

// Apen brand colours in the terminal.
const orange = (text: string) => `\x1b[38;2;241;90;41m${text}\x1b[39m`
const blue = (text: string) => `\x1b[38;2;0;174;239m${text}\x1b[39m`

export const highlight = pc.isColorSupported ? orange : (text: string) => text
export const accent = pc.isColorSupported ? blue : (text: string) => text

export const logger = {
  info: (message: string) => console.log(message),
  success: (message: string) => console.log(`${pc.green("✔")} ${message}`),
  warn: (message: string) => console.log(`${pc.yellow("!")} ${message}`),
  error: (message: string) => console.error(`${pc.red("✖")} ${message}`),
  step: (message: string) => console.log(`${accent("›")} ${message}`),
  dim: (message: string) => console.log(pc.dim(message)),
  break: () => console.log(""),
}

export function banner() {
  console.log(`\n  ${highlight("●")} ${pc.bold("Apen UI")} ${pc.dim("by Apen Apps")}\n`)
}
