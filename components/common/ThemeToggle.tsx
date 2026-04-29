"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  const handleToggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <button
      type="button"
      suppressHydrationWarning
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      onClick={handleToggleTheme}
      className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-surface text-foreground transition hover:bg-muted"
    >
      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
