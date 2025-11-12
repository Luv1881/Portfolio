"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  id: string;
  title: string;
  eyebrow: string;
  children: ReactNode;
}

export function Section({ id, title, eyebrow, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      className="border-border/30 hover:border-accent/30 group relative isolate overflow-hidden rounded-3xl border bg-surface px-10 py-12 shadow-soft transition-all duration-500 hover:shadow-[0_24px_80px_-60px_rgba(0,102,255,0.25)] md:px-16 md:py-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="mb-12 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-medium uppercase tracking-[0.6em] text-muted">
          {eyebrow}
        </p>
        <h2 className="text-2xl font-medium uppercase tracking-[0.35em] text-text md:text-3xl">
          {title}
        </h2>
      </motion.div>
      <div className="relative">
        {children}
        <div className="via-accent/5 pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </motion.section>
  );
}
