"use client";
import * as React from "react";
import { useState, useRef, useEffect, createContext } from "react";
import { cn } from "../../../lib/utils";

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const DropdownContext = createContext<DropdownContextType | null>(null);

export const Dropdown = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={containerRef} className={cn("relative inline-block", className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};