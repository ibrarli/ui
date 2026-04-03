"use client";
import * as React from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button/Button";
import { motion, AnimatePresence } from "framer-motion";
import { SidebarTooltip } from "./SidebarTooltip";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  mobileOpen?: boolean;
  onClick?: () => void;
}

export const SidebarItem = ({ 
  icon, 
  label, 
  active, 
  collapsed, 
  mobileOpen, 
  onClick 
}: SidebarItemProps) => {
  const showLabel = !collapsed || mobileOpen;

  return (
    <Button 
      variant="ghost" // Use custom styling below to prevent variant conflicts
      onClick={onClick}
      className={cn(
        "w-full flex items-center h-10 rounded-xl transition-colors duration-300 group relative mb-1 px-0 overflow-hidden justify-start border-none",
        active 
          ? 'bg-primary/5 dark:bg-white/5 text-primary dark:text-white' 
          : 'text-neutral-500 hover:text-primary dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-surface-900',
      )}
    >
      {/* 1. FIXED ICON ANCHOR 
         We use a fixed width (w-12) so the icon is always 
         in the same spot, whether the sidebar is 64px or 240px.
      */}
      {/* Icon Wrapper */}
<div className={cn(
  "w-12 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
  // We keep the container size fixed so the icon stays anchored
)}>
  {React.isValidElement(icon) ? 
    React.cloneElement(icon as React.ReactElement<any>, {
      size: 20,
      strokeWidth: active ? 2.5 : 2
    }) 
    : icon
  }
</div>
      
      {/* 2. ANIMATED LABEL 
         We use AnimatePresence or simple motion.span. 
         We remove 'display: none' during the animation to prevent layout pops.
      */}
      <motion.span
        initial={false}
        animate={{ 
          opacity: showLabel ? 1 : 0,
          x: showLabel ? 0 : -10,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "whitespace-nowrap font-medium text-sm transition-opacity",
          !showLabel && "pointer-events-none"
        )}
      >
        {label}
      </motion.span>

      {/* 3. ACTIVE INDICATOR (Optional)
         Adding a subtle vertical line for the active state makes it feel premium.
      */}
      {active && (
        <motion.div 
          layoutId="active-pill"
          className="absolute left-0 w-1 h-5 bg-primary rounded-r-full" 
        />
      )}

      {/* Floating Tooltip */}
      {!showLabel && <SidebarTooltip label={label} />}
    </Button>
  );
};