import Link from "next/link";
import Reveal from "@/components/Reveal";
import Hero360VideoClient from "@/components/Hero360VideoClient";
import RidgeDivider from "@/components/RidgeDivider";
import RidgePeaks from "@/components/RidgePeaks";
import ParallaxY from "@/components/ParallaxY";
import Counter from "@/components/Counter";
import { HeroStagger, HeroItem } from "@/components/HeroStagger";
import Marquee from "@/components/Marquee";
import TrailPath from "@/components/TrailPath";
import {
  BedDouble,
  UtensilsCrossed,
  Heart,
  GraduationCap,
  Beer,
  Truck,
  Baby,
  CreditCard,
  Bike,
  PawPrint,
  Rotate3d,
} from "lucide-react";

const FACTS = [
  { icon: Baby, text: "Vhodné pro rodiny s dětmi" },
  { icon: CreditCard, text: "Platba hotově, kartou i QERKO" },
  { icon: Bike, text: "Úschovna kol i lyží" },
  { icon: PawPrint, text: "Mazlíčci jsou vítáni" },
];

const FEATURES = [
  {
    photoLabel: "Ubytování na hřebeni",
    photo: "/images/karta-ubytovani.jpg",
    icon: BedDouble,
    title: "Ubytování na hřebeni",
    text: "Útulné 2–8lůžkové pokoje po citlivé rekonstrukci.",
    cta: "Rezervovat pobyt",
    href: "/rezervace",
  },
  {
    photoLabel: "Restaurace",
    photo: "/images/karta-restaurace.jpg",
    icon: UtensilsCrossed,
    title: "Restaurace",
    text: "Domácí kuchyně a tankové pivo Šerák přímo na vrcholu hory.",
    cta: "Menu a otevírací doba",
    href: "/restaurace",
  },
  {
    photoLabel: "Svatby & firemní akce",
    photo: "/images/karta-svatby.jpg",
    icon: Heart,
    title: "Svatby & firemní akce",
    text: "Obřad i hostina s panoramatem Jeseníků, ubytování pro hosty přímo na místě.",
    cta: "Poptat termín",
    href: "/skupiny-a-akce#svatby",
  },
  {
    photoLabel: "Základní a střední školy",
    photo: "/images/karta-skoly.jpg",
    icon: GraduationCap,
    title: "Základní a střední školy",
    text: "Školní výlety, pobytové kurzy i zimní lyžařské pobyty tříd — se speciální poptávkou.",
    cta: "Poptat pro školu",
    href: "/skupiny-a-akce#skoly",
  },
];

const RESTAURANT_PHOTOS = [
  { label: "Restaurace", photo: "/images/karta-restaurace.jpg" },
  { label: "Tankové pivo", photo: "/images/pivo-tanky.jpg" },
  { label: "Výhled z okna", photo: "/images/terasa-vyhled.jpg" },
  { label: "Interiér", photo: "/images/restaurace-interier.jpg" },
];

const AKCE_PHOTOS = [
  { label: "Promítání", photo: "/images/akce-1.jpg" },
  { label: "Přednáška", photo: "/images/akce-2.jpg" },
  { label: "Kurz", photo: "/images/akce-3.jpg" },
];

const MENU_HIGHLIGHTS = [
  { name: "Šerácký rendlík", note: "náš vlastní recept, 330 ml", price: "110 Kč" },
  { name: "Hovězí guláš s karlovarským knedlíkem", note: "200 g", price: "339 Kč" },
  { name: "Svíčková na smetaně", note: "180 g", price: "349 Kč" },
  { name: "Borůvkové knedlíky", note: "2 ks, domácí", price: "249 Kč" },
];

