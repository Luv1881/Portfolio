"use client";

import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [shootingStars, setShootingStars] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);

  // Generate random stars
  const stars = Array.from({ length: 200 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 2,
  }));

  // Generate shooting stars periodically
  useEffect(() => {
    const generateShootingStars = () => {
      const numStars = Math.floor(Math.random() * 2) + 2; // 2-3 shooting stars
      const newShootingStars = Array.from({ length: numStars }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 50, // Start in upper half of screen
        delay: i * 0.3, // Stagger the stars slightly
      }));

      setShootingStars(newShootingStars);

      // Clear shooting stars after animation completes
      setTimeout(() => {
        setShootingStars([]);
      }, 2000);
    };

    // Generate shooting stars every 8-10 seconds
    const interval = setInterval(generateShootingStars, 8000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
      {/* Twinkling stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
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

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="absolute h-[2px] w-[100px] rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
            transform: "rotate(-45deg)",
            animation: `shoot 1.5s ease-out ${star.delay}s`,
            opacity: 0,
          }}
        />
      ))}

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
            transform: translateX(0) translateY(0) rotate(-45deg);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translateX(300px) translateY(300px) rotate(-45deg);
          }
        }
      `}</style>
    </div>
  );
}
