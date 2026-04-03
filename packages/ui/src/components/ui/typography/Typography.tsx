"use client";
import * as React from "react";
import { cn } from "../../../lib/utils";

// --- Configuration ---

export type TypographyVariant = 
  | "MainHeading"    // H1: Page titles
  | "SubHeading"     // H2: Section headers
  | "SectionTitle"   // H3: Card/Group titles
  | "Label"          // H4: Form labels (Standard bold)
  | "Overline"       // Span: Small all-caps menu headers (The one you needed)
  | "Body"           // P: Standard reading text
  | "BodySmall"      // P: Muted/secondary info
  | "HelperText";    // Span: Errors, captions, tiny hints

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: React.ElementType; 
}

const variantStyles: Record<TypographyVariant, string> = {
  MainHeading: "text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl",
  SubHeading: "text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white",
  SectionTitle: "text-xl font-semibold text-neutral-800 dark:text-neutral-100",
  Label: "text-sm font-semibold text-neutral-900 dark:text-white leading-none",
  Overline: "text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500 select-none",
  Body: "text-base leading-7 text-neutral-600 dark:text-neutral-300",
  BodySmall: "text-sm leading-6 text-neutral-500 dark:text-neutral-400",
  HelperText: "text-xs font-medium text-neutral-400 dark:text-neutral-500",
};

const defaultTags: Record<TypographyVariant, React.ElementType> = {
  MainHeading: "h1",
  SubHeading: "h2",
  SectionTitle: "h3",
  Label: "label",
  Overline: "span",
  Body: "p",
  BodySmall: "p",
  HelperText: "span",
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "Body", as, ...props }, ref) => {
    const Component = as || defaultTags[variant];

    return (
      <Component
        ref={ref}
        className={cn(variantStyles[variant], className)}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

// --- Direct Named Exports ---
export const MainHeading = React.forwardRef<HTMLElement, TypographyProps>((props, ref) => (
  <Typography ref={ref} variant="MainHeading" {...props} />
));
export const SubHeading = React.forwardRef<HTMLElement, TypographyProps>((props, ref) => (
  <Typography ref={ref} variant="SubHeading" {...props} />
));
export const SectionTitle = React.forwardRef<HTMLElement, TypographyProps>((props, ref) => (
  <Typography ref={ref} variant="SectionTitle" {...props} />
));
export const Label = React.forwardRef<HTMLElement, TypographyProps>((props, ref) => (
  <Typography ref={ref} variant="Label" {...props} />
));
export const Overline = React.forwardRef<HTMLElement, TypographyProps>((props, ref) => (
  <Typography ref={ref} variant="Overline" {...props} />
));
export const Body = React.forwardRef<HTMLElement, TypographyProps>((props, ref) => (
  <Typography ref={ref} variant="Body" {...props} />
));
export const BodySmall = React.forwardRef<HTMLElement, TypographyProps>((props, ref) => (
  <Typography ref={ref} variant="BodySmall" {...props} />
));
export const HelperText = React.forwardRef<HTMLElement, TypographyProps>((props, ref) => (
  <Typography ref={ref} variant="HelperText" {...props} />
));

// Display Names for debugging
MainHeading.displayName = "MainHeading";
SubHeading.displayName = "SubHeading";
SectionTitle.displayName = "SectionTitle";
Label.displayName = "Label";
Overline.displayName = "Overline";
Body.displayName = "Body";
BodySmall.displayName = "BodySmall";
HelperText.displayName = "HelperText";