"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse movement
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Scramble reveal effect on mount
  useEffect(() => {
    let frame = 0;
    const totalFrames = 40;
    const chars = text.split("");

    const interval = setInterval(() => {
      if (frame >= totalFrames) {
        setDisplayText(text);
        setIsRevealed(true);
        clearInterval(interval);
        return;
      }

      const progress = frame / totalFrames;
      const revealedCount = Math.floor(chars.length * progress);

      const scrambled = chars
        .map((char, index) => {
          if (index < revealedCount) return char;
          if (char === " ") return " ";
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);
      frame++;
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  // Handle mouse move for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / 20);
    mouseY.set((e.clientY - centerY) / 20);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Split text into characters for individual animation
  const characters = useMemo(() => displayText.split(""), [displayText]);

  return (
    <motion.div
      className={`relative inline-block cursor-default ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
    >
      {/* Main text with character-by-character animation */}
      <div className="relative inline-flex">
        {characters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            className="relative inline-block"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.03,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              display: char === " " ? "inline" : "inline-block",
              minWidth: char === " " ? "0.5ch" : undefined,
            }}
          >
            {/* Character with holographic effect on hover */}
            <span
              className="relative inline-block transition-all duration-300"
              style={{
                color: isHovered ? "transparent" : "inherit",
                backgroundImage: isHovered
                  ? "linear-gradient(90deg, #0066ff 0%, #00ccff 25%, #ff0066 50%, #0066ff 75%, #00ccff 100%)"
                  : "none",
                backgroundSize: isHovered ? "200% 100%" : "100% 100%",
                backgroundClip: isHovered ? "text" : "unset",
                WebkitBackgroundClip: isHovered ? "text" : "unset",
                WebkitTextFillColor: isHovered ? "transparent" : "inherit",
                animation: isHovered
                  ? `shimmer ${2 + index * 0.05}s linear infinite`
                  : "none",
              }}
            >
              {char}
            </span>

            {/* Neon glow effect on hover */}
            {isHovered && isRevealed && (
              <motion.span
                className="pointer-events-none absolute inset-0 inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{
                  duration: 2,
                  delay: index * 0.05,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  color: "#00ccff",
                  filter: "blur(8px)",
                  zIndex: -1,
                }}
              >
                {char}
              </motion.span>
            )}

            {/* Glitch overlay effect on hover (randomly triggered) */}
            {isHovered && isRevealed && Math.random() > 0.7 && (
              <>
                <motion.span
                  className="pointer-events-none absolute inset-0 inline-block text-[#ff0066]"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.7, 0],
                    x: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 3 + 2,
                  }}
                  style={{
                    mixBlendMode: "screen",
                  }}
                >
                  {char}
                </motion.span>
                <motion.span
                  className="pointer-events-none absolute inset-0 inline-block text-[#00ccff]"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.7, 0],
                    x: [2, -2, 2],
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1 + 0.1,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 3 + 2,
                  }}
                  style={{
                    mixBlendMode: "screen",
                  }}
                >
                  {char}
                </motion.span>
              </>
            )}
          </motion.span>
        ))}
      </div>

      {/* Holographic shine sweep effect on hover */}
      {isHovered && isRevealed && (
        <motion.div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 h-full w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(0, 204, 255, 0.3) 50%, transparent 100%)",
              transform: "skewX(-20deg)",
            }}
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>
    </motion.div>
  );
}
