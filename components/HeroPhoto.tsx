"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

/**
 * Hero na skutečné fotce chaty místo WebGL scény.
 * - Ken Burns: pomalé nekonečné přiblížení fotky (čistě CSS/Framer, žádná zátěž).
 * - Parallax: fotka se při scrollování posouvá pomaleji než obsah stránky,
 *   pomocí Framer Motion useScroll (sleduje scroll pozici vůči téhle sekci).
 */
export default function HeroPhoto() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Fotka se posouvá o 45 % výšky sekce − výraznější, hmatatelný paralax.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <div ref={sectionRef} className="absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y, scale: scaleParallax }}
        className="absolute inset-0 h-[150%]"
      >
        <motion.div
          className="relative w-full h-full"
          initial={{ scale: 1 }}
          animate={{ scale: 1.09 }}
          transition={{ duration: 24, ease: "linear" }}
        >
          <Image
            src="/images/hero.jpg"
            alt="Chata na Šeráku za soumraku, výhled do údolí Jeseníků"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
