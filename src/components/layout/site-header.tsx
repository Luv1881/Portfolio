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
    <header className="border-border/50 sticky top-0 z-40 border-b bg-[color:var(--header-bg)] py-6 shadow-[0_4px_20px_rgba(0,0,0,0.1)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6">
        <div className="flex w-full items-center justify-between gap-6">
          <Link
            href="/"
            className="group relative transition-all duration-300 ease-out hover:scale-105 active:scale-95"
          >
            <span className="gradient-text block text-sm font-bold uppercase tracking-[0.5em]">
              LUV
            </span>
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
          </Link>
          <ul className="flex items-center gap-8 text-xs uppercase tracking-[0.5em] text-muted">
            {NAV_ITEMS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  prefetch
                  className="group relative inline-block transition-all duration-300 ease-out hover:scale-105 hover:text-accent active:scale-95"
                >
                  <span className="relative">
                    {label}
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <a
                href={CONTACT_LINK}
                className="border-border/40 group relative flex items-center overflow-hidden rounded-full border px-4 py-2 text-text transition-all duration-300 ease-out hover:scale-105 hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(0,102,255,0.2)] active:scale-95"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 transition-all duration-300">
                  {isHovered ? "hello@luvgupta.com" : "Contact"}
                </span>
                <span className="bg-accent/5 absolute inset-0 -z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
