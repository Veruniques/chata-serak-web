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
      className="relative isolate md:min-h-[760px] md:h-screen overflow-hidden bg-[#070b10] text-[var(--snow-50)]"
    >
      {/* Vizuál: hřeben v noci, lampiony před chatou.
          Mobil: fotka jako pás nahoře (chata celá vidět), text pod ní.
          Desktop: fotka přes celé hero, text vpravo v obloze. */}
      <div className="relative -z-20 h-[58vh] min-h-[340px] max-h-[520px] overflow-hidden md:absolute md:inset-0 md:h-full md:max-h-none md:min-h-0">
        <img
          src="/images/silvestr-hero.jpg"
          alt=""
          fetchPriority="high"
          className="silvestr-kenburns h-full w-full object-cover object-[36%_62%] md:object-center"
        />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#070b10]/70 to-transparent md:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#070b10] to-transparent md:hidden" />
      </div>
      {/* Čitelnost textu: zprava (chata je vlevo) a zespodu do tmy */}
      <div className="absolute inset-0 -z-10 hidden md:block bg-[linear-gradient(270deg,rgba(7,11,16,0.85)_0%,rgba(7,11,16,0.6)_30%,rgba(7,11,16,0)_58%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 hidden h-2/3 md:block bg-gradient-to-t from-[#070b10] via-[#070b10]/60 to-transparent" />

      <div className="relative mx-auto -mt-16 flex max-w-6xl flex-col justify-end px-6 pb-12 md:mt-0 md:h-full md:pb-14 md:pt-32">
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
              className="font-display mt-6 max-w-3xl text-[2.75rem] font-extrabold leading-[0.95] min-[400px]:text-5xl tracking-[-0.025em] sm:text-6xl lg:text-[4.75rem] [text-wrap:balance]"
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
