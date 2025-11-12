"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { PageTransition } from "@/components/layout/page-transition";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <PageTransition>{children}</PageTransition>
    </ThemeProvider>
  );
}
