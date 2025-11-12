"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Section } from "@/components/sections/section";
import { SectionList } from "@/components/sections/list";
import { motion } from "framer-motion";

type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  summary: string;
};

const experience: ExperienceEntry[] = [
  {
    company: "Orion Labs",
    role: "Principal Product Engineer",
    period: "2023 — Present",
    summary:
      "Leading prototyping and systems architecture for spatial analytics tools powering data-heavy teams.",
  },
  {
    company: "Ripple Studio",
    role: "Founder & Lead Engineer",
    period: "2021 — 2023",
    summary:
      "Partnered with early-stage founders to deliver expressive interfaces that shipped to production.",
  },
  {
    company: "Saturn",
    role: "Design Engineer",
    period: "2019 — 2021",
    summary:
      "Built the shared design system and performance tooling for realtime trading applications.",
  },
];

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-16 md:gap-20 md:py-24">
        <Section id="experience" eyebrow="Journey" title="Experience">
          <SectionList<ExperienceEntry>
            items={[...experience]}
            getKey={(item) => item.company}
            renderItem={(item) => (
              <motion.article
                className="flex flex-col gap-3 py-4 group sm:flex-row sm:items-baseline sm:justify-between"
                initial="rest"
                whileHover="hover"
                variants={{
                  rest: { x: 0 },
                  hover: { x: 4, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <div className="flex-1">
                  <h3 className="text-lg font-medium uppercase tracking-[0.3em] text-text transition-colors duration-300">
                    {item.company}
                  </h3>
                  <p className="text-sm uppercase tracking-[0.5em] text-muted/90 font-medium transition-colors duration-300 group-hover:text-text/80">
                    {item.role}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm text-muted leading-relaxed transition-colors duration-300">
                    {item.summary}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-[0.5em] text-muted/80 font-medium mt-1 sm:mt-0 transition-colors duration-300">
                  {item.period}
                </span>
              </motion.article>
            )}
          />
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}

