"use client";
import React, { useState } from 'react';
import { cn } from '../../../lib/utils';

// UI Components
import { Navbar } from '../../ui/navbar/Navbar';
import { Sidebar } from '../../ui/sidebar/Sidebar';
import { MainHeading, Body, Overline } from '../../ui/typography/Typography';

// Import Separated Data
import { NAVIGATION_DATA, FOOTER_DATA } from './data';

interface Dashboard01Props {
  isDark: boolean;
  onToggleTheme: () => void;
  userName?: string;
  userRole?: string;
}

export const Dashboard01 = ({ isDark, onToggleTheme, userName, userRole }: Dashboard01Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full bg-white dark:bg-surface-950 transition-colors duration-500 overflow-hidden">
      {/* Navbar */}
      <Navbar 
        onToggleSidebar={() => setIsCollapsed(!isCollapsed)} 
        isDark={isDark}
        onToggleTheme={onToggleTheme}
        userName={userName}
        userRole={userRole}
      />

      <div className="flex flex-1 min-h-0 w-full bg-white dark:bg-surface-950">
        {/* Sidebar with Dynamic Data */}
        <Sidebar 
          isCollapsed={isCollapsed} 
          navigation={NAVIGATION_DATA}
          footerItems={FOOTER_DATA}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-neutral-50/30 dark:bg-surface-950 transition-colors duration-500">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <header className="mb-10">
              <MainHeading>Overview</MainHeading>
              <Body className="mt-1 opacity-70">
                Deep analysis of your system architecture and performance.
              </Body>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className={cn(
                  "p-6 rounded-[24px] border transition-all duration-300 group",
                  "bg-white border-neutral-100 hover:border-primary/20 shadow-sm hover:shadow-md",
                  "dark:bg-surface-900 dark:border-surface-800 dark:hover:border-white/10"
                )}>
                  <div className="w-10 h-10 bg-neutral-50 dark:bg-surface-800 rounded-xl mb-4 flex items-center justify-center transition-colors group-hover:bg-primary/5 dark:group-hover:bg-white/5" />
                  <Overline className="mb-2">Metric 0{i}</Overline>
                  <div className="h-2 w-full bg-neutral-50 dark:bg-surface-950 rounded" />
                </div>
              ))}
            </div>

            {/* Analytics Engine Display */}
            <div className={cn(
              "mt-8 h-80 rounded-[32px] border flex items-center justify-center transition-all duration-300 relative overflow-hidden",
              "bg-neutral-50/50 border-neutral-100 dark:bg-surface-900/50 dark:border-surface-800"
            )}>
              {/* Subtle Grid Pattern */}
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] dark:bg-[radial-gradient(#fff_1px,transparent_1px)]" />
              
              <Overline className="opacity-40">Analytics Engine v3.0</Overline>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
};