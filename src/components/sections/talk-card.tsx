import Link from "next/link";
import type { Talk } from "@/data/talks";

export function TalkCard({ talk }: { talk: Talk }) {
  return (
    <article className="flex items-baseline justify-between gap-4">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold uppercase tracking-[0.28em] text-text">
          <Link href={`/talks/${talk.slug}`} className="hover:text-accent">
            {talk.title}
          </Link>
        </h3>
        <p className="text-sm uppercase tracking-[0.4em] text-muted">{talk.event}</p>
      </div>
      <span className="text-xs uppercase tracking-[0.4em] text-muted">{talk.year}</span>
    </article>
  );
}
