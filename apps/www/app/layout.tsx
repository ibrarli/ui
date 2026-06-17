import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import { registry } from "@/__registry__/components";
// Explicitly import your navbar prop definitions from your local registry source structure
import type { NavbarProps } from "../../../packages/apen-ui/src/ui/navbar"; 
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apen UI Docs",
  description: "Advanced components engineered for pure full-stack applications.",
};

const mainNavigation = [
  { label: "Components", href: "#components" },
  { label: "Documentation", href: "/docs" },
  { label: "GitHub", href: "https://github.com/ibrarli/apen-ui" },
];

// Provide the exact prop types directly to the generic dynamic initializer layer
const DynamicNavbar = dynamic<NavbarProps>(
  () =>
    registry["navbar"].component().then((module: any) => {
      return module.Navbar || module.default;
    }),
  {
    loading: () => <div className="h-16 w-full bg-zinc-950 border-b border-zinc-900" />,
    ssr: true,
  }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-zinc-950 text-zinc-50 flex flex-col antialiased">
        {/* Global Registry-Driven Floating Header */}
        <DynamicNavbar 
          items={mainNavigation}
          theme="glass" 
          layout="center-nav"
          logoText="Apen UI"
          actionButtonText="Sign Up"
        />
        
        {/* Page Content Body */}
        <main className="flex-1 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}