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
    <header className="border-border/30 sticky top-0 z-50 border-b bg-[color:var(--header-bg)] py-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-300">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8">
        <MagneticElement strength={0.3}>
          <Link
            href="/"
            className="group relative transition-all duration-300 ease-out hover:scale-110 active:scale-95"
          >
            <span className="gradient-text-premium block text-base font-bold uppercase tracking-[0.5em] drop-shadow-[0_0_10px_rgba(0,102,255,0.3)]">
              LUV
            </span>
            <span className="absolute -bottom-1 left-0 h-[3px] w-0 rounded-full bg-gradient-to-r from-accent via-accent-3 to-accent-2 shadow-[0_0_8px_rgba(0,102,255,0.5)] transition-all duration-300 group-hover:w-full" />
          </Link>
        </MagneticElement>

        <ul className="flex items-center gap-8 text-xs uppercase tracking-[0.5em] text-muted">
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <MagneticElement strength={0.2}>
                <Link
                  href={href}
                  prefetch
                  onMouseEnter={() => handleNavHover(href)}
                  className="group relative inline-block font-medium transition-all duration-300 ease-out hover:scale-110 hover:text-accent active:scale-95"
                >
                  <span className="relative">
                    {label}
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-accent to-accent-3 shadow-[0_0_8px_rgba(0,102,255,0.5)] transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </MagneticElement>
            </li>
          ))}
          <li>
            <MagneticElement strength={0.25}>
              <a
                href={CONTACT_LINK}
                className="border-accent/40 bg-accent/5 group relative flex items-center overflow-hidden rounded-full border-2 px-5 py-2 font-semibold text-accent backdrop-blur-xl transition-all duration-300 ease-out hover:scale-110 hover:border-accent hover:bg-accent hover:text-background hover:shadow-[0_0_30px_rgba(0,102,255,0.4)] active:scale-95"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 transition-all duration-300">
                  {isHovered ? "hello@luvgupta.com" : "Contact"}
                </span>
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
