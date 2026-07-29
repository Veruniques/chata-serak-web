import { notFound } from "next/navigation";
import { getPageBySlug, getAllPages } from "@/lib/wp";
import { FALLBACK_PAGES } from "@/lib/fallbackContent";
import Reveal from "@/components/Reveal";

/**
 * Univerzální šablona pro obsahové stránky z WordPressu (O chatě,
 * Restaurace, Kontakt, Rezervace...). Obsah bere z WP podle slugu;
 * pokud WP není dostupné nebo stránku nemá, použije se náhledový
 * obsah z lib/fallbackContent.ts — díky tomu jde web prohlížet
 * a ladit texty i bez běžícího WordPressu.
 */

export async function generateStaticParams() {
  try {
    const pages = await getAllPages();
    const wpSlugs = pages.map((p) => ({ slug: p.slug }));
    const fallbackSlugs = Object.keys(FALLBACK_PAGES).map((slug) => ({ slug }));
    const merged = [...wpSlugs, ...fallbackSlugs];
    return merged.filter(
      (v, i, arr) => arr.findIndex((x) => x.slug === v.slug) === i
    );
  } catch {
    return Object.keys(FALLBACK_PAGES).map((slug) => ({ slug }));
  }
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let title: string | null = null;
  let html: string | null = null;
  let featured: { source_url: string; alt_text?: string } | undefined;

  try {
    const page = await getPageBySlug(slug);
    if (page) {
      title = page.title.rendered;
      html = page.content.rendered;
      featured = page._embedded?.["wp:featuredmedia"]?.[0];
    }
  } catch {
    // WP nedostupné — spadneme na náhledový obsah níž.
  }

  if (!html) {
    const fallback = FALLBACK_PAGES[slug];
    if (!fallback) return notFound();
    title = fallback.title;
    html = fallback.html;
  }

  return (
    <article>
      <header className="bg-[var(--mist-100)] px-6 pt-36 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1
            className="font-display text-5xl md:text-6xl text-[var(--spruce-950)]"
            dangerouslySetInnerHTML={{ __html: title ?? "" }}
          />
        </div>
      </header>

      {featured && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={featured.source_url}
          alt={featured.alt_text ?? ""}
          className="w-full max-h-[480px] object-cover"
        />
      )}

      <div className="max-w-3xl mx-auto px-6 py-16">
        <Reveal>
          <div
            className="wp-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Reveal>
      </div>
    </article>
  );
}
