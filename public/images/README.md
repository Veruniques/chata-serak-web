# Fotky webu — kam co nahrát

Všechny fotky patří sem do `public/images/`. Doporučené názvy souborů
podle placeholderů v kódu (JPG, ideálně max ~1600 px na šířku, ~200–400 kB):

## Hero
- `hero.jpg` — hlavní fotka (už nahraná)
- `hero-360.jpg` — 360° panorama z Instax kamery (2:1, ideálně 4096×2048) → aktivuje se výměnou `<HeroPhoto />` za `<Hero360Client />` v `app/page.tsx`

## Homepage — Komu sedneme
- `karta-ubytovani.jpg`
- `karta-restaurace.jpg`
- `karta-svatby.jpg`
- `karta-skoly.jpg`

## Homepage — pivo / restaurace
- `pivo-cepovani.jpg`
- `pivo-tanky.jpg`
- `restaurace-interier.jpg`
- `terasa-vyhled.jpg`

## Ubytování
- `pokoj-1.jpg` … `pokoj-4.jpg`
- `myslivna-krb.jpg` — Myslivna, krb se sušákem na prádlo
- `sauna-1.jpg`, `sauna-2.jpg`
- `doprava-lanovka.jpg`
- `doprava-pesky.jpg`
- `doprava-kolo.jpg`

## Restaurace (stránka)
- `krb-suseni.jpg` — sušení oblečení na ramínkách nad krbem

## Skupiny & akce
- `svatba-obrad.jpg`
- `svatba-salonek.jpg`
- `svatba-interier.jpg`
- `svatba-terasa.jpg`
- `lyzak-sjezdovka.jpg`
- `lyzak-myslivna.jpg`
- `lyzak-lyzarna.jpg`

## Kontakt
- mapa se řeší Google Maps embedem, ne fotkou

Až fotky nahraješ, napiš mi — prohodím placeholdery za `<Image>` komponenty
s těmito cestami (nebo to zvládne Claude Code jedním promptem: „nahraď foto
placeholdery obrázky z public/images podle README").

## O chatě — historická galerie
- `historie-1.jpg` … `historie-6.jpg` (dobové snímky; CSS jim automaticky přidá jemný sépiový nádech)

## Hero 360° video
- video patří do `public/videos/hero-360.mp4` — export „360 Video" (equirektangulární, poměr 2:1) z Instax aplikace, NE „Reframe"
- doporučená komprese: 2560×1280 nebo 3840×1920, H.264, ~8–12 Mb/s, bez zvuku
