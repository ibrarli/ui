"use client";
import * as React from "react";
import { cn } from "../../../lib/utils";

type LogoVariant = "full" | "icon" | "stacked";
type LogoSize = "sm" | "md" | "lg" | "xl";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: LogoVariant;
  size?: LogoSize;
  brandName?: string;    // Main text (e.g. "Google")
  brandSuffix?: string;  // Secondary/Accent text (e.g. "Cloud")
  iconSrc?: string;       // Required: Light mode icon path
  iconDarkSrc?: string;  // Optional: Dark mode icon path
}

export const Logo = ({
  variant = "full",
  size = "md",
  brandName,
  brandSuffix,
  iconSrc = "logo.svg",
  iconDarkSrc = "logo-dark.svg",
  className,
  ...props
}: LogoProps) => {
  
  const iconSizes: Record<LogoSize, string> = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-14 h-14",
  };

  const textSizes: Record<LogoSize, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
    xl: "text-3xl",
  };

  const hasText = brandName || brandSuffix;

  return (
    <div
      className={cn(
        "flex items-center gap-2 group cursor-pointer transition-all",
        variant === "stacked" && "flex-col text-center",
        className
      )}
      {...props}
    >
      {/* Icon */}
      <div className={cn(
        "shrink-0 group-hover:scale-105 transition-transform duration-300",
        iconSizes[size]
      )}>
        <img 
          src={iconSrc} 
          alt="Brand Logo" 
          className={cn("w-full h-full block", iconDarkSrc && "dark:hidden")} 
        />
        {iconDarkSrc && (
          <img 
            src={iconDarkSrc} 
            alt="Brand Logo Dark" 
            className="w-full h-full hidden dark:block" 
          />
        )}
      </div>

      {/* Brand Text - Only renders if variant allows AND text exists */}
      {(variant === "full" || variant === "stacked") && hasText && (
        <span className={cn(
          "font-bold text-primary dark:text-white tracking-tight",
          variant === "full" && "hidden sm:block",
          textSizes[size]
        )}>
          {brandName}
          {brandSuffix && (
            <span className="text-secondary dark:text-neutral-500 font-medium ml-px">
              {brandSuffix}
            </span>
          )}
        </span>
      )}
    </div>
  );
};