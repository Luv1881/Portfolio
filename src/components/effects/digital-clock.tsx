"use client";

import { useEffect, useState } from "react";

export function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Format time with leading zeros
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  // Get date info
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const dayName = days[time.getDay()];
  const monthName = months[time.getMonth()];
  const date = time.getDate();
  const year = time.getFullYear();

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[var(--border)] backdrop-blur-xl"
      style={{
        background: "linear-gradient(135deg, rgba(17, 17, 17, 0.8) 0%, rgba(26, 26, 26, 0.6) 100%)",
        boxShadow: `
          0 8px 32px rgba(0, 102, 255, 0.15),
          0 0 0 1px rgba(255, 255, 255, 0.05) inset,
          0 0 60px rgba(0, 204, 255, 0.1)
        `,
      }}
      aria-label={`Current time: ${time.toLocaleTimeString()}, ${dayName} ${monthName} ${date}, ${year}`}
      role="timer"
    >
      {/* Animated gradient background orbs */}
      <div
        className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          animation: "glow-pulse 4s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--accent-3) 0%, transparent 70%)",
          animation: "glow-pulse 4s ease-in-out infinite 2s",
        }}
      />

      <div className="relative z-10 flex flex-col gap-3 px-6 py-4">
        {/* Time Display */}
        <div className="flex items-center justify-center gap-1">
          {/* Hours */}
          <div
            className="relative font-mono text-4xl font-bold tabular-nums leading-none tracking-wider"
            style={{
              background: `linear-gradient(135deg, var(--accent) 0%, var(--accent-3) 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 20px rgba(0, 102, 255, 0.5))",
            }}
          >
            {formattedHours}
          </div>

          {/* Colon separator with pulse animation */}
          <div
            className="relative mx-0.5 text-3xl font-bold leading-none"
            style={{
              color: "var(--accent-2)",
              opacity: seconds % 2 === 0 ? 1 : 0.3,
              transition: "opacity 0.3s ease-in-out",
              filter: "drop-shadow(0 0 10px var(--accent-2))",
            }}
          >
            :
          </div>

          {/* Minutes */}
          <div
            className="relative font-mono text-4xl font-bold tabular-nums leading-none tracking-wider"
            style={{
              background: `linear-gradient(135deg, var(--accent-3) 0%, var(--accent-2) 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 20px rgba(0, 204, 255, 0.5))",
            }}
          >
            {formattedMinutes}
          </div>

          {/* Colon separator */}
          <div
            className="relative mx-0.5 text-3xl font-bold leading-none"
            style={{
              color: "var(--accent-2)",
              opacity: seconds % 2 === 0 ? 1 : 0.3,
              transition: "opacity 0.3s ease-in-out",
              filter: "drop-shadow(0 0 10px var(--accent-2))",
            }}
          >
            :
          </div>

          {/* Seconds */}
          <div
            className="relative font-mono text-4xl font-bold tabular-nums leading-none tracking-wider"
            style={{
              background: `linear-gradient(135deg, var(--accent-2) 0%, var(--accent) 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 20px rgba(255, 0, 102, 0.5))",
            }}
          >
            {formattedSeconds}
          </div>
        </div>

        {/* Date Display */}
        <div className="flex items-center justify-center gap-2 border-t border-[var(--border)] pt-3">
          {/* Day of week */}
          <div
            className="rounded-md px-2 py-1 text-xs font-bold uppercase tracking-widest"
            style={{
              background: "rgba(0, 102, 255, 0.1)",
              color: "var(--accent)",
              border: "1px solid rgba(0, 102, 255, 0.2)",
            }}
          >
            {dayName}
          </div>

          {/* Full date */}
          <div
            className="font-mono text-sm font-medium tabular-nums tracking-wide"
            style={{
              color: "var(--muted)",
            }}
          >
            {monthName} {date.toString().padStart(2, "0")}, {year}
          </div>
        </div>

        {/* Decorative bottom accent line */}
        <div
          className="absolute bottom-0 left-0 h-0.5 w-full"
          style={{
            background: `linear-gradient(90deg,
              transparent 0%,
              var(--accent) 20%,
              var(--accent-3) 50%,
              var(--accent-2) 80%,
              transparent 100%)`,
            opacity: 0.6,
          }}
        />
      </div>
    </div>
  );
}
