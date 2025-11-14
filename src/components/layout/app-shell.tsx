"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { PageTransition } from "@/components/layout/page-transition";
import { AnimatedBackground } from "@/components/effects/animated-background";
import { SiteHeader } from "@/components/layout/site-header";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <ThemeProvider>
      <AnimatedBackground />
      <SiteHeader />
      <PageTransition>{children}</PageTransition>
    </ThemeProvider>
  );
}
