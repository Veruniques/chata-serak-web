"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

/**
 * NATIVNÍ 360° HERO — bez Kuuly, bez třetích stran.
 *
 * Očekává equirektangulární fotku (poměr 2:1) v public/images/hero-360.jpg.
 * Fotka se namapuje zevnitř koule; návštěvník se rozhlíží tažením myši
 * nebo prstu, k tomu běží pomalá auto-rotace.
 *
 * Pokud fotka chybí nebo se nenačte, hero tiše spadne na statickou
 * fotku /images/hero.jpg — nikdy se nerozbije.
 */

function PanoSphere({ src }: { src: string }) {
  const texture = useTexture(src);
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[50, 64, 48]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function Hero360({
  src = "/images/hero-360.jpg",
}: {
  src?: string;
}) {
  return (
    <div className="absolute inset-0">
      {/* Poster pod scénou — vidět při načítání i při chybě */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero.jpg)" }}
        aria-hidden="true"
      />
      <Canvas
        className="absolute inset-0"
        camera={{ position: [0, 0, 0.1], fov: 75 }}
        gl={{ antialias: true }}
        dpr={[1, 1.75]}
      >
        <Suspense fallback={null}>
          <PanoSphere src={src} />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.25}
          rotateSpeed={-0.35}
          minPolarAngle={Math.PI * 0.38}
          maxPolarAngle={Math.PI * 0.6}
        />
      </Canvas>
    </div>
  );
}
