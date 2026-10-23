# Apen UI docs

The docs site for [Apen UI](../../README.md): landing page, documentation, a page per component and a full dashboard example.

```bash
pnpm dev      # from the repository root, or `pnpm dev` here
pnpm build
```

- Components are imported from `packages/ui` through the `@/components/ui/*` and `@/lib/utils` paths in `tsconfig.json`, so the docs always render the same code the CLI installs.
- `examples/<name>-demo.tsx` is the preview on each component page, and its source is the code shown.
- `pnpm registry` (run automatically before `dev` and `build`) generates `public/r`, the JSON registry served at `/r/index.json` and `/r/<name>.json`.

When deploying to Vercel, set the project root to `apps/www`. Install and build use pnpm from the workspace root.
