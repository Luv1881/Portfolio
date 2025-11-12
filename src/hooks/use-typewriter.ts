"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Options = {
  words: readonly string[];
  typeSpeed?: number; // ms per char
  deleteSpeed?: number; // ms per char
  holdTime?: number; // ms to hold full word
  startDelay?: number; // ms before start
  loop?: boolean;
};

export function useTypewriter({
  words,
  typeSpeed = 90,
  deleteSpeed = 60,
  holdTime = 1100,
  startDelay = 200,
  loop = true,
}: Options) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timer = useRef<number | null>(null);

  const current = words[index % words.length] ?? "";

  // Clear any pending timer on unmount
  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  useEffect(() => {
    // If no words, do nothing
    if (!current) return;

    const hasFullWord = text === current;
    const isAtStart = text.length === 0;

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && hasFullWord) delay = holdTime; // hold
    if (isAtStart && !isDeleting && text.length === 0) delay = startDelay; // initial delay

    timer.current = window.setTimeout(() => {
      setText((prev) => {
        if (!isDeleting) {
          // typing forward
          const next = current.slice(0, prev.length + 1);
          if (next === current) setIsComplete(true);
          return next;
        }
        // deleting
        const next = current.slice(0, Math.max(prev.length - 1, 0));
        return next;
      });

      // Switch mode at boundaries
      if (!isDeleting && hasFullWord) {
        setIsDeleting(true);
        setIsComplete(true);
      } else if (isDeleting && isAtStart) {
        setIsDeleting(false);
        setIsComplete(false);
        if (index < words.length - 1) setIndex(index + 1);
        else if (loop) setIndex((i) => (i + 1) % words.length);
      }
    }, delay) as unknown as number;

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [
    text,
    isDeleting,
    index,
    current,
    typeSpeed,
    deleteSpeed,
    holdTime,
    startDelay,
    loop,
    words.length,
  ]);

  return useMemo(
    () => ({ text, isDeleting, isComplete, index }),
    [text, isDeleting, isComplete, index],
  );
}
