import InquiryForm from "@/components/InquiryForm";
import Reveal from "@/components/Reveal";
import {
  Heart,
  Snowflake,
  GraduationCap,
  Flame,
  Waves,
  Footprints,
} from "lucide-react";

export const metadata = {
  title: "Skupiny & akce — Chata na Šeráku",
  description:
    "Svatby, lyžařské kurzy, školní výlety a firemní akce na Chatě na Šeráku.",
};

const SVATBY_PHOTOS = [
  "Obřad s výhledem do hor",
  "Hostina v salónku",
  "Rustikální interiér",
  "Terasa salónku",
];

const LYZAKY_PHOTOS = [
  "Sjezdovka Ramzová — horní lanovka",
  "Myslivna s krbem",
  "Lyžárna a sušení lyžáků",
];

export default function SkupinyAAkce() {
  return (
    <article>
      <header className="bg-[var(--spruce-950)] px-6 pt-36 pb-16">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow text-[var(--amber-300)] mb-4">
            Akce s výhledem
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-[var(--snow-50)] mb-5">
            Skupiny & akce
          </h1>
          <p className="text-[var(--mist-100)] text-xl leading-relaxed">
            Chata na Šeráku není jen pro páry a rodiny na víkend — je to
            výjimečné místo pro svatbu, lyžařský kurz, školní výlet i firemní
            teambuilding. Napište nám přes poptávkový formulář níže a společně
            akci doladíme.
          </p>
        </div>
      </header>

      {/* SVATBY */}
      <section id="svatby" className="px-6 py-20 bg-[var(--snow-50)]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <Heart className="text-[var(--amber-500)] mb-4" size={32} strokeWidth={1.4} />
            <h2 className="font-display text-3xl mb-4 text-[var(--spruce-950)]">
              Romantické místo pro svatbu
            </h2>
            <p className="text-[var(--granite-600)] leading-relaxed mb-8">
              Hledáte výjimečné místo pro svatbu s vybaveným zázemím uprostřed
              přírody? Užijte si obřad s výhledem do hor a hostinu v krásném
              rustikálním prostředí, které podtrhne atmosféru vašeho
              výjimečného dne.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {SVATBY_PHOTOS.map((label) => (
                <div
                  key={label}
                  className="photo-frame aspect-[4/3] bg-[var(--mist-100)] flex items-center justify-center p-3 text-center"
                >
                  <span className="font-mono-label text-[10px] text-[var(--granite-600)]">
                    [foto: {label}]
                  </span>
                </div>
              ))}
            </div>

            <div className="grid gap-8 sm:grid-cols-2 mb-4">
              <div>
                <h3 className="font-display text-xl text-[var(--spruce-950)] mb-2">
                  Jídlo
                </h3>
                <p className="text-[var(--granite-600)] leading-relaxed text-sm">
                  Naši kuchaři se postarají o skvělé obědové menu i bohatý
                  raut. Vše s vámi rádi sladíme podle vašich přání.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl text-[var(--spruce-950)] mb-2">
                  Prostory a ubytování
                </h3>
                <p className="text-[var(--granite-600)] leading-relaxed text-sm mb-3">
                  Pro menší svatby do 25 osob máme salónek s vlastním vchodem,
                  terasou a toaletami.
                </p>
                <p className="text-[var(--granite-600)] leading-relaxed text-sm mb-3">
                  Pro větší svatby okolo 50–70 osob si můžete pronajmout celou
                  chatu a využít salónek, restauraci či venkovní prostor po
                  svém.
                </p>
                <p className="text-[var(--granite-600)] leading-relaxed text-sm">
                  Ubytování pro svatební hosty je možné v rámci kapacity chaty.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LYŽAŘSKÉ KURZY */}
      <section id="lyzaky" className="px-6 py-20 bg-[var(--mist-100)]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <Snowflake className="text-[var(--amber-500)] mb-4" size={32} strokeWidth={1.4} />
            <h2 className="font-display text-3xl mb-4 text-[var(--spruce-950)]">
              Lyžařské kurzy a zimní pobyty
            </h2>
            <p className="text-[var(--granite-600)] leading-relaxed mb-4">
              Lanovku sami neprovozujeme — zato umíme perfektně zaštítit
              ubytování pro lyžařské kurzy, které jezdí lyžovat na Ramzovou.
              Chata stojí jen <strong>300 metrů od horní lanovky
              sjezdovky</strong>, takže třída je ze snídaně na svahu za pár
              minut.
            </p>
            <p className="text-[var(--granite-600)] leading-relaxed mb-8">
              Večer se mokré vybavení postará samo o sebe: máme{" "}
              <strong>lyžárnu se stojany na vysušení lyžáků</strong>{" "}
              a společenskou místnost <strong>Myslivnu s krbem
              a sušákem na oblečení nad krbem</strong> — promáčené bundy
              a rukavice jsou do rána suché. K tomu sauna na prohřátí po dni
              na svahu a spousta dalších aktivit přímo na chatě i v okolí,
              když zrovna nelyžujete.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {LYZAKY_PHOTOS.map((label) => (
                <div
                  key={label}
                  className="photo-frame aspect-[4/3] bg-[var(--snow-50)] flex items-center justify-center p-3 text-center"
                >
                  <span className="font-mono-label text-[10px] text-[var(--granite-600)]">
                    [foto: {label}]
                  </span>
                </div>
              ))}
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 text-sm text-[var(--granite-600)]">
              <li className="flex items-center gap-3">
                <Footprints className="text-[var(--amber-500)] shrink-0" size={19} strokeWidth={1.5} />
                300 m od horní lanovky sjezdovky Ramzová
              </li>
              <li className="flex items-center gap-3">
                <Flame className="text-[var(--amber-500)] shrink-0" size={19} strokeWidth={1.5} />
                Myslivna s krbem a sušákem na oblečení
              </li>
              <li className="flex items-center gap-3">
                <Snowflake className="text-[var(--amber-500)] shrink-0" size={19} strokeWidth={1.5} />
                Lyžárna + stojany na vysušení lyžáků
              </li>
              <li className="flex items-center gap-3">
                <Waves className="text-[var(--amber-500)] shrink-0" size={19} strokeWidth={1.5} />
                Sauna na prohřátí po dni na svahu
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ŠKOLY, FIRMY & SKUPINY */}
      <section id="skoly" className="px-6 py-20 bg-[var(--snow-50)]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <GraduationCap className="text-[var(--amber-500)] mb-4" size={32} strokeWidth={1.4} />
            <h2 className="font-display text-3xl mb-4 text-[var(--spruce-950)]">
              Školy, firmy & skupiny
            </h2>
            <p className="text-[var(--granite-600)] leading-relaxed">
              Školní výlety, vícedenní pobytové kurzy, firemní večírky,
              teambuildingy i výjezdní zasedání — jídelna a ubytování pod
              jednou střechou, přímo na hřebeni. Do formuláře níže nám napište
              typ akce, termín a počet lidí, ozveme se s návrhem.
            </p>
          </Reveal>
        </div>
      </section>

      {/* UNIVERZÁLNÍ POPTÁVKA */}
      <section id="poptavka" className="px-6 py-20 bg-[var(--mist-100)]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-display text-3xl mb-4 text-[var(--spruce-950)]">
              Poptávkový formulář
            </h2>
            <p className="text-[var(--granite-600)] leading-relaxed mb-10">
              Jeden formulář pro všechny typy akcí — svatby, lyžáky, školy
              i firmy. Poptávka doputuje na{" "}
              <a
                href="mailto:info@chatanaseraku.cz"
                className="text-[var(--amber-500)] underline"
              >
                info@chatanaseraku.cz
              </a>{" "}
              a ozveme se vám zpět.
            </p>

            <InquiryForm
              recipient="info@chatanaseraku.cz"
              subjectPrefix="Poptávka z webu — skupiny & akce"
              submitLabel="Odeslat poptávku"
              fields={[
                { name: "jmeno", label: "Jméno a příjmení / organizace", type: "text", required: true },
                { name: "email", label: "E-mail", type: "email", required: true },
                { name: "telefon", label: "Telefon", type: "tel" },
                {
                  name: "typ",
                  label: "Typ akce",
                  type: "select",
                  required: true,
                  options: [
                    "Svatba",
                    "Lyžařský kurz / zimní pobyt",
                    "Školní výlet / pobytový kurz",
                    "Firemní akce / teambuilding",
                    "Jiné",
                  ],
                },
                {
                  name: "termin",
                  label: "Předpokládaný termín",
                  type: "text",
                  placeholder: "Např. únor 2027, nebo rozmezí",
                },
                { name: "pocet", label: "Přibližný počet osob", type: "number" },
                {
                  name: "zprava",
                  label: "Vaše představa / požadavky",
                  type: "textarea",
                  placeholder:
                    "Např. délka pobytu, strava, program, speciální požadavky...",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>
    </article>
  );
}
