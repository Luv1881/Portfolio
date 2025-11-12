"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const PHRASES = ["Luv Gupta", "Software Engineer"] as const;
const TYPE_INTERVAL = 110;
const DELETE_INTERVAL = 60;
const HOLD_DURATION = 1600;

export function TypingIntro() {
  const [displayName, setDisplayName] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex % PHRASES.length];
    let timeout: number;

    if (!isDeleting && displayName === currentPhrase) {
      timeout = window.setTimeout(() => {
        setIsDeleting(true);
        if (!completed) {
          setCompleted(true);
        }
      }, HOLD_DURATION);
    } else if (isDeleting && displayName === "") {
      setIsDeleting(false);
      setPhraseIndex((index) => index + 1);
    } else {
      timeout = window.setTimeout(
        () => {
          if (isDeleting) {
            setDisplayName((prev) => prev.slice(0, -1));
          } else {
            setDisplayName(currentPhrase.slice(0, displayName.length + 1));
          }
        },
        isDeleting ? DELETE_INTERVAL : TYPE_INTERVAL,
      );
    }

    return () => window.clearTimeout(timeout);
  }, [displayName, isDeleting, phraseIndex, completed]);

  const links = [
    { label: "Blogs", href: "/blogs" as const },
    { label: "Experience", href: "/experience" as const },
    { label: "Projects", href: "/projects" as const },
  ];

  const caretClass = completed ? "animate-pulse" : "animate-caret";

  return (
    <section className="flex flex-col items-center gap-10 text-center">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.5em] text-muted">hello.</p>
        <h1 className="text-5xl font-semibold uppercase tracking-[0.3em] text-text md:text-6xl">
          {displayName}
          <span className={`ml-2 inline-block h-10 w-[2px] bg-accent ${caretClass}`}>
            {" "}
          </span>
        </h1>
      </div>
      <div className="flex flex-col gap-4 text-sm uppercase tracking-[0.3em] text-muted md:flex-row">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition hover:text-accent"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
