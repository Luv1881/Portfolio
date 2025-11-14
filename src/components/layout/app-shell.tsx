"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { PageTransition } from "@/components/layout/page-transition";
import { AnimatedBackground } from "@/components/effects/animated-background";
import { SiteHeader } from "@/components/layout/site-header";
import { RouteProgress } from "@/components/layout/route-progress";
import { DigitalClock } from "@/components/effects/digital-clock";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <ThemeProvider>
      <RouteProgress />
      <AnimatedBackground />
      <SiteHeader />
      {/* Digital Clock - Fixed in top-right corner */}
      <div className="fixed right-6 top-20 z-40 hidden lg:block">
        <DigitalClock />
      </div>
      <PageTransition>{children}</PageTransition>
    </ThemeProvider>
  );
}
