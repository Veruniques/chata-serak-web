/**
 * 360° HERO — Kuula panorama přes celou hero sekci.
 * Pod iframem leží statická hero fotka jako poster, než se panorama
 * načte (iframe je do té doby průhledný / bílý jen krátce).
 *
 * Pozn.: parametr `zoom=1` v URL znamená, že kolečko myši nad herem
 * zoomuje panorama místo scrollu stránky. Pokud to bude vadit, změň
 * v URL `zoom=1` na `zoom=0`.
 */
const KUULA_SRC =
  "https://kuula.co/share/LZcWk?logo=1&info=1&fs=1&vr=0&zoom=1&sd=1&autorotate=0.08&audio=0&thumbs=1&inst=0";

export default function HeroKuula() {
  return (
    <div className="absolute inset-0">
      {/* Poster pod panoramatem */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero.jpg)" }}
        aria-hidden="true"
      />
      <iframe
        src={KUULA_SRC}
        title="360° panorama — Chata Jiřího na Šeráku"
        className="absolute inset-0 w-full h-full block"
        frameBorder={0}
        allow="xr-spatial-tracking; gyroscope; accelerometer"
        allowFullScreen
        scrolling="no"
      />
    </div>
  );
}
