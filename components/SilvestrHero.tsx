import Link from "next/link";
import { HeroStagger, HeroItem } from "@/components/HeroStagger";

/**
 * Silvestrovské hero na úvodní stránce — nahrazuje 360° hero do konce
 * silvestrovské sezóny (viz SILVESTR_UNTIL). Údaje odpovídají taháku pro
 * recepci „Silvestr 2026": příjezd 30. 12., jen 3 nebo 4 noci.
 */

export const SILVESTR_UNTIL = "2026-12-31"; // poslední den, kdy se upoutávka ukazuje

const PROGRAM = [
  { time: "17:00", what: "Pošta do budoucnosti" },
  { time: "19:00", what: "Silvestrovský raut" },
  { time: "23:00", what: "Rozloučení u krbu" },
  { time: "23:30", what: "Lampiony" },
  { time: "00:00", what: "Přípitek venku" },
];

const FACTS = [
  { k: "Příjezd", v: "st 30. 12." },
  { k: "Délka", v: "3 nebo 4 noci" },
  { k: "Cena", v: "od 1 790 Kč / os. / noc" },
  { k: "V ceně", v: "polopenze, raut, sauna, program" },
];

export default function SilvestrHero() {
  return (
    <section
      aria-labelledby="silvestr-title"
      className="relative isolate min-h-[100svh] md:min-h-[760px] md:h-screen overflow-hidden bg-[#070b10] text-[var(--snow-50)]"
    >
      {/* Vizuál: hřeben v noci, lampiony před chatou */}
      <img
        src="/images/silvestr-hero.jpg"
        alt=""
        fetchPriority="high"
        className="silvestr-kenburns absolute inset-0 -z-20 h-full w-full object-cover object-[38%_50%] md:object-center"
      />
      {/* Čitelnost textu: zprava (chata je vlevo) a zespodu do tmy */}
      <div className="absolute inset-0 -z-10 hidden md:block bg-[linear-gradient(270deg,rgba(7,11,16,0.85)_0%,rgba(7,11,16,0.6)_30%,rgba(7,11,16,0)_58%)]" />
      <div className="absolute inset-0 -z-10 bg-[#070b10]/45 md:hidden" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-[#070b10] via-[#070b10]/60 to-transparent" />

      <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-10 pt-32 md:pb-14">
        <div className="md:ml-auto md:max-w-[36rem]">
        <HeroStagger>
          <HeroItem>
            <p className="font-mono-label flex items-center gap-3 text-[11px] tracking-[0.22em] text-[var(--amber-300)]">
              <span>SILVESTR 2026</span>
              <span aria-hidden="true" className="h-px w-10 bg-[var(--amber-300)]/60" />
              <span>1351 M N. M.</span>
            </p>
          </HeroItem>

          <HeroItem>
            <h1
              id="silvestr-title"
              className="font-display mt-6 max-w-3xl text-5xl font-extrabold leading-[0.95] tracking-[-0.025em] sm:text-6xl lg:text-[4.75rem] [text-wrap:balance]"
            >
              Ohňostroje necháme údolí.
            </h1>
          </HeroItem>

          <HeroItem>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--mist-100)] md:text-xl">
              Konec roku na hřebeni Jeseníku. Raut, sauna, lampiony před chatou
              a&nbsp;přípitek venku pod hvězdami. Půlnoc je tu o&nbsp;1351&nbsp;metrů blíž.
            </p>
          </HeroItem>

          <HeroItem className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href="/rezervace" className="btn btn-primary btn-md">
              Rezervovat Silvestr
              <span aria-hidden="true" className="arrow">→</span>
            </Link>
            <p className="text-sm text-[var(--granite-300)]">
              Jen lanovkou nebo pěšky. Auto zůstane na Ramzové.
            </p>
          </HeroItem>
        </HeroStagger>
        </div>

        {/* Fakta + program večera */}
        <div className="mt-12 grid gap-8 border-t border-white/15 pt-7 md:mt-16 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <dl className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-4">
            {FACTS.map((f) => (
              <div key={f.k}>
                <dt className="font-mono-label text-[10px] tracking-[0.18em] text-[var(--granite-300)] uppercase">
                  {f.k}
                </dt>
                <dd className="mt-1 text-[15px] font-semibold leading-snug">{f.v}</dd>
              </div>
            ))}
          </dl>

          <div className="min-w-0">
            <p className="font-mono-label text-[10px] tracking-[0.18em] text-[var(--granite-300)] uppercase">
              31. 12. na Šeráku
            </p>
            <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
            <ol className="mt-3 grid min-w-[520px] grid-cols-5 gap-2 md:min-w-0">
              {PROGRAM.map((p, i) => (
                <li key={p.time} className="relative pt-4">
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 h-1.5 w-1.5 rounded-full ${
                      i === PROGRAM.length - 1
                        ? "bg-[var(--amber-300)] shadow-[0_0_12px_3px_rgba(255,190,90,0.55)]"
                        : "bg-white/50"
                    }`}
                  />
                  {i < PROGRAM.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-3 right-1 top-[2.5px] h-px bg-white/20"
                    />
                  )}
                  <span
                    className={`font-display block text-lg leading-none md:text-xl ${
                      i === PROGRAM.length - 1 ? "text-[var(--amber-300)]" : ""
                    }`}
                  >
                    {p.time}
                  </span>
                  <span className="mt-1.5 block text-[12px] leading-snug text-[var(--mist-100)] md:text-[13px]">
                    {p.what}
                  </span>
                </li>
              ))}
            </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
