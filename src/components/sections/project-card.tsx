"use client";

import Link from "next/link";
import { cubicBezier, motion } from "framer-motion";
import type { Project } from "@/data/projects";

const ease = cubicBezier(0.22, 1, 0.36, 1);

const cardVariants = {
  rest: {
    x: 0,
    transition: {
      duration: 0.3,
      ease,
    },
  },
  hover: {
    x: 4,
    transition: {
      duration: 0.3,
      ease,
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
      ease,
    },
  },
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className="border-border/20 from-surface/50 to-surface-muted/30 hover:border-accent/40 group relative grid gap-4 rounded-2xl border bg-gradient-to-br p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,102,255,0.15)] md:grid-cols-[minmax(0,1fr)_auto] md:items-start"
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardVariants}
    >
      {/* Subtle glow on hover */}
      <div className="from-accent/5 to-accent-3/5 pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="space-y-3">
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.5em] text-muted">
          <span className="font-semibold text-accent">{project.year}</span>
          <span className="bg-accent/70 size-1.5 animate-pulse rounded-full shadow-[0_0_8px_rgba(0,102,255,0.6)]" />
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border-border/30 bg-surface-muted/40 text-muted/90 group-hover:border-accent/30 group-hover:text-accent/80 rounded-full border px-2 py-1 text-[0.65rem] font-medium tracking-[0.3em] transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <h3 className="text-xl font-bold uppercase leading-tight tracking-[0.3em] text-text">
          <Link
            href={`/projects/${project.slug}`}
            className="group/link relative inline-block transition-all duration-300 ease-out hover:text-accent"
          >
            <span className="gradient-text">{project.title}</span>
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-accent via-accent-3 to-accent-2 transition-all duration-300 group-hover/link:w-full" />
          </Link>
        </h3>
        <p className="max-w-2xl text-base leading-relaxed text-muted">
          {project.description}
        </p>
      </div>
      <motion.div className="border-border/30 bg-surface-muted/40 group-hover:border-accent/50 group-hover:bg-accent/10 hidden rounded-full border transition-all duration-300 ease-out group-hover:shadow-[0_0_20px_rgba(0,102,255,0.3)] md:flex md:h-12 md:w-12 md:items-center md:justify-center">
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
