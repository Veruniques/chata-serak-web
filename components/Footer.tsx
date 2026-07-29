import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/rezervace", label: "Rezervace" },
  { href: "/ubytovani", label: "Ubytování" },
  { href: "/restaurace", label: "Restaurace" },
  { href: "/skupiny-a-akce", label: "Skupiny & akce" },
  { href: "/kalendar-akci", label: "Kalendář akcí" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--spruce-950)] text-[var(--mist-100)]">
      {/* Hřebenový motiv nad footerem */}
      <svg
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="w-full h-[26px] block"
      >
        <path
          d="M0,40 L160,16 L340,32 L520,8 L720,28 L920,6 L1120,26 L1300,12 L1440,30 L1440,40 Z"
          fill="none"
          stroke="var(--amber-500)"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
      </svg>

      <div className="px-6 pt-12 pb-14 max-w-6xl mx-auto">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl text-[var(--snow-50)] leading-tight mb-4">
              Chata Jiřího
              <br />
              <span className="text-[var(--amber-300)]">na Šeráku</span>
            </p>
            <p className="text-sm text-[var(--granite-300)] leading-relaxed">
              Ramzová, 788 26 Branná
              <br />
              1351 m n. m. · hřeben Hrubého Jeseníku
            </p>
          </div>

          <div>
            <p className="eyebrow text-[var(--amber-300)] mb-5">Kontakt</p>
            <a
              href="mailto:info@chatanaseraku.cz"
              className="text-base hover:text-[var(--amber-300)] transition-colors"
            >
              info@chatanaseraku.cz
            </a>
            <p className="mt-3 text-xs text-[var(--granite-300)] leading-relaxed">
              Jsme na vrcholu hory — nejrychleji nás zastihnete e-mailem
              nebo přes chat vpravo dole.
            </p>
          </div>

          <div>
            <p className="eyebrow text-[var(--amber-300)] mb-5">Na webu</p>
            <ul className="text-sm space-y-2.5">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-[var(--amber-300)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 pt-6 border-t border-white/10 text-xs text-[var(--granite-300)] flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Chata Jiřího na Šeráku</span>
          <span className="font-mono-label">1351 m n. m.</span>
        </p>
      </div>
    </footer>
  );
}
