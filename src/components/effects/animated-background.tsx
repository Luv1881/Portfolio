"use client";

import { useMemo } from "react";

export function AnimatedBackground() {
  // Generate random stars once - memoized to prevent regeneration
  const stars = useMemo(
    () =>
      Array.from({ length: 200 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 2,
      })),
    [],
  );

  // Generate a fixed set of shooting stars with staggered delays
  const shootingStars = useMemo(
    () => [
      {
        id: 1,
        startX: Math.random() * 80 + 10,
        startY: -10,
        delay: 0,
        duration: 1.5 + Math.random() * 0.5,
      },
      {
        id: 2,
        startX: Math.random() * 80 + 10,
        startY: -10,
        delay: 6,
        duration: 1.5 + Math.random() * 0.5,
      },
      {
        id: 3,
        startX: Math.random() * 80 + 10,
        startY: -10,
        delay: 12,
        duration: 1.5 + Math.random() * 0.5,
      },
      {
        id: 4,
        startX: Math.random() * 80 + 10,
        startY: -10,
        delay: 18,
        duration: 1.5 + Math.random() * 0.5,
      },
    ],
    [],
  );

  return (
    <>
      {/* Static star field layer - z-index: 0 */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white will-change-[opacity]"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Shooting stars layer - z-index: 1 */}
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
        {shootingStars.map((star) => (
          <div
            key={star.id}
            className="absolute will-change-transform"
            style={{
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              width: `${80 + Math.random() * 70}px`,
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.9) 20%, rgba(0,204,255,0.8) 50%, transparent)",
              animation: `shoot ${star.duration}s ease-in ${star.delay}s infinite`,
              opacity: 0,
              transformOrigin: "left center",
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes shoot {
          0% {
            opacity: 0;
            transform: translate(0, 0) rotate(45deg);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            opacity: 0;
            transform: translate(60vw, 60vh) rotate(45deg);
          }
        }
      `}</style>
    </>
  );
}
