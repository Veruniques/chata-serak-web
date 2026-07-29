import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { recipient, subject, fields } = await req.json();

    if (!recipient || !Array.isArray(fields)) {
      return NextResponse.json(
        { error: "Chybí data formuláře." },
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

    const bodyHtml = fields
      .map(
        (f: { label: string; value: string }) =>
          `<p style="margin:0 0 8px"><strong>${f.label}:</strong> ${
            f.value ? f.value.replace(/\n/g, "<br/>") : "—"
          }</p>`
      )
      .join("");

    const replyTo = fields.find(
      (f: { name?: string; label?: string; value: string }) =>
        f.name === "email" || f.label?.toLowerCase().includes("e-mail")
    )?.value;

    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Web chaty na Šeráku <web@chatanaseraku.cz>",
      to: recipient,
      replyTo: replyTo || undefined,
      subject: subject || "Nová poptávka z webu",
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
