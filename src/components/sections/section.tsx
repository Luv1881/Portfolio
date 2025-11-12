import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  eyebrow: string;
  children: ReactNode;
}

export function Section({ id, title, eyebrow, children }: SectionProps) {
  return (
    <section
      id={id}
      className="border-border/30 hover:border-accent/30 group relative isolate overflow-hidden rounded-3xl border bg-surface px-10 py-12 shadow-soft transition-all duration-500 hover:shadow-[0_24px_80px_-60px_rgba(0,102,255,0.25)] md:px-16 md:py-16"
    >
      <div className="mb-12 space-y-4">
        <p className="text-xs uppercase tracking-[0.6em] text-muted font-medium">{eyebrow}</p>
        <h2 className="text-2xl font-medium uppercase tracking-[0.35em] text-text md:text-3xl">
          {title}
        </h2>
      </div>
      <div className="relative">
        {children}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </section>
  );
}

