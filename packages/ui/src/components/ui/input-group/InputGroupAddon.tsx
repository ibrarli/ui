import React from "react";
import { cn } from "../../../lib/utils";

interface AddonProps {
  children: React.ReactNode;
  align?: "inline-start" | "inline-end" | "block-top" | "block-bottom";
  className?: string;
}

export const InputGroupAddon = ({ children, align = "inline-start", className }: AddonProps) => {
  const baseStyles = "flex items-center justify-center transition-colors";
  
  const alignmentStyles = {
    "inline-start": "absolute left-3 z-10 text-neutral-400 group-focus-within:text-primary dark:group-focus-within:text-white",
    "inline-end": "absolute right-3 z-10 text-neutral-400 group-focus-within:text-primary dark:group-focus-within:text-white",
    "block-top": "mb-1 text-[10px] font-bold text-secondary uppercase tracking-widest", // Similar to your Label
    "block-bottom": "mt-1 text-xs text-neutral-400",
  };

  return (
    <div className={cn(baseStyles, alignmentStyles[align], className)}>
      {children}
    </div>
  );
};