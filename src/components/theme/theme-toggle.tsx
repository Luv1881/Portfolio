"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      aria-pressed={isLight}
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--surface-raised)] px-3 py-2 text-[0.65rem] uppercase tracking-[0.4em] text-muted transition-all hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]",
        "fixed right-6 top-6 z-[60]",
        className,
      )}
    >
      <span>{isLight ? "Light" : "Dark"}</span>
      <span className="text-xs">{isLight ? "–" : "+"}</span>
    </button>
  );
}
