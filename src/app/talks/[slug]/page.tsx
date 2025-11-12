import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getTalkBySlug, recentTalks } from "@/data/talks";

type TalkParams = {
  slug: string;
};

export function generateStaticParams(): TalkParams[] {
  return recentTalks.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: TalkParams }): Metadata {
  const talk = getTalkBySlug(params.slug);

  if (!talk) {
    return {
      title: "Talks — Luv Gupta",
      description: "Conference sessions and workshops by Luv Gupta.",
    };
  }

  return {
    title: `${talk.title} — Talk Overview`,
    description: talk.abstract,
  };
}

export default function TalkPage({ params }: { params: TalkParams }) {
  const talk = getTalkBySlug(params.slug);

  if (!talk) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-text">
      <SiteHeader />
      <main className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-16 md:gap-16 md:py-24">
        <Link
          href="/talks"
          className="text-xs uppercase tracking-[0.4em] text-muted transition hover:text-accent"
        >
          ← Back to Talks
        </Link>
        <article className="space-y-8">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-muted">
              {talk.event} • {talk.year}
            </p>
            <h1 className="text-4xl font-semibold uppercase tracking-[0.3em] md:text-5xl">
              {talk.title}
            </h1>
            <p className="text-base leading-relaxed text-muted md:text-lg">{talk.abstract}</p>
          </header>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-muted">Key Takeaways</h2>
            <ul className="space-y-3 text-base leading-relaxed text-muted/90">
              {talk.takeaways.map((takeaway) => (
                <li key={takeaway} className="relative pl-6">
                  <span className="absolute left-0 top-2 size-2 rounded-full bg-accent" aria-hidden />
                  {takeaway}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-muted">Resources</h2>
            <ul className="flex flex-wrap gap-3 text-sm uppercase tracking-[0.4em] text-accent">
              {talk.resources.map((resource) => (
                <li key={resource.href}>
                  <a
                    href={resource.href}
                    className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-4 py-2 transition hover:border-accent hover:bg-accent/10"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {resource.label}
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
