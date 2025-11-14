"use client";

import { useEffect, useState } from "react";

export function AnalogClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  // Calculate angles (0 degrees is at 12 o'clock)
  const secondAngle = seconds * 6; // 360/60 = 6 degrees per second
  const minuteAngle = minutes * 6 + seconds * 0.1; // 6 degrees per minute + smooth transition
  const hourAngle = hours * 30 + minutes * 0.5; // 30 degrees per hour + smooth transition

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: "60px", height: "60px" }}
      aria-label={`Current time: ${time.toLocaleTimeString()}`}
      role="img"
    >
      {/* Clock face */}
      <div
        className="bg-[var(--surface)]/30 absolute inset-0 rounded-full border border-[var(--border)] backdrop-blur-sm"
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      />

      {/* Center dot */}
      <div
        className="absolute z-10 h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
        style={{
          boxShadow: "0 0 8px var(--accent)",
        }}
      />

      {/* Hour markers */}
      {[...Array(12)].map((_, i) => {
        const angle = i * 30;
        const isMainHour = i % 3 === 0;
        return (
          <div
            key={i}
            className="absolute"
            style={{
              transform: `rotate(${angle}deg) translateY(-22px)`,
              transformOrigin: "center 22px",
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: isMainHour ? "2px" : "1px",
                height: isMainHour ? "4px" : "2px",
                backgroundColor: "var(--muted)",
                opacity: isMainHour ? 0.6 : 0.3,
              }}
            />
          </div>
        );
      })}

      {/* Hour hand */}
      <div
        className="absolute origin-bottom transition-transform duration-500"
        style={{
          width: "2px",
          height: "16px",
          backgroundColor: "var(--text)",
          transform: `rotate(${hourAngle}deg)`,
          bottom: "50%",
          borderRadius: "2px",
        }}
      />

      {/* Minute hand */}
      <div
        className="absolute origin-bottom transition-transform duration-500"
        style={{
          width: "1.5px",
          height: "22px",
          backgroundColor: "var(--accent)",
          transform: `rotate(${minuteAngle}deg)`,
          bottom: "50%",
          borderRadius: "2px",
        }}
      />

      {/* Second hand */}
      <div
        className="absolute origin-bottom"
        style={{
          width: "1px",
          height: "24px",
          backgroundColor: "var(--accent-2)",
          transform: `rotate(${secondAngle}deg)`,
          bottom: "50%",
          borderRadius: "2px",
          transition:
            seconds === 0 ? "none" : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </div>
  );
}
