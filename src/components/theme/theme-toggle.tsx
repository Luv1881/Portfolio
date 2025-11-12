"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isLight = theme === "light";

  // Only show theme-dependent content after mounting on client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      aria-pressed={mounted ? isLight : false}
      onClick={toggleTheme}
      className={cn(
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-border bg-[color:var(--surface-raised)] px-3 py-2 text-[0.65rem] uppercase tracking-[0.4em] text-muted shadow-lg backdrop-blur-md transition-all duration-300 ease-out hover:scale-105 hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(0,102,255,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)] active:scale-95",
        "fixed right-6 top-6 z-[60]",
        className,
      )}
    >
      <span className="from-accent/0 via-accent/10 to-accent/0 absolute inset-0 -z-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {mounted ? (
        <>
          <span className="relative z-10">{isLight ? "Light" : "Dark"}</span>
          <span className="relative z-10 text-xs">{isLight ? "☀" : "★"}</span>
        </>
      ) : (
        <>
          <span className="relative z-10">Theme</span>
          <span className="relative z-10 text-xs">·</span>
        </>
      )}
    </button>
  );
}
