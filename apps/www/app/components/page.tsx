import { ComponentPreview } from "../../components/component-preview";

export default function Home() {
  return (
    <main className="min-h-screen p-12 bg-zinc-950 text-zinc-50 space-y-16">
      
      {/* =========================================================================
          NAVBAR REGISTRY SHOWCASE (Full-Width Previews)
          ========================================================================= */}
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Navbar Component</h1>
          <p className="text-sm text-zinc-400">
            A flexible navigation layout supporting glass matching variants, search architectures, and dynamic positioning.
          </p>
        </div>

        {/* This triggers the full-width render inside your updated ComponentPreview */}
        <ComponentPreview name="navbar" />
      </div>

      {/* =========================================================================
          CORE PRIMITIVES LAYER
          ========================================================================= */}
      <div id="components" className="max-w-4xl mx-auto space-y-12">
        {/* Button Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Button Component</h2>
          <ComponentPreview name="button" />
        </section>

        {/* New Input Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Input Component</h2>
          <p className="text-sm text-zinc-400">
            A flexible native wrapper for handling system forms:
          </p>
          <ComponentPreview name="input" />
        </section>

        {/* New Badge Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Badge Component</h2>
          <p className="text-sm text-zinc-400">
            A badge component for displaying small counts or labels:
          </p>
          <ComponentPreview name="badge" />
        </section>

        {/* New Switch Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Switch Component</h2>  
          <p className="text-sm text-zinc-400">
            A toggle switch component for boolean input:
          </p>
          <ComponentPreview name="switch" />
        </section>

        {/* New Skeleton Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Skeleton Component</h2>
          <p className="text-sm text-zinc-400">
            A skeleton component for displaying loading placeholders:
          </p>
          <ComponentPreview name="skeleton" />
        </section>

         {/* New Textarea Section */}
         <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Textarea Component</h2>
          <p className="text-sm text-zinc-400">
            A flexible native wrapper for handling multi-line text input:
          </p>
          <ComponentPreview name="textarea" />
        </section>

        {/* New Card Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Card Component</h2>
          <p className="text-sm text-zinc-400">
            A versatile card component for displaying content in a structured format:
          </p>
          <ComponentPreview name="card" />
        </section>

         {/* New Label Section */}
         <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Label Component</h2>
          <p className="text-sm text-zinc-400">
            A label component for form inputs and other UI elements:
          </p>
          <ComponentPreview name="label" />
        </section>
      </div>
    </main>
  );
}