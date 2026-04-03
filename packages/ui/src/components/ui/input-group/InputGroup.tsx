"use client";
import React, { useState } from "react";
import { InputGroupLabel } from "./InputGroupLabel";
import { InputGroupInput } from "./InputGroupInput";
import { InputGroupPasswordToggle } from "./InputGroupPasswordToggle";
import { cn } from "../../../lib/utils";

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  startAddon?: React.ReactNode;
  endAddon?: React.ReactNode;
  error?: string;
}

export const InputGroup = ({
  label,
  startAddon,
  endAddon,
  type,
  error,
  className,
  ...props
}: InputGroupProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col w-full">
      {label && <InputGroupLabel>{label}</InputGroupLabel>}

      <div className="relative group mt-1 flex items-center">
        {startAddon && (
          <div className="absolute left-3 z-20 flex items-center justify-center pointer-events-none text-neutral-400 group-focus-within:text-primary dark:group-focus-within:text-white transition-colors">
            {startAddon}
          </div>
        )}

        <InputGroupInput
          {...props}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          hasLeftAddon={!!startAddon}
          hasRightAddon={!!endAddon || isPassword}
          className={cn(
            error ? "border-red-500 focus:border-red-500" : "",
            className
          )}
        />

        <div className="absolute right-3 z-20 flex items-center gap-2">
          {isPassword && (
            <InputGroupPasswordToggle
              isVisible={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
      </div>
    </div>
  );
};