"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTypewriter } from "@/hooks/use-typewriter";
import { CONTACT_LINK, NAV_ITEMS } from "@/components/layout/site-header";

const PHRASES = ["Luv Gupta", "Software Engineer"] as const;

export function TypingHero() {
  const { text } = useTypewriter({
    words: PHRASES as unknown as string[],
    typeSpeed: 85,
    deleteSpeed: 55,
    holdTime: 1200,
    startDelay: 250,
    loop: true,
  });
  const measureRef = useRef<HTMLSpanElement>(null);
  const [lineWidth, setLineWidth] = useState<number>(0);

  const measureClasses = useMemo(
    () => "text-4xl font-bold uppercase tracking-[0.3em] md:text-5xl whitespace-nowrap",
    [],
  );

  const updateLineWidth = useCallback(() => {
    if (!measureRef.current) return;
    const el = measureRef.current;
    let max = 0;
    for (const w of PHRASES) {
      el.textContent = w;
      const width = el.offsetWidth;
      if (width > max) max = width;
    }
    el.textContent = "";
    // add a tiny buffer for caret
    setLineWidth(max + 4);
  }, []);

  useLayoutEffect(() => {
    updateLineWidth();
    window.addEventListener("resize", updateLineWidth);
    return () => window.removeEventListener("resize", updateLineWidth);
  }, [updateLineWidth]);

  return (
    <main className="relative bg-background text-text">
      <motion.section
        className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-12 px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative flex w-full items-center justify-center">
          <h1 className="gradient-text text-4xl font-bold uppercase tracking-[0.3em] md:text-5xl">
            <span
              className="inline-flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap"
              style={
                lineWidth
                  ? { width: `${lineWidth}px`, maxWidth: "90vw" }
                  : { maxWidth: "90vw" }
              }
              aria-live="polite"
              aria-atomic
            >
              <span className="overflow-hidden text-ellipsis">{text}</span>
              <span className="animate-caret ml-2 inline-block h-[1.2em] w-[2px] flex-shrink-0 bg-accent align-middle" />
            </span>
          </h1>
          {/* Glow effect behind text */}
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 blur-3xl">
            <div className="absolute left-1/2 top-1/2 h-32 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
          </div>
        </div>
        {/* Hidden measurer to lock a stable width and prevent layout shift */}
        <span
          ref={measureRef}
          className={`${measureClasses} absolute -left-[9999px] -top-[9999px]`}
        />
        <motion.ul
          className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.5em] text-muted md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {NAV_ITEMS.map(({ href, label }, index) => (
            <motion.li
              key={href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.4 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={href}
                prefetch
                className="border-border/40 group relative inline-block overflow-hidden rounded-full border px-6 py-3 text-text transition-all duration-300 ease-out hover:scale-105 hover:border-accent hover:shadow-[0_0_15px_rgba(0,102,255,0.2)] active:scale-95"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-accent">
                  {label}
                </span>
                <span className="bg-accent/5 absolute inset-0 -z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.4 + NAV_ITEMS.length * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <a
              href={CONTACT_LINK}
              className="border-accent/60 bg-accent/10 group relative inline-block overflow-hidden rounded-full border-2 px-6 py-3 font-semibold text-accent transition-all duration-300 ease-out hover:scale-105 hover:border-accent hover:bg-accent hover:text-background hover:shadow-[0_0_20px_rgba(0,102,255,0.4)] active:scale-95"
            >
              <span className="relative z-10">Contact</span>
            </a>
          </motion.li>
        </motion.ul>
      </motion.section>
    </main>
  );
}
