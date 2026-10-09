"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

/**
 * Google Analytics 4 se souhlasem návštěvníka.
 *
 * Měřicí ID (G-XXXXXXXXXX) se bere z env proměnné NEXT_PUBLIC_GA_ID —
 * bez ní se nic nenačte ani nezobrazí. Skript Google se stáhne až po
 * kliknutí na „Souhlasím"; do té doby se neukládají žádné cookies.
 * Volbu lze kdykoli změnit odkazem „Nastavení cookies" v patičce.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const STORAGE_KEY = "serak-cookie-consent";
const OPEN_EVENT = "serak:cookie-settings";

type Consent = "granted" | "denied" | "ask" | "loading";

function readConsent(): Consent {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : "ask";
  } catch {
    return "ask";
  }
}

export function CookieSettingsButton() {
  if (!GA_ID) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className="underline underline-offset-4 hover:text-[var(--amber-300)] transition-colors"
    >
      Nastavení cookies
    </button>
  );
}

export default function Analytics() {
  const [consent, setConsent] = useState<Consent>("loading");
  // Skript necháme načtený i po pozdějším odmítnutí — jen ho vypneme.
  const [everGranted, setEverGranted] = useState(false);

  useEffect(() => {
    const load = () => {
      const stored = readConsent();
      setConsent(stored);
      if (stored === "granted") setEverGranted(true);
    };
    const reopen = () => setConsent("ask");
    load();
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  if (!GA_ID) return null;

  const choose = (value: "granted" | "denied") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Soukromé okno bez úložiště — volba platí jen pro tuto návštěvu.
    }
    // Oficiální vypínač GA: při odmítnutí přestane měřit i už načtený skript.
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] =
      value === "denied";
    if (value === "granted") setEverGranted(true);
    setConsent(value);
  };

  return (
    <>
      {everGranted && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      )}

      {consent === "ask" && (
        <div
          role="dialog"
          aria-label="Souhlas s měřením návštěvnosti"
          className="fixed bottom-24 left-4 right-4 z-[90] rounded-[4px] bg-[var(--spruce-950)] p-5 text-[var(--snow-50)] shadow-2xl sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-md"
        >
          <p className="text-sm leading-relaxed text-[var(--mist-100)]">
            Rádi bychom věděli, které stránky čtete, ať je můžeme zlepšovat.
            Použijeme k tomu Google Analytics a jeho cookies — jen pokud
            souhlasíte.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => choose("granted")}
              className="btn btn-primary btn-sm"
            >
              Souhlasím
            </button>
            <button
              type="button"
              onClick={() => choose("denied")}
              className="btn btn-ghost-light btn-sm"
            >
              Odmítnout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
