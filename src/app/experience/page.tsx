"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { Section } from "@/components/sections/section";
import { SectionList } from "@/components/sections/list";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

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
      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-16 md:gap-20 md:py-24">
        <ScrollReveal>
          <Section id="experience" eyebrow="Journey" title="Experience">
            <SectionList<ExperienceEntry>
              items={[...experience]}
              getKey={(item) => item.company}
              renderItem={(item, index) => (
                <ScrollReveal delay={index * 0.1} direction="up">
                  <article className="hover:border-border/50 hover:bg-surface/50 group relative flex flex-col gap-3 rounded-xl border border-transparent px-4 py-6 transition-all duration-500 hover:shadow-lg sm:flex-row sm:items-baseline sm:justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium uppercase tracking-[0.3em] text-text transition-colors duration-300 group-hover:text-accent">
                        {item.company}
                      </h3>
                      <p className="text-muted/90 text-sm font-medium uppercase tracking-[0.5em]">
                        {item.role}
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        {item.summary}
                      </p>
                    </div>
                    <span className="text-muted/80 mt-1 text-xs font-medium uppercase tracking-[0.5em] sm:mt-0">
                      {item.period}
                    </span>
                  </article>
                </ScrollReveal>
              )}
            />
          </Section>
        </ScrollReveal>
      </main>
      <SiteFooter />
    </div>
  );
}
