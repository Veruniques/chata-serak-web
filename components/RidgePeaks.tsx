"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Podpisový prvek: interaktivní silueta hřebene Jeseníků.
 *
 * - viewBox má nahoře dost místa, takže popisky vrcholů se už nikdy
 *   neschovají pod předchozí sekci (dřívější bug s ořezem).
 * - Silueta je jemná (světlý podklad + tmavá linka hřebene) — žádné
 *   černé pozadí, jen grafický prvek.
 * - Interakce s myší: po hřebeni jezdí bod, který sleduje kurzor,
 *   a nejbližší vrchol/sedlo se zvýrazní (čárka i popisek).
 */

// Vrcholy siluety (x, y) — y posunuté o 70 px dolů oproti staré verzi,
// aby nad hřebenem zbyl prostor pro popisky.
const CREST: [number, number][] = [
  [0, 188],
  [120, 194],
  [250, 198],
  [420, 124],
  [560, 156],
  [720, 108],
  [900, 140],
  [1060, 130],
  [1200, 186],
  [1320, 192],
  [1440, 182],
];

const RIDGE_PATH =
  "M0,220 L" +
  CREST.map(([x, y]) => `${x},${y}`).join(" L") +
  " L1440,220 Z";

const CREST_LINE = "M" + CREST.map(([x, y]) => `${x},${y}`).join(" L");

const POINTS = [
  { x: 185, peakY: 196, label: "Červenohorské sedlo", meta: "1013 m" },
  { x: 420, peakY: 124, label: "Keprník", meta: "1423 m" },
  { x: 720, peakY: 108, label: "Šerák", meta: "1351 m" },
  { x: 1260, peakY: 189, label: "Ramzovské sedlo", meta: "760 m" },
];

const TICK = 26; // délka svislé čárky nad bodem
const HOVER_RADIUS = 110; // jak blízko (ve viewBox px) musí být kurzor, aby se bod zvýraznil

/** Lineární interpolace y na hřebeni pro dané x. */
function crestY(x: number) {
  if (x <= CREST[0][0]) return CREST[0][1];
  for (let i = 1; i < CREST.length; i++) {
    const [x1, y1] = CREST[i - 1];
    const [x2, y2] = CREST[i];
    if (x <= x2) {
      const t = (x - x1) / (x2 - x1);
      return y1 + (y2 - y1) * t;
    }
  }
  return CREST[CREST.length - 1][1];
}

export default function RidgePeaks({
  background = "var(--snow-50)",
  to = "var(--spruce-950)",
  labelColor = "var(--spruce-950)",
  accent = "var(--amber-500)",
}: {
  background?: string;
  /** Barva NÁSLEDUJÍCÍ sekce — hory do ní plynule přetečou (žádný šev). */
  to?: string;
  labelColor?: string;
  accent?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursorX, setCursorX] = useState<number | null>(null);

  const handleMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursorX(((e.clientX - rect.left) / rect.width) * 1440);
  };

  const activeIndex =
    cursorX === null
      ? -1
      : POINTS.findIndex((p) => Math.abs(p.x - cursorX) < HOVER_RADIUS);

  return (
    <div aria-hidden="true" style={{ background }} className="leading-[0]">
      <svg
        ref={svgRef}
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="w-full h-[150px] md:h-[220px] block cursor-crosshair"
        onMouseMove={handleMove}
        onMouseLeave={() => setCursorX(null)}
      >
        {/* Silueta hor — plná barva následující sekce, plynule do ní přeteče */}
        <path d={RIDGE_PATH} fill={to} />
        {/* Jemná linka hřebene */}
        <motion.path
          d={CREST_LINE}
          fill="none"
          stroke={accent}
          strokeOpacity={0.55}
          strokeWidth={2}
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        {/* Bod sledující kurzor po hřebeni */}
        <AnimatePresence>
          {cursorX !== null && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <line
                x1={cursorX}
                x2={cursorX}
                y1={crestY(cursorX)}
                y2={220}
                stroke={accent}
                strokeOpacity={0.3}
                strokeWidth={1.5}
              />
              <circle
                cx={cursorX}
                cy={crestY(cursorX)}
                r={5.5}
                fill={accent}
                stroke={background}
                strokeWidth={2}
              />
            </motion.g>
          )}
        </AnimatePresence>

        {POINTS.map((p, i) => {
          const active = i === activeIndex;
          return (
            <motion.g
              key={p.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
            >
              {/* Svislá čárka nad vrcholem */}
              <motion.line
                x1={p.x}
                x2={p.x}
                y1={p.peakY - 6}
                y2={p.peakY - 6 - TICK}
                stroke={accent}
                strokeWidth={active ? 3 : 2}
                style={{ transition: "stroke-width 0.2s" }}
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  show: {
                    pathLength: 1,
                    opacity: 1,
                    transition: { duration: 0.45, delay: 0.15 + i * 0.18 },
                  },
                }}
              />
              {/* Název + výška — kompletně nad hřebenem, s rezervou */}
              <motion.g
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.35 + i * 0.18 },
                  },
                }}
                animate={active ? { scale: 1.08 } : { scale: 1 }}
                style={{
                  transformOrigin: `${p.x}px ${p.peakY - TICK - 18}px`,
                }}
              >
                <text
                  x={p.x}
                  y={p.peakY - TICK - 24}
                  textAnchor="middle"
                  fill={active ? accent : labelColor}
                  style={{
                    font: "700 15px 'Bricolage Grotesque', sans-serif",
                    letterSpacing: "0.02em",
                    transition: "fill 0.2s",
                  }}
                >
                  {p.label}
                </text>
                <text
                  x={p.x}
                  y={p.peakY - TICK - 9}
                  textAnchor="middle"
                  fill={accent}
                  style={{ font: "500 11px 'IBM Plex Mono', monospace" }}
                >
                  {p.meta}
                </text>
              </motion.g>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
