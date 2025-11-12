"use client";

import Link from "next/link";
import { cubicBezier, motion } from "framer-motion";
import { socialLinks } from "@/data/social";
import { Monogram } from "./monogram";

const ease = cubicBezier(0.22, 1, 0.36, 1);

const container = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { ease } },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="border-border/40 relative isolate flex min-h-[70vh] flex-col justify-between gap-16 overflow-hidden rounded-3xl border bg-surface p-10 shadow-soft md:flex-row md:items-center md:p-16"
    >
      <motion.div
        className="flex basis-1/2 flex-col gap-8"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.span variants={item} className="text-sm uppercase tracking-[0.5em] text-muted">
          Product Engineer
        </motion.span>
        <motion.h1
          variants={item}
          className="text-4xl font-semibold uppercase tracking-[0.25em] text-text md:text-5xl"
        >
          Building digital experiences
          <br />
          with precision and craft.
        </motion.h1>
        <motion.p variants={item} className="max-w-xl text-base leading-relaxed text-muted">
          I&apos;m Luv Gupta, a product engineer focused on creating exceptional digital experiences.
          I work with teams to transform ideas into polished, performant products that users love.
        </motion.p>
        <motion.div variants={item} className="flex flex-wrap items-center gap-4">
          <Link
            href="/projects"
            className="border-accent/60 bg-accent/10 rounded-full border px-6 py-3 text-sm font-medium uppercase tracking-[0.4em] text-accent transition-all hover:bg-accent hover:text-background hover:shadow-lg"
          >
            View Projects
          </Link>
          <a
            href="mailto:hello@luvgupta.com"
            className="border-border/60 rounded-full border px-6 py-3 text-sm font-medium uppercase tracking-[0.4em] text-text transition-all hover:border-accent hover:text-accent hover:shadow-lg"
          >
            Get in Touch
          </a>
        </motion.div>
        <motion.ul variants={item} className="flex flex-wrap gap-6 text-sm text-muted">
          {socialLinks.map((link) => {
            const isExternal = link.href.startsWith("http");
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="transition-all hover:text-accent hover:translate-y-[-2px] inline-block"
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer noopener" : undefined}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </motion.ul>
      </motion.div>
      <motion.div
        className="relative flex basis-1/2 items-center justify-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,var(--accent-3)_0%,transparent_70%)] blur-3xl" />
        <Monogram />
      </motion.div>
    </section>
  );
}
