/**
 * Tenká vrstva nad WordPress REST API.
 *
 * Předpoklad: WP běží na doméně z env proměnné WORDPRESS_API_URL,
 * např. https://admin.chatanaseraku.cz (doporučuju WP přesunout na subdoménu
 * admin., ať je jasně oddělený od nové frontend domény).
 *
 * WP musí mít:
 *  - povolené REST API (výchozí stav, nic se nevypíná)
 *  - CORS hlavičku Access-Control-Allow-Origin pro doménu frontendu
 *    (přidá se pluginem "WP CORS" nebo pár řádky do functions.php)
 *  - ACF to REST API plugin, pokud budete pole spravovat přes ACF
 */

const WP_URL = process.env.WORDPRESS_API_URL;

if (!WP_URL) {
  // Necháváme jen warning, ne throw — ať build nespadne než env nastavíte.
  console.warn(
    "WORDPRESS_API_URL není nastavené. Nastavte ho v .env.local nebo ve Vercel → Settings → Environment Variables."
  );
}

export type WpPage = {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  acf?: Record<string, unknown>;
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string; alt_text?: string }[];
  };
};

async function wpFetch<T>(path: string, revalidateSeconds = 60): Promise<T> {
  // Bez nastaveného WP hned selžeme — volající spadne na fallback obsah,
  // místo aby build visel na fetchi neexistující adresy.
  if (!WP_URL) {
    throw new Error("WORDPRESS_API_URL není nastavené — používám fallback obsah.");
  }

  const res = await fetch(`${WP_URL}/wp-json${path}`, {
    // ISR: obsah se překešuje na serveru, ne na klientovi.
    // Uprav podle potřeby (0 = vždy čerstvé, vhodné třeba pro rezervace).
    next: { revalidate: revalidateSeconds },
  });

  if (!res.ok) {
    throw new Error(`WP API chyba ${res.status} na ${path}`);
  }

  return res.json();
}

/** Načte jednu stránku podle slugu, např. getPageBySlug("restaurace") */
export async function getPageBySlug(slug: string): Promise<WpPage | null> {
  const pages = await wpFetch<WpPage[]>(
    `/wp/v2/pages?slug=${encodeURIComponent(slug)}&_embed=1`
  );
  return pages[0] ?? null;
}

/** Načte všechny stránky (pro generateStaticParams / sitemapu) */
export async function getAllPages(): Promise<WpPage[]> {
  return wpFetch<WpPage[]>(`/wp/v2/pages?per_page=50&_embed=1`);
}

/** Galerie — pokud budete fotky spravovat jako media library, ne custom post type */
export async function getMediaByCategory(mediaCategorySlug: string) {
  return wpFetch<WpPage[]>(
    `/wp/v2/media?media_category_slug=${mediaCategorySlug}&per_page=100`,
    3600
  );
}
