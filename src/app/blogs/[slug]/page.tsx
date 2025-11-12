import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getWritingBySlug, latestWriting } from "@/data/writing";

type BlogParams = {
  slug: string;
};

export function generateStaticParams(): BlogParams[] {
  return latestWriting.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: BlogParams }): Metadata {
  const entry = getWritingBySlug(params.slug);

  if (!entry) {
    return {
      title: "Blog — Luv Gupta",
      description: "Thoughts, notes, and lessons on building digital products.",
    };
  }

  return {
    title: `${entry.title} — Luv Gupta`,
    description: entry.summary,
  };
}

export default function BlogPostPage({ params }: { params: BlogParams }) {
  const entry = getWritingBySlug(params.slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16 md:gap-10 md:py-24">
        <Link
          href="/blogs"
          className="text-xs uppercase tracking-[0.4em] text-muted transition hover:text-accent"
        >
          ← Back to Blogs
        </Link>
        <article className="space-y-6">
          <header className="space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-muted">{entry.publishedOn}</p>
            <h1 className="text-4xl font-semibold uppercase tracking-[0.3em] text-text md:text-5xl">
              {entry.title}
            </h1>
            <p className="text-sm leading-relaxed text-muted">{entry.summary}</p>
          </header>
          <div className="space-y-5 text-base leading-relaxed text-muted">
            {entry.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
