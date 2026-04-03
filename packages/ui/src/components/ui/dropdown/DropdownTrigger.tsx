"use client";
import * as React from "react";
import { useContext } from "react";
import { DropdownContext } from "./Dropdown";
import { cn } from "../../../lib/utils";

// Define a type that includes standard HTML attributes
type ChildProps = React.HTMLAttributes<HTMLElement> & {
  "data-state"?: string;
};

export const DropdownTrigger = ({ children }: { children: React.ReactElement<ChildProps> }) => {
  const context = useContext(DropdownContext);
  
  if (!context) {
    console.warn("DropdownTrigger must be used within a Dropdown component");
    return children;
  }

  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      // Safely call the original onClick if it exists
      children.props.onClick?.(e);
      context.setIsOpen(!context.isOpen);
    },
    "data-state": context.isOpen ? "open" : "closed",
    className: cn(
      children.props.className, 
      context.isOpen && "bg-neutral-50 dark:bg-surface-900"
    )
  });
};