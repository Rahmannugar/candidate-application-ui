"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    const isDarkMode = resolvedTheme === "dark";
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={handleToggleTheme}
      className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-surface text-foreground transition hover:bg-muted"
    >
      <Moon size={18} className="dark:hidden" />
      <Sun size={18} className="hidden dark:block" />
    </button>
  );
}
