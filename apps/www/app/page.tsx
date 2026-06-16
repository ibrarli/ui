import React from "react"

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-zinc-800 selection:text-zinc-200">
      {/* Background Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950 to-zinc-950 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32 space-y-20">
        
        {/* Hero Section */}
        <header className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            v1.0.0 Production Ready
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-400">
            Apen UI
          </h1>
          
          <p className="text-base md:text-xl text-zinc-400 leading-relaxed font-normal">
            An production-grade, highly optimized primitive component layer engineered for pure full-stack applications. Fully customizable, accessible, and designed to integrate seamlessly into modern workspace systems.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="#components" 
              className="w-full sm:w-auto px-6 py-3 text-sm font-medium bg-zinc-50 text-zinc-950 hover:bg-zinc-200 transition-colors rounded-lg text-center shadow-lg shadow-zinc-950/20"
            >
              Explore Components
            </a>
            <a 
              href="https://github.com/ibrarli/apen-ui" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 text-sm font-medium bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all rounded-lg text-center text-zinc-300"
            >
              View GitHub Repo
            </a>
          </div>
        </header>

        {/* Installation Terminal Section */}
        <section className="max-w-xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-zinc-800/60">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-zinc-700" />
                <span className="w-3 h-3 rounded-full bg-zinc-700" />
                <span className="w-3 h-3 rounded-full bg-zinc-700" />
              </div>
              <span className="text-xs text-zinc-500 font-mono">bash</span>
            </div>
            <div className="p-5 font-mono text-sm text-zinc-300 bg-zinc-950/40 space-y-2">
              <p className="text-zinc-600"># Install the pure system registry tool</p>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 select-none">$</span>
                <span>pnpm add apen-ui</span>
              </div>
            </div>
          </div>
        </section>

        {/* Architectural Features Grid */}
        <section id="components" className="space-y-8 pt-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">System Core Architecture</h2>
            <p className="text-sm text-zinc-400">Every component is engineered for performance, strict type safety, and clean clean extension mapping.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-xl space-y-3 hover:border-zinc-800 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 font-bold text-sm">C</div>
              <h3 className="font-semibold text-zinc-100">Control & Form Primitives</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Includes fully modular primitives: <code className="text-zinc-300 text-xs font-mono">Button</code>, <code className="text-zinc-300 text-xs font-mono">Input</code>, <code className="text-zinc-300 text-xs font-mono">Textarea</code>, and <code className="text-zinc-300 text-xs font-mono">Label</code> built with Radix structures.
              </p>
            </div>

            <div className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-xl space-y-3 hover:border-zinc-800 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 font-bold text-sm">V</div>
              <h3 className="font-semibold text-zinc-100">Variant Authority</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Powered directly by <code className="text-zinc-300 text-xs font-mono">class-variance-authority</code> to safely organize UI design tokens, layout sizes, and states like <code className="text-zinc-300 text-xs font-mono">Badge</code>.
              </p>
            </div>

            <div className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-xl space-y-3 hover:border-zinc-800 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 font-bold text-sm">S</div>
              <h3 className="font-semibold text-zinc-100">Structural Layout</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Clean interactive systems featuring <code className="text-zinc-300 text-xs font-mono">Switch</code> toggle architectures, asynchronous layout <code className="text-zinc-300 text-xs font-mono">Skeleton</code> placeholders, and <code className="text-zinc-300 text-xs font-mono">Card</code> configurations.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-16 border-t border-zinc-900 text-center text-xs text-zinc-600 font-mono">
          <p>© {new Date().getFullYear()} Apen Apps. Engineered for scale.</p>
        </footer>
      </div>
    </main>
  )
}