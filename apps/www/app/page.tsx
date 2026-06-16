import { ComponentPreview } from "../components/component-preview";

export default function Home() {
  return (
    <main className="min-h-screen p-12 bg-zinc-950 text-zinc-50">
      <div className="max-w-4xl mx-auto space-y-12">
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
          {/* Matches the filename "input.tsx" automatically */}
          <ComponentPreview name="input" />
        </section>

        {/* New Badge Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Badge Component</h2>
          <p className="text-sm text-zinc-400">
            A badge component for displaying small counts or labels:
          </p>
          {/* Matches the filename "badge.tsx" automatically */}
          <ComponentPreview name="badge" />
        </section>

        {/* New Switch Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Switch Component</h2>  
          <p className="text-sm text-zinc-400">
            A toggle switch component for boolean input:
          </p>
          {/* Matches the filename "switch.tsx" automatically */}
          <ComponentPreview name="switch" />
        </section>

        {/* New Skeleton Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Skeleton Component</h2>
          <p className="text-sm text-zinc-400">
            A skeleton component for displaying loading placeholders:
          </p>
          {/* Matches the filename "skeleton.tsx" automatically */}
          <ComponentPreview name="skeleton" />
        </section>

         {/* New Textarea Section */}
         <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Textarea Component</h2>
          <p className="text-sm text-zinc-400">
            A flexible native wrapper for handling multi-line text input:
          </p>
          {/* Matches the filename "textarea.tsx" automatically */}
          <ComponentPreview name="textarea" />
        </section>

          {/* New Card Section */}
          <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Card Component</h2>
          <p className="text-sm text-zinc-400">
            A versatile card component for displaying content in a structured format:
          </p>
          {/* Matches the filename "card.tsx" automatically */}
          <ComponentPreview name="card" />
        </section>

         {/* New Label Section */}
         <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Label Component</h2>
          <p className="text-sm text-zinc-400">
            A label component for form inputs and other UI elements:
          </p>
          {/* Matches the filename "label.tsx" automatically */}
          <ComponentPreview name="label" />
        </section>
      </div>
    </main>
  );
}