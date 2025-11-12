import Link from "next/link";
import type { Writing } from "@/data/writing";

export function WritingCard({ entry }: { entry: Writing }) {
  return (
    <article className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold uppercase tracking-[0.28em] text-text">
          <Link href={`/blogs/${entry.slug}`} className="hover:text-accent">
            {entry.title}
          </Link>
        </h3>
        <p className="max-w-xl text-sm text-muted">{entry.summary}</p>
      </div>
      <span className="text-xs uppercase tracking-[0.4em] text-muted">
        {entry.publishedOn}
      </span>
    </article>
  );
}
