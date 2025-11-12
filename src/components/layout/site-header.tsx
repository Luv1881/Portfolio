"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { MagneticElement } from "@/components/effects/magnetic-element";

export const NAV_ITEMS = [
  { label: "Blogs", href: "/blogs" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
] as const;

export const CONTACT_LINK = "mailto:hello@luvgupta.com";

export function SiteHeader() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleNavHover = (href: string) => {
    // Preload route on hover for instant navigation
    router.prefetch(href);
  };

  return (
    <header className="border-border/50 sticky top-0 z-50 border-b bg-[color:var(--header-bg)] py-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all duration-300">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <MagneticElement strength={0.2}>
          <Link
            href="/"
            className="group relative transition-all duration-300 ease-out hover:scale-110 active:scale-95"
          >
            <span className="gradient-text block text-sm font-bold uppercase tracking-[0.5em]">
              LUV
            </span>
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
          </Link>
        </MagneticElement>

        <ul className="flex items-center gap-6 text-xs uppercase tracking-[0.5em] text-muted">
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <MagneticElement strength={0.15}>
                <Link
                  href={href}
                  prefetch
                  onMouseEnter={() => handleNavHover(href)}
                  className="group relative inline-block transition-all duration-300 ease-out hover:scale-110 hover:text-accent active:scale-95"
                >
                  <span className="relative">
                    {label}
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </MagneticElement>
            </li>
          ))}
          <li>
            <MagneticElement strength={0.2}>
              <a
                href={CONTACT_LINK}
                className="border-border/40 group relative flex items-center overflow-hidden rounded-full border px-4 py-1.5 text-text transition-all duration-300 ease-out hover:scale-110 hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(0,102,255,0.3)] active:scale-95"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 transition-all duration-300">
                  {isHovered ? "hello@luvgupta.com" : "Contact"}
                </span>
                <span className="bg-accent/5 absolute inset-0 -z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            </MagneticElement>
          </li>
          <li>
            <ThemeToggle className="!relative !right-auto !top-auto !z-auto" />
          </li>
        </ul>
      </nav>
    </header>
  );
}
