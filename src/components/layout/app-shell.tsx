"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { PageTransition } from "@/components/layout/page-transition";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { FloatingParticles } from "@/components/effects/floating-particles";
import { AnimatedBackground } from "@/components/effects/animated-background";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <ThemeProvider>
      <AnimatedBackground />
      <FloatingParticles />
      <CustomCursor />
      <ThemeToggle />
      <PageTransition>{children}</PageTransition>
    </ThemeProvider>
  );
}
