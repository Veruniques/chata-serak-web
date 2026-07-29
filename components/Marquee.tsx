/**
 * Nekonečný běžící pás s klíčovými fakty — jantarová stuha mezi sekcemi.
 * Obsah je zdvojený, aby CSS animace (translateX -50 %) navazovala beze švu.
 * Na hover se zastaví; prefers-reduced-motion ho zastaví globálně (globals.css).
 */
export default function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const strip = (
    <span className="marquee-track" aria-hidden="true">
      {[...items, ...items].map((item, i) => (
        <span
          key={i}
          className="font-mono-label text-sm md:text-base text-[var(--spruce-950)] px-6 py-3.5 inline-flex items-center gap-6"
        >
          {item}
          <span className="text-[var(--spruce-950)]/50">✦</span>
        </span>
      ))}
    </span>
  );

  return (
    <div
      className={`marquee bg-[var(--amber-500)] ${className}`}
      role="marquee"
      aria-label={items.join(" · ")}
    >
      {strip}
    </div>
  );
}
