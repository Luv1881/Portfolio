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
        const maybePromise = router.prefetch(route);
        if (
          maybePromise !== undefined &&
          typeof (maybePromise as Promise<unknown>).catch === "function"
        ) {
          (maybePromise as Promise<unknown>).catch(() => {});
        }
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

  // View Transitions API support is enabled via CSS in globals.css
  // The browser will automatically use it when available

  const transitionEase = [0.22, 1, 0.36, 1] as const;

  // Spring physics for natural motion
  const spring = {
    type: "spring",
    stiffness: 380,
    damping: 30,
  } as const;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={
          firstRender.current || prefersReduced
            ? false
            : { opacity: 0, y: 12, scale: 0.98 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
        transition={
          prefersReduced
            ? { duration: 0.15 }
            : {
                ...spring,
                opacity: { duration: 0.25, ease: transitionEase },
              }
        }
        className="flex min-h-screen flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
