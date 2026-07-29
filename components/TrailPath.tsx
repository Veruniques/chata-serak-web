"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Turistická stezka, která se „kreslí" scrollováním — čárkovaná jantarová
 * trasa jako na mapě KČT se vine sekcí a na konci ji uzavírá vrcholový bod.
 * Vykresluje se absolutně za obsahem sekce (parent musí mít `relative`).
 */
export default function TrailPath({
  d = "M 720 0 C 500 180, 940 320, 700 520 C 480 700, 900 820, 720 1000",
  viewBoxHeight = 1000,
}: {
  d?: string;
  viewBoxHeight?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const { scrollYProgress } = useScroll({
    // framer-motion typuje target jako HTMLElement — SVG element funguje
    // stejně, jen ho musíme přetypovat
    target: ref as unknown as React.RefObject<HTMLElement>,
    offset: ["start 0.85", "end 0.45"],
  });
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
  });
  const summitOpacity = useTransform(scrollYProgress, [0.88, 1], [0, 1]);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 1440 ${viewBoxHeight}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <motion.path
        d={d}
        fill="none"
        stroke="var(--amber-500)"
        strokeOpacity={0.5}
        strokeWidth={3}
        strokeDasharray="2 14"
        strokeLinecap="round"
        style={{ pathLength }}
      />
      {/* Vrcholový bod na konci trasy */}
      <motion.g style={{ opacity: summitOpacity }}>
        <circle
          cx={720}
          cy={viewBoxHeight - 6}
          r={7}
          fill="var(--amber-500)"
        />
        <circle
          cx={720}
          cy={viewBoxHeight - 6}
          r={13}
          fill="none"
          stroke="var(--amber-500)"
          strokeOpacity={0.4}
          strokeWidth={2}
        />
      </motion.g>
    </svg>
  );
}
