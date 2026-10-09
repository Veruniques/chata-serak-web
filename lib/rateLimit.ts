import type { NextRequest } from "next/server";

/**
 * Jednoduchý limit počtu požadavků na jednu IP adresu.
 *
 * Počítadlo žije v paměti běžící instance serveru, takže není neprůstřelné
 * (na Vercelu může běžet víc instancí a po restartu se nuluje). Stačí ale na
 * to, aby šlo formulář nebo chat zneužít jen pomalu a draze. Pro tvrdší limit
 * je potřeba sdílené úložiště (Upstash, Vercel KV) nebo Vercel Firewall.
 */
const hits = new Map<string, number[]>();

export function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

/** Vrací true, pokud je požadavek v limitu `max` za `windowMs`. */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  // Občasný úklid, ať mapa neroste donekonečna.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return true;
}
