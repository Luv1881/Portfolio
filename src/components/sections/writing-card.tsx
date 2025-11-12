"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Writing } from "@/data/writing";

export function WritingCard({ entry }: { entry: Writing }) {
  return (
    <motion.article
      className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between group py-2"
      initial="rest"
      whileHover="hover"
      variants={{
        rest: { x: 0 },
        hover: { x: 4, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold uppercase tracking-[0.28em] text-text">
          <Link
            href={`/blogs/${entry.slug}`}
            className="transition-colors duration-300 ease-out hover:text-accent"
          >
            {entry.title}
          </Link>
        </h3>
        <p className="max-w-xl text-sm text-muted transition-colors duration-300 group-hover:text-text/80">
          {entry.summary}
        </p>
      </div>
      <span className="text-xs uppercase tracking-[0.4em] text-muted transition-colors duration-300">
        {entry.publishedOn}
      </span>
    </motion.article>
  );
}
