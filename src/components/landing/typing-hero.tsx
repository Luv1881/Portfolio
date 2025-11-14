"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTypewriter } from "@/hooks/use-typewriter";
import { CONTACT_LINK, NAV_ITEMS } from "@/components/layout/site-header";

const PHRASES = ["Luv Gupta", "Software Engineer"] as const;

// Neural mesh node component
function NeuralNode({ x, y, index }: { x: number; y: number; index: number }) {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r="4"
      fill="currentColor"
      className="text-accent"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay: index * 0.1,
        ease: "easeInOut",
      }}
    />
  );
}

// Particle component
function Particle({ index }: { index: number }) {
  const [position] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100,
  });

  return (
    <motion.div
      className="absolute h-1 w-1 rounded-full bg-accent-3"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      animate={{
        x: [0, Math.random() * 40 - 20, 0],
        y: [0, Math.random() * 40 - 20, 0],
        opacity: [0.2, 0.5, 0.2],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: 4 + Math.random() * 4,
        repeat: Infinity,
        delay: index * 0.1,
        ease: "easeInOut",
      }}
    />
  );
}

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
      "text-5xl font-bold uppercase tracking-[0.3em] md:text-7xl lg:text-8xl whitespace-nowrap",
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
    setLineWidth(max + 4);
  }, []);

  useLayoutEffect(() => {
    updateLineWidth();
    window.addEventListener("resize", updateLineWidth);
    return () => window.removeEventListener("resize", updateLineWidth);
  }, [updateLineWidth]);

  // Generate neural mesh nodes
  const neuralNodes = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < 12; i++) {
      nodes.push({
        x: (i % 4) * 33 + 10,
        y: Math.floor(i / 4) * 33 + 10,
        index: i,
      });
    }
    return nodes;
  }, []);

  return (
    <main className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background text-text">
      {/* Neural Mesh Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full opacity-30"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Animated connections */}
          {neuralNodes.map((node, i) =>
            neuralNodes.slice(i + 1).map((targetNode, j) => {
              const distance = Math.sqrt(
                Math.pow(targetNode.x - node.x, 2) + Math.pow(targetNode.y - node.y, 2),
              );
              if (distance < 40) {
                return (
                  <motion.line
                    key={`${i}-${j}`}
                    x1={node.x}
                    y1={node.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke="currentColor"
                    strokeWidth="0.1"
                    className="text-accent-2"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0.05, 0.2, 0.05],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: (i + j) * 0.1,
                    }}
                    filter="url(#glow)"
                  />
                );
              }
              return null;
            }),
          )}

          {/* Nodes */}
          {neuralNodes.map((node) => (
            <NeuralNode key={node.index} x={node.x} y={node.y} index={node.index} />
          ))}
        </svg>
      </div>

      {/* Particle Field */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>

      {/* Liquid Morphing Shapes */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-[15%] top-[15%] h-[600px] w-[600px] rounded-full opacity-20 blur-[150px]"
          style={{
            background:
              "radial-gradient(circle at center, var(--accent) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 60, 0],
            scale: [1, 1.2, 0.9, 1],
            rotate: [0, 90, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-[15%] top-[30%] h-[500px] w-[500px] rounded-full opacity-15 blur-[130px]"
          style={{
            background:
              "radial-gradient(circle at center, var(--accent-2) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 70, -30, 0],
            scale: [1, 0.85, 1.15, 1],
            rotate: [0, -90, -180, -360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="opacity-12 absolute bottom-[20%] left-[35%] h-[550px] w-[550px] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle at center, var(--accent-3) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 40, -60, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.1, 0.95, 1],
            rotate: [0, 120, 240, 360],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content - Perfectly Centered */}
      <motion.section
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-12 px-6 text-center sm:gap-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Premium Status Badge */}
        <motion.div
          className="border-accent/20 bg-accent/5 inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 backdrop-blur-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent"></span>
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
            Available for opportunities
          </span>
        </motion.div>

        {/* Holographic Hero Text with Chromatic Aberration */}
        <div className="relative flex w-full flex-col items-center justify-center gap-8">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-5xl font-bold uppercase leading-tight tracking-[0.3em] text-text sm:text-6xl md:text-7xl lg:text-8xl">
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
                {/* Chromatic aberration layers */}
                <span className="relative inline-block">
                  <span className="holographic-text gradient-text-premium overflow-hidden text-ellipsis">
                    {text}
                  </span>
                  {/* Red channel offset */}
                  <span
                    className="pointer-events-none absolute left-0 top-0 overflow-hidden text-ellipsis opacity-40"
                    style={{
                      color: "#ff0066",
                      transform: "translate(-1px, -1px)",
                      mixBlendMode: "screen",
                    }}
                  >
                    {text}
                  </span>
                  {/* Blue channel offset */}
                  <span
                    className="pointer-events-none absolute left-0 top-0 overflow-hidden text-ellipsis opacity-40"
                    style={{
                      color: "#00ccff",
                      transform: "translate(1px, 1px)",
                      mixBlendMode: "screen",
                    }}
                  >
                    {text}
                  </span>
                </span>
                <motion.span
                  className="animate-caret ml-3 inline-block h-[1.2em] w-[3px] flex-shrink-0 bg-accent align-middle"
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(0,102,255,0.8)",
                      "0 0 20px rgba(0,102,255,1)",
                      "0 0 10px rgba(0,102,255,0.8)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </span>
            </h1>
          </motion.div>

          {/* Premium Subtitle */}
          <motion.p
            className="max-w-3xl text-base leading-relaxed text-muted sm:text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Crafting exceptional digital experiences through innovative engineering and
            thoughtful design
          </motion.p>

          {/* Holographic glow effect */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <motion.div
              className="absolute left-1/2 top-1/2 h-80 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-25 blur-[120px]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.25, 0.35, 0.25],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        {/* Hidden measurer */}
        <span
          ref={measureRef}
          className={`${measureClasses} absolute -left-[9999px] -top-[9999px]`}
        />

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {NAV_ITEMS.map(({ href, label }, index) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.8 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={href}
                prefetch
                className="border-border/40 bg-surface/30 hover:bg-accent/10 group relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-8 py-4 text-sm font-medium uppercase tracking-[0.5em] text-text backdrop-blur-xl transition-all duration-300 ease-out hover:scale-105 hover:border-accent hover:shadow-[0_0_30px_rgba(0,102,255,0.3)] active:scale-95"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-accent">
                  {label}
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
                <span className="bg-accent/5 absolute inset-0 -z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.8 + NAV_ITEMS.length * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <a
              href={CONTACT_LINK}
              className="border-accent/60 bg-accent/10 group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 px-8 py-4 text-sm font-bold uppercase tracking-[0.5em] text-accent backdrop-blur-xl transition-all duration-300 ease-out hover:scale-105 hover:border-accent hover:bg-accent hover:text-background hover:shadow-[0_0_40px_rgba(0,102,255,0.5)] active:scale-95"
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
      </motion.section>
    </main>
  );
}
