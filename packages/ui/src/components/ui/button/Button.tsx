"use client";
import * as React from "react";
import { cn } from "../../../lib/utils";

// 1. Define the Button Variants
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "social"
  | "link";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      startIcon,
      endIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const isLink = variant === "link";

    const isIcon = size === "icon";

    const baseStyles = cn(
      "inline-flex items-center justify-center font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
      !isLink && (isIcon ? "rounded-full" : "rounded-xl"), // Circular for icons
      !isLink && !isIcon && "gap-2", // Only add gap if it's a standard button with text
    );

    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-primary text-white hover:opacity-90 dark:bg-white dark:text-black",
      secondary:
        "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-surface-800 dark:text-white dark:hover:bg-surface-700",
      outline:
        "border border-neutral-200 bg-transparent hover:bg-neutral-50 dark:border-surface-800 dark:hover:bg-surface-900 dark:text-white",
      ghost:
        "bg-transparent hover:bg-neutral-100 dark:hover:bg-surface-800 dark:text-white",
      danger: "bg-red-500 text-white hover:bg-red-600",
      social:
        "border border-neutral-100 text-primary hover:bg-neutral-50 dark:bg-surface-900 dark:border-surface-800 dark:text-white dark:hover:bg-surface-800 shadow-sm",
      link: "bg-transparent p-0 h-auto w-auto text-primary dark:text-white hover:underline min-h-0 items-baseline", // Added items-baseline for better text alignment
    };

    const sizes: Record<ButtonSize, string> = {
      sm: isLink ? "text-xs" : "h-9 px-3 text-xs",
      md: isLink ? "text-sm" : "h-11 px-6 text-sm",
      lg: isLink ? "text-base" : "h-12 px-8 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <>
            {startIcon && <span className="shrink-0">{startIcon}</span>}
            {children}
            {endIcon && <span className="shrink-0">{endIcon}</span>}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
