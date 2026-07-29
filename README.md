# Chata na Šeráku — nový web (Next.js + WordPress headless)

## Architektura
- **WordPress** = backend: obsah stránek (Pages), media library, formuláře,
  případně napojení na Previo / Comgate. WP se nikdy nezobrazuje sám —
  slouží jen jako zdroj dat přes REST API.
- **Next.js** (tenhle projekt) = frontend, který si vibecodíte dál. Stahuje
  obsah z WP a vykresluje ho v novém designu.

## 1. Nastavení WordPressu
1. Ve WP nic nevypínejte — REST API (`/wp-json/wp/v2/...`) je zapnuté defaultně.
2. Nainstalujte plugin **WP CORS** (nebo přidejte hlavičku ručně) a povolte
   origin vaší budoucí frontend domény (`https://chatanaseraku.cz` a
   `https://*.vercel.app` pro preview nasazení).
3. Doporučuju přesunout samotný WP na subdoménu, např. `admin.chatanaseraku.cz`,
   a hlavní doménu `chatanaseraku.cz` nechat čistě pro Next.js na Vercelu.
   Předejdete tak kolizi dvou systémů na jedné doméně.
4. Stránky (Domů, O chatě, Restaurace, Skupiny & akce, Kalendář akcí,
   Kontakt) spravujte jako klasické WP **Pages** se slugy odpovídajícími odkazům
   v `components/Nav.tsx`. Rezervace a Ubytování mají v tomto projektu
   vlastní šablony (potřebují víc než jen text), obsah k nim si ale taky
   můžete tahat z WP stejným způsobem.

## 2. Lokální spuštění
```bash
npm install
cp .env.local.example .env.local
# do .env.local vyplňte WORDPRESS_API_URL
npm run dev
```
Otevřete http://localhost:3000

## 3. Nahrání na GitHub
```bash
git init
git add .
git commit -m "Init: nový web Chata na Šeráku"
gh repo create chatanaseraku-web --private --source=. --push
# nebo klasicky přes github.com -> New repository -> a git remote add + push
```

## 4. Nasazení na Vercel (doporučeno, žádná správa serveru)
1. Jděte na vercel.com → **Add New Project** → **Import Git Repository**
   → vyberte právě vytvořený GitHub repo.
2. Vercel sám pozná, že jde o Next.js — není potřeba nic nastavovat.
3. V **Environment Variables** přidejte `WORDPRESS_API_URL` se stejnou
   hodnotou jako v `.env.local`.
4. Klikněte **Deploy**. Za pár desítek vteřin dostanete URL typu
   `chatanaseraku-web.vercel.app`.
5. V **Settings → Domains** přidejte `chatanaseraku.cz` a nastavte DNS
   (Vercel vám ukáže přesné záznamy — typicky A/CNAME u vašeho registrátora domény).
6. Od té chvíle: každý `git push` do `main` = automatické nové nasazení.
   Žádné FTP, žádný ruční upload.

## Co je v projektu
- `app/page.tsx` — homepage (hero s animací hřebenu, USP, story sekce)
- `app/[slug]/page.tsx` — univerzální šablona pro obsahové stránky z WP
- `lib/wp.ts` — veškerá komunikace s WordPress REST API na jednom místě
- `components/RidgeLine.tsx` — animovaná linka hřebenu Ramzová→Šerák→Keprník
  (signature vizuální prvek, viz design tokeny níže)
- `app/globals.css` — barvy, fonty, základní styly pro obsah z WP

## Hero: skutečná fotka (Ken Burns + parallax)
Homepage hero (`components/HeroPhoto.tsx`) teď používá skutečnou fotku chaty
(`public/images/hero.jpg`) místo WebGL scény:
- **Ken Burns** — pomalé nekonečné přiblížení fotky (24s, lineární), čistě
  Framer Motion transform, žádná GPU zátěž navíc.
- **Parallax** — fotka se při scrollování hýbe pomaleji než zbytek stránky
  (`useScroll` + `useTransform` sledující pozici hero sekce).
- Vyměňte `public/images/hero.jpg` za libovolnou jinou fotku stejným
  postupem — ideálně širokoúhlá, orientovaná na výšku (portrait-friendly
  ořez), ať dobře sedí do hero formátu na mobilu i desktopu.

