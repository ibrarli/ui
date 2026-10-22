import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard example",
  description: "A complete dashboard built only from Apen UI components.",
}

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
