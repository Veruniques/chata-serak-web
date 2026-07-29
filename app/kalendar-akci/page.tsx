import Reveal from "@/components/Reveal";
import { Film } from "lucide-react";

export const metadata = {
  title: "Kalendář akcí — Chata na Šeráku",
  description: "Promítání, přednášky a kurzy, které pořádáme na Chatě na Šeráku.",
};

/**
 * PLACEHOLDER DATA — nahraďte skutečnými akcemi. Až budete mít víc akcí
 * a chcete je editovat mimo kód, dává smysl přesunout tohle do WP jako
 * vlastní post type "Události" a načítat přes lib/wp.ts (stejně jako
 * ostatní obsahové stránky) — pro pár akcí ročně ale stačí i tahle
 * jednoduchá pole v kódu.
 */
const EVENTS = [
  {
    date: "2026-08-15",
    title: "Promítání: Hory v pohybu",
    type: "Promítání",
    description: "Horolezecký a cestovatelský filmový večer v restauraci.",
  },
  {
    date: "2026-09-12",
    title: "Přednáška: Historie Šeráku a Jesenických chat",
    type: "Přednáška",
    description: "Povídání o 130 letech historie chaty a okolních hor.",
  },
];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" });
}

export default function KalendarAkci() {
  const upcoming = EVENTS.filter((e) => new Date(e.date) >= new Date("2026-01-01"))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <article>
      <header className="bg-[var(--spruce-950)] px-6 pt-36 pb-16">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow text-[var(--amber-300)] mb-4">
            Večery na chatě
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-[var(--snow-50)] mb-5">
            Kalendář akcí
          </h1>
          <p className="text-[var(--mist-100)] text-xl leading-relaxed">
            Promítání, přednášky a tematické kurzy, které pravidelně
            pořádáme na chatě. Poptávku na vlastní svatbu nebo firemní akci
            najdete na stránce{" "}
            <a href="/skupiny-a-akce" className="text-[var(--amber-300)] underline">
              Skupiny & akce
            </a>.
          </p>
        </div>
      </header>

      <section className="bg-[var(--snow-50)] px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {upcoming.length === 0 ? (
            <Reveal>
              <p className="text-[var(--granite-600)]">
                Momentálně nemáme vypsanou žádnou akci — sledujte nás nebo
                se přihlaste k novinkám, ať vám nic neuteče.
              </p>
            </Reveal>
          ) : (
            <ul className="divide-y divide-[var(--granite-300)]/40">
              {upcoming.map((event, i) => (
                <Reveal key={event.title} delay={i * 0.08}>
                  <li className="py-6 flex gap-6 items-start">
                    <div className="shrink-0 w-20 text-center">
                      <p className="font-mono-label text-xs text-[var(--amber-500)]">
                        {formatDate(event.date)}
                      </p>
                    </div>
                    <div>
                      <span className="inline-block font-mono-label text-[10px] text-[var(--granite-600)] bg-[var(--mist-100)] px-2 py-0.5 rounded-full mb-2">
                        {event.type}
                      </span>
                      <h2 className="font-display text-xl text-[var(--spruce-950)] mb-1 flex items-center gap-2">
                        <Film size={18} className="text-[var(--amber-500)]" strokeWidth={1.5} />
                        {event.title}
                      </h2>
                      <p className="text-[var(--granite-600)] leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>
    </article>
  );
}
