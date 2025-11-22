"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { Section } from "@/components/sections/section";
import { SectionList } from "@/components/sections/list";
import { WritingCard } from "@/components/sections/writing-card";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { latestWriting } from "@/data/writing";

import { SolarSystemBackground } from "@/components/effects/solar-system-background";

export default function WritingPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <SolarSystemBackground />
      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-16 md:gap-20 md:py-24">
        <ScrollReveal>
          <Section id="blogs" eyebrow="Latest" title="Blogs">
            <SectionList
              items={latestWriting}
              getKey={(entry) => entry.slug}
              renderItem={(entry, index) => (
                <ScrollReveal delay={index * 0.1} direction="up">
                  <WritingCard entry={entry} />
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
