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
        startX: -10,
        startY: 20,
        delay: 0,
      },
      {
        id: 2,
        startX: -10,
        startY: 60,
        delay: 4,
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
            className="absolute h-[2px] w-[100px] rounded-full will-change-transform"
            style={{
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
              animation: `shoot 2s ease-out ${star.delay}s infinite`,
              opacity: 0,
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
            transform: translate(0, 0) rotate(-45deg);
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translate(400px, 400px) rotate(-45deg);
          }
        }
      `}</style>
    </>
  );
}
