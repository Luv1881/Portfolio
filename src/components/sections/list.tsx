"use client";

import type { ReactNode } from "react";
import { cubicBezier, motion } from "framer-motion";

interface ListProps<TItem> {
  items: TItem[];
  renderItem: (item: TItem, index: number) => ReactNode;
  getKey?: (item: TItem, index: number) => string | number;
}

const ease = cubicBezier(0.22, 1, 0.36, 1);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease,
    },
  },
};

export function SectionList<TItem>({ items, renderItem, getKey }: ListProps<TItem>) {
  return (
    <motion.div
      className="divide-border/40 divide-y"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.div
          key={getKey?.(item, index) ?? index}
          className="py-6 first:pt-0 last:pb-0"
          variants={itemVariants}
        >
          {renderItem(item, index)}
        </motion.div>
      ))}
    </motion.div>
  );
}
