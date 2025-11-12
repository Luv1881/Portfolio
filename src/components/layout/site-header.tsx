"use client";

import Link from "next/link";
import { useState } from "react";

export const NAV_ITEMS = [
  { label: "Blogs", href: "/blogs" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
] as const;

export const CONTACT_LINK = "mailto:hello@luvgupta.com";

export function SiteHeader() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[color:var(--header-bg)] py-6 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6">
        <div className="flex w-full items-center justify-between gap-6">
          <Link href="/" className="transition-all hover:translate-y-[-1px] hover:text-accent">
            <span className="block text-sm uppercase tracking-[0.5em] text-text">LUV</span>
          </Link>
          <ul className="flex items-center gap-8 text-xs uppercase tracking-[0.5em] text-muted">
            {NAV_ITEMS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  prefetch
                  className="inline-block transition-all hover:translate-y-[-1px] hover:text-accent"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={CONTACT_LINK}
                className="flex items-center rounded-full border border-border/40 px-4 py-2 text-text transition-all hover:border-accent hover:text-accent hover:shadow-md"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span>{isHovered ? "hello@luvgupta.com" : "Contact"}</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
