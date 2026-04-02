"use client";
import { Home, Bookmark, Monitor, Settings, Eye, Square } from 'apen-icons';
import { cn } from '../lib/utils';

const NAVIGATION_CONFIG = [
  {
    group: "General",
    items: [
      { id: 'overview', label: "Overview", icon: <Home size={18} />, active: true },
      { id: 'layout', label: "Layouts", icon: <Square size={18} /> },
    ]
  },
  {
    group: "System",
    items: [
      { id: 'components', label: "Components", icon: <Bookmark size={18} /> },
      { id: 'cli', label: "CLI Tools", icon: <Monitor size={18} /> },
      { id: 'dev', label: "API Reference", icon: <Eye size={18} /> },
    ]
  }
];

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (value: boolean) => void;
}

export const Sidebar = ({ isCollapsed, isMobileOpen = false, setIsMobileOpen }: SidebarProps) => {
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

      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-70 flex flex-col transition-all duration-500 ease-in-out border-r shrink-0",
          "lg:sticky lg:top-16 lg:h-[calc(100vh-64px)]",
          " dark:bg-surface-950 border-neutral-100 dark:border-surface-800",
          isCollapsed ? 'lg:w-16' : 'lg:w-60',
          isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 pt-4 space-y-4">
          {NAVIGATION_CONFIG.map((section) => (
            <div key={section.group} className="space-y-1">
              {/* STABLE GROUP LABEL: Maintains height to prevent vertical jumping */}
              <div className="h-6 flex items-center px-3 overflow-hidden">
                <p className={cn(
                  "text-[10px] font-bold text-neutral-400 dark:text-neutral-600 uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-500 ease-in-out origin-left",
                  showFull ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-4 scale-75"
                )}>
                  {section.group}
                </p>
              </div>
              
              {section.items.map((item) => (
                <SidebarItem 
                  key={item.id}
                  icon={item.icon} 
                  label={item.label} 
                  active={item.active} 
                  collapsed={isCollapsed}
                  mobileOpen={isMobileOpen}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Footer Settings */}
        <div className="p-2 border-t border-neutral-50 dark:border-surface-800  dark:bg-surface-950">
          <SidebarItem 
            icon={<Settings size={18} />} 
            label="Settings" 
            collapsed={isCollapsed}
            mobileOpen={isMobileOpen}
          />
        </div>
      </aside>
    </>
  );
};

const SidebarItem = ({ icon, label, active = false, collapsed = false, mobileOpen = false }: any) => {
  const showLabel = !collapsed || mobileOpen;

  return (
    <button className={cn(
      "w-full flex items-center h-10 rounded-lg transition-all duration-500 ease-in-out group relative mb-0.5 hover:cursor-pointer overflow-hidden px-3",
      active 
        ? 'bg-primary/[0.04] dark:bg-white/[0.05] text-primary dark:text-white font-medium' 
        : 'text-secondary hover:bg-neutral-50 dark:hover:bg-surface-800 hover:text-primary dark:hover:text-white',
    )}>
      {/* Icon: Center it perfectly when collapsed */}
      <div className={cn(
        "shrink-0 transition-transform duration-500 flex items-center justify-center",
        !showLabel ? "w-full" : "w-5"
      )}>
        {icon}
      </div>
      
      {/* Label: Smooth width/opacity transition */}
      <div className={cn(
        "flex items-center transition-all duration-500 ease-in-out overflow-hidden",
        showLabel ? "ml-3 opacity-100 max-w-[160px]" : "ml-0 opacity-0 max-w-0"
      )}>
        <span className="text-[13px] whitespace-nowrap font-medium">
          {label}
        </span>
      </div>

      {/* Tooltip: Only shows when fully collapsed */}
      {!showLabel && (
        <div className="absolute left-16 bg-primary dark:bg-white text-white dark:text-primary-soft text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-2 group-hover:translate-x-0 font-bold uppercase tracking-widest z-50 shadow-lg whitespace-nowrap border border-primary dark:border-white">
          {label}
        </div>
      )}
    </button>
  );
};