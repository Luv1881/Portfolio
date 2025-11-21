"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { experience } from "@/data/experience";
import { featuredProjects } from "@/data/projects";
import Link from "next/link";

export function ScrollyTellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".scrolly-item");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isVisible = rect.top < windowHeight * 0.8;

        if (isVisible && !section.classList.contains("animated")) {
          section.classList.add("animated");
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Experience Section */}
      <section id="experience" className="relative min-h-screen bg-transparent py-32">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="mb-4 bg-gradient-to-r from-accent via-accent-3 to-accent bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
              Experience
            </h2>
            <motion.div
              className="mb-20 h-1 bg-gradient-to-r from-accent via-accent-3 to-transparent"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          <div className="space-y-24">
            {experience.map((item, index) => (
              <motion.div
                key={index}
                className="scrolly-item border-border/20 group relative grid gap-8 border-l-2 pl-8 opacity-0 md:grid-cols-[1fr_2fr] md:gap-12"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ x: 10 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-accent ring-4 ring-background"
                  whileHover={{ scale: 2, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-accent"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(0, 102, 255, 0.7)",
                        "0 0 0 10px rgba(0, 102, 255, 0)",
                        "0 0 0 0 rgba(0, 102, 255, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                <div className="space-y-2">
                  <motion.h3
                    className="text-2xl font-bold text-text"
                    whileHover={{ color: "var(--accent)", x: 5 }}
                  >
                    {item.company}
                  </motion.h3>
                  <p className="text-sm font-medium uppercase tracking-widest text-accent">
                    {item.period}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-medium text-accent-3">{item.role}</h4>
                  <p className="text-muted/90 text-lg leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative min-h-screen bg-transparent py-32">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="mb-4 bg-gradient-to-r from-accent-3 via-accent to-accent-2 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
              Selected Work
            </h2>
            <motion.div
              className="mb-20 h-1 bg-gradient-to-r from-accent-3 via-accent to-transparent"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          <div className="grid gap-16 md:gap-32">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                className={`scrolly-item flex flex-col gap-12 opacity-0 md:flex-row ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  className="flex-1 space-y-6"
                  whileHover={{ x: index % 2 === 0 ? 10 : -10 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.span
                      className="text-xs font-bold uppercase tracking-widest text-accent"
                      whileHover={{ scale: 1.1, color: "var(--accent-3)" }}
                    >
                      {project.year}
                    </motion.span>
                    <motion.div
                      className="bg-border/50 h-px flex-1"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </div>

                  <motion.h3 className="text-3xl font-bold text-text transition-all duration-300 hover:bg-gradient-to-r hover:from-accent hover:to-accent-3 hover:bg-clip-text hover:text-transparent md:text-4xl">
                    {project.title}
                  </motion.h3>

                  <motion.p
                    className="text-muted/90 text-lg leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    {project.description}
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + tagIndex * 0.05 }}
                        whileHover={{
                          scale: 1.1,
                          borderColor: "var(--accent)",
                          color: "var(--accent)",
                          backgroundColor: "rgba(0, 102, 255, 0.1)",
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.div
                    className="flex gap-6 pt-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    {project.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text transition-colors hover:text-accent"
                      >
                        <motion.span whileHover={{ x: -5 }}>{link.label}</motion.span>
                        <motion.span
                          className="text-accent"
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          →
                        </motion.span>
                      </Link>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Project Visual */}
                <motion.div
                  className="group/card relative aspect-video flex-1 overflow-hidden rounded-xl border border-white/10 bg-black/10 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{
                    scale: 1.05,
                    borderColor: "rgba(0, 102, 255, 0.5)",
                    boxShadow: "0 20px 60px rgba(0, 102, 255, 0.3)",
                  }}
                >
                  <motion.div
                    className="from-accent/10 via-accent-3/10 flex h-full w-full items-center justify-center bg-gradient-to-br to-transparent p-8"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.span
                      className="text-6xl font-bold text-accent opacity-20 md:text-8xl"
                      whileHover={{
                        opacity: 0.5,
                        scale: 1.2,
                        rotate: 5,
                        textShadow: "0 0 30px rgba(0, 102, 255, 0.8)",
                      }}
                    >
                      {project.title[0]}
                    </motion.span>
                  </motion.div>

                  {/* Hover overlay effect */}
                  <motion.div
                    className="from-accent/20 to-accent-3/20 absolute inset-0 bg-gradient-to-tr opacity-0 mix-blend-overlay"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
