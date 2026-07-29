"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Orchestrovaný nástup hero obsahu při načtení stránky — děti se objevují
 * postupně zdola s jemným zpožděním (badge → jméno → titulek → text → CTA).
 */
export function HeroStagger({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function HeroItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 26 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.2, 0.6, 0.2, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
