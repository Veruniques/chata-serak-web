// Jediný zdroj otevírací doby restaurace — používá ho sekce na stránce
// Restaurace, strukturovaná data pro Google i znalostní báze chat asistenta.
//
// JAK ZMĚNIT OTEVÍRACÍ DOBU
//  - běžný týden:        upravte WEEKLY_HOURS
//  - zavřený den:        přidejte řádek do EXCEPTIONS s kind: "closed"
//  - omezený provoz:     přidejte řádek s kind: "limited" (čas a poznámku
//                        stačí uvést, jen když se liší od výchozích)
//  - svátek s otevřením: přidejte datum do OPEN_HOLIDAYS (v kalendáři dostane tečku)
// Staré řádky není nutné mazat — web ukazuje jen aktuální a příští měsíc.

export type Hours = { open: string; close: string };

export type HoursException = {
  date: string; // YYYY-MM-DD
  kind: "closed" | "limited";
  open?: string; // jen pro "limited"; výchozí je běžná doba toho dne
  close?: string;
  note?: string; // jen pro "limited"; výchozí je LIMITED_NOTE
};

/** 0 = neděle … 6 = sobota (stejně jako Date.getDay()). null = zavírací den. */
export const WEEKLY_HOURS: Record<number, Hours | null> = {
  1: { open: "10:00", close: "16:00" },
  2: { open: "10:00", close: "16:00" },
  3: { open: "10:00", close: "16:00" },
  4: { open: "10:00", close: "16:00" },
  5: { open: "10:00", close: "19:00" },
  6: { open: "10:00", close: "19:00" },
  0: { open: "10:00", close: "16:00" },
};

export const LIMITED_NOTE = "pouze pivo a polévka, bez standardního menu";
export const LIMITED_SHORT = "jen pivo a polévka";

export const EXCEPTIONS: HoursException[] = [
  { date: "2026-10-12", kind: "limited" },
  { date: "2026-10-13", kind: "limited" },
  { date: "2026-10-19", kind: "limited" },
  { date: "2026-11-02", kind: "closed" },
  { date: "2026-11-03", kind: "closed" },
  { date: "2026-11-09", kind: "closed" },
  { date: "2026-11-10", kind: "closed" },
  { date: "2026-11-18", kind: "closed" },
  { date: "2026-11-19", kind: "closed" },
  { date: "2026-11-23", kind: "closed" },
  { date: "2026-11-24", kind: "closed" },
  { date: "2026-11-25", kind: "closed" },
];

/** Státní svátky, kdy je otevřeno podle běžné doby. */
export const OPEN_HOLIDAYS: string[] = ["2026-10-28", "2026-11-17"];

export const GUEST_NOTE =
  "Ubytované hosty rádi pohostíme i mimo otevírací dobu.";

// ---------------------------------------------------------------------------
// Pomocné funkce — při běžné změně otevírací doby není potřeba nic níž měnit.
// ---------------------------------------------------------------------------

export type DayInfo = {
  date: string;
  weekday: number; // 0 = neděle
  kind: "open" | "limited" | "closed";
  open?: string;
  close?: string;
  note?: string;
  holiday: boolean;
};

const WEEKDAY_SHORT = ["ne", "po", "út", "st", "čt", "pá", "so"];
const WEEKDAY_LABEL = ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"];
export const MONTH_NAMES = [
  "Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
  "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec",
];

const pad = (n: number) => String(n).padStart(2, "0");

export function ymd(y: number, m: number, d: number): string {
  return `${y}-${pad(m)}-${pad(d)}`;
}

export function parseYmd(date: string): { y: number; m: number; d: number } {
  const [y, m, d] = date.split("-").map(Number);
  return { y, m, d };
}

export function weekdayOf(date: string): number {
  const { y, m, d } = parseYmd(date);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function addDays(date: string, n: number): string {
  const { y, m, d } = parseYmd(date);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return ymd(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate());
}

export function daysInMonth(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

/** „po 12. 10." */
export function shortDate(date: string): string {
  const { m, d } = parseYmd(date);
  return `${WEEKDAY_SHORT[weekdayOf(date)]} ${d}. ${m}.`;
}

/** „16:00" → „16", „16:30" zůstává. */
export function shortTime(time: string): string {
  return time.endsWith(":00") ? String(Number(time.slice(0, 2))) : time;
}

/** Aktuální datum a čas na chatě (Europe/Prague), nezávisle na zařízení. */
export function pragueNow(now: Date = new Date()): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Prague",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    time: `${get("hour")}:${get("minute")}`,
  };
}

