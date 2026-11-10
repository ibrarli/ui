import { defineConfig } from "@playwright/test"

const baseURL = process.env.APEN_UI_TEST_URL ?? "http://127.0.0.1:3000"

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  expect: { timeout: 10_000 },
  outputDir: "./test-results",
  reporter: "list",
  use: {
    baseURL,
    browserName: "chromium",
    headless: true,
    launchOptions: process.env.PLAYWRIGHT_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH }
      : undefined,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "pnpm dev --hostname 127.0.0.1 --port 3000",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