## WebGL hory (nepoužito, ale zachováno pro budoucí použití)
`components/MountainScene.tsx`, `MountainSceneClient.tsx` a `lib/terrain.ts`
obsahují proceduální 3D horskou scénu (shader-based, letní denní verze se
sluncem a mraky) z dřívější iterace. Aktuálně nikde není importovaná, takže
se nedostane do produkčního bundlu. Klidně ji použijte jinde — třeba jako
pozadí na 404 stránce nebo na "Co se u nás děje" pro vizualizaci tras.

Pokud budete chtít terén nahradit skutečnými výškovými daty Šeráku (ne
procedurálním šumem), stáhněte heightmapu z terrain.party nebo
opentopography.org a pošlete mi PNG — upravím `lib/terrain.ts`, aby četl
výšky z obrázku místo generoval šum.

## Struktura webu (aktualizováno)
Navigace i homepage jsou teď postavené kolem obchodních priorit:
1. Rezervace ubytování (hlavní konverzní cíl, CTA na každé obrazovce)
2. Svatby & firemní akce / Školy & skupinové výlety — `/skupiny-a-akce`,
   samostatná stránka se dvěma poptávkovými formuláři (jiná pole pro
   svatby než pro školy)
3. Akce na chatě (promítání, přednášky, kurzy) — v rámci `co-se-u-nas-deje`
4. Restaurace — tankové pivo Šerák jako hlavní odlišení, menu s cenami
5. Příběh chaty + logistika (zásobování terénními auty/skútrem v CHKO)

`/skupiny-a-akce` je jediná stránka, která NENÍ v `app/[slug]` šabloně
z WP — má vlastní `page.tsx` s formuláři, protože potřebuje interaktivitu,
kterou statický WP obsah nedá. Formuláře (`components/InquiryForm.tsx`)
zatím fungují přes `mailto:` — až budete mít e-mail/CRM řešení, nahraďte
`handleSubmit` voláním na server nebo WP endpoint (viz komentář v souboru).

## AI chat widget (FAQ asistent)
`components/ChatWidget.tsx` (plovoucí bublina vpravo dole na každé stránce)
+ `app/api/chat/route.ts` (server route) + `lib/knowledgeBase.ts` (fakta,
ze kterých bot odpovídá).

- API klíč (`ANTHROPIC_API_KEY`) nastavte v `.env.local` / Vercel env —
  bez něj widget zůstane funkční, jen se sám omezí na "napište nám e-mail".
  Klíč získáte na https://console.anthropic.com (Settings → API Keys) —
  je potřeba mít na kontě platební metodu, provoz se pak platí podle
  spotřeby (model claude-haiku-4-5 je nejlevnější a nejrychlejší, dobrý
  na FAQ bota).
- Bot odpovídá VÝHRADNĚ z `lib/knowledgeBase.ts` — když se něco změní
  (ceny, storno podmínky, otevírací doba), upravte to tam, jinak bude
  bot vědět starou informaci.
- Na cokoliv mimo znalostní bázi bot nabídne odeslání dotazu na
  info@chatanaseraku.cz — v UI je navíc vždycky vidět tlačítko
  "Poslat dotaz e-mailem", které otevře mailto: s celým přepisem chatu.
- Toto NENÍ napojené na žádnou rezervaci ani platbu — je to čistě
  informační FAQ bot, nemůže nic potvrdit ani změnit.

## Struktura webu (aktualizováno)
Navigace i homepage jsou teď postavené kolem obchodních priorit a
jedinečnosti pozice na hřebeni Jeseníků (výhled na obě strany hor):
1. Rezervace ubytování (hlavní konverzní cíl, CTA na každé obrazovce)
2. Svatby & firemní akce / Školy & skupinové výlety — `/skupiny-a-akce`,
   samostatná stránka se dvěma poptávkovými formuláři (jiná pole pro
   svatby než pro školy)
3. Kalendář akcí (promítání, přednášky, kurzy) — `/kalendar-akci`
4. Restaurace — tankové pivo Šerák jako hlavní odlišení, menu s cenami,
   otevírací doba
5. Ubytování — mega-stránka: rezervační widget, check-in/out, polopenze,
   voda a žetony, storno podmínky, galerie pokojů, sauna, doprava a
   turistické trasy
6. Příběh chaty + logistika (zásobování terénními auty/skútrem v CHKO)

