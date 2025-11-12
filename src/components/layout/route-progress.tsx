"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function RouteProgress() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed left-0 right-0 top-0 z-[100] h-0.5 bg-gradient-to-r from-accent via-accent-2 to-accent-3"
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: 1, transformOrigin: "left" }}
          exit={{ scaleX: 1, transformOrigin: "right", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </AnimatePresence>
  );
}
