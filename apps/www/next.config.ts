import path from "node:path";
import type { NextConfig } from "next";

// Components live in packages/ui, outside this app, so Turbopack and file
// tracing need the monorepo root.
const monorepoRoot = path.join(__dirname, "../..");

const nextConfig: NextConfig = {
  turbopack: {
    root: monorepoRoot,
  },
  outputFileTracingRoot: monorepoRoot,
};

export default nextConfig;
