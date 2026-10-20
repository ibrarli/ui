import { CodeBlock } from "@/components/code-block"
import { CommandTabs } from "@/components/command-tabs"
import { PageHeader } from "../page-header"

export const metadata = { title: "Installation" }

const fonts = `import { Plus_Jakarta_Sans, Quicksand } from "next/font/google"

const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand" })
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={\`\${quicksand.variable} \${jakarta.variable}\`}>
      <body>{children}</body>
    </html>
  )
}`

const usage = `import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button variant="brand">Get started</Button>
}`

export default function InstallationPage() {
  return (
    <>
      <PageHeader
        title="Installation"
        description="Set up Apen UI in a React project that uses Tailwind CSS v4."
      />

      <h2>1. Create a project</h2>
      <p>
        Any React app with Tailwind CSS v4 works: Next.js, Vite or React Router. Starting from scratch? Use{" "}
        <a href="https://www.npmjs.com/package/create-apen">create-apen</a> and pick Tailwind CSS when asked, or run{" "}
        <code>npx create-next-app@latest</code>.
      </p>

      <h2>2. Run init</h2>
      <p>
        <code>init</code> writes <code>apen.json</code>, adds the <code>cn()</code> helper to{" "}
        <code>lib/utils.ts</code>, puts the Apen theme tokens into your global CSS and installs{" "}
        <code>clsx</code>, <code>tailwind-merge</code> and <code>tw-animate-css</code>.
      </p>
      <CommandTabs args="init" className="mt-4" />

      <h2>3. Add components</h2>
      <p>Add only what you need. Dependencies between components are resolved for you.</p>
      <CommandTabs args="add button card sidebar" className="mt-4" />
      <p>
        Want everything? Run <code>npx apen-ui add --all</code>.
      </p>

      <h2>4. Load the fonts</h2>
      <p>
        The theme uses Quicksand for headings and Plus Jakarta Sans for text. Load them with <code>next/font</code>{" "}
        and expose them as <code>--font-quicksand</code> and <code>--font-jakarta</code>. Without them the theme
        falls back to your system font.
      </p>
      <CodeBlock code={fonts} title="app/layout.tsx" className="mt-4" />

      <h2>5. Use it</h2>
      <CodeBlock code={usage} title="app/page.tsx" className="mt-4" />
    </>
  )
}
