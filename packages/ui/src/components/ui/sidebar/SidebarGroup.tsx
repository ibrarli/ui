"use client";
import * as React from "react";
import { cn } from "../../../lib/utils";
import { Overline } from "../../ui/typography/Typography";

interface SidebarGroupProps {
  label?: string; // Made optional
  showFull: boolean;
  children: React.ReactNode;
}

export const SidebarGroup = ({ label, showFull, children }: SidebarGroupProps) => {
  return (
    <div className="space-y-1">
      {label && (
        <div className="h-6 flex items-center px-3 overflow-hidden">
          <Overline 
            className={cn(
              "transition-all duration-500 ease-in-out origin-left",
              showFull ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-4 scale-75"
            )}
          >
            {label}
          </Overline>
        </div>
      )}
      {children}
    </div>
  );
};