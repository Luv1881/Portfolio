"use client";

import { useEffect, useState } from "react";
import {
  animate,
  cubicBezier,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { interpolate } from "flubber";

const LUV_MONOGRAM_PATH = [
  "M10 90 L10 10 L60 10 L60 90",
  "M80 10 L80 90 L130 90 L130 10",
  "M150 10 L150 90 L200 90",
].join(" ");

const LUV_WORD_PATH = [
  "M10 90 L10 10 L60 10 L60 50 L40 50 L40 90",
  "M80 10 L80 90 L90 90 L90 50 L120 50 L120 90 L130 90 L130 10",
  "M150 10 L150 90 L200 90 L200 10 L190 10 L190 80 L160 80 L160 10",
].join(" ");

const mixer = (from: string, to: string) =>
  interpolate(from, to, { maxSegmentLength: 4, single: true });

const ease = cubicBezier(0.65, 0, 0.35, 1);

export function Monogram() {
  const [hovered, setHovered] = useState(false);
  const progress = useMotionValue(0);
  const path = useTransform(progress, [0, 1], [LUV_MONOGRAM_PATH, LUV_WORD_PATH], {
    mixer,
  });
  const glowOpacity = useTransform(progress, [0, 1], [0.45, 0.75]);

  useEffect(() => {
    const controls = animate(progress, hovered ? 1 : 0, {
      duration: 0.75,
      ease,
    });

    return controls.stop;
  }, [hovered, progress]);

  return (
    <motion.div
      className="relative mx-auto flex h-56 w-56 items-center justify-center cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      whileTap={{ scale: 0.98 }}
      role="img"
      aria-label="Hover to reveal LUV"
      tabIndex={0}
    >
      <motion.div
        className="from-accent/25 via-accent-3/20 absolute inset-0 rounded-full bg-gradient-to-br to-transparent blur-2xl"
        style={{ opacity: glowOpacity }}
        aria-hidden
      />
      <motion.svg
        viewBox="0 0 220 100"
        className="relative h-full w-full text-text"
        initial={false}
        focusable="false"
        aria-hidden
      >
        <motion.path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={6}
          transition={{ duration: 0.75, ease }}
        />
      </motion.svg>
      <motion.div
        className="absolute bottom-0 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <span className="text-xs uppercase tracking-[0.5em] text-muted">Hover to reveal</span>
      </motion.div>
    </motion.div>
  );
}

