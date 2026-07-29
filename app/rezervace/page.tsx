import Link from "next/link";
import Reveal from "@/components/Reveal";
import PrevioBooking from "@/components/PrevioBooking";

export const metadata = {
  title: "Rezervace — Chata na Šeráku",
  description:
    "Rezervujte si pobyt na Chatě Jiřího na Šeráku — 67 míst v útulných pokojích na hřebeni Jeseníků.",
};

export default function Rezervace() {
  return (
    <article>
      <header className="bg-[var(--spruce-950)] px-6 pt-36 pb-14">
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow text-[var(--amber-300)] mb-4">
            Spěte na hřebeni
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-[var(--snow-50)] mb-5">
            Rezervace
          </h1>
          <p className="text-[var(--mist-100)] text-xl max-w-2xl leading-relaxed">
            Zamluvte si pobyt na hřebeni Jeseníků — 67 míst v útulných
            pokojích, polopenze a výhled na obě strany hor.
          </p>
        </div>
      </header>

      <section className="bg-[var(--snow-50)] px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <PrevioBooking />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 text-sm text-[var(--granite-600)] leading-relaxed">
              Praktické informace k pobytu (check-in, polopenze, storno
              podmínky, jak se k nám dostat) najdete na stránce{" "}
              <Link href="/ubytovani" className="text-[var(--amber-500)] underline">
                Ubytování
              </Link>
              . Kdyby rezervační formulář zlobil, napište nám na{" "}
              <a
                href="mailto:info@chatanaseraku.cz"
                className="text-[var(--amber-500)] underline"
              >
                info@chatanaseraku.cz
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
