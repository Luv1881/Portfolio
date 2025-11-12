"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { Section } from "@/components/sections/section";
import { SectionList } from "@/components/sections/list";
import { ProjectCard } from "@/components/sections/project-card";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { featuredProjects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-16 md:gap-20 md:py-24">
        <ScrollReveal>
          <Section id="projects" eyebrow="Selected Work" title="Projects">
            <SectionList
              items={featuredProjects}
              getKey={(project) => project.slug}
              renderItem={(project, index) => (
                <ScrollReveal delay={index * 0.1} direction="up">
                  <ProjectCard project={project} />
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
