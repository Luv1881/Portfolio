"use client";

import { useEffect, type ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Ensure dark mode is always set
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return <>{children}</>;
}
