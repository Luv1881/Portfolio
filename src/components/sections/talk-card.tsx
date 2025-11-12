"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Talk } from "@/data/talks";

export function TalkCard({ talk }: { talk: Talk }) {
  return (
    <motion.article
      className="flex items-baseline justify-between gap-4 group py-2"
      initial="rest"
      whileHover="hover"
      variants={{
        rest: { x: 0 },
        hover: { x: 4, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      <div className="space-y-1">
        <h3 className="text-lg font-semibold uppercase tracking-[0.28em] text-text">
          <Link
            href={`/talks/${talk.slug}`}
            className="transition-colors duration-300 ease-out hover:text-accent"
          >
            {talk.title}
          </Link>
        </h3>
        <p className="text-sm uppercase tracking-[0.4em] text-muted transition-colors duration-300 group-hover:text-text/80">
          {talk.event}
        </p>
      </div>
      <span className="text-xs uppercase tracking-[0.4em] text-muted transition-colors duration-300">
        {talk.year}
      </span>
    </motion.article>
  );
}
