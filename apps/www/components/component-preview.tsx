"use client";

import React, { useState, useMemo } from "react";
import { registry } from "@/__registry__/components";

interface PreviewProps {
  name: string;
}

export function ComponentPreview({ name }: PreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const registryItem = useMemo(() => registry[name], [name]);

  if (!registryItem) {
    return (
      <p className="text-red-500">
        Component "{name}" not found in local workspace registry.
      </p>
    );
  }

  const LazyComponent = useMemo(() => {
    return React.lazy(() =>
      registryItem.component().then((module: any) => {
        const exportName = name.charAt(0).toUpperCase() + name.slice(1);
        return { default: module[exportName] || module.default };
      }),
    );
  }, [name, registryItem]);

  const codeString = registryItem.raw;

  return (
    <div className="w-full my-6 border border-zinc-200 rounded-lg dark:border-zinc-800 overflow-hidden">
      {/* Tab Controls */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-4 py-2 gap-4 text-sm font-medium">
        <button
          onClick={() => setActiveTab("preview")}
          className={`pb-1 ${activeTab === "preview" ? "text-blue-600 border-b-2 border-blue-600" : "text-zinc-500"}`}
        >
          Preview
        </button>
        <button
          onClick={() => setActiveTab("code")}
          className={`pb-1 ${activeTab === "code" ? "text-blue-600 border-b-2 border-blue-600" : "text-zinc-500"}`}
        >
          Code
        </button>
      </div>

      {/* Display Panel */}
      <div className="p-6 bg-white dark:bg-zinc-950">
        {activeTab === "preview" ? (
          <div className="flex justify-center items-center min-h-[150px] w-full max-w-sm mx-auto">
            <React.Suspense
              fallback={
                <div className="text-sm text-zinc-500">
                  Loading component view...
                </div>
              }
            >
              {/* Conditional rendering depending on component needs */}
              {/* Conditional rendering depending on component needs */}
              {name === "input" ? (
                <LazyComponent placeholder="Type something..." />
              ) : name === "textarea" ? (
                <LazyComponent placeholder="Type your message here..." />
              ) : name === "skeleton" ? (
                <div className="flex items-center space-x-4 w-full max-w-[250px]">
                  <LazyComponent className="h-12 w-12 rounded-full shrink-0" />
                  <div className="space-y-2 w-full">
                    <LazyComponent className="h-4 w-[200px]" />
                    <LazyComponent className="h-4 w-[160px]" />
                  </div>
                </div>
              ) : name === "badge" ? (
                <div className="flex gap-2 justify-center items-center">
                  <LazyComponent variant="default">Default</LazyComponent>
                  <LazyComponent variant="secondary">Secondary</LazyComponent>
                  <LazyComponent variant="outline">Outline</LazyComponent>
                </div>
              ) : name === "switch" ? (
                <div className="flex items-center space-x-2">
                  <LazyComponent id="airplane-mode" />
                  <label
                    htmlFor="airplane-mode"
                    className="text-sm font-medium text-zinc-400"
                  >
                    Airplane Mode
                  </label>
                </div>
              ) : name === "label" ? (
                <div className="w-full max-w-xs space-y-2">
                  <LazyComponent htmlFor="email-input">
                    Email Address
                  </LazyComponent>
                  <input
                    id="email-input"
                    className="flex h-10 w-full rounded-md border border-zinc-800 bg-transparent px-3 py-2 text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              ) : name === "card" ? (
                <div className="w-full max-w-sm">
                  {/* Since Card has complex compound parts, we can render a clean structural demo representation */}
                  <div className="rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 p-6 space-y-2">
                    <h3 className="font-semibold text-xl leading-none">
                      Create project
                    </h3>
                    <p className="text-sm text-zinc-500">
                      Deploy your new project in one-click.
                    </p>
                    <div className="h-10 w-full bg-zinc-100 dark:bg-zinc-900 rounded-md mt-4"></div>
                  </div>
                </div>
              ) : (
                <LazyComponent>Button</LazyComponent>
              )}
            </React.Suspense>
          </div>
        ) : (
          <pre className="p-4 bg-zinc-900 text-zinc-100 rounded-md overflow-x-auto text-xs font-mono leading-relaxed">
            <code>{codeString}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
