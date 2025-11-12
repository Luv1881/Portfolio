"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Section } from "@/components/sections/section";
import { SectionList } from "@/components/sections/list";
import { WritingCard } from "@/components/sections/writing-card";
import { latestWriting } from "@/data/writing";

export default function WritingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-16 md:gap-20 md:py-24">
        <Section id="blogs" eyebrow="Latest" title="Blogs">
          <SectionList
            items={latestWriting}
            getKey={(entry) => entry.slug}
            renderItem={(entry) => <WritingCard entry={entry} />}
          />
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
