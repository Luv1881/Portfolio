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
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const dayName = days[time.getDay()];
  const monthName = months[time.getMonth()];
  const date = time.getDate();
  const year = time.getFullYear();

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-black/40 backdrop-blur-xl"
      aria-label={`Current time: ${time.toLocaleTimeString()}, ${dayName} ${monthName} ${date}, ${year}`}
      role="timer"
    >
      <div className="relative z-10 flex flex-col gap-3 px-6 py-4">
        {/* Time Display */}
        <div className="flex items-center justify-center gap-1">
          {/* Hours */}
          <div className="relative font-mono text-4xl font-bold tabular-nums leading-none tracking-wider text-white">
            {formattedHours}
          </div>

          {/* Colon separator with pulse animation */}
          <div
            className="relative mx-0.5 text-3xl font-bold leading-none text-white"
            style={{
              opacity: seconds % 2 === 0 ? 1 : 0.3,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            :
          </div>

          {/* Minutes */}
          <div className="relative font-mono text-4xl font-bold tabular-nums leading-none tracking-wider text-white">
            {formattedMinutes}
          </div>

          {/* Colon separator */}
          <div
            className="relative mx-0.5 text-3xl font-bold leading-none text-white"
            style={{
              opacity: seconds % 2 === 0 ? 1 : 0.3,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            :
          </div>

          {/* Seconds */}
          <div className="relative font-mono text-4xl font-bold tabular-nums leading-none tracking-wider text-white">
            {formattedSeconds}
          </div>
        </div>

        {/* Date Display */}
        <div className="flex items-center justify-center gap-2 border-t border-[var(--border)] pt-3">
          {/* Day of week */}
          <div className="border-[var(--accent)]/30 bg-[var(--accent)]/10 rounded-md border px-2 py-1 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            {dayName}
          </div>

          {/* Full date */}
          <div className="font-mono text-sm font-medium tabular-nums tracking-wide text-[var(--muted)]">
            {monthName} {date.toString().padStart(2, "0")}, {year}
          </div>
        </div>
      </div>
    </div>
  );
}
