"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { Section } from "@/components/sections/section";
import { SectionList } from "@/components/sections/list";
import { TalkCard } from "@/components/sections/talk-card";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { recentTalks } from "@/data/talks";

export default function TalksPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-16 md:gap-20 md:py-24">
        <ScrollReveal>
          <Section id="talks" eyebrow="Stage" title="Talks & Workshops">
            <SectionList
              items={recentTalks}
              getKey={(talk) => talk.slug}
              renderItem={(talk, index) => (
                <ScrollReveal delay={index * 0.1} direction="up">
                  <TalkCard talk={talk} />
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
