"use client";

import { useEffect, useMemo, useState } from "react";
import { EVENTS, type ChataEvent } from "@/lib/events";
import styles from "./HeroEventTickets.module.css";

const MONTHS = ["led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro"];
const DAYS = ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"];

const todayInPrague = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Prague" }).format(new Date()); // YYYY-MM-DD

type Props = {
  events?: ChataEvent[];
  limit?: number;
  /** ms mezi automatickým přehozením; 0 = vypnuto */
  interval?: number;
  calendarHref?: string;
  className?: string;
};

export default function HeroEventTickets({
  events = EVENTS,
  limit = 5,
  interval = 5000,
  calendarHref = "/kalendar-akci",
  className,
}: Props) {
  // Datum řešíme až v prohlížeči — stránka je statická a jinak by ukazovala akce z doby buildu.
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(todayInPrague()), []);

  const upcoming = useMemo(() => {
    if (!today) return [];
    return events
      .filter((e) => e.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, limit);
  }, [events, limit, today]);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = upcoming.length;

  useEffect(() => {
    if (!interval || n < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % n), interval);
    return () => clearInterval(id);
  }, [interval, n, paused]);

  if (n === 0) return null;

  const go = (dir: 1 | -1) => setActive((i) => (i + dir + n) % n);

  return (
    <div
      className={`${styles.wrap} ${className ?? ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.head}>
        <p className={styles.label}>Co se chystá na chatě</p>
        {n > 1 && (
          <div className={styles.controls}>
            <button type="button" className={styles.btn} onClick={() => go(-1)} aria-label="Předchozí akce">←</button>
            <span className={styles.count} aria-live="polite">
              {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <button type="button" className={styles.btn} onClick={() => go(1)} aria-label="Další akce">→</button>
          </div>
        )}
      </div>

      <div className={styles.stack} aria-roledescription="carousel" aria-label="Nejbližší akce">
        {upcoming.map((e, i) => {
          const offset = (i - active + n) % n;
          const pos = offset < 3 ? String(offset) : "hidden";
          const d = new Date(`${e.date}T12:00:00`);
          const meta = [
            `${DAYS[d.getDay()]} ${d.getDate()}. ${d.getMonth() + 1}.`,
            e.time,
            e.price ?? e.heroNote,
          ]
            .filter(Boolean)
            .join(" · ");

          return (
            <a
              key={e.date + e.title}
              href={calendarHref}
              className={styles.ticket}
              data-pos={pos}
              aria-hidden={offset !== 0}
              tabIndex={offset === 0 ? 0 : -1}
            >
              <div className={styles.main}>
                <div className={styles.top}>
                  <span className={styles.cat}>{e.type}</span>
                  <span>Vstupenka</span>
                </div>
                <h3 className={styles.title}>{e.heroTitle ?? e.title}</h3>
                <p className={styles.meta}>{meta}</p>
                <div className={styles.foot}>
                  <span>Chata Jiřího na Šeráku</span>
                  <span className={styles.cta}>Více →</span>
                </div>
              </div>

              <div className={styles.stub} aria-hidden>
                <span className={styles.day}>{String(d.getDate()).padStart(2, "0")}</span>
                <span className={styles.mon}>{MONTHS[d.getMonth()]}</span>
                <span className={styles.wd}>{DAYS[d.getDay()].slice(0, 2)}</span>
              </div>
            </a>
          );
        })}
      </div>

    </div>
  );
}
