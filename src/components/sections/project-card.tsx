"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

const cardVariants = {
  rest: {
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  hover: {
    x: 4,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const iconVariants = {
  rest: {
    opacity: 0,
    scale: 0.8,
    rotate: -45,
  },
  hover: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className="border-border/20 bg-surface/30 hover:border-accent/30 hover:bg-surface/50 group relative grid gap-4 rounded-2xl border p-6 backdrop-blur-sm transition-all duration-500 hover:shadow-soft md:grid-cols-[minmax(0,1fr)_auto] md:items-start"
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardVariants}
    >
      {/* Gradient glow effect on hover */}
      <div className="from-accent/0 via-accent-2/0 to-accent-3/0 group-hover:from-accent/5 group-hover:via-accent-2/5 group-hover:to-accent-3/5 pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-all duration-500 group-hover:opacity-100" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted">
          <span className="font-semibold text-accent">{project.year}</span>
          <span className="size-1.5 rounded-full bg-gradient-to-r from-accent via-accent-2 to-accent-3" />
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-surface-raised/80 border-border/30 text-muted/90 group-hover:border-accent/40 rounded-full border px-2.5 py-1 text-[0.65rem] font-medium tracking-[0.3em] transition-all duration-300 group-hover:text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <h3 className="text-xl font-medium uppercase leading-tight tracking-[0.3em] text-text">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-block transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-accent hover:via-accent-2 hover:to-accent-3 hover:bg-clip-text hover:text-transparent"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-muted/90 max-w-2xl text-base leading-relaxed transition-colors duration-300 group-hover:text-muted">
          {project.description}
        </p>
      </div>
      <motion.div className="border-border/30 bg-surface-raised/60 group-hover:border-accent/50 group-hover:bg-accent/10 relative z-10 hidden rounded-full border transition-all duration-300 ease-out group-hover:shadow-[0_0_20px_rgba(0,102,255,0.3)] md:flex md:h-12 md:w-12 md:items-center md:justify-center">
        <motion.svg
          variants={iconVariants}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="text-muted transition-colors duration-300 group-hover:text-accent"
        >
          <path
            d="M7 17L17 7M17 7H7M17 7V17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </motion.article>
  );
}
