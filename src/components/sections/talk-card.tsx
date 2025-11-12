"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Talk } from "@/data/talks";

export function TalkCard({ talk }: { talk: Talk }) {
  return (
    <motion.article
      className="border-border/20 bg-surface/20 hover:border-accent/30 hover:bg-surface/40 group relative flex items-baseline justify-between gap-4 rounded-xl border p-5 backdrop-blur-sm transition-all duration-500 hover:shadow-soft"
      initial="rest"
      whileHover="hover"
      variants={{
        rest: { x: 0 },
        hover: { x: 4, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {/* Gradient glow effect on hover */}
      <div className="from-accent/0 via-accent-2/0 to-accent-3/0 group-hover:from-accent/5 group-hover:via-accent-2/5 group-hover:to-accent-3/5 pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 transition-all duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex-1 space-y-1">
        <h3 className="text-lg font-semibold uppercase tracking-[0.28em] text-text">
          <Link
            href={`/talks/${talk.slug}`}
            className="inline-block transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-accent hover:via-accent-2 hover:to-accent-3 hover:bg-clip-text hover:text-transparent"
          >
            {talk.title}
          </Link>
        </h3>
        <p className="text-muted/90 text-sm uppercase tracking-[0.4em] transition-colors duration-300 group-hover:text-muted">
          {talk.event}
        </p>
      </div>
      <span className="text-accent/80 relative z-10 whitespace-nowrap text-xs font-medium uppercase tracking-[0.4em] transition-colors duration-300">
        {talk.year}
      </span>
    </motion.article>
  );
}
