"use client";
import React from 'react';
import { cn } from '../../../lib/utils';
import { SidebarGroup } from './SidebarGroup';
import { SidebarItem } from './SidebarItem';
import { AnimatePresence, motion } from 'framer-motion';

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
      {/* Mobile Backdrop - Smoother Fade */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-primary/10 backdrop-blur-sm z-60 lg:hidden"
            onClick={() => setIsMobileOpen?.(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside 
        // Use Framer Motion for width to ensure sub-pixel smoothing
        animate={{ 
          width: isCollapsed ? 64 : 240,
          x: isMobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -256 : 0)
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed inset-y-0 left-0 z-70 flex flex-col border-r bg-white dark:bg-surface-950 border-neutral-100 dark:border-surface-800",
          "lg:sticky lg:top-16 lg:h-[calc(100vh-64px)]",
          // Removing manual translate classes as motion handles 'x'
        )}
      >
        
        {/* Main Navigation Scroll Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 pt-4 space-y-6 scrollbar-hide">
          {navigation.map((section, idx) => (
            <SidebarGroup 
              key={section.group || `section-${idx}`} 
              label={section.group} 
              showFull={showFull}
            >
              <div className="space-y-1">
                {section.items.map((item) => (
                  <SidebarItem 
                    key={item.id}
                    {...item}
                    collapsed={isCollapsed}
                    mobileOpen={isMobileOpen}
                  />
                ))}
              </div>
            </SidebarGroup>
          ))}
        </div>

        {/* Dynamic Footer Area */}
        {footerItems.length > 0 && (
          <div className="p-2 border-t border-neutral-50 dark:border-surface-800 bg-white/50 dark:bg-surface-950/50 backdrop-blur-md">
            <div className="space-y-1">
              {footerItems.map((item) => (
                <SidebarItem 
                  key={item.id}
                  {...item}
                  collapsed={isCollapsed}
                  mobileOpen={isMobileOpen}
                />
              ))}
            </div>
          </div>
        )}
      </motion.aside>
    </>
  );
};