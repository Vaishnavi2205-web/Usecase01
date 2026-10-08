import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const testDir = defineBddConfig({
  features: "src/features/**/*.feature",
  steps: "src/steps/**/*.ts",
});

export default defineConfig({
  testDir,

  fullyParallel: true,

  reporter: "html",
  timeout: 120_000,
  workers: process.env.CI ? 1 : undefined,

  use: {
    headless: !!process.env.CI,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
