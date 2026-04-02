"use client";
import { useState } from 'react';
import { Sidebar, Navbar } from '@apen-ui/core'; // Adjust imports as needed
import { cn } from '../../lib/utils';

interface Dashboard01Props {
  isDark: boolean;
  onToggleTheme: () => void;
  userName?: string;
  userRole?: string;
}

export const Dashboard01 = ({ isDark, onToggleTheme, userName, userRole }: Dashboard01Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    // This outer div MUST have the dark mode classes
    <div className="flex flex-col h-screen w-full bg-white dark:bg-surface-950 transition-colors duration-500 overflow-hidden">
      <Navbar 
        onToggleSidebar={() => setIsCollapsed(!isCollapsed)} 
        isDark={isDark}
        onToggleTheme={onToggleTheme}
      />

      <div className="flex flex-1 min-h-0 w-full bg-white dark:bg-surface-950">
        <Sidebar isCollapsed={isCollapsed} />

        {/* Ensure the main area also has the dark background class */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-neutral-50/30 dark:bg-surface-950 transition-colors duration-500">  <div className="max-w-6xl mx-auto">
            <header className="mb-10">
              <h1 className="text-3xl font-bold text-primary dark:text-white tracking-tight">
                Overview
              </h1>
              <p className="text-secondary dark:text-neutral-500 mt-1">
                Deep analysis of your system architecture.
              </p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className={cn(
                  "p-6 rounded-[24px] border transition-all duration-300",
                  "bg-white border-neutral-100 hover:border-neutral-200 shadow-sm",
                  "dark:bg-surface-900 dark:border-surface-800 dark:hover:border-surface-700"
                )}>
                  <div className="w-10 h-10 bg-neutral-50 dark:bg-surface-800 rounded-xl mb-4" />
                  <div className="h-4 w-24 bg-neutral-100 dark:bg-surface-800 rounded mb-2" />
                  <div className="h-3 w-full bg-neutral-50 dark:bg-surface-900 rounded opacity-60" />
                </div>
              ))}
            </div>

            {/* Analytics Area */}
            <div className={cn(
              "mt-8 h-80 rounded-[32px] border flex items-center justify-center transition-all duration-300",
              "bg-neutral-50/50 border-neutral-100 text-secondary font-medium",
              "dark:bg-surface-900/50 dark:border-surface-800 dark:text-neutral-500"
            )}>
              <span className="tracking-tight opacity-50">Analytics Engine</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};