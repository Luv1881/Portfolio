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
      className="border-border/40 relative isolate flex min-h-[70vh] flex-col justify-between gap-16 overflow-hidden rounded-3xl border bg-gradient-to-br from-surface via-surface to-surface-raised p-10 shadow-soft backdrop-blur-sm md:flex-row md:items-center md:p-16"
    >
      {/* Ambient glow effect */}
      <div className="bg-accent/15 pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

      <motion.div
        className="relative z-10 flex basis-1/2 flex-col gap-8"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.span
          variants={item}
          className="gradient-text text-sm font-semibold uppercase tracking-[0.5em]"
        >
          Product Engineer
        </motion.span>
        <motion.h1
          variants={item}
          className="text-4xl font-bold uppercase leading-tight tracking-[0.25em] text-text md:text-5xl"
        >
          Building digital experiences
          <br />
          <span className="gradient-text">with precision and craft.</span>
        </motion.h1>
        <motion.p
          variants={item}
          className="max-w-xl text-base leading-relaxed text-muted"
        >
          I&apos;m Luv Gupta, a product engineer focused on creating exceptional digital
          experiences. I work with teams to transform ideas into polished, performant
          products that users love.
        </motion.p>
        <motion.div variants={item} className="flex flex-wrap items-center gap-4">
          <Link
            href="/projects"
            className="border-accent/60 bg-accent/10 group relative overflow-hidden rounded-full border-2 px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-accent transition-all hover:scale-105 hover:border-accent hover:bg-accent hover:text-background hover:shadow-[0_0_20px_rgba(0,102,255,0.4)] active:scale-95"
          >
            <span className="relative z-10">View Projects</span>
          </Link>
          <a
            href="mailto:hello@luvgupta.com"
            className="border-border/60 group relative overflow-hidden rounded-full border px-6 py-3 text-sm font-medium uppercase tracking-[0.4em] text-text transition-all hover:scale-105 hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(0,102,255,0.2)] active:scale-95"
          >
            <span className="relative z-10">Get in Touch</span>
            <span className="bg-accent/5 absolute inset-0 -z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </a>
        </motion.div>
        <motion.ul variants={item} className="flex flex-wrap gap-6 text-sm text-muted">
          {socialLinks.map((link) => {
            const isExternal = link.href.startsWith("http");
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group relative inline-block transition-all hover:translate-y-[-2px] hover:text-accent"
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer noopener" : undefined}
                >
                  <span>{link.label}</span>
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            );
          })}
        </motion.ul>
      </motion.div>
      <motion.div
        className="relative z-10 flex basis-1/2 items-center justify-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-30 blur-3xl" />
        <div className="animate-float">
          <Monogram />
        </div>
      </motion.div>
    </section>
  );
}
