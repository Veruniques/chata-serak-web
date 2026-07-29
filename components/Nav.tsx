"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/o-chate-serak", label: "O chatě" },
  { href: "/ubytovani", label: "Ubytování" },
  { href: "/restaurace", label: "Restaurace" },
  { href: "/skupiny-a-akce", label: "Skupiny & akce" },
  { href: "/kalendar-akci", label: "Kalendář akcí" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--spruce-950)]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
          : "bg-gradient-to-b from-[var(--spruce-950)]/75 via-[var(--spruce-950)]/30 to-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-lg md:text-xl tracking-wide text-[var(--snow-50)]"
        >
          Chata Jiřího <span className="text-[var(--amber-300)]">na Šeráku</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-7 text-[0.95rem] text-[var(--mist-100)]">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="nav-link hover:text-[var(--snow-50)] transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/rezervace"
          className="hidden lg:inline-flex btn btn-primary btn-sm"
        >
          Rezervovat pobyt
        </Link>

        <button
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={open}
          className="lg:hidden text-[var(--snow-50)] p-1"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current mt-1.5 transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current mt-1.5 transition-transform duration-300 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-400 ease-out ${
          open ? "max-h-[420px]" : "max-h-0"
        } bg-[var(--spruce-950)]/98 backdrop-blur-md`}
      >
        <ul className="px-6 pb-6 pt-2 flex flex-col gap-4 text-[var(--mist-100)] text-lg">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href="/rezervace"
              className="btn btn-primary btn-md"
              onClick={() => setOpen(false)}
            >
              Rezervovat pobyt →
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
