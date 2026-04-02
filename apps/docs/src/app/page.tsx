"use client";
import { useState } from "react";
// Import both from your core library
import { Sidebar, Navbar } from "@apen-ui/core"; 

export default function Home() {
  // Shared state to control the layout
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 1. Sidebar: Receives the state and the setter */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />

      {/* 2. Content Wrapper: Flex-1 ensures it takes up the rest of the screen */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 3. Navbar: The toggle button here controls the Sidebar */}
        <Navbar 
          onToggleSidebar={() => setIsCollapsed(!isCollapsed)} 
          userName="Ibrar Naroo"
          userRole="Software Developer"
        />

        {/* 4. Page Content */}
        <main className="p-10 transition-all duration-300">
          <div className="max-w-5xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Welcome to Apen<span className="text-[#E7B339]">UI</span> Web
              </h1>
              <p className="text-slate-500 mt-1 text-sm">
                The sidebar and navbar are now synced using React state.
              </p>
            </header>

            {/* Placeholder for your actual dashboard content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                   <div className="w-10 h-10 bg-slate-50 rounded-lg mb-3 animate-pulse" />
                   <div className="h-2 w-24 bg-slate-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}