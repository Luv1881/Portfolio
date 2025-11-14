"use client";

import Link from "next/link";
import { cubicBezier, motion } from "framer-motion";
import type { Project } from "@/data/projects";

const ease = cubicBezier(0.22, 1, 0.36, 1);

const cardVariants = {
  rest: {
    y: 0,
    transition: {
      duration: 0.4,
      ease,
    },
  },
  hover: {
    y: -8,
    transition: {
      duration: 0.4,
      ease,
    },
  },
};

const iconVariants = {
  rest: {
    x: -4,
    y: 4,
    opacity: 0,
    scale: 0.8,
  },
  hover: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease,
    },
  },
};

const glowVariants = {
  rest: {
    opacity: 0,
    scale: 0.8,
  },
  hover: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease,
    },
  },
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className="border-border/20 from-surface/80 via-surface/60 to-surface-muted/50 group relative overflow-hidden rounded-3xl border bg-gradient-to-br p-8 backdrop-blur-xl transition-all duration-500"
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardVariants}
    >
      {/* Animated gradient glow on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 102, 255, 0.3), rgba(0, 204, 255, 0.2), rgba(255, 0, 102, 0.2))",
          filter: "blur(20px)",
        }}
        variants={glowVariants}
      />

      {/* Premium shimmer effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        <motion.div
          className="absolute -inset-full opacity-0 transition-opacity duration-700 group-hover:opacity-30"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.5em]">
            <motion.span
              className="font-bold text-accent"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {project.year}
            </motion.span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <motion.span
                  key={tag}
                  className="border-border/30 bg-surface-muted/60 text-muted/90 group-hover:border-accent/40 group-hover:bg-accent/10 rounded-full border px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.3em] backdrop-blur-sm transition-all duration-300 group-hover:text-accent"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          <h3 className="text-2xl font-bold uppercase leading-tight tracking-[0.25em]">
            <Link
              href={`/projects/${project.slug}`}
              className="group/link relative inline-block"
            >
              <motion.span
                className="gradient-text-premium transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                {project.title}
              </motion.span>
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] w-0 rounded-full bg-gradient-to-r from-accent via-accent-3 to-accent-2 shadow-[0_0_10px_rgba(0,102,255,0.5)] transition-all duration-500 group-hover/link:w-full"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
              />
            </Link>
          </h3>

          <p className="group-hover:text-text/90 max-w-2xl text-base leading-relaxed text-muted transition-colors duration-300">
            {project.description}
          </p>
        </div>

        <motion.div
          className="border-border/30 bg-surface-muted/40 group-hover:border-accent/50 group-hover:bg-accent/10 hidden rounded-2xl border p-4 backdrop-blur-sm transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,102,255,0.3)] md:block"
          variants={iconVariants}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-muted transition-colors duration-300 group-hover:text-accent"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      {/* Subtle inner glow */}
      <div className="from-accent/0 via-accent/0 to-accent/5 pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.article>
  );
}
