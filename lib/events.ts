// Jediný zdroj akcí — používá ho Kalendář akcí i vstupenky v hero.
// heroTitle / heroNote / time / price jsou volitelné — jen pro vstupenku v hero.

export type ChataEvent = {
  date: string; // YYYY-MM-DD
  title: string;
  type: string;
  description: string;
  heroTitle?: string;
  heroNote?: string;
  time?: string;
  price?: string;
};

export const EVENTS: ChataEvent[] = [
  {
    date: "2026-09-19",
    title: "Zabijačkový víkend",
    type: "Gastro víkend",
    description: "Tradiční zabijačkové hody, 19.–20. 9. 2026.",
    heroNote: "19.–20. 9.",
  },
  {
    date: "2026-10-02",
    title: "Michal Juříčka — koncert",
    type: "Koncert",
    description: "Páteční živá hudba v restauraci.",
    heroTitle: "Michal Juříčka",
    heroNote: "Živá hudba v restauraci",
  },
  {
    date: "2026-10-09",
    title: "Laco Déczi & New York Celula — koncert",
    type: "Koncert",
    description: "Vstupné 850,- včetně lístku na lanovku v 19:00 z Ramzové. Rezervace na info@chatanaseraku.cz. Začátek koncertu ve 20:00",
    heroTitle: "Laco Déczi & New York Celula",
    time: "20:00",
    price: "850 Kč včetně lístku na lanovku v 19:00 z Ramzové",
  },
  {
    date: "2026-10-24",
    title: "Dina Štěrbová - přednáška",
    type: "Přednáška",
    description: "Sobotní přednáška o horolezení a 8000m.n.m..",
    heroTitle: "Dina Štěrbová",
    heroNote: "Horolezení a osmitisícovky",
  },
  {
    date: "2026-11-06",
    title: "Los Muertos — dušičková párty",
    type: "Párty",
    description: "Vstupné 300,-. Oslavte letos Dušičky v mexickém stylu – hoďte se do tematického kostýmu, přijďte si užít noc plnou živých barev a hudby od DJ a přeneste s námi fotku svých blízkých k symbolickému pomníčku",
    heroTitle: "Los Muertos",
    heroNote: "Dušičková párty",
    price: "300 Kč",
  },
  {
    date: "2026-11-16",
    title: "Snow film festival - promítání",
    type: "Promítání",
    description: "Vstupné 100,-. Filmový večer s adrenalinovou atmosférou z horského prostředí.",
    heroTitle: "Snow Film Fest",
    heroNote: "Horské filmy",
    price: "100 Kč",
  },
];
