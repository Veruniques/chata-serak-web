import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { clientIp, rateLimit } from "@/lib/rateLimit";

/**
 * Poptávkový formulář → e-mail.
 *
 * Příjemce určuje výhradně server (env INQUIRY_TO, jinak info@). Dřív ho
 * posílal prohlížeč, takže šlo přes tuhle adresu rozesílat libovolné e-maily
 * komukoli jménem chaty.
 */
const RECIPIENT = process.env.INQUIRY_TO || "info@chatanaseraku.cz";

const MAX_FIELDS = 30;
const MAX_LABEL = 120;
const MAX_VALUE = 4000;
const MAX_SUBJECT = 150;

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/;

type Field = { name?: unknown; label?: unknown; value?: unknown };

export async function POST(req: NextRequest) {
  try {
    // 5 poptávek za 10 minut z jedné adresy bohatě stačí.
    if (!rateLimit(`inquiry:${clientIp(req)}`, 5, 10 * 60_000)) {
      return NextResponse.json(
        { error: "Příliš mnoho pokusů. Zkuste to prosím za chvíli." },
        { status: 429 }
      );
    }

    const { subject, fields } = await req.json();

    if (!Array.isArray(fields) || fields.length === 0 || fields.length > MAX_FIELDS) {
      return NextResponse.json(
        { error: "Chybí data formuláře." },
        { status: 400 }
      );
    }

    const clean = (fields as Field[]).map((f) => ({
      name: typeof f.name === "string" ? f.name.slice(0, 60) : "",
      label: typeof f.label === "string" ? f.label.slice(0, MAX_LABEL) : "",
      value: typeof f.value === "string" ? f.value.slice(0, MAX_VALUE) : "",
    }));

    if (!clean.some((f) => f.value.trim())) {
      return NextResponse.json(
        { error: "Formulář je prázdný." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY není nastavené.");
      return NextResponse.json(
        { error: "E-mail se nepodařilo odeslat (chybí konfigurace serveru)." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const bodyHtml = clean
      .map(
        (f) =>
          `<p style="margin:0 0 8px"><strong>${escapeHtml(f.label)}:</strong> ${
            f.value ? escapeHtml(f.value).replace(/\n/g, "<br/>") : "—"
          }</p>`
      )
      .join("");

    const replyCandidate = clean
      .find((f) => f.name === "email" || f.label.toLowerCase().includes("e-mail"))
      ?.value.trim();
    const replyTo =
      replyCandidate && EMAIL_RE.test(replyCandidate) && replyCandidate.length <= 254
        ? replyCandidate
        : undefined;

    // Předmět bez zalomení řádků — jinak by šlo podstrčit další hlavičky.
    const safeSubject =
      (typeof subject === "string" ? subject : "")
        .replace(/[\r\n]+/g, " ")
        .trim()
        .slice(0, MAX_SUBJECT) || "Nová poptávka z webu";

    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Web chaty na Šeráku <web@chatanaseraku.cz>",
      to: RECIPIENT,
      replyTo,
      subject: safeSubject,
      html: `<div style="font-family:sans-serif">${bodyHtml}</div>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "E-mail se nepodařilo odeslat." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Inquiry route error:", err);
    return NextResponse.json(
      { error: "Nastala chyba při odesílání." },
      { status: 500 }
    );
  }
}
