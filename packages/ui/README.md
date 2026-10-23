# @apen-ui/registry

The source of every Apen UI component. This package is private: nobody installs it. The `apen-ui` CLI and the docs site are built from it.

- `src/ui/*.tsx`: one file per component, importing `@/lib/utils` and `@/components/ui/*` just like a user's project.
- `src/styles/apen.css`: the theme tokens that `apen-ui init` adds to a project.
- `registry.mjs`: names, categories and descriptions.
- `scripts/build-registry.mjs`: writes the JSON registry to `apps/www/public/r` and `packages/cli/registry`, reading npm and component dependencies from each file's imports.

```bash
pnpm registry:build   # from the repository root
pnpm --filter @apen-ui/registry typecheck
```

See the [root README](../../README.md#adding-a-component) for how to add a component.
