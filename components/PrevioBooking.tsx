"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Rezervační widget Previo — optimalizované načítání:
 *
 * 1. LAZY LOAD: loader skript se stáhne až ve chvíli, kdy se sekce
 *    s widgetem blíží do viewportu (IntersectionObserver, 400px předstih).
 *    Návštěvník, který jen čte homepage, tak Previo vůbec nestahuje.
 * 2. ŽÁDNÝ LAYOUT SHIFT: min-height drží místo od začátku.
 * 3. SKELETON: než se widget vykreslí, drží místo pulzující placeholder,
 *    aby stránka neposkakovala (žádný layout shift).
 */

declare global {
  interface Window {
    bookingEngineConfig?: {
      id: string;
      lang: string;
      currency: string;
    };
  }
}

function injectPrevioLoader() {
  // Loader vkládáme při každém mountu widgetu (ne globálně jednou) —
  // při přechodech mezi stránkami (SPA navigace) se div vytvoří znovu
  // a Previo loader ho musí znovu naplnit.
  window.bookingEngineConfig = {
    id: "019e4a0e-30f2-7384-9436-f12539c67fe7",
    lang: "cs",
    currency: "CZK",
  };

  const script = document.createElement("script");
  script.src = "https://booking.previo.app/loader/";
  script.async = true;
  document.head.appendChild(script);
}

export default function PrevioBooking() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // 1) Sledujeme, kdy se sekce blíží do viewportu
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" } // začni stahovat s předstihem
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2) Až je vidět, vložíme loader a hlídáme, kdy Previo vykreslí obsah
  useEffect(() => {
    if (!visible) return;
    injectPrevioLoader();

    const target = document.getElementById("previo-booking-engine");
    if (!target) return;

    const mo = new MutationObserver(() => {
      if (target.childElementCount > 0) {
        setLoaded(true);
        mo.disconnect();
      }
    });
    mo.observe(target, { childList: true });
    return () => mo.disconnect();
  }, [visible]);

  return (
    <div ref={wrapperRef} className="relative min-h-[420px]">
      {/* Skeleton — drží místo, dokud Previo nenaběhne */}
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-sm bg-[var(--mist-100)] animate-pulse flex items-center justify-center"
        >
          <p className="font-mono-label text-[10px] text-[var(--granite-600)]">
            Načítám rezervační formulář…
          </p>
        </div>
      )}
      <div id="previo-booking-engine" className="relative rounded-sm" />
    </div>
  );
}
