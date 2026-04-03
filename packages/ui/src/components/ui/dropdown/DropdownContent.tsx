"use client";
import * as React from "react";
import { useContext } from "react";
import { DropdownContext } from "./Dropdown";
import { cn } from "../../../lib/utils";

interface ContentProps {
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}

export const DropdownContent = ({ children, align = "right", className }: ContentProps) => {
  const context = useContext(DropdownContext);
  if (!context || !context.isOpen) return null;

  return (
    <div
      className={cn(
        "absolute mt-2 min-w-50 z-100 rounded-xl border border-neutral-100 bg-white p-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-200",
        "dark:bg-surface-950 dark:border-surface-800",
        align === "right" ? "right-0" : "left-0",
        className
      )}
    >
      {children}
    </div>
  );
};