import Reveal from "@/components/Reveal";
import ForestSceneClient from "@/components/ForestSceneClient";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Kontakt — Chata na Šeráku",
  description:
    "Kontakt na Chatu Jiřího na Šeráku — e-mail, telefon a jak nás najdete na hřebeni Hrubého Jeseníku.",
};

export default function Kontakt() {
  return (
    <article>
      <header className="bg-[var(--spruce-950)] px-6 pt-36 pb-14">
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow text-[var(--amber-300)] mb-4">
            1351 m n. m.
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-[var(--snow-50)] mb-5">
            Kontakt
          </h1>
          <p className="text-[var(--mist-100)] text-xl max-w-2xl leading-relaxed">
            Jsme na vrcholu hory — nejrychleji nás zastihnete e-mailem nebo
            přes chat vpravo dole na stránce.
          </p>
        </div>
      </header>

      {/* 3D PROSTŘEDÍ — lesní mýtina u chaty */}
      <section className="bg-[var(--snow-50)] px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="eyebrow text-[var(--amber-500)] mb-3">
              Nadechněte se předem
            </p>
            <h2 className="font-display text-3xl text-[var(--spruce-950)] mb-3">
              Kousek Šeráku už teď
            </h2>
            <p className="text-[var(--granite-600)] leading-relaxed mb-8 max-w-2xl">
              360° prostředí lesní mýtiny kousek od chaty. Rozhlédněte se —
              a pak přijeďte naživo.
            </p>
            <ForestSceneClient />
          </Reveal>
        </div>
      </section>

      {/* KONTAKTNÍ ÚDAJE */}
      <section className="bg-[var(--mist-100)] px-6 py-16">
        <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-3">
          <Reveal>
            <div className="flex gap-4">
              <MapPin className="text-[var(--amber-500)] shrink-0 mt-1" size={24} strokeWidth={1.4} />
              <div>
                <h3 className="font-display text-lg text-[var(--spruce-950)] mb-1.5">
                  Adresa
                </h3>
                <p className="text-[var(--granite-600)] leading-relaxed text-sm">
                  Chata Jiřího na Šeráku
                  <br />
                  Ramzová, 788 26 Branná
                  <br />
                  1351 m n. m., hřeben Hrubého Jeseníku
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex gap-4">
              <Mail className="text-[var(--amber-500)] shrink-0 mt-1" size={24} strokeWidth={1.4} />
              <div>
                <h3 className="font-display text-lg text-[var(--spruce-950)] mb-1.5">
                  E-mail
                </h3>
                <a
                  href="mailto:info@chatanaseraku.cz"
                  className="text-sm text-[var(--amber-500)] underline"
                >
                  info@chatanaseraku.cz
                </a>
                <p className="text-xs text-[var(--granite-600)] mt-2 leading-relaxed">
                  Odpovídáme obvykle do 24 hodin.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex gap-4">
              <Phone className="text-[var(--amber-500)] shrink-0 mt-1" size={24} strokeWidth={1.4} />
              <div>
                <h3 className="font-display text-lg text-[var(--spruce-950)] mb-1.5">
                  Rychlý dotaz?
                </h3>
                <p className="text-sm text-[var(--granite-600)] leading-relaxed">
                  Klikněte na ikonu telefonu vpravo dole — náš chat zná
                  odpovědi na většinu otázek (check-in, storno, menu,
                  lanovka) a odpoví okamžitě.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="max-w-5xl mx-auto mt-12">
          <Reveal delay={0.15}>
            <div className="flex items-start gap-4 rounded-sm bg-[var(--snow-50)] border-l-2 border-[var(--amber-500)] p-5">
              <MessageCircle className="text-[var(--amber-500)] shrink-0 mt-0.5" size={22} strokeWidth={1.4} />
              <p className="text-sm text-[var(--granite-600)] leading-relaxed">
                Rychlé dotazy (check-in, storno, menu) zodpoví i náš chat
                vpravo dole — a když si nebude vědět rady, přepošle dotaz
                rovnou na náš e-mail.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Mapa */}
        <div className="max-w-5xl mx-auto mt-12">
          <Reveal delay={0.2}>
            <div className="rounded-sm overflow-hidden border border-[var(--granite-300)]/40">
              <iframe
                src="https://maps.google.com/maps?q=Chata%20Ji%C5%99%C3%ADho%20na%20%C5%A0er%C3%A1ku&z=14&hl=cs&output=embed"
                title="Mapa — Chata Jiřího na Šeráku"
                className="w-full h-[420px] block"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
