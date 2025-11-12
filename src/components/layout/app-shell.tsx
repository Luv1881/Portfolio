"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { PageTransition } from "@/components/layout/page-transition";
import { ParticleGrid } from "@/components/effects/particle-grid";
import { ScrollProgress } from "@/components/effects/scroll-progress";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <ThemeProvider>
      <ParticleGrid />
      <ScrollProgress />
      <ThemeToggle />
      <PageTransition>{children}</PageTransition>
    </ThemeProvider>
  );
}
