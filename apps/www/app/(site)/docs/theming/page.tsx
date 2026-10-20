import { CodeBlock } from "@/components/code-block"
import { PageHeader } from "../page-header"

export const metadata = { title: "Theming" }

const tokens = [
  ["--primary", "Main actions, active states and focus rings", "#f15a29"],
  ["--brand-orange / --brand-blue", "The two stops of the Apen gradient", "#f15a29 → #00aeef"],
  ["--background / --foreground", "Page colour and default text", "#ffffff / #111827"],
  ["--card", "Tonal surface behind cards, stat cards and alerts", "#f8f9fa"],
  ["--muted / --muted-foreground", "Quiet fills and secondary text", "#f1f3f4 / #5f6368"],
  ["--accent", "Hover background for ghost buttons and menu items", "#f1f3f4"],
  ["--border / --input", "Hairlines and form control borders", "#e8eaed / #dadce0"],
  ["--success / --warning / --destructive / --info", "Status colours for badges, alerts and trends", ""],
  ["--sidebar*", "Sidebar surface, hover and border", ""],
  ["--radius", "Base radius. Cards use 2×, menus 1.5×", "1rem"],
]

const override = `:root {
  --primary: #00aeef;   /* blue as the main colour */
  --radius: 0.75rem;    /* a little less round */
}

.dark {
  --primary: #33bef2;
}`

const utilities = `<Button variant="brand">Gradient button</Button>
<h1 className="text-brand-gradient">Gradient text</h1>
<div className="bg-brand-gradient rounded-3xl p-6 text-white">Gradient surface</div>`

export default function ThemingPage() {
  return (
    <>
      <PageHeader
        title="Theming"
        description="Every colour and radius is a CSS variable. Change one line and every component follows."
      />
      <p>
        <code>apen-ui init</code> adds the theme to your global CSS. Token names match shadcn/ui, so themes and
        knowledge from that ecosystem carry over. Dark mode uses a <code>.dark</code> class on <code>html</code>.
      </p>

      <h2>Tokens</h2>
      <div className="mt-4 overflow-x-auto rounded-3xl border border-border/60">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs font-semibold text-muted-foreground uppercase">
            <tr>
              <th className="px-4 py-3">Variable</th>
              <th className="px-4 py-3">Used for</th>
              <th className="px-4 py-3">Light</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map(([name, use, value]) => (
              <tr key={name} className="border-t border-border/60">
                <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">{name}</td>
                <td className="px-4 py-3 text-muted-foreground">{use}</td>
                <td className="px-4 py-3 font-mono text-xs whitespace-nowrap text-muted-foreground">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Overriding</h2>
      <p>Redefine any variable after the theme block in your global CSS.</p>
      <CodeBlock code={override} lang="css" title="app/globals.css" className="mt-4" />

      <h2>Brand utilities</h2>
      <p>
        The theme adds <code>bg-brand-gradient</code> and <code>text-brand-gradient</code>, plus the{" "}
        <code>brand</code> variant on buttons, badges and stat card icons.
      </p>
      <CodeBlock code={utilities} className="mt-4" />
    </>
  )
}
