"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import type { Group } from "three";

/**
 * 3D prostředí lesní mýtiny — 360° skybox z .glb souboru.
 * Kamera stojí uvnitř koule, pomalu se sama otáčí a návštěvník se může
 * rozhlížet tažením myši / prstem. Zoom je omezený, aby se nedalo
 * „vypadnout" ven ze scény.
 *
 * Druhý .glb soubor (až ho budeš mít) stačí přidat do public/models/
 * a doplnit další <ForestModel url="/models/nazev.glb" /> — nebo mezi
 * nimi přepínat.
 */

function ForestModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<Group>(null);

  // Velmi pomalá vlastní rotace scény — dýchající prostředí
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return <primitive ref={ref} object={scene} />;
}

function Loader() {
  return (
    <Html center>
      <p className="font-mono-label text-xs text-[var(--granite-600)] whitespace-nowrap">
        Načítám les…
      </p>
    </Html>
  );
}

export default function ForestScene() {
  return (
    <div className="relative w-full h-[420px] md:h-[560px] rounded-sm overflow-hidden bg-[var(--mist-100)]">
      <Canvas
        camera={{ position: [0, 0, 0.1], fov: 70 }}
        gl={{ antialias: true }}
        dpr={[1, 1.75]}
      >
        <Suspense fallback={<Loader />}>
          <ForestModel url="/models/forest_clearing.glb" />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.35}
          rotateSpeed={-0.4}
        />
      </Canvas>

      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono-label text-[10px] text-white/85 bg-[var(--spruce-800)]/55 backdrop-blur-sm rounded-full px-3.5 py-1.5 pointer-events-none">
        Rozhlédněte se — táhněte myší
      </p>
    </div>
  );
}

useGLTF.preload("/models/forest_clearing.glb");
