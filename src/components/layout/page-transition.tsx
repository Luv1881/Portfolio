"use client";

import type { ReactNode } from "react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { NAV_ITEMS } from "./site-header";

type PageTransitionProps = {
  children: ReactNode;
};

type Column = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  fontSize: number;
  sequence: string[];
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const router = useRouter();
  const [isMatrix, setIsMatrix] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [matrixKey, setMatrixKey] = useState(0);
  const [columns, setColumns] = useState<Column[]>([]);
  const longestDuration = useRef(1.4);
  const firstRender = useRef(true);
  const previousPathname = useRef(pathname);

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

  // Generate matrix columns on pathname change
  useLayoutEffect(() => {
    if (prefersReduced) return;

    // Skip animation on first render
    if (firstRender.current) {
      firstRender.current = false;
      previousPathname.current = pathname;
      return;
    }

    // Only animate if pathname actually changed
    if (previousPathname.current === pathname) {
      return;
    }

    previousPathname.current = pathname;

    const CHARS = "01アイウエオカキクケコｱｲｳｴｵｶｷｸｹｺﾈﾐﾂ冷";
    const randChar = () => CHARS[Math.floor(Math.random() * CHARS.length)] ?? "0";
    const makeSequence = (len: number) => Array.from({ length: len }, () => randChar());

    const columnCount = 24; // Reduced from 32 for better performance
    const newColumns: Column[] = Array.from({ length: columnCount }, (_, i) => {
      // Distribute columns evenly with slight jitter
      const jitter = (Math.random() - 0.5) * (100 / columnCount) * 0.5;
      const rawLeft = (i / columnCount) * 100 + jitter;
      const left = Math.min(98, Math.max(1, rawLeft));

      const delay = Math.random() * 0.15;
      const duration = 0.85 + Math.random() * 0.35;
      const fontSize = 15 + Math.round(Math.random() * 7);
      const length = 20 + Math.round(Math.random() * 12); // Reduced from 25-40 to 20-32
      const sequence = makeSequence(length);

      return {
        id: i + Date.now(),
        left,
        delay,
        duration,
        fontSize,
        sequence,
      };
    });

    setColumns(newColumns);
    setMatrixKey((k) => k + 1);

    // Hide content immediately when animation starts
    setShowContent(false);
    setIsMatrix(true);

    // Calculate longest animation duration
    const maxDuration = newColumns.reduce(
      (max, c) => Math.max(max, c.delay + c.duration),
      0,
    );
    longestDuration.current = maxDuration;

    // Show new content at peak of animation (when overlay starts fading)
    const contentDelay = maxDuration * 0.5 * 1000;
    const contentTimeout = window.setTimeout(() => {
      setShowContent(true);
    }, contentDelay);

    // Hide matrix after animation completes
    const matrixTimeout = window.setTimeout(
      () => setIsMatrix(false),
      (maxDuration + 0.2) * 1000,
    );

    return () => {
      window.clearTimeout(contentTimeout);
      window.clearTimeout(matrixTimeout);
    };
  }, [pathname, prefersReduced]);

  const transitionEase = useMemo(() => [0.22, 1, 0.36, 1] as const, []);

  const timings = useMemo(
    () => ({
      overlayFade: longestDuration.current + 0.25,
      glitchPrimary: Math.max(longestDuration.current + 0.15, 0.6),
      glitchSecondary: Math.max(longestDuration.current + 0.25, 0.8),
      glitchDelay: Math.max(longestDuration.current * 0.25, 0.1),
    }),
    [],
  );

  return (
    <>
      {/* Matrix Rain Effect */}
      <AnimatePresence>
        {!prefersReduced && isMatrix && (
          <motion.div
            key={matrixKey}
            className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: transitionEase }}
            aria-hidden="true"
          >
            {/* Dark overlay with fade */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 1, 0.4, 0] }}
              transition={{
                duration: timings.overlayFade,
                ease: "easeInOut",
                times: [0, 0.6, 0.9, 1],
              }}
            />

            {/* Green tint overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#001a08]/35 via-[#062d12]/25 to-[#001a08]/35 mix-blend-screen" />

            {/* Matrix rain columns */}
            {columns.map((col) => (
              <motion.div
                key={col.id}
                className="absolute flex select-none flex-col items-center font-mono text-[#29f36b]"
                style={{
                  left: `${col.left}%`,
                  top: "-50%",
                  transform: "translate3d(-50%, 0, 0)", // Use translate3d for GPU acceleration
                  gap: Math.max(2, Math.round(col.fontSize * 0.4)),
                  filter: "drop-shadow(0 0 6px rgba(41,243,107,0.4))", // Reduced blur for performance
                  willChange: "transform, opacity",
                }}
                initial={{ y: "-50%", opacity: 0 }}
                animate={{
                  y: "150%",
                  opacity: [0, 0.9, 1, 0.7, 0],
                }}
                transition={{
                  delay: col.delay,
                  duration: col.duration,
                  ease: transitionEase,
                  opacity: {
                    times: [0, 0.2, 0.5, 0.85, 1],
                  },
                }}
              >
                {col.sequence.map((char, idx) => {
                  const depth = idx / col.sequence.length;
                  const opacity = Math.max(0.1, 1 - depth * 0.9);
                  const isHead = idx < 3;

                  return (
                    <span
                      key={`${col.id}-${idx}`}
                      className={isHead ? "text-[#c5ff9e]" : undefined}
                      style={{
                        fontSize: `${col.fontSize}px`,
                        letterSpacing: "0.05em",
                        opacity,
                        textShadow: isHead
                          ? "0 0 12px rgba(197,255,158,0.8), 0 0 4px rgba(197,255,158,0.6)"
                          : "0 0 6px rgba(41,243,107,0.4)",
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
              </motion.div>
            ))}

            {/* CRT scanline effect */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.15) 3px)",
                mixBlendMode: "multiply",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.8] }}
              transition={{ duration: 0.5, times: [0, 0.3, 1] }}
            />

            {/* Glitch sweep effects */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#66ff80]/10 to-transparent"
              initial={{ x: "-100%", opacity: 0.5 }}
              animate={{ x: "100%", opacity: 0 }}
              transition={{ duration: timings.glitchPrimary, ease: transitionEase }}
            />
            <motion.div
              className="via-[#29f36b]/7 absolute inset-0 bg-gradient-to-l from-transparent to-transparent"
              initial={{ x: "100%", opacity: 0.35 }}
              animate={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: timings.glitchSecondary,
                delay: timings.glitchDelay,
                ease: transitionEase,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content transition */}
      <AnimatePresence mode="wait" initial={false}>
        {showContent && (
          <motion.div
            key={pathname}
            initial={
              prefersReduced ? false : { opacity: 0, filter: "blur(6px)", y: 10 }
            }
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={
              prefersReduced
                ? { opacity: 0 }
                : { opacity: 0, filter: "blur(3px)", y: -5 }
            }
            transition={{
              duration: prefersReduced ? 0.2 : 0.4,
              ease: transitionEase,
            }}
            className="flex min-h-screen flex-col"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
