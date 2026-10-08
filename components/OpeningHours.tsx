"use client";

import { useEffect, useState } from "react";
import {
  GUEST_NOTE,
  LIMITED_SHORT,
  MONTH_NAMES,
  closingRange,
  daysInMonth,
  getDayInfo,
  nextOpenDay,
  addDays,
  parseYmd,
  pragueNow,
  shortDate,
  shortTime,
  weeklyRows,
  ymd,
  type DayInfo,
} from "@/lib/openingHours";

/**
 * Otevírací doba restaurace: dnešní stav, běžný týden a kalendář na aktuální
 * a příští měsíc. Všechna data bere z lib/openingHours.ts.
 *
 * Server pošle datum, se kterým se stránka vykreslila; po načtení si prohlížeč
 * dopočítá aktuální čas na chatě, aby „dnes" sedělo i mezi nasazeními.
 */

type Now = { date: string; time: string };

const WEEKDAYS = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];
const WEEKDAY_FULL = ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"];

function hoursText(info: DayInfo) {
  return `${info.open}–${info.close}`;
}

function statusFor(now: Now, precise: boolean) {
  const info = getDayInfo(now.date);
  const next = nextOpenDay(now.date);
  const nextText = next
    ? `Znovu otevřeno ${
        next.date === addDays(now.date, 1) ? "zítra" : shortDate(next.date)
      } ${hoursText(next)}${next.kind === "limited" ? ` (${LIMITED_SHORT})` : ""}.`
    : null;

  if (info.kind === "closed") {
    return { open: false, text: "Dnes zavřeno", sub: nextText };
  }
  const limited = info.kind === "limited" ? ` · ${LIMITED_SHORT}` : "";
  if (precise && now.time >= info.close!) {
    return { open: false, text: "Dnes už zavřeno", sub: nextText };
  }
  if (precise && now.time >= info.open!) {
    return { open: true, text: `Právě otevřeno, dnes do ${info.close}${limited}`, sub: null };
  }
  return { open: true, text: `Dnes otevřeno ${hoursText(info)}${limited}`, sub: null };
}

function monthData(year: number, month: number, today: string, minClose: string) {
  const offset = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;
  const days: DayInfo[] = [];
  for (let d = 1; d <= daysInMonth(year, month); d++) {
    days.push(getDayInfo(ymd(year, month, d)));
  }
  const upcoming = days.filter((d) => d.date >= today);
  const closed = upcoming.filter((d) => d.kind === "closed");
  const limited = upcoming.filter((d) => d.kind === "limited");
  const holidays = upcoming.filter((d) => d.holiday);

  const notes: { label: string; text: string }[] = [];
  // Omezené dny se stejným časem a poznámkou patří na jeden řádek.
  const groups = new Map<string, DayInfo[]>();
  for (const d of limited) {
    const key = `${hoursText(d)}, ${d.note}`;
    groups.set(key, [...(groups.get(key) ?? []), d]);
  }
  for (const [detail, list] of groups) {
    notes.push({
      label: "Omezený provoz",
      text: `${list.map((d) => shortDate(d.date)).join(", ")} — ${detail}`,
    });
  }
  if (closed.length) {
    notes.push({ label: "Zavřeno", text: closed.map((d) => shortDate(d.date)).join(", ") });
  }
  for (const d of holidays) {
    const { d: day, m } = parseYmd(d.date);
    notes.push({
      label: `Svátek ${day}. ${m}.`,
      text: d.kind === "closed" ? "zavřeno" : `otevřeno ${hoursText(d)}`,
    });
  }

  const parts: string[] = [];
  if (closed.length) parts.push(`${closed.length}× zavřeno`);
  if (limited.length) parts.push(`${limited.length}× omezený provoz`);

  return {
    key: `${year}-${month}`,
    name: MONTH_NAMES[month - 1],
    year,
    offset,
    days,
    notes,
    summary: parts.length ? parts.join(", ") : "bez výjimek",
    minClose,
  };
}

function Tile({ day, today, minClose }: { day: DayInfo; today: string; minClose: string }) {
  const n = parseYmd(day.date).d;
  const isToday = day.date === today;
  const isPast = day.date < today;

  const description =
    day.kind === "closed"
      ? "zavřeno"
      : day.kind === "limited"
        ? `omezený provoz ${hoursText(day)}, ${day.note}`
        : `otevřeno ${hoursText(day)}`;
  const label = `${WEEKDAY_FULL[day.weekday]} ${n}. ${parseYmd(day.date).m}.: ${description}${
    day.holiday ? ", státní svátek" : ""
  }${isToday ? ", dnes" : ""}`;

  if (isPast) {
    return (
      <li
        aria-label={label}
        className="flex aspect-square items-center justify-center text-sm sm:text-base text-[var(--granite-600)] opacity-60"
      >
        {n}
      </li>
    );
  }

  const tone =
    day.kind === "closed"
      ? "border border-dashed border-[var(--granite-300)] text-[var(--granite-600)]"
      : day.kind === "limited"
        ? "bg-[var(--amber-300)] text-[var(--spruce-950)]"
        : day.close! > minClose
          ? "bg-[var(--spruce-800)] text-[var(--snow-50)]"
          : "bg-[color-mix(in_srgb,var(--spruce-700)_14%,white)] text-[var(--spruce-950)]";

  const caption = isToday
    ? "dnes"
    : day.kind === "closed"
      ? "zavř."
      : day.kind === "limited"
        ? "omez."
        : `do ${shortTime(day.close!)}`;

  return (
    <li
      aria-label={label}
      aria-current={isToday ? "date" : undefined}
      className={`relative flex aspect-square flex-col items-center justify-center gap-0.5 rounded-[4px] leading-none ${tone} ${
        isToday ? "outline outline-2 outline-offset-2 outline-[var(--spruce-950)]" : ""
      }`}
    >
      <span
        className={`font-display text-sm sm:text-lg ${
          day.kind === "closed" ? "line-through" : ""
        }`}
      >
        {n}
      </span>
      <span className="text-[10px] sm:text-xs font-medium">{caption}</span>
      {day.holiday && (
        <span
          aria-hidden="true"
          className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-current"
        />
      )}
    </li>
  );
}

