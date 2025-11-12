import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Section } from "@/components/sections/section";
import { SectionList } from "@/components/sections/list";
import { TalkCard } from "@/components/sections/talk-card";
import { recentTalks } from "@/data/talks";

export default function TalksPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-16 md:gap-20 md:py-24">
        <Section id="talks" eyebrow="Stage" title="Talks & Workshops">
          <SectionList
            items={recentTalks}
            getKey={(talk) => talk.slug}
            renderItem={(talk) => <TalkCard talk={talk} />}
          />
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
