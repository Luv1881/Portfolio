"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Writing } from "@/data/writing";

export function WritingCard({ entry }: { entry: Writing }) {
  return (
    <motion.article
      className="border-border/20 bg-surface/20 hover:border-accent/30 hover:bg-surface/40 group relative flex flex-col gap-3 rounded-xl border p-5 backdrop-blur-sm transition-all duration-500 hover:shadow-soft sm:flex-row sm:items-baseline sm:justify-between"
      initial="rest"
      whileHover="hover"
      variants={{
        rest: { x: 0 },
        hover: { x: 4, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {/* Subtle glow effect on hover */}
      <div className="bg-accent/0 group-hover:bg-accent/3 pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-all duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex-1 space-y-2">
        <h3 className="text-lg font-semibold uppercase tracking-[0.28em] text-text">
          <Link
            href={`/blogs/${entry.slug}`}
            className="inline-block transition-all duration-300 ease-out hover:text-accent"
          >
            {entry.title}
          </Link>
        </h3>
        <p className="text-muted/90 max-w-xl text-sm leading-relaxed transition-colors duration-300 group-hover:text-muted">
          {entry.summary}
        </p>
      </div>
      <span className="text-accent/80 relative z-10 whitespace-nowrap text-xs font-medium uppercase tracking-[0.4em] transition-colors duration-300">
        {entry.publishedOn}
      </span>
    </motion.article>
  );
}