`/skupiny-a-akce`, `/ubytovani` a `/kalendar-akci` NEJSOU v `app/[slug]`
šabloně z WP — mají vlastní `page.tsx`, protože potřebují interaktivitu
(formuláře, rezervační widget, seznam akcí), kterou statický WP obsah
nedá.

## Náhledy obsahu bez WordPressu
`lib/fallbackContent.ts` obsahuje texty stránek O chatě, Restaurace,
Kontakt a Rezervace. Dokud WP neběží (nebo stránku nemá), vykreslí se
tento obsah — takže celý web včetně obsahových stránek funguje lokálně
i na Vercelu hned. Texty dolaďte přímo v tom souboru; až je schválíte,
zkopírujete je do WP (stejné HTML). Jakmile WP odpoví, má přednost.

## Kam s fotkami
1. **Teď (nejjednodušší):** fotky nahrajte do `public/images/` v projektu
   (např. `public/images/pokoj-1.jpg`) a v kódu nahraďte placeholder divy
   `[foto: ...]` komponentou `<Image src="/images/pokoj-1.jpg" ... />` —
   stejně jako je udělaná hero fotka v `components/HeroPhoto.tsx`.
   Commit + push = fotky jsou na webu.
2. **Později (přes WP):** fotky nahrajete do WP Media Library a stránky
   je načtou přes REST API (featured image už šablona umí). Hodí se pro
   galerii, kterou budete často měnit bez zásahu do kódu.

## Kam s Previo embedem
Až mi pošlete embed kód z Previo administrace (Booking engine →
rezervační formulář na web), patří na dvě místa:
- `app/ubytovani/page.tsx` — sekce „Rezervace" (nahradit dashed placeholder)
- `lib/fallbackContent.ts` — stránka `rezervace` (nahradit placeholder text)
Pokud je to `<iframe>`, jde vložit rovnou; pokud `<script>`, obalí se
do malé client komponenty — pošlete kód a já to zapracuju.

## Design tokeny
- Barvy: smrková zeleň (`--spruce-*`) jako tmavý základ, jantarová (`--amber-*`)
  jako akcent (světlo z oken chaty), mlžná/sněhová jako světlé plochy.
- Písmo: Bricolage Grotesque (nadpisy — výrazný bold sans), Inter (text),
  IBM Plex Mono (čísla — nadmořské výšky, stupně piva, roky).

## WebGL hero (Three.js / React Three Fiber)
Hero sekce na homepage (`components/MountainScene.tsx`) je skutečná 3D scéna,
ne obrázek:
- 4 vrstvy nízkopolygonových hřebenů generované proceduálně (`lib/terrain.ts`,
  simplex noise + "ridge" transformace pro ostré vrcholy), s hloubkovou
  paralaxou a mlhou (`fog`) pro pocit dálky.
- Teplé nízké světlo (zapadající slunce, jantarová barva) + studené
  doplňkové světlo pro kontrast dne/noci v horách.
- Jemně padající sníh (`Points` + `useFrame`).
- Kamera se nenápadně vznáší podle pozice myši (`ParallaxRig`).
- **Výkon:** na obrazovkách do 768px se sníží hustota mřížky, počet
  sněhových částic a DPR. Respektuje `prefers-reduced-motion` (vypne
  animaci sněhu a parallax kamery).
- Načítá se přes `next/dynamic` s `ssr: false` (WebGL potřebuje prohlížeč),
  takže homepage samotná zůstává rychlá i pro SEO/first paint.

Pokud budete chtít scénu dál ladit: `LAYERS` pole v `MountainScene.tsx`
řídí barvy/hloubku/výšku jednotlivých hřebenů, `createRidgeGeometry`
v `lib/terrain.ts` řídí tvar terénu.

## Další kroky, které budete potřebovat dodělat
- **Previo rezervační widget** na `/ubytovani` — zatím jen placeholder,
  vložte embed kód z administrace Previo.
- **Skutečné fotky** — všechna místa s `[foto: ...]` jsou placeholdery
  (pokoje, restaurace, sauna, akce na chatě). Nahrazujte je stejným
  způsobem jako hero fotku (`public/images/`, `next/image`).
- **Kalendář akcí** — `EVENTS` pole v `app/kalendar-akci/page.tsx` je
  zatím ručně psané v kódu; při větším počtu akcí zvažte WP CPT.
- **ANTHROPIC_API_KEY** pro chat widget (viz sekce výše) — bez něj widget
  funguje, jen se sám omezí na odkaz na e-mail.
