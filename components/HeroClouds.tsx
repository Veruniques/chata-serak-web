/**
 * Měkké obláčky plující přes hero fotku — dvě vrstvy s různou rychlostí
 * (CSS animace, žádný JS). Dodávají hloubku ala vrstvené hory/mraky.
 */
function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 130"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <ellipse cx="110" cy="88" rx="105" ry="38" />
      <ellipse cx="205" cy="62" rx="90" ry="44" />
      <ellipse cx="310" cy="88" rx="105" ry="36" />
    </svg>
  );
}

export default function HeroClouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <Cloud className="cloud-drift-slow absolute -left-24 top-[14%] w-[52vw] max-w-[640px] text-[var(--snow-50)] opacity-[0.13] blur-[2px]" />
      <Cloud className="cloud-drift absolute right-[-10%] top-[6%] w-[38vw] max-w-[460px] text-[var(--snow-50)] opacity-[0.18] blur-[1px]" />
      <Cloud className="cloud-drift absolute left-[30%] top-[30%] w-[24vw] max-w-[300px] text-[var(--snow-50)] opacity-[0.09] blur-[3px]" />
    </div>
  );
}
