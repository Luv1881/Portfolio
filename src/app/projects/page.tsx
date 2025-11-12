"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Section } from "@/components/sections/section";
import { SectionList } from "@/components/sections/list";
import { ProjectCard } from "@/components/sections/project-card";
import { featuredProjects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-16 md:gap-20 md:py-24">
        <Section id="projects" eyebrow="Selected Work" title="Projects">
          <SectionList
            items={featuredProjects}
            getKey={(project) => project.slug}
            renderItem={(project) => <ProjectCard project={project} />}
          />
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
