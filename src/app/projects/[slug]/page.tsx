import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getProjectBySlug, featuredProjects } from "@/data/projects";

type ProjectParams = {
  slug: string;
};

export function generateStaticParams(): ProjectParams[] {
  return featuredProjects.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: ProjectParams }): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project — Luv Gupta",
      description: "Selected work and experiments by Luv Gupta.",
    };
  }

  return {
    title: `${project.title} — Project Overview`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: ProjectParams }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-text">
      <SiteHeader />
      <main className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-16 md:gap-16 md:py-24">
        <Link
          href="/projects"
          className="text-xs uppercase tracking-[0.4em] text-muted transition hover:text-accent"
        >
          ← Back to Projects
        </Link>
        <article className="space-y-8">
          <header className="space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-muted">
              {project.year} • {project.tags.join(" • ")}
            </p>
            <h1 className="text-4xl font-semibold uppercase tracking-[0.3em] md:text-5xl">
              {project.title}
            </h1>
            <p className="text-base leading-relaxed text-muted md:text-lg">
              {project.description}
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-muted">
              Overview
            </h2>
            <p className="text-muted/90 text-base leading-relaxed">
              {project.overview}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-muted">
              Highlights
            </h2>
            <ul className="text-muted/90 space-y-3 text-base leading-relaxed">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="relative pl-6">
                  <span
                    className="absolute left-0 top-2 size-2 rounded-full bg-accent"
                    aria-hidden
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-muted">
              Explore
            </h2>
            <ul className="flex flex-wrap gap-3 text-sm uppercase tracking-[0.4em] text-accent">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="border-accent/40 hover:bg-accent/10 inline-flex items-center gap-2 rounded-full border px-4 py-2 transition hover:border-accent"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {link.label}
                    <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
