"use client";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Single subtle gradient orb - using CSS animation instead of JS */}
      <div
        className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          animation: "subtle-float 30s ease-in-out infinite",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),
                           linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <style jsx>{`
        @keyframes subtle-float {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
