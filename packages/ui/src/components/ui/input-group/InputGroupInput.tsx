import React, { forwardRef } from "react";
import { cn } from "../../../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasLeftAddon?: boolean;
  hasRightAddon?: boolean;
}

export const InputGroupInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasLeftAddon, hasRightAddon, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={cn(
          "w-full h-11 rounded-xl border outline-none transition-all text-sm",
          "border-neutral-100 text-primary placeholder:text-neutral-400",
          "dark:bg-surface-900 dark:border-surface-800 dark:text-white dark:placeholder:text-neutral-400 dark:focus:border-surface-600",
          
          // Dynamic Padding Logic
          hasLeftAddon ? "pl-10" : "pl-4",
          hasRightAddon ? "pr-12" : "pr-4",
          
          className
        )}
      />
    );
  }
);
InputGroupInput.displayName = "InputGroupInput";