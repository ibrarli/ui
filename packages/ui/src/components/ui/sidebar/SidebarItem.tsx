"use client";
import * as React from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button/Button";
import { BodySmall } from "../../ui/typography/Typography";
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
      variant={active ? "primary" : "ghost"}
      onClick={onClick}
      className={cn(
        "w-full flex items-center h-10 rounded-lg transition-all duration-500 ease-in-out group relative mb-0.5 overflow-hidden px-3 border-none justify-start",
        active 
          ? 'bg-primary/4 dark:bg-white/5 text-primary dark:text-white' 
          : 'text-secondary hover:text-primary dark:hover:text-white',
      )}
    >
      {/* Icon Wrapper */}
      <div className={cn(
        "shrink-0 transition-all duration-500 flex items-center justify-center",
        !showLabel ? "w-full" : "w-5"
      )}>
        {icon}
      </div>
      
      {/* Label Wrapper */}
      <div className={cn(
        "flex items-center transition-all duration-500 ease-in-out overflow-hidden",
        showLabel ? "ml-3 opacity-100 max-w-40" : "ml-0 opacity-0 max-w-0"
      )}>
        <BodySmall className="whitespace-nowrap font-medium text-inherit">
          {label}
        </BodySmall>
      </div>

      {/* Floating Tooltip (Only when collapsed) */}
      {!showLabel && <SidebarTooltip label={label} />}
    </Button>
  );
};