import Reveal from "@/components/Reveal";
import PrevioBooking from "@/components/PrevioBooking";
import {
  Clock,
  Flame,
  BellRing,
  UtensilsCrossed,
  Droplets,
  FileWarning,
  MapPinned,
  Waves,
  CableCar,
  Footprints,
  Bike,
} from "lucide-react";

export const metadata = {
  title: "Ubytování — Chata na Šeráku",
  description:
    "Rezervace, praktické informace pro hosty, galerie pokojů, sauna a jak se k nám dostat.",
};

const QUICK_NAV = [
  { href: "#pokoje", label: "Pokoje & galerie" },
  { href: "#myslivna", label: "Myslivna s krbem" },
  { href: "#info", label: "Praktické informace" },
  { href: "#sauna", label: "Sauna" },
  { href: "#doprava", label: "Jak se k nám dostat" },
];

const ROOM_PHOTOS = ["Pokoj — dvoulůžkový", "Pokoj — rodinný", "Společenská místnost", "Chodba a schodiště"];

export default function Ubytovani() {
  return (
    <article>
      <header className="bg-[var(--spruce-950)] px-6 pt-36 pb-14">
        <div className="max-w-5xl mx-auto">
          <p className="eyebrow text-[var(--amber-300)] mb-4">
            Spěte na hřebeni
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-[var(--snow-50)] mb-5">
            Ubytování
          </h1>
          <p className="text-[var(--mist-100)] text-xl max-w-2xl leading-relaxed">
            67 míst v útulných pokojích po citlivé rekonstrukci, přímo na
            hřebeni Jeseníků. Polopenze, sauna a výhled na obě strany hor.
          </p>

          <nav className="mt-8 flex flex-wrap gap-3">
            {QUICK_NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-[var(--amber-300)] border border-[var(--amber-300)]/40 rounded-full px-4 py-1.5 hover:bg-[var(--amber-300)] hover:text-[var(--spruce-950)] transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* REZERVACE */}
      <section className="bg-[var(--snow-50)] px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="font-display text-2xl text-[var(--spruce-950)] mb-4">
              Rezervace
            </h2>
            <PrevioBooking />
          </Reveal>
        </div>
      </section>

      {/* POKOJE & GALERIE */}
      <section id="pokoje" className="bg-[var(--mist-100)] px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="font-display text-2xl text-[var(--spruce-950)] mb-6">
              Pokoje & galerie
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {ROOM_PHOTOS.map((label) => (
                <div
                  key={label}
                  className="aspect-square rounded-sm bg-[var(--snow-50)] border border-[var(--granite-300)]/40 flex items-center justify-center p-3 text-center"
                >
                  <span className="font-mono-label text-[10px] text-[var(--granite-600)]">
                    [foto: {label}]
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[var(--granite-600)]">
              Pokoje jsou 2–8lůžkové, z velké části s vlastním sociálním
              zařízením. Až budete mít video z chaty, vložíme ho hned sem.
            </p>
          </Reveal>
        </div>
      </section>


      {/* MYSLIVNA S KRBEM */}
      <section id="myslivna" className="bg-[var(--snow-50)] px-6 py-16">
        <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <Reveal>
            <Flame className="text-[var(--amber-500)] mb-3" size={28} strokeWidth={1.4} />
            <h2 className="font-display text-2xl text-[var(--spruce-950)] mb-4">
              Myslivna s krbem
            </h2>
            <p className="text-[var(--granite-600)] leading-relaxed mb-4">
              Naše společenská místnost Myslivna s krbem je záchrana pro
              případ nepříznivého počasí. Přišli jste v dešti? Nad krbem je
              sušák na prádlo — mokré bundy, boty i batohy si u ohně
              vysušíte a večer strávíte v teple s výhledem na plameny.
            </p>
            <p className="text-[var(--granite-600)] leading-relaxed text-sm">
              Myslivna je k dispozici ubytovaným hostům — skvěle funguje
              i jako místo pro deskovky, čtení nebo večerní posezení party.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="photo-frame aspect-[4/3] bg-[var(--mist-100)] flex items-center justify-center p-3 text-center">
              <span className="font-mono-label text-[10px] text-[var(--granite-600)]">
                [foto: Myslivna — krb se sušákem na prádlo]
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRAKTICKÉ INFORMACE */}
      <section id="info" className="bg-[var(--mist-100)] px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="font-display text-2xl text-[var(--spruce-950)] mb-8">
              Praktické informace pro hosty
            </h2>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="flex gap-4">
                <Clock className="text-[var(--amber-500)] shrink-0 mt-1" size={24} strokeWidth={1.4} />
                <div>
                  <h3 className="font-display text-lg text-[var(--spruce-950)] mb-1.5">
                    Check-in a check-out
                  </h3>
                  <p className="text-[var(--granite-600)] leading-relaxed text-sm">
                    Check-in 15:00–17:00 (po domluvě i později, zavazadla
                    lze uschovat dřív). Check-out do 10:00.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.03}>
              <div className="flex gap-4">
                <BellRing className="text-[var(--amber-500)] shrink-0 mt-1" size={24} strokeWidth={1.4} />
                <div>
                  <h3 className="font-display text-lg text-[var(--spruce-950)] mb-1.5">
                    Pozdní příchod
                  </h3>
                  <p className="text-[var(--granite-600)] leading-relaxed text-sm">
                    Nestíháte check-in do 17:00? Nic se neděje — v pohodě
                    můžete dorazit i o něco později, do 19:00. Jen nám to
                    prosím dejte vědět dopředu (e-mailem nebo telefonicky),
                    ať s vámi počítáme a připravíme vše potřebné.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="flex gap-4">
                <UtensilsCrossed className="text-[var(--amber-500)] shrink-0 mt-1" size={24} strokeWidth={1.4} />
                <div>
                  <h3 className="font-display text-lg text-[var(--spruce-950)] mb-1.5">
                    Stravování — polopenze
                  </h3>
                  <p className="text-[var(--granite-600)] leading-relaxed text-sm">
                    Snídaně formou bufetu (při vyšší obsazenosti) nebo
                    servírovaná. Večeře: polévka + hlavní jídlo z denní
                    nabídky. Po domluvě vegetariánská nebo bezlepková strava.
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {["Snídaně", "Večeře"].map((label) => (
                      <div
                        key={label}
                        className="aspect-[4/3] rounded-sm bg-[var(--snow-50)] border border-[var(--granite-300)]/40 flex items-center justify-center"
                      >
                        <span className="font-mono-label text-[10px] text-[var(--granite-600)]">
                          [foto: {label}]
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex gap-4">
                <Droplets className="text-[var(--amber-500)] shrink-0 mt-1" size={24} strokeWidth={1.4} />
                <div>
                  <h3 className="font-display text-lg text-[var(--spruce-950)] mb-1.5">
                    Voda a žetony
                  </h3>
                  <p className="text-[var(--granite-600)] leading-relaxed text-sm">
                    Chata čerpá vodu z přírodních zdrojů na vrcholu hory,
                    takže je jí omezené množství. Sprchy jsou na žetony —
                    jeden žeton spustí vodu na 3 minuty. Žetony si vyzvednete
                    na recepci. Prosíme o šetrné zacházení s vodou.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex gap-4">
                <FileWarning className="text-[var(--amber-500)] shrink-0 mt-1" size={24} strokeWidth={1.4} />
                <div>
                  <h3 className="font-display text-lg text-[var(--spruce-950)] mb-1.5">
                    Storno podmínky
                  </h3>
                  <ul className="text-[var(--granite-600)] leading-relaxed text-sm space-y-1.5 list-disc pl-4">
                    <li>Zrušení více než 14 dní před nástupem: vrácení 100 % uhrazené částky.</li>
                    <li>Zrušení méně než 14 dní před nástupem: storno poplatek 50 % z ceny ubytování.</li>
                    <li>Zrušení méně než 3 dny před nástupem nebo nedostavení se: storno poplatek 100 %.</li>
                    <li>Zrušení pobytu z naší strany (provozní/bezpečnostní důvody): vrácení celé částky.</li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SAUNA */}
      <section id="sauna" className="bg-[var(--spruce-950)] px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <Waves className="text-[var(--amber-300)] mb-3" size={28} strokeWidth={1.4} />
            <h2 className="font-display text-2xl text-[var(--snow-50)] mb-4">
              Sauna s panoramatem Jeseníků
            </h2>
            <p className="text-[var(--granite-300)] leading-relaxed mb-6 max-w-2xl">
              Po dni na horách si dopřejte teplo, klid a výhled. Naše
              horská sauna s panoramatem Jeseníků je místo, kde se tělo
              uvolní a hlava vypne — ochlazení v horském vzduchu
              a prostor jen pro vás. Domluva na recepci nebo na{" "}
              <a href="mailto:info@chatanaseraku.cz" className="text-[var(--amber-300)] underline">
                info@chatanaseraku.cz
              </a>.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Sauna — interiér", "Výhled ze sauny", "Odpočinková zóna"].map((label) => (
                <div
                  key={label}
                  className="aspect-[4/3] rounded-sm bg-[var(--spruce-800)] flex items-center justify-center"
                >
                  <span className="font-mono-label text-[10px] text-[var(--granite-300)]">
                    [foto: {label}]
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* DOPRAVA A AKTIVITY */}
      <section id="doprava" className="bg-[var(--mist-100)] px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <MapPinned className="text-[var(--amber-500)] mb-3" size={28} strokeWidth={1.4} />
            <h2 className="font-display text-2xl text-[var(--spruce-950)] mb-2">
              Kudy a jak na chatu
            </h2>
            <p className="text-[var(--granite-600)] leading-relaxed mb-8 max-w-2xl">
              Přístup na chatu na Šeráku je možný pěšky po vyznačených
              turistických trasách, nebo lanovkou z Ramzové.{" "}
              <strong>Přístup autem je v CHKO zakázán.</strong>
            </p>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-3 mb-10">
            <Reveal>
              <div className="flex gap-3">
                <CableCar className="text-[var(--amber-500)] shrink-0" size={22} strokeWidth={1.4} />
                <div>
                  <h3 className="font-display text-base text-[var(--spruce-950)] mb-1">
                    Lanovkou
                  </h3>
                  <p className="text-sm text-[var(--granite-600)] leading-relaxed">
                    Lanová dráha vás vyveze z Ramzové na Šerák v zimní
                    i letní sezóně, i se zavazadly. Spodní úsek
                    Ramzová–Čerňava je 4sedačkový, horní úsek
                    Čerňava–Šerák 2sedačkový. Jízdní řád, ceník a podmínky
                    pro vyvezení psa najdete na stránkách{" "}
                    <a
                      href="http://www.bonera.cz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--amber-500)] underline"
                    >
                      Bonera
                    </a>.
                  </p>
                  <div className="photo-frame aspect-[4/3] mt-3 bg-[var(--snow-50)] border border-[var(--granite-300)]/40 flex items-center justify-center">
                    <span className="font-mono-label text-[10px] text-[var(--granite-600)]">
                      [foto: Lanovka na Šerák]
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="flex gap-3">
                <Footprints className="text-[var(--amber-500)] shrink-0" size={22} strokeWidth={1.4} />
                <div>
                  <h3 className="font-display text-base text-[var(--spruce-950)] mb-1">
                    Pěší cestou
                  </h3>
                  <p className="text-sm text-[var(--granite-600)] leading-relaxed">
                    Turistická značka vede z obce Ramzová, nebo přes hřeben
                    z Červenohorského sedla. Dále se k nám dostanete
                    z Lipové-lázně, z Filipovic na druhé straně kopce,
                    i z Jeseníku.
                  </p>
                  <div className="photo-frame aspect-[4/3] mt-3 bg-[var(--snow-50)] border border-[var(--granite-300)]/40 flex items-center justify-center">
                    <span className="font-mono-label text-[10px] text-[var(--granite-600)]">
                      [foto: Pěší cesta na Šerák]
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex gap-3">
                <Bike className="text-[var(--amber-500)] shrink-0" size={22} strokeWidth={1.4} />
                <div>
                  <h3 className="font-display text-base text-[var(--spruce-950)] mb-1">
                    Na kole
                  </h3>
                  <p className="text-sm text-[var(--granite-600)] leading-relaxed">
                    Jediná kompletně sjízdná cesta je z Adolfovic od Bělé
                    pod Pradědem. Cyklotrasa po červené značce z Ramzové má
                    úsek Čerňava–Šerák příliš prudký na kolo — dolů na
                    Čerňavu jen pro zkušené terénní cyklisty.
                  </p>
                  <div className="photo-frame aspect-[4/3] mt-3 bg-[var(--snow-50)] border border-[var(--granite-300)]/40 flex items-center justify-center">
                    <span className="font-mono-label text-[10px] text-[var(--granite-600)]">
                      [foto: Na kole na Šerák]
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="rounded-sm bg-[var(--snow-50)] p-6">
              <h3 className="font-display text-base text-[var(--spruce-950)] mb-2">
                Doprava k patě hory
              </h3>
              <ul className="text-sm text-[var(--granite-600)] leading-relaxed space-y-1">
                <li>Od Hanušovic (Šumperka, Olomouce, Hradce Králové) po silnici II/369 směr Lipová-lázně a Jeseník</li>
                <li>Od Jeseníku (Polska, Opavy, Ostravy) po silnici II/369 směr Lipová-lázně a Hanušovice</li>
                <li>Nejbližší autobusová zastávka: Ostružná, Ramzová, hotel Horská chata — 5 km</li>
                <li>Nejbližší železniční zastávka: Ramzová — 5 km</li>
                <li>Z Ramzové dál pěšky po červené značce nebo lanovkou</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
