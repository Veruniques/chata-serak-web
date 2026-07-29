"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useVideoTexture } from "@react-three/drei";
import * as THREE from "three";

/**
 * NATIVNÍ 360° VIDEO HERO — bez třetích stran.
 *
 * Očekává equirektangulární 360° video (poměr stran 2:1) v
 * public/videos/hero-360.mp4 — to je výstup „360 Video" exportu
 * z Instax/Insta360 aplikace (NE „Reframe", ten dělá ploché video).
 *
 * Video hraje automaticky ve smyčce, bez zvuku (podmínka autoplay
 * v prohlížečích). Návštěvník se rozhlíží tažením myši nebo prstu,
 * k tomu běží pomalá auto-rotace.
 *
 * Pokud video chybí nebo se nenačte, hero tiše spadne na statickou
 * fotku /images/hero.jpg (řeší Hero360VideoClient).
 *
 * Video se stahuje jedním fetch requestem do paměti (blob) a teprve
 * ten se přehrává — Vercelí edge dokázal nespolehlivě (503) odpovídat
 * na drobné "range" requesty, které si běžný <video> tag posílá sám
 * při bufferování/přehrávání. Jeden velký fetch tenhle problém obchází.
 */

// Počáteční natočení panoramatu — kladná hodnota posune výchozí
// pohled DOLEVA, záporná DOPRAVA (o tolik stupňů).
const INITIAL_ROTATION_DEG = -90;
const INITIAL_ROTATION_RAD = (INITIAL_ROTATION_DEG * Math.PI) / 180;

function PanoVideoSphereInner({ src }: { src: string }) {
  const texture = useVideoTexture(src, {
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
  });
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group rotation={[0, INITIAL_ROTATION_RAD, 0]}>
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[50, 64, 48]} />
        <meshBasicMaterial
          map={texture}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function PanoVideoSphere({ src }: { src: string }) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;

    fetch(src, { cache: "force-cache" })
      .then((res) => {
        if (!res.ok) throw new Error(`Video fetch failed: ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setBlobUrl(objectUrl);
      })
      .catch(() => {
        // Necháváme prázdné — hero zůstane na statické fotce (poster).
      });

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);

  if (!blobUrl) return null;

  return <PanoVideoSphereInner src={blobUrl} />;
}

export default function Hero360Video({
  src = "/videos/hero-360.mp4",
}: {
  src?: string;
}) {
  return (
    <div className="absolute inset-0">
      {/* Poster pod scénou — vidět při načítání */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero.jpg)" }}
        aria-hidden="true"
      />
      <Canvas
        className="absolute inset-0"
        camera={{ position: [0, 0, 0.1], fov: 75 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <PanoVideoSphere src={src} />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          rotateSpeed={-0.35}
          minPolarAngle={Math.PI * 0.38}
          maxPolarAngle={Math.PI * 0.6}
        />
      </Canvas>
    </div>
  );
}
