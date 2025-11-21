import { TypingHero } from "@/components/landing/typing-hero";
import { ScrollyTellingSection } from "@/components/sections/scrollytelling-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SolarSystemBackground } from "@/components/effects/solar-system-background";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <SolarSystemBackground />
      <TypingHero />
      <ScrollyTellingSection />
      <SiteFooter />
    </main>
  );
}
