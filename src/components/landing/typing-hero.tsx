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
    () =>
      "text-4xl font-semibold uppercase tracking-[0.4em] md:text-5xl whitespace-nowrap",
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
    <main className="bg-background text-text">
      <motion.section
        className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-12 px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-4xl font-semibold uppercase tracking-[0.4em] md:text-5xl">
          <span
            className="mx-auto inline-flex items-center justify-center whitespace-nowrap"
            style={lineWidth ? { width: `${lineWidth}px` } : undefined}
            aria-live="polite"
            aria-atomic
          >
            <span>{text}</span>
            <span className="ml-3 inline-block h-[1.2em] w-[2px] bg-accent align-middle animate-caret" />
          </span>
        </h1>
        {/* Hidden measurer to lock a stable width and prevent layout shift */}
        <span ref={measureRef} className={`${measureClasses} absolute -left-[9999px] -top-[9999px]`} />
        <ul className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.5em] text-muted md:gap-8">
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                prefetch
                className="inline-block rounded-full border border-border/40 px-6 py-3 text-text transition-all hover:border-accent hover:text-accent hover:shadow-md"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={CONTACT_LINK}
              className="inline-block rounded-full border border-border/40 px-6 py-3 text-text transition-all hover:border-accent hover:text-accent hover:shadow-md"
            >
              Contact
            </a>
          </li>
        </ul>
      </motion.section>
    </main>
  );
}
