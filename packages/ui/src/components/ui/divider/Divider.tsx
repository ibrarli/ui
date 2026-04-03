"use client";
import * as React from "react";
import { cn } from "../../../lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  contentPosition?: "left" | "center" | "right";
}

export const Divider = ({
  children,
  orientation = "horizontal",
  contentPosition = "center",
  className,
  ...props
}: DividerProps) => {
  // 1. Vertical Orientation
  if (orientation === "vertical") {
    return (
      <div
        className={cn(
          "w-px self-stretch bg-neutral-100 dark:bg-surface-800",
          className
        )}
        {...props}
      />
    );
  }

  // 2. Horizontal Orientation
  return (
    <div
      className={cn("relative w-full flex items-center", className)}
      {...props}
    >
      {/* The Line */}
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-neutral-100 dark:border-surface-800" />
      </div>

      {/* The Content (Optional) */}
      {children && (
        <div
          className={cn(
            "relative flex w-full uppercase text-[10px] font-bold tracking-wider",
            {
              "justify-start": contentPosition === "left",
              "justify-center": contentPosition === "center",
              "justify-end": contentPosition === "right",
            }
          )}
        >
          <span className="bg-white px-3 text-neutral-400 dark:bg-surface-950 dark:text-neutral-600">
            {children}
          </span>
        </div>
      )}
    </div>
  );
};