export default function Home() {
  return (
    <>
      {/* ===== HERO — 360° panorama (60 %) + obsah (40 %) ===== */}
      <section className="relative md:h-screen md:min-h-[720px] bg-[var(--spruce-950)] flex flex-col overflow-hidden">
        {/* 360° video pás */}
        <div className="relative h-[46vh] min-h-[300px] md:h-[60%] md:min-h-0 overflow-hidden cursor-grab active:cursor-grabbing">
          <Hero360VideoClient />

          {/* Nápověda: je to panorama, dá se s ním otáčet */}
          <div className="absolute top-24 right-5 z-10 pointer-events-none flex items-center gap-2.5 rounded-full bg-[var(--spruce-950)]/55 backdrop-blur-sm px-4 py-2">
            <Rotate3d size={16} className="text-[var(--amber-300)]" strokeWidth={1.8} />
            <span className="font-mono-label text-[10px] text-[var(--snow-50)]">
              360° · táhni a rozhlédni se
            </span>
          </div>

          {/* Jemné ztmavení u paty videa, ať hory hezky nasednou */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--spruce-950)]/45 to-transparent pointer-events-none" />

          {/* Silueta hor — panorama plynule přeteče do obsahu */}
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 w-full h-[56px] md:h-[90px] pointer-events-none"
            aria-hidden="true"
          >
            <path
              d="M0,90 L0,62 L140,72 L320,38 L520,58 L720,24 L920,50 L1120,40 L1300,66 L1440,58 L1440,90 Z"
              fill="var(--spruce-950)"
            />
          </svg>
        </div>

        {/* Obsah — spodní část hera */}
        <div className="relative flex-1 flex items-center py-10 md:py-0">
          <div className="max-w-6xl mx-auto w-full px-6 grid gap-8 md:grid-cols-[1.35fr_auto] md:items-center">
            <HeroStagger>
              <HeroItem>
                <span className="inline-block font-mono-label text-[10px] md:text-xs tracking-[0.16em] text-[var(--spruce-950)] bg-[var(--amber-300)] px-3 py-1 rounded-full mb-4">
                  1351 M N. M. · HŘEBEN HRUBÉHO JESENÍKU
                </span>
              </HeroItem>
              <HeroItem>
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[0.98] tracking-[-0.02em] text-[var(--snow-50)] [text-wrap:balance]">
                  Chata Jiřího na Šeráku
                </h1>
              </HeroItem>
              <HeroItem>
                <p className="font-display font-extrabold lowercase text-2xl md:text-3xl text-[var(--amber-300)] mt-3">
                  výš už je jen nebe.
                </p>
              </HeroItem>
              <HeroItem className="mt-7 flex flex-wrap items-center gap-3.5">
                <Link href="/rezervace" className="btn btn-primary btn-md">
                  Rezervovat pobyt
                  <span aria-hidden="true" className="arrow">→</span>
                </Link>
                <Link href="/o-chate-serak" className="btn btn-ghost-light btn-md">
                  Příběh chaty
                </Link>
              </HeroItem>
            </HeroStagger>

            {/* Rychlá fakta — kompaktní sloupec */}
            <Reveal direction="right" delay={0.5}>
              <div className="flex flex-col items-start md:items-end gap-3.5 md:text-right border-l-2 md:border-l-0 md:border-r-2 border-[var(--amber-500)]/60 pl-4 md:pl-0 md:pr-4">
                <div>
                  <p className="font-display text-4xl text-[var(--amber-300)] leading-none">
                    <Counter to={67} />
                  </p>
                  <p className="text-sm text-[var(--mist-100)] mt-1">
                    míst k ubytování
                  </p>
                </div>
                <ul className="flex flex-col items-start md:items-end gap-2">
                  {FACTS.map((fact) => (
                    <li
                      key={fact.text}
                      className="flex md:flex-row-reverse items-center gap-2.5"
                    >
                      <fact.icon
                        className="text-[var(--amber-300)] shrink-0"
                        size={17}
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-[var(--mist-100)]">
                        {fact.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "1351 m n. m.",
          "tankový Šerák",
          "borůvkové knedlíky",
          "67 lůžek",
          "sauna na vrcholu",
          "lanovkou z Ramzové",
        ]}
      />

      {/* ===== KOMU SEDNEME ===== */}
      <section className="relative bg-[var(--mist-100)] px-6 pt-24 pb-28 overflow-hidden">
        <TrailPath d="M 300 0 C 700 120, 300 340, 720 480 C 1100 610, 500 780, 720 1000" />
        <div className="relative max-w-6xl mx-auto">
          <Reveal>
            <p className="eyebrow text-[var(--amber-500)] mb-4">Kam to bude</p>
            <h2 className="claim [text-transform:none] text-[var(--spruce-950)] max-w-3xl mb-16">
              Hory jsou pro všechny
            </h2>
          </Reveal>

          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <Link href={f.href} className="group lift flex flex-col h-full">
                  <div className="photo-frame aspect-[4/3] mb-5">
                    {f.photo ? (
                      <img
                        src={f.photo}
                        alt={f.photoLabel}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[var(--snow-50)] border border-[var(--granite-300)]/40 flex items-center justify-center">
                        <span className="font-mono-label text-[10px] text-[var(--granite-600)]">
                          [foto: {f.photoLabel}]
                        </span>
                      </div>
                    )}
                  </div>
                  <f.icon
                    className="text-[var(--amber-500)] mb-3"
                    size={26}
                    strokeWidth={1.4}
                  />
                  <h3 className="font-display text-2xl mb-2.5 text-[var(--spruce-950)] group-hover:text-[var(--amber-500)] transition-colors leading-snug">
                    {f.title}
                  </h3>
                  <p className="text-[var(--granite-600)] leading-relaxed mb-5 flex-1">
                    {f.text}
                  </p>
                  <span className="btn btn-dark btn-sm self-start">
                    {f.cta}
                    <span aria-hidden="true" className="arrow">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RidgePeaks background="var(--mist-100)" to="var(--spruce-950)" />

      {/* ===== RESTAURACE + TANKOVÉ PIVO ===== */}
      <section className="relative bg-[var(--spruce-950)] px-6 pt-24 pb-24 overflow-hidden">
        <div className="relative max-w-6xl mx-auto grid gap-14 md:grid-cols-2 md:items-center">
          <Reveal direction="left">
            <Beer className="text-[var(--amber-300)] mb-5" size={34} strokeWidth={1.4} />
            <p className="eyebrow text-[var(--amber-300)] mb-4">Naše chlouba</p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--snow-50)] mb-6 leading-[1.1] [text-wrap:balance]">
              Tankové pivo Šerák — jediné svého druhu na vrcholu hory.
            </h2>
            <p className="text-[var(--granite-300)] leading-relaxed text-lg mb-6">
              Pivovar Holba kvůli nám nechal upravit dodávku do terénní
              úpravy, aby se k nám tankové pivo vůbec dostalo. Pravidelně
              čistíme pivní trubky a náš personál je proškolený přímo
              pivovarem na správné čepování — abyste na vrcholu dostali
              stejně poctivou dvanáctku jako dole v hospodě.
            </p>

            <div className="flex items-start gap-4 rounded-sm bg-[var(--spruce-900)] border-l-2 border-[var(--amber-500)] p-5 mb-8">
              <Truck className="text-[var(--amber-300)] shrink-0 mt-0.5" size={24} strokeWidth={1.4} />
              <p className="text-sm text-[var(--granite-300)] leading-relaxed">
                Chata leží v CHKO Jeseníky, takže sem všechno zboží — včetně
                soudků piva — vozíme terénními auty na lesní povolenku,
                v zimě na skútru se saněmi. Chystáme krátké video „Cesta
                zboží na Šerák", které vám ukáže, jak to na vrcholu doopravdy
                funguje.
              </p>
            </div>

            <Link href="/restaurace" className="btn btn-primary">
              Celé menu a otevírací doba
              <span aria-hidden="true" className="arrow">→</span>
            </Link>
          </Reveal>

          <div>
            <ParallaxY offset={26}>
              <Reveal direction="right" delay={0.1}>
                <div className="grid grid-cols-2 gap-3 mb-7">
                  {RESTAURANT_PHOTOS.map((item, i) => (
                    <div
                      key={item.label}
                      className={`photo-frame aspect-[4/3] ${i % 2 === 1 ? "translate-y-4" : ""}`}
                    >
                      {item.photo ? (
                        <img
                          src={item.photo}
                          alt={item.label}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[var(--spruce-800)] flex items-center justify-center">
                          <span className="font-mono-label text-[10px] text-[var(--granite-300)]">
                            [foto: {item.label}]
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>
            </ParallaxY>

            <Reveal delay={0.15}>
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {MENU_HIGHLIGHTS.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-4 py-4"
                  >
                    <div>
                      <p className="text-[var(--snow-50)] text-lg">{item.name}</p>
                      <p className="text-xs text-[var(--granite-300)] mt-0.5">
                        {item.note}
                      </p>
                    </div>
                    <span className="font-mono-label text-base text-[var(--amber-300)] shrink-0">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-base text-[var(--mist-100)]">
                Otevřeno denně od 10:00 (polévky), hlavní jídla od 11:00.
              </p>
              <p className="mt-1 text-sm text-[var(--granite-300)]">
                Vaříme i lehčí sezónní menu — ptejte se přímo v restauraci.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <RidgeDivider from="var(--spruce-950)" to="var(--snow-50)" flip />

      {/* ===== AKCE NA CHATĚ ===== */}
      <section className="bg-[var(--snow-50)] px-6 pt-12 pb-20">
        <Reveal>
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-10">
            <ParallaxY offset={14} className="shrink-0 w-full sm:w-96">
              <div className="grid grid-cols-3 gap-3">
                {AKCE_PHOTOS.map((item, i) => (
                  <div
                    key={item.label}
                    className={`photo-frame aspect-square ${i === 1 ? "-translate-y-3" : ""}`}
                  >
                    {item.photo ? (
                      <img
                        src={item.photo}
                        alt={item.label}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[var(--mist-100)] flex items-center justify-center">
                        <span className="font-mono-label text-[10px] text-[var(--granite-600)] text-center px-1">
                          [foto: {item.label}]
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ParallaxY>
            <div className="flex-1 text-center sm:text-left">
              <p className="eyebrow text-[var(--amber-500)] mb-3 justify-center sm:justify-start">
                Večery na chatě
              </p>
              <h3 className="font-display text-3xl text-[var(--spruce-950)] mb-2 [text-wrap:balance]">
                Promítání, přednášky a kurzy na chatě
              </h3>
              <p className="text-[var(--granite-600)] text-lg">
                Pravidelně u nás pořádáme i vlastní akce — mrkněte, co se
                zrovna chystá.
              </p>
            </div>
            <Link href="/kalendar-akci" className="btn btn-dark shrink-0">
              Kalendář akcí
              <span aria-hidden="true" className="arrow">→</span>
            </Link>
          </div>
        </Reveal>
      </section>

      <RidgeDivider from="var(--snow-50)" to="var(--spruce-800)" />

      {/* ===== PŘÍBĚH + FINÁLNÍ CTA ===== */}
      <section className="bg-[var(--spruce-800)] text-[var(--mist-100)] px-6 pt-16 pb-28">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="eyebrow text-[var(--amber-300)] mb-5 justify-center">
              Náš příběh
            </p>
            <h2 className="claim text-[var(--snow-50)]">
              šerák je branou hor. my jsme zastávka, kde nabereš dech.
            </h2>
            <p className="mt-6 font-display font-bold text-xl text-[var(--mist-100)]/85 [text-wrap:balance]">
              Šerák je přirozenou turistickou branou Keprníku i Pradědu —
              a Chata Jiřího na Šeráku vítanou zastávkou před další cestou.
            </p>
            <p className="mt-7 text-lg text-[var(--granite-300)] leading-relaxed">
              V roce 2018 jsme oslavili 130 let. Termíny na horách mizí
              rychle — vybraný pobyt si zamluvte hned.
            </p>
            <div className="mt-10">
              <Link href="/rezervace" className="btn btn-primary btn-lg">
                Rezervovat pobyt
                <span aria-hidden="true" className="arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
