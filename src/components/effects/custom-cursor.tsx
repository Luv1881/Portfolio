"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device has fine pointer (not touch)
    const hasFinePpointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePpointer) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Handle hovering over interactive elements
    const handleInteractiveHover = (hovering: boolean) => () => {
      setIsHovering(hovering);
    };

    // Add listeners
    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Track interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select',
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleInteractiveHover(true));
      el.addEventListener("mouseleave", handleInteractiveHover(false));
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleInteractiveHover(true));
        el.removeEventListener("mouseleave", handleInteractiveHover(false));
      });
    };
  }, [cursorX, cursorY]);

  // Hide default cursor
  useEffect(() => {
    const hasFinePpointer = window.matchMedia("(pointer: fine)").matches;
    if (hasFinePpointer) {
      document.documentElement.style.cursor = "none";
      document.body.style.cursor = "none";

      return () => {
        document.documentElement.style.cursor = "";
        document.body.style.cursor = "";
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: isHovering ? 32 : 8,
            height: isHovering ? 32 : 8,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border-2 border-white mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          opacity: isHovering ? 0.5 : 0.3,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
