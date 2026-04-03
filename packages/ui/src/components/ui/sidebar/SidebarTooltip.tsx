"use client";
import * as React from "react";
import { Overline } from "../../ui/typography/Typography";

export const SidebarTooltip = ({ label }: { label: string }) => {
  return (
    <div className="absolute left-16 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-2 py-1.5 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-2 group-hover:translate-x-0 z-50 shadow-xl whitespace-nowrap">
      <Overline className="text-inherit dark:text-inherit">
        {label}
      </Overline>
    </div>
  );
};