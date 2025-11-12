"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const NAV_ITEMS = [
  { label: "Blogs", href: "/blogs" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
] as const;

export const CONTACT_LINK = "mailto:hello@luvgupta.com";

export function SiteHeader() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[color:var(--header-bg)] py-6 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6">
        <div className="flex w-full items-center justify-between gap-6">
          <Link
            href="/"
            className="group relative z-50 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
          >
            <span className="gradient-text block text-sm font-bold uppercase tracking-[0.5em]">
              LUV
            </span>
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-8 text-xs uppercase tracking-[0.5em] text-muted md:flex">
            {NAV_ITEMS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  prefetch
                  className="group relative inline-block transition-all duration-300 ease-out hover:scale-105 hover:text-accent active:scale-95"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
            <li>
              <a
                href={CONTACT_LINK}
                className="border-border/40 group relative flex items-center overflow-hidden rounded-full border px-4 py-2 text-text transition-all duration-300 ease-out hover:scale-105 hover:border-accent hover:text-accent hover:shadow-soft active:scale-95"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 transition-all duration-300">
                  {isHovered ? "hello@luvgupta.com" : "Contact"}
                </span>
                <span className="bg-accent/5 absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="relative z-50 p-2 text-text transition-colors duration-300 hover:text-accent md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="border-border/50 bg-surface/95 overflow-hidden border-t backdrop-blur-lg md:hidden"
          >
            <motion.ul
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              className="flex flex-col items-center gap-6 py-8 text-sm uppercase tracking-[0.4em]"
            >
              {NAV_ITEMS.map(({ href, label }, index) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={href}
                    prefetch
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group relative inline-block text-muted transition-all duration-300 hover:scale-105 hover:text-accent"
                  >
                    {label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.1 }}
              >
                <a
                  href={CONTACT_LINK}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="border-border/40 group relative inline-block overflow-hidden rounded-full border px-6 py-3 text-text transition-all duration-300 hover:scale-105 hover:border-accent hover:text-accent hover:shadow-soft"
                >
                  <span className="relative z-10">Contact</span>
                  <span className="bg-accent/5 absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
