"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { NAV_ITEMS } from "./site-header";

type PageTransitionProps = {
  children: ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const router = useRouter();
  const firstRender = useRef(true);

  // Prefetch navigation routes
  useEffect(() => {
    const routesToPrefetch = NAV_ITEMS.map((item) => item.href);
    routesToPrefetch.forEach((route) => {
      if (typeof router.prefetch !== "function") return;
      try {
        router.prefetch(route);
      } catch {
        // best-effort prefetch, ignore errors
      }
    });
  }, [router]);

  // Skip animation on first render
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  }, []);

  const transitionEase = [0.22, 1, 0.36, 1] as const;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={prefersReduced || firstRender.current ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
        transition={{
          duration: 0.15,
          ease: transitionEase,
        }}
        className="flex min-h-screen flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
