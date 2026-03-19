import { Button, Card } from "@apen-ui/core";
import { Triangle } from "apen-icons";

function App() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 selection:bg-blue-500/30">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#030712]/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Triangle className="text-white h-5 w-5 fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">ApenUi</span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Components</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Docs</a>
            <Button variant="glass" size="sm">GitHub</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="mb-24 text-center">
          <h1 className="text-6xl font-extrabold text-white mb-6 tracking-tighter">
            Build <span className="text-blue-500">Smoother</span> Interfaces.
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A premium React component library built with Tailwind CSS v4. 
            Designed for high-end aesthetics and "smooth" UX.
          </p>
        </section>

        {/* Component Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Button Showcase */}
          <Card className="flex flex-col gap-6 p-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-blue-500/10 border border-blue-500/20">
                <Triangle className="text-blue-500 h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">Buttons</h2>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button>Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="glass">Glass</Button>
            </div>
            
            <p className="text-sm text-slate-500">
              Interactive buttons with multiple variants and high-contrast layouts.
            </p>
          </Card>

          {/* Card Showcase - Using the component to show itself */}
          <Card className="flex flex-col gap-6">
             <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-purple-500/10 border border-purple-500/20">
                <Triangle className="text-purple-500 h-5 w-5 rotate-90" />
              </div>
              <h2 className="text-xl font-semibold text-white">Containers</h2>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center text-xs text-slate-400">
              Content inside a nested container
            </div>
            
            <p className="text-sm text-slate-500">
              Glass-morphism effects and polished borders for content grouping.
            </p>
          </Card>

          {/* Empty State / Coming Soon */}
          <Card className="flex flex-col items-center justify-center text-center border-dashed opacity-60">
            <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center mb-4">
              <Triangle className="text-slate-500 h-6 w-6 opacity-50" />
            </div>
            <span className="text-slate-400 font-medium">Coming Soon</span>
            <p className="text-xs text-slate-600 mt-2">Inputs, Modals, & Tooltips</p>
          </Card>

        </div>
      </main>

      <footer className="border-t border-white/5 py-12">
        <div className="container mx-auto px-6 flex justify-between items-center text-sm text-slate-600">
          <p>&copy; 2026 ApenUi. Build for the modern web.</p>
          <div className="flex gap-6">
             <a href="#" className="hover:text-white transition-colors">Twitter</a>
             <a href="#" className="hover:text-white transition-colors">NPM</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;