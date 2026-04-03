"use client";
import * as React from "react";
import { useContext } from "react";
import { DropdownContext } from "./Dropdown";
import { cn } from "../../../lib/utils";

interface ItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  danger?: boolean;
}

export const DropdownItem = ({ children, icon, danger, className, ...props }: ItemProps) => {
  const context = useContext(DropdownContext);

  return (
    <button
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        context?.setIsOpen(false); 
      }}
      className={cn(
        "flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left",
        "hover:bg-neutral-50 dark:hover:bg-surface-800  ",
        danger && "text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10",
        className
      )}
    >
      {icon && <span className="shrink-0 opacity-70">{icon}</span>}
      {children}
    </button>
  );
};