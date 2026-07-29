import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

/**
 * Vzdálenější pohoří v pozadí — opakující se hřebeny, jednolitá barva
 * (v realitě vzdálené hory splývají do jednoho hazy tónu kvůli mlze).
 */
export function createRidgeGeometry({
  width = 40,
  depth = 24,
  segments = 90,
  amplitude = 3,
  seed = 1,
  ridgeSharpness = 1.4,
}: {
  width?: number;
  depth?: number;
  segments?: number;
  amplitude?: number;
  seed?: number;
  ridgeSharpness?: number;
}) {
  const geo = new THREE.PlaneGeometry(width, depth, segments, segments);
  geo.rotateX(-Math.PI / 2);

  const noise2D = createNoise2D(() => seed * 0.5187 + 0.13);
  const noise2Db = createNoise2D(() => seed * 1.913 + 0.71);

  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);

    const n1 = noise2D(x * 0.05, z * 0.09);
    const n2 = noise2Db(x * 0.12, z * 0.2) * 0.4;
    let h = n1 + n2;

    h = 1 - Math.abs(h);
    h = Math.pow(Math.max(h, 0), ridgeSharpness);

    const depthFade = 1 - Math.min(Math.max((z + depth / 2) / depth, 0), 1);
    pos.setY(i, h * amplitude * (0.4 + 0.6 * depthFade));
  }

  geo.computeVertexNormals();
  return geo;
}

/**
 * Jedna dominantní hora (kupole + detailní šum na povrchu) — hlavní "hero"
 * vrchol v popředí, jako skutečná fotka Šeráku zblízka. Na rozdíl od
 * createRidgeGeometry dělá jeden výrazný vrchol, ne opakující se hřebeny.
 */
export function createPeakGeometry({
  width = 34,
  depth = 28,
  segments = 140,
  peakHeight = 9,
  peakSpread = 7,
  seed = 1,
  roughness = 1.1,
  centerOffsetX = 0,
}: {
  width?: number;
  depth?: number;
  segments?: number;
  peakHeight?: number;
  peakSpread?: number;
  seed?: number;
  roughness?: number;
  centerOffsetX?: number;
}) {
  const geo = new THREE.PlaneGeometry(width, depth, segments, segments);
  geo.rotateX(-Math.PI / 2);

  const detailNoise = createNoise2D(() => seed * 0.371 + 0.11);
  const fineNoise = createNoise2D(() => seed * 1.77 + 0.42);

  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) - centerOffsetX;
    const z = pos.getZ(i);

    const distFromPeak = Math.sqrt(x * x + z * z * 0.7);
    // Kupole/kužel jako hlavní silueta hory.
    const dome = Math.exp(
      -(distFromPeak * distFromPeak) / (2 * peakSpread * peakSpread)
    );

    // Detailní hrubost povrchu (skalní útvary, rokle) — víc na svahu, míň nahoře.
    const n1 = detailNoise(x * 0.12, z * 0.12);
    const n2 = fineNoise(x * 0.4, z * 0.4) * 0.25;
    const surfaceDetail = (n1 + n2) * roughness * (0.3 + 0.7 * (1 - dome));

    const h = dome * peakHeight + surfaceDetail;
    pos.setY(i, Math.max(h, 0));
  }

  geo.computeVertexNormals();
  return geo;
}
