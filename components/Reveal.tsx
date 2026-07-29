"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Scroll reveal s volitelným směrem a zpožděním. `amount: 0.1` zajišťuje
 * spolehlivé spuštění i u prvků hned pod foldem.
 */
export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}) {
  const offsets = {
    up: { y: 22, x: 0 },
    left: { y: 0, x: -26 },
    right: { y: 0, x: 26 },
    none: { y: 0, x: 0 },
  }[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offsets }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay, ease: [0.2, 0.6, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
