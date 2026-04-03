"use client";
import React from 'react';
import { cn } from '../../../lib/utils';
import { SidebarGroup } from './SidebarGroup';
import { SidebarItem } from './SidebarItem';

export interface SidebarNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  // Optional: for routing or external links
  href?: string;
}

export interface SidebarSection {
  group?: string; // Group is now optional
  items: SidebarNavItem[];
}

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (value: boolean) => void;
  navigation: SidebarSection[]; // Primary nav sections
  footerItems?: SidebarNavItem[]; // Dynamic footer items
}

export const Sidebar = ({ 
  isCollapsed, 
  isMobileOpen = false, 
  setIsMobileOpen,
  navigation = [],
  footerItems = []
}: SidebarProps) => {
  const showFull = !isCollapsed || isMobileOpen;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-primary/10 backdrop-blur-sm z-60 lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileOpen?.(false)}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-70 flex flex-col transition-all duration-500 ease-in-out border-r",
        "lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] bg-white dark:bg-surface-950 border-neutral-100 dark:border-surface-800",
        isCollapsed ? 'lg:w-16' : 'lg:w-60',
        isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
      )}>
        
        {/* Main Navigation Scroll Area */}
        <div className="flex-1 overflow-y-auto p-2 pt-4 space-y-4">
          {navigation.map((section, idx) => (
            <SidebarGroup 
              key={section.group || `section-${idx}`} 
              label={section.group} // If undefined, the Group component handles it
              showFull={showFull}
            >
              {section.items.map((item) => (
                <SidebarItem 
                  key={item.id}
                  {...item}
                  collapsed={isCollapsed}
                  mobileOpen={isMobileOpen}
                />
              ))}
            </SidebarGroup>
          ))}
        </div>

        {/* Dynamic Footer Area */}
        {footerItems.length > 0 && (
          <div className="p-2 border-t border-neutral-50 dark:border-surface-800 space-y-0.5">
            {footerItems.map((item) => (
              <SidebarItem 
                key={item.id}
                {...item}
                collapsed={isCollapsed}
                mobileOpen={isMobileOpen}
              />
            ))}
          </div>
        )}
      </aside>
    </>
  );
};