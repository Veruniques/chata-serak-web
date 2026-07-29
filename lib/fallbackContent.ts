/**
 * NÁHLEDOVÝ OBSAH pro stránky, které budou žít ve WordPressu.
 * Dokud není WP napojené (nebo když je nedostupné), [slug] šablona
 * vykreslí tento obsah — takže si stránky prohlédnete a doladíte texty
 * PŘED nahráním do WP. Jakmile WP poběží, jeho obsah má přednost.
 *
 * HTML níže odpovídá tomu, co pak vložíte do WP editoru.
 */

export type FallbackPage = {
  title: string;
  html: string;
};

export const FALLBACK_PAGES: Record<string, FallbackPage> = {
  "o-chate-serak": {
    title: "O chatě",
    html: `
<h2>Jedno z nejstarších turistických útočišť Jeseníků</h2>
<p>Hora Šerák (1351 m n. m.) v Hrubém Jeseníku je proslulá svou historickou kamennou Chatou Jiřího (německy Georgsschutzhaus). Ta byla postavena v roce 1888 německým turistickým spolkem a pojmenována po vratislavském kardinálovi Georgu (Jiřím) Koppovi. Dnes je jedním z nejstarších turistických útočišť v oblasti.</p>
<p>Šerák je přirozenou turistickou branou k pěším túrám na Keprník, Vozku i pro zdatnější na Praděd — a chata vítanou zastávkou před dalším putováním už více než jedno století. Původní dřevěnou stavbu v roce 1893 vypálil neznámý žhář; rok poté začala stavba kamenné chaty, dokončené v roce 1894.</p>
<p>Dnes je chata skvělým místem pro rodinné oslavy, volný víkend nebo dovolenou v partě přátel, ale i firemní semináře, workshopy, teambuilding či školní kurzy. Skvělou volbou je i pro svatbu ve výjimečném prostředí.</p>

<h2>Historie v datech</h2>
<ul>
<li><strong>1888</strong> — Moravskoslezský sudetský horský spolek (MSSGV) vybudoval původní dřevěnou chatu jako zázemí pro první turisty.</li>
<li><strong>Konec 19. století</strong> — Chata se postupně rozšiřovala, aby zvládala rostoucí zájem o pěší turistiku v drsných horských podmínkách.</li>
<li><strong>Období první republiky</strong> — Zlatý věk horského turismu. Chata nabízela komfortní zázemí s 26 pokoji a společnou noclehárnou.</li>
<li><strong>2013</strong> — Chata prošla rozsáhlou rekonstrukcí pod vedením rodiny Bořutových, která zachovala její historický ráz. Vznikly útulné 2–8lůžkové pokoje a prostorná restaurace s výhledem do údolí.</li>
</ul>

<h2>Zajímavosti o Šeráku</h2>
<ul>
<li><strong>Historická hranice</strong> — Vrchol přesně protíná někdejší zemská hranice Moravy a Slezska.</li>
<li><strong>Dostupnost</strong> — Z Ramzové vede na Šerák sedačková lanovka. Samotná chata nabízí restauraci s tradiční českou kuchyní (vyhlášené jsou borůvkové knedlíky).</li>
<li><strong>Původ názvu</strong> — V literatuře bývá často zaměňován s ledovcovým útvarem (sérak), avšak v tomto případě se jedná o původní starý lidový název pro zalesněný hřeben.</li>
</ul>
<h2>Šerák na historických fotografiích</h2>
<p>Chata na dobových snímcích — od první dřevěné stavby přes kamennou chatu arcibiskupa Koppa až po podobu, kterou znáte dnes.</p>
<div class="hist-gallery">
  <figure><img src="/images/historie-1.jpg" alt="Šerák, historická pohlednice" loading="lazy" /></figure>
  <figure><img src="/images/historie-2.jpg" alt="Interiér chaty, historická pohlednice" loading="lazy" /></figure>
  <figure><img src="/images/historie-3.jpg" alt="Šerák, 1939" loading="lazy" /></figure>
  <figure><img src="/images/historie-4.jpg" alt="Šerák, 50. léta" loading="lazy" /></figure>
</div>

<h2>Jak se k nám dostane zboží</h2>
<p>Chata leží v Chráněné krajinné oblasti Jeseníky, takže veškeré zásobování řešíme terénními auty na povolenku Lesů ČR — v zimě, když cesta zapadne sněhem, na sněžném skútru se saněmi. Chystáme krátké video „Cesta zboží na Šerák", které vám ukáže, jak náročné (a trochu dobrodružné) je udržet chatu na vrcholu zásobenou celý rok.</p>
`,
  },

  restaurace: {
    title: "Restaurace",
    html: `
<h2>Horské speciality jako na dlani</h2>
<p>Ochutnejte domácí jídla a naše tankové pivo Šerák v restauraci s výhledem na pohoří Hrubého Jeseníku. Skvěle se tu najíte a doplníte energii na další túru.</p>

<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:20px 0">
  <img src="/images/jidlo-gulas.jpg" alt="Hovězí guláš s karlovarským knedlíkem" loading="lazy" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:4px" />
  <img src="/images/jidlo-svickova.jpg" alt="Svíčková na smetaně" loading="lazy" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:4px" />
  <img src="/images/jidlo-boruvkove-knedliky.jpg" alt="Borůvkové knedlíky" loading="lazy" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:4px" />
  <img src="/images/jidlo-hermelin.jpg" alt="Smažený sýr s přílohou" loading="lazy" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:4px" />
  <img src="/images/jidlo-salat-feta.jpg" alt="Míchaný salát s fetou" loading="lazy" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:4px" />
  <img src="/images/jidlo-salat-pulled.jpg" alt="Salát s trhaným hovězím masem" loading="lazy" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:4px" />
</div>

<h2>Tankové pivo Šerák — jediné svého druhu na vrcholu hory</h2>
<p>Pivovar Holba kvůli nám nechal upravit dodávku do terénní úpravy, aby se k nám tankové pivo vůbec dostalo. Pivní trubky pravidelně čistíme a náš personál je proškolený přímo pivovarem na správné čepování — abyste na vrcholu dostali stejně poctivou dvanáctku jako dole v hospodě.</p>

<h3>Polévky</h3>
<table>
<tr><td>330 ml</td><td>Šerácký rendlík (náš vlastní recept)</td><td>110 Kč</td></tr>
<tr><td>330 ml</td><td>Hovězí vývar</td><td>100 Kč</td></tr>
<tr><td>1 ks</td><td>Pečivo</td><td>5 Kč</td></tr>
</table>

<h3>Hlavní jídla</h3>
<table>
<tr><td>180 g</td><td>Svíčková na smetaně</td><td>349 Kč</td></tr>
<tr><td>200 g</td><td>Hovězí guláš s karlovarským knedlíkem</td><td>339 Kč</td></tr>
<tr><td>200 g</td><td>Smažený vepřový řízek s přílohou</td><td>339 Kč</td></tr>
<tr><td>2 ks</td><td>Borůvkové knedlíky</td><td>249 Kč</td></tr>
</table>

<h3>Minutky</h3>
<table>
<tr><td>250 g</td><td>Míchaný salát s fetou</td><td>319 Kč</td></tr>
<tr><td></td><td>s trhaným hovězím masem</td><td>329 Kč</td></tr>
<tr><td>350 g</td><td>Smažený sýr s přílohou</td><td>269 Kč</td></tr>
</table>

<h3>Dětská jídla</h3>
<table>
<tr><td>130 g</td><td>Baby svíčková na smetaně</td><td>229 Kč</td></tr>
<tr><td>110 g</td><td>Kuřízek s bramborem</td><td>229 Kč</td></tr>
</table>

<h3>Dezert</h3>
<table>
<tr><td>1 ks</td><td>Domácí borůvkový koláč</td><td>89 Kč</td></tr>
<tr><td>1 ks</td><td>Borůvkový knedlík</td><td>125 Kč</td></tr>
</table>

<h3>Přílohy</h3>
<table>
<tr><td>1 ks</td><td>Tatarská omáčka / kečup</td><td>20 Kč</td></tr>
<tr><td>200 g</td><td>Brambory na bylinkovém másle</td><td>—</td></tr>
<tr><td>200 g</td><td>Hranolky</td><td>—</td></tr>
</table>

<h2>Přišli jste v dešti? Usušte se u krbu</h2>
<p>Pro příchozí v nepříznivém počasí máme řešení: pokud je krb zapálený, můžete si mokré věci pověsit na ramínka na sušák nad krbem a v klidu se u toho najíst. Do hor se prostě chodí za každého počasí — a my s tím počítáme.</p>
<img src="/images/myslivna-krb.jpg" alt="Krb v Myslivně" loading="lazy" style="width:100%;max-width:600px;aspect-ratio:4/3;object-fit:cover;border-radius:4px;margin:16px 0" />

<p>V sezóně vaříme i lehčí sezónní menu — ptejte se přímo v restauraci.</p>
<p>Polévky podáváme od 10:00, hlavní jídla od 11:00. Akceptujeme stravenkové karty Pluxee. Platba útraty možná přes aplikaci Qerko se slevou 5 %.</p>
<p>Mimo otevírací dobu jsou k dispozici potravinový a kávový automat.</p>
`,
  },


};
