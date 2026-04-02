"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { LoginPage } from "@apen-ui/core";

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Critical: Wait for mount to avoid hydration mismatch (Sun/Moon icon flicker)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a blank state or loading spinner with the correct background
    return <div className="h-screen w-full bg-white dark:bg-surface-950" />;
  }

  return (
    <LoginPage 

    />
  );
}