export default function OpeningHours({
  initialDate,
  initialTime,
}: {
  initialDate: string;
  initialTime: string;
}) {
  const [now, setNow] = useState<Now>({ date: initialDate, time: initialTime });
  // Do načtení v prohlížeči neznáme přesný čas návštěvníka — ukážeme jen
  // dnešní rozsah, ne „právě otevřeno".
  const [precise, setPrecise] = useState(false);

  useEffect(() => {
    const tick = () => {
      setNow(pragueNow());
      setPrecise(true);
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const status = statusFor(now, precise);
  const { min, max } = closingRange();
  const { y, m } = parseYmd(now.date);
  const nextMonth = m === 12 ? { y: y + 1, m: 1 } : { y, m: m + 1 };
  const months = [
    monthData(y, m, now.date, min),
    monthData(nextMonth.y, nextMonth.m, now.date, min),
  ];

  const legend = [
    {
      text: `Otevřeno do ${min}`,
      swatch: "bg-[color-mix(in_srgb,var(--spruce-700)_14%,white)]",
    },
    ...(max !== min
      ? [{ text: `Otevřeno do ${max}`, swatch: "bg-[var(--spruce-800)]" }]
      : []),
    { text: `Omezený provoz: ${LIMITED_SHORT}`, swatch: "bg-[var(--amber-300)]" },
    {
      text: "Zavřeno",
      swatch: "bg-white border border-dashed border-[var(--granite-300)]",
    },
  ];

  return (
    <section id="oteviraci-doba" aria-labelledby="oteviraci-doba-title" className="scroll-mt-24">
      <div className="bg-[var(--spruce-950)] px-6 py-14 text-[var(--snow-50)]">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow text-[var(--amber-300)]">Restaurace</p>
            <h2 id="oteviraci-doba-title" className="mt-4 text-4xl md:text-5xl">
              Otevírací doba
            </h2>
            <p
              aria-live="polite"
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-[var(--spruce-800)] px-4 py-2.5 text-base font-semibold"
            >
              <span
                aria-hidden="true"
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                  status.open ? "bg-[#8FE0A8]" : "bg-[var(--amber-300)]"
                }`}
              />
              {status.text}
            </p>
            {status.sub && (
              <p className="mt-3 text-sm text-[var(--granite-300)]">{status.sub}</p>
            )}
          </div>
          <dl className="divide-y divide-[var(--spruce-700)]">
            {weeklyRows().map((row) => (
              <div
                key={row.label}
                className="font-display flex items-baseline justify-between gap-4 py-3 text-xl md:text-2xl"
              >
                <dt>{row.label}</dt>
                <dd>{row.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            {legend.map((item) => (
              <li key={item.text} className="flex items-center gap-2">
                <span aria-hidden="true" className={`h-5 w-5 shrink-0 rounded-[3px] ${item.swatch}`} />
                {item.text}
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="mx-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--spruce-950)]"
              />
              Státní svátek, otevřeno
            </li>
          </ul>

          <div className="mt-8 grid items-start gap-6 md:grid-cols-2">
            {months.map((month) => (
              <div key={month.key} className="rounded-[4px] bg-white p-4 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-2xl">
                    {month.name} {month.year}
                  </h3>
                  <p className="text-sm font-semibold text-[var(--granite-600)]">{month.summary}</p>
                </div>

                <div
                  aria-hidden="true"
                  className="font-mono-label mt-5 grid grid-cols-7 gap-1 text-center text-[11px] text-[var(--granite-600)]"
                >
                  {WEEKDAYS.map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
                <ul className="mt-2 grid grid-cols-7 gap-1">
                  {Array.from({ length: month.offset }, (_, i) => (
                    <li key={`blank-${i}`} aria-hidden="true" />
                  ))}
                  {month.days.map((day) => (
                    <Tile key={day.date} day={day} today={now.date} minClose={month.minClose} />
                  ))}
                </ul>

                {month.notes.length > 0 && (
                  <dl className="mt-5 space-y-3 border-t border-[var(--mist-100)] pt-4 text-[15px] leading-snug">
                    {month.notes.map((note) => (
                      <div key={note.label + note.text} className="flex flex-wrap gap-x-4 gap-y-1">
                        <dt className="w-36 shrink-0 font-semibold">{note.label}</dt>
                        <dd className="min-w-0 flex-1 basis-56 text-[var(--spruce-800)]">{note.text}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-base text-[var(--spruce-800)]">
            Ve všechny ostatní dny máme otevřeno podle běžné otevírací doby. {GUEST_NOTE}
          </p>
        </div>
      </div>
    </section>
  );
}
