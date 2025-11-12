"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme/theme-provider";

export function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;

      constructor(x: number, y: number) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Return to base position
        const dx = this.baseX - this.x;
        const dy = this.baseY - this.y;
        this.vx += dx * 0.01;
        this.vy += dy * 0.01;

        // Apply damping
        this.vx *= 0.95;
        this.vy *= 0.95;
      }

      draw(ctx: CanvasRenderingContext2D, color: string) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const spacing = 100; // Increased spacing = fewer particles
      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() > 0.7) {
            // Further reduced probability
            particles.push(new Particle(i * spacing, j * spacing));
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = theme === "dark";
      const particleColor = isDark
        ? "rgba(0, 102, 255, 0.4)"
        : "rgba(28, 89, 255, 0.3)";
      const lineColor = isDark ? "rgba(0, 102, 255, 0.15)" : "rgba(28, 89, 255, 0.1)";

      // Draw connections
      particles.forEach((particle, i) => {
        particle.update();

        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 1 - distance / 150;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });

        particle.draw(ctx, particleColor);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.4 }}
    />
  );
}
