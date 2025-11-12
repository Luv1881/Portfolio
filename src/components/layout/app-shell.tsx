"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { PageTransition } from "@/components/layout/page-transition";
import { AnimatedBackground } from "@/components/effects/animated-background";
import { SiteHeader } from "@/components/layout/site-header";
import { RouteProgress } from "@/components/layout/route-progress";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <ThemeProvider>
      <RouteProgress />
      <AnimatedBackground />
      <SiteHeader />
      <PageTransition>{children}</PageTransition>
    </ThemeProvider>
  );
}
