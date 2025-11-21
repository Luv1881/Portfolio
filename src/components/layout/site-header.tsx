"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export const NAV_ITEMS = [
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "#contact" },
] as const;

export const CONTACT_LINK = "mailto:hello@luvgupta.com";

export function SiteHeader() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isLandingPage = pathname === "/";

  useEffect(() => {
    // If not on landing page, always show header
    if (!isLandingPage) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      // Show header when scrolled past 80vh on landing page
      const scrollThreshold = window.innerHeight * 0.8;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLandingPage]);

  const handleNavHover = (href: string) => {
    // Preload route on hover for instant navigation
    router.prefetch(href);
  };

  return (
    <header
      className="border-border/30 fixed left-0 right-0 top-0 z-50 border-b bg-[color:var(--header-bg)] py-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-300 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8">
        <Link
          href="/"
          className="group relative transition-colors duration-300 ease-out"
        >
          <span className="block text-base font-bold uppercase tracking-[0.5em] text-accent transition-opacity duration-300 group-hover:opacity-80">
            LUV
          </span>
          <span className="absolute -bottom-1 left-0 h-[3px] w-0 rounded-full bg-accent shadow-[0_0_8px_rgba(0,102,255,0.5)] transition-all duration-300 group-hover:w-full" />
        </Link>

        <ul className="flex items-center gap-8 text-xs uppercase tracking-[0.5em] text-muted">
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                prefetch
                onMouseEnter={() => handleNavHover(href)}
                className="group relative inline-block font-medium transition-colors duration-300 ease-out hover:text-accent"
              >
                <span className="relative">
                  {label}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-accent shadow-[0_0_8px_rgba(0,102,255,0.5)] transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            </li>
          ))}
          <li>
            <a
              href={CONTACT_LINK}
              className="border-accent/40 bg-accent/5 group relative flex items-center overflow-hidden rounded-full border-2 px-5 py-2 font-semibold text-accent backdrop-blur-xl transition-all duration-300 ease-out hover:border-accent hover:bg-accent hover:text-background hover:shadow-[0_0_30px_rgba(0,102,255,0.4)]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="relative z-10 transition-all duration-300">
                {isHovered ? "hello@luvgupta.com" : "Contact"}
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
