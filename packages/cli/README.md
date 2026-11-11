<p align="center">
  <img alt="Apen UI by Apen Apps" src="https://cdn.jsdelivr.net/npm/apen-ui@latest/banner.svg" width="100%">
</p>

# apen-ui

Add rounded, dashboard-ready React components to your project. Like shadcn/ui, the CLI copies each component's source into your codebase, so you own it. Built by [Apen Apps](https://www.apenapps.com).

```bash
npx apen-ui@latest init
npx apen-ui@latest add button card sidebar
```

## Commands

### `init`

Writes `apen.json`, adds `cn()` to `lib/utils.ts`, adds the Apen theme to your global CSS and installs `clsx`, `tailwind-merge` and `tw-animate-css`. It detects your import alias (from `tsconfig.json`), CSS file and package manager.

```
-c, --cwd <path>      the project directory
-y, --yes             accept the detected defaults
-f, --force           overwrite existing config, utils and theme
--no-install          do not install dependencies
-r, --registry <url>  use a hosted registry instead of the bundled one
```

### `add [components...]`

Adds components plus the components they depend on, rewrites imports to your aliases and installs missing packages. Run it with no arguments to choose from a list.

```
-a, --all             add every component
-y, --yes             skip confirmation prompts
-o, --overwrite       overwrite files that already exist
-p, --path <path>     write components to this folder instead of the ui alias
--no-install          do not install dependencies
```

### `list`

Prints every component, grouped by category.

## Components

`sidebar` `navbar` `stat-card` `button` `input` `textarea` `label` `checkbox` `switch` `select` `radio-group` `slider` `toggle` `toggle-group` `card` `table` `badge` `avatar` `skeleton` `progress` `separator` `accordion` `collapsible` `alert` `tooltip` `dialog` `dropdown-menu` `popover` `tabs` `breadcrumb` `pagination`

## Requirements

- Node.js 20+
- React 19 and Tailwind CSS v4

Full documentation, theming and the dashboard example: [github.com/ibrarli/ui](https://github.com/ibrarli/ui).

## License

MIT © [Apen Apps](https://www.apenapps.com)