export function getDayInfo(date: string): DayInfo {
  const weekday = weekdayOf(date);
  const regular = WEEKLY_HOURS[weekday];
  const exception = EXCEPTIONS.find((e) => e.date === date);
  const holiday = OPEN_HOLIDAYS.includes(date);

  if (exception?.kind === "closed" || (!exception && !regular)) {
    return { date, weekday, kind: "closed", holiday };
  }
  if (exception?.kind === "limited") {
    return {
      date,
      weekday,
      kind: "limited",
      open: exception.open ?? regular?.open ?? "10:00",
      close: exception.close ?? regular?.close ?? "16:00",
      note: exception.note ?? LIMITED_NOTE,
      holiday,
    };
  }
  return { date, weekday, kind: "open", open: regular!.open, close: regular!.close, holiday };
}

/** Nejbližší den po `date`, kdy je otevřeno (i omezeně). */
export function nextOpenDay(date: string): DayInfo | null {
  for (let i = 1; i <= 60; i++) {
    const info = getDayInfo(addDays(date, i));
    if (info.kind !== "closed") return info;
  }
  return null;
}

/** Běžný týden seskupený do řádků: „Po – Čt · 10:00 – 16:00". */
export function weeklyRows(): { label: string; hours: string }[] {
  const order = [1, 2, 3, 4, 5, 6, 0];
  const text = (h: Hours | null) => (h ? `${h.open} – ${h.close}` : "zavřeno");
  const rows: { from: number; to: number; hours: string }[] = [];
  for (const day of order) {
    const hours = text(WEEKLY_HOURS[day]);
    const last = rows[rows.length - 1];
    if (last && last.hours === hours) last.to = day;
    else rows.push({ from: day, to: day, hours });
  }
  return rows.map((r) => ({
    label:
      r.from === r.to
        ? WEEKDAY_LABEL[r.from]
        : `${WEEKDAY_LABEL[r.from]} – ${WEEKDAY_LABEL[r.to]}`,
    hours: r.hours,
  }));
}

/** Nejkratší a nejdelší běžná zavírací hodina — pro legendu kalendáře. */
export function closingRange(): { min: string; max: string } {
  const closes = Object.values(WEEKLY_HOURS)
    .filter((h): h is Hours => Boolean(h))
    .map((h) => h.close)
    .sort();
  return { min: closes[0] ?? "16:00", max: closes[closes.length - 1] ?? "16:00" };
}

const longDate = (date: string) => {
  const { y, m, d } = parseYmd(date);
  return `${shortDate(date).split(" ")[0]} ${d}. ${m}. ${y}`;
};

/** Text pro znalostní bázi chat asistenta. */
export function openingHoursText(): string {
  const weekly = weeklyRows()
    .map((r) => `${r.label} ${r.hours.replace(" – ", "–")}`)
    .join("; ");
  const lines = [`- Běžná otevírací doba restaurace: ${weekly}.`];

  const limited = EXCEPTIONS.filter((e) => e.kind === "limited").map((e) => getDayInfo(e.date));
  if (limited.length) {
    lines.push(
      `- Omezený provoz: ${limited
        .map((i) => `${longDate(i.date)} (${i.open}–${i.close}, ${i.note})`)
        .join("; ")}.`
    );
  }
  const closed = EXCEPTIONS.filter((e) => e.kind === "closed");
  if (closed.length) {
    lines.push(`- Restaurace zavřená: ${closed.map((e) => longDate(e.date)).join(", ")}.`);
  }
  if (OPEN_HOLIDAYS.length) {
    lines.push(
      `- O státních svátcích ${OPEN_HOLIDAYS.map(longDate).join(", ")} je otevřeno podle běžné doby.`
    );
  }
  lines.push(`- Ve všechny ostatní dny je otevřeno podle běžné otevírací doby. ${GUEST_NOTE}`);
  return lines.join("\n");
}

/** Strukturovaná data (schema.org) — Google z nich čte otevírací dobu i výjimky. */
export function openingHoursJsonLd(fromDate: string) {
  const schemaDay = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
  ];
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Restaurace Chaty Jiřího na Šeráku",
    url: "https://www.chatanaseraku.cz/restaurace",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ramzová",
      postalCode: "788 26",
      addressLocality: "Branná",
      addressCountry: "CZ",
    },
    openingHoursSpecification: Object.entries(WEEKLY_HOURS)
      .filter(([, h]) => h)
      .map(([day, h]) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${schemaDay[Number(day)]}`,
        opens: h!.open,
        closes: h!.close,
      })),
    specialOpeningHoursSpecification: EXCEPTIONS.filter((e) => e.date >= fromDate).map((e) => {
      const info = getDayInfo(e.date);
      return {
        "@type": "OpeningHoursSpecification",
        validFrom: e.date,
        validThrough: e.date,
        opens: info.kind === "closed" ? "00:00" : info.open,
        closes: info.kind === "closed" ? "00:00" : info.close,
      };
    }),
  };
}
