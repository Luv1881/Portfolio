"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

const hover = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className="group grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start py-2 transition-all duration-300 hover:translate-x-1"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.5em] text-muted">
          <span className="font-medium">{project.year}</span>
          <span className="bg-accent/50 size-1.5 rounded-full" />
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[0.7rem] tracking-[0.4em] text-muted/80 font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <h3 className="text-xl font-medium uppercase tracking-[0.3em] text-text leading-tight">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-all duration-300 hover:text-accent hover:translate-y-[-1px] inline-block"
          >
            {project.title}
          </Link>
        </h3>
        <p className="max-w-2xl text-base text-muted leading-relaxed">{project.description}</p>
      </div>
      <motion.div
        variants={hover}
        className="border-border/30 bg-surface-muted/40 group-hover:border-accent/50 group-hover:bg-accent/5 hidden rounded-full border transition-all duration-300 md:flex md:h-12 md:w-12 md:items-center md:justify-center"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="text-muted group-hover:text-accent transition-colors"
        >
          <path
            d="M7 17L17 7M17 7H7M17 7V17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.article>
  );
}
