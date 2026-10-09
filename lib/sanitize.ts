import sanitizeHtml from "sanitize-html";

/**
 * Obsah z WordPressu vkládáme do stránky jako HTML. Kdyby se někdo dostal do
 * WordPressu (nebo do jeho databáze), mohl by tudy na web propašovat skript.
 * Proto z obsahu necháváme jen běžné formátovací značky — žádné <script>,
 * žádné onclick/onerror atributy, žádné javascript: odkazy a iframy jen
 * z pár důvěryhodných služeb (mapy, video).
 */
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "h2", "h3", "h4", "h5", "h6", "p", "br", "hr", "blockquote",
    "strong", "b", "em", "i", "u", "s", "small", "sub", "sup", "span", "div",
    "ul", "ol", "li", "a",
    "img", "figure", "figcaption", "picture", "source",
    "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
    "iframe",
  ],
  allowedAttributes: {
    "*": ["class", "id", "style", "lang", "title"],
    a: ["href", "target", "rel"],
    img: ["src", "srcset", "sizes", "alt", "width", "height", "loading", "decoding"],
    source: ["src", "srcset", "sizes", "type", "media"],
    th: ["colspan", "rowspan", "scope"],
    td: ["colspan", "rowspan"],
    iframe: ["src", "width", "height", "allow", "allowfullscreen", "loading", "title"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["http", "https"] },
  allowProtocolRelative: false,
  allowedIframeHostnames: [
    "www.youtube.com",
    "www.youtube-nocookie.com",
    "player.vimeo.com",
    "www.google.com",
    "maps.google.com",
    "mapy.cz",
    "frame.mapy.cz",
    "kuula.co",
  ],
  // Styly jen pro rozvržení — žádné url(), expression() ani position: fixed,
  // kterým by šlo stránku překrýt cizím obsahem.
  allowedStyles: {
    "*": {
      "display": [/^(block|inline|inline-block|flex|grid|none)$/],
      "grid-template-columns": [/^[\w\s(),.%-]+$/],
      "gap": [/^[\d\s.a-z%]+$/],
      "margin": [/^[\d\s.a-z%-]+$/],
      "margin-top": [/^[\d.a-z%-]+$/],
      "margin-bottom": [/^[\d.a-z%-]+$/],
      "padding": [/^[\d\s.a-z%]+$/],
      "width": [/^[\d.a-z%]+$/],
      "max-width": [/^[\d.a-z%]+$/],
      "height": [/^[\d.a-z%]+$/],
      "aspect-ratio": [/^[\d\s./]+$/],
      "object-fit": [/^(cover|contain)$/],
      "border-radius": [/^[\d\s.a-z%]+$/],
      "text-align": [/^(left|right|center|justify)$/],
      "align-items": [/^[a-z-]+$/],
      "justify-content": [/^[a-z-]+$/],
    },
  },
  transformTags: {
    // Odkaz do nového okna nesmí dostat přístup k naší stránce.
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true),
  },
};

/** Obsah stránky z WordPressu → bezpečné HTML. */
export function sanitizeContent(html: string): string {
  return sanitizeHtml(html, OPTIONS);
}

/** Nadpis stránky: jen text a základní zvýraznění. */
export function sanitizeTitle(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ["em", "strong", "i", "b", "br", "span"],
    allowedAttributes: {},
  });
}
