import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/knowledgeBase";
import { pragueNow } from "@/lib/openingHours";
import { clientIp, rateLimit } from "@/lib/rateLimit";

// Chat platíme za každou zprávu. Bez limitů by šel cizí skript použít jako
// bezplatný přístup k našemu API klíči.
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 1500;

/**
 * Server route — API klíč zůstává jen na serveru, nikdy nejde do prohlížeče.
 * Nastavte ANTHROPIC_API_KEY v .env.local / Vercel env proměnných.
 * Klíč získáte na https://console.anthropic.com (Settings → API Keys).
 * Používá model claude-haiku-4-5 — rychlý a levný, dobrý na FAQ bota.
 */
export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        reply:
          "Chat asistent zatím není nastavený. Napište nám prosím přímo na info@chatanaseraku.cz.",
      },
      { status: 200 }
    );
  }

  // 20 zpráv za 10 minut z jedné adresy.
  if (!rateLimit(`chat:${clientIp(req)}`, 20, 10 * 60_000)) {
    return NextResponse.json(
      {
        reply:
          "To je na chvíli hodně zpráv. Zkuste to prosím za pár minut, nebo napište na info@chatanaseraku.cz.",
      },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  const raw: unknown = body?.messages;

  if (!Array.isArray(raw) || raw.length === 0) {
    return NextResponse.json({ error: "Chybí zpráva." }, { status: 400 });
  }

  // Bereme jen poslední část konverzace, jen role user/assistant a jen text
  // rozumné délky. Cokoli jiného (systémové instrukce, obrázky) zahodíme.
  const messages = raw
    .slice(-MAX_MESSAGES)
    .filter(
      (m): m is { role: "user" | "assistant"; content: string } =>
        !!m &&
        typeof m === "object" &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) }));

  // API vyžaduje, aby konverzace začínala i končila zprávou uživatele.
  while (messages.length && messages[0].role !== "user") messages.shift();

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "Chybí zpráva." }, { status: 400 });
  }

  const now = pragueNow();

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 500,
        // Bez dnešního data by bot neuměl odpovědět na „máte dnes otevřeno?".
        system: `${SYSTEM_PROMPT}\n\nDNEŠNÍ DATUM A ČAS NA CHATĚ: ${now.date} ${now.time}`,
        messages,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Anthropic API error:", res.status, errText);
      return NextResponse.json(
        {
          reply:
            "Omlouváme se, chat teď neodpovídá. Napište nám prosím na info@chatanaseraku.cz.",
        },
        { status: 200 }
      );
    }

    const data = await res.json();
    const reply = data.content?.find((b: { type: string }) => b.type === "text")?.text
      ?? "Omlouváme se, nerozumím. Zkuste to prosím jinak, nebo napište na info@chatanaseraku.cz.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      {
        reply:
          "Omlouváme se, chat teď neodpovídá. Napište nám prosím na info@chatanaseraku.cz.",
      },
      { status: 200 }
    );
  }
}
