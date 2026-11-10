// Every item the CLI can install. Dependencies are read from each file's
// imports at build time, so only metadata lives here.
export const registry = [
  {
    name: "utils",
    type: "registry:lib",
    title: "Utils",
    description: "The cn() helper that merges Tailwind classes.",
    files: ["lib/utils.ts"],
  },
  {
    name: "theme",
    type: "registry:style",
    title: "Theme",
    description: "Apen design tokens for light and dark mode.",
    files: ["styles/apen.css"],
    dependencies: ["tw-animate-css"],
  },

  // Forms
  { name: "button", category: "forms", description: "Pill-shaped button with brand, soft and ghost variants." },
  { name: "input", category: "forms", description: "Rounded text field with a soft focus ring." },
  { name: "textarea", category: "forms", description: "Multi-line text field that grows with its content." },
  { name: "label", category: "forms", description: "Accessible label for form controls." },
  { name: "checkbox", category: "forms", description: "Rounded checkbox built on Radix." },
  { name: "switch", category: "forms", description: "Toggle between on and off." },
  { name: "select", category: "forms", description: "Choose one option from a rounded popover list." },

  // Display
  { name: "badge", category: "display", description: "Small status pill in soft or solid tones." },
  { name: "avatar", category: "display", description: "Round user image with a fallback." },
  { name: "card", category: "display", description: "Rounded surface that groups related content." },
  { name: "table", category: "display", description: "Rounded data table for dashboards." },
  { name: "skeleton", category: "display", description: "Placeholder shown while content loads." },
  { name: "progress", category: "display", description: "Progress bar filled with the brand gradient." },
  { name: "separator", category: "display", description: "Visual divider between content." },
  { name: "accordion", category: "display", description: "Expandable sections with keyboard navigation and smooth transitions." },

  // Feedback & overlays
  { name: "alert", category: "feedback", description: "Callout for info, success, warning and errors." },
  { name: "tooltip", category: "feedback", description: "Short hint that appears on hover or focus." },
  { name: "dialog", category: "overlay", description: "Modal window over a blurred backdrop." },
  { name: "dropdown-menu", category: "overlay", description: "Menu of actions opened from a trigger." },
  { name: "tabs", category: "navigation", description: "Switch between views with pill tabs." },
  { name: "breadcrumb", category: "navigation", description: "Responsive navigation trail with accessible current-page labels." },
  { name: "pagination", category: "navigation", description: "Pill-shaped page controls with active and disabled states." },

  // Dashboard
  { name: "navbar", category: "dashboard", description: "Floating pill or full-width top navigation." },
  { name: "sidebar", category: "dashboard", description: "Collapsible dashboard sidebar with a mobile drawer." },
  { name: "stat-card", category: "dashboard", description: "KPI tile with icon, value and trend." },
]
