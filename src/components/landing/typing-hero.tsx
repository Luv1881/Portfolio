"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";
import { CONTACT_LINK } from "@/components/layout/site-header";

const PHRASES = [
  "Architecting Digital Universes",
  "Engineering for Human Connection",
  "Designing with Empathy",
] as const;

function TypewriterText({ text }: { text: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      duration: text.length * 0.035,
      ease: [0.4, 0.0, 0.2, 1],
      delay: 0.3,
    });
    return controls.stop;
  }, [text, count]);

  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span className="bg-gradient-to-r from-white via-accent to-accent-3 bg-clip-text text-transparent">
        {displayText}
      </motion.span>
    </motion.span>
  );
}

export function TypingHero() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative flex h-screen w-full items-center justify-center overflow-hidden text-text">
      <motion.section
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-12 px-6 text-center sm:gap-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Premium Status Badge */}
        <motion.div
          className="border-accent/30 inline-flex items-center gap-2.5 rounded-full border bg-black/20 px-5 py-2.5 backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{
            scale: 1.05,
            borderColor: "rgba(0, 102, 255, 0.6)",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(0,102,255,0.8)]"></span>
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
            Available for opportunities
          </span>
        </motion.div>

        {/* Hero Text with Enhanced Typewriter Animation */}
        <div className="relative flex w-full flex-col items-center justify-center gap-8 py-8">
          <motion.div
            className="relative min-h-[120px] py-4 sm:min-h-[160px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="text-5xl font-bold uppercase leading-none tracking-[0.1em] sm:text-6xl md:text-7xl lg:text-8xl">
              <AnimatePresence mode="wait">
                <TypewriterText
                  key={currentPhraseIndex}
                  text={PHRASES[currentPhraseIndex]}
                />
              </AnimatePresence>
            </h1>

            {/* Animated underline */}
            <motion.div
              className="mx-auto mt-6 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"
              initial={{ width: "0%" }}
              animate={{ width: "60%" }}
              transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          {/* Premium Subtitle */}
          <motion.p
            className="max-w-3xl text-base leading-relaxed text-muted sm:text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Crafting exceptional digital experiences through innovative engineering and
            thoughtful design. I care deeply about how people feel when they visit a
            website.
          </motion.p>
        </div>

        {/* CTA Buttons with enhanced animations */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/blogs"
              prefetch
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-black/20 px-8 py-4 text-sm font-medium uppercase tracking-[0.5em] text-text backdrop-blur-md transition-all duration-300 ease-out hover:border-accent hover:bg-black/30 hover:shadow-[0_0_30px_rgba(0,102,255,0.3)]"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-accent">
                Blogs
              </span>
              <svg
                className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              <span className="bg-accent/10 absolute inset-0 -z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 1.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href={CONTACT_LINK}
              className="border-accent/50 bg-accent/5 group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 px-8 py-4 text-sm font-bold uppercase tracking-[0.5em] text-accent backdrop-blur-md transition-all duration-300 ease-out hover:border-accent hover:bg-accent hover:text-background hover:shadow-[0_0_40px_rgba(0,102,255,0.5)]"
            >
              <span className="relative z-10">Let&apos;s Talk</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
      </motion.section>
    </main>
  );
}
