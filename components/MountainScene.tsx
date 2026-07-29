"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createPeakGeometry, createRidgeGeometry } from "@/lib/terrain";

/**
 * LETNÍ denní scéna: jasná modrá obloha, teplé slunce, jedna hlavní hora
 * s vlastním shaderem (barva podle výšky — tráva/skála, ne sníh), pár
 * měkkých mraků pod vrcholem. Realističtější přístup než ploché nízkopoly
 * vrstvy z předchozí verze — vlastní GLSL osvětlení místo meshStandardMaterial.
 */

const SKY_TOP = "#3E7CB1";
const SKY_HORIZON = "#CFE7F0";
const SUN_COLOR = "#FFF3D6";

const GRASS_LOW = "#5B7A4F";
const GRASS_HIGH = "#7C8F5A";
const ROCK_LOW = "#8C8272";
const ROCK_HIGH = "#B9AF9C";
const AMBIENT_SKY = "#BFD9E8";

// ---------- Obloha ----------
function Sky() {
  const uniforms = useMemo(
    () => ({
      topColor: { value: new THREE.Color(SKY_TOP) },
      bottomColor: { value: new THREE.Color(SKY_HORIZON) },
      offset: { value: 10 },
      exponent: { value: 0.55 },
    }),
    []
  );

  return (
    <mesh>
      <sphereGeometry args={[70, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        side={THREE.BackSide}
        depthWrite={false}
        vertexShader={`
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 topColor;
          uniform vec3 bottomColor;
          uniform float offset;
          uniform float exponent;
          varying vec3 vWorldPosition;
          void main() {
            float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
            gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
          }
        `}
      />
    </mesh>
  );
}

// ---------- Slunce (svítící kotouč + měkká záře) ----------
function makeGlowTexture(inner: string, outer = "rgba(255,255,255,0)") {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, inner);
  gradient.addColorStop(1, outer);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function Sun({ position }: { position: [number, number, number] }) {
  const glowTex = useMemo(() => makeGlowTexture("rgba(255,250,230,0.9)"), []);
  const coreTex = useMemo(() => makeGlowTexture("rgba(255,255,255,1)"), []);

  return (
    <group position={position}>
      <sprite scale={[14, 14, 1]}>
        <spriteMaterial
          map={glowTex}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.8}
        />
      </sprite>
      <sprite scale={[2.2, 2.2, 1]}>
        <spriteMaterial
          map={coreTex}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </group>
  );
}

// ---------- Mraky (měkké billboardy pod vrcholem) ----------
function CloudField({ count = 7 }: { count?: number }) {
  const tex = useMemo(() => makeGlowTexture("rgba(255,255,255,0.9)"), []);
  const group = useRef<THREE.Group>(null);

  const puffs = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (Math.random() - 0.5) * 34,
        y: -1 + Math.random() * 1.6,
        z: -2 - Math.random() * 10,
        scale: 5 + Math.random() * 6,
        speed: 0.04 + Math.random() * 0.05,
        opacity: 0.35 + Math.random() * 0.25,
      })),
    [count]
  );

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      child.position.x += puffs[i].speed * delta;
      if (child.position.x > 20) child.position.x = -20;
    });
  });

  return (
    <group ref={group}>
      {puffs.map((p, i) => (
        <sprite key={i} position={[p.x, p.y, p.z]} scale={[p.scale, p.scale * 0.55, 1]}>
          <spriteMaterial
            map={tex}
            transparent
            depthWrite={false}
            opacity={p.opacity}
          />
        </sprite>
      ))}
    </group>
  );
}

// ---------- Hlavní hora s vlastním shaderem ----------
const mountainVertexShader = `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const mountainFragmentShader = `
  uniform vec3 lightDir;
  uniform vec3 lightColor;
  uniform vec3 ambientColor;
  uniform vec3 grassLow;
  uniform vec3 grassHigh;
  uniform vec3 rockLow;
  uniform vec3 rockHigh;
  uniform float minHeight;
  uniform float maxHeight;
  uniform vec3 fogColor;
  uniform float fogNear;
  uniform float fogFar;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec3 normal = normalize(vNormal);
    float diffuse = max(dot(normal, lightDir), 0.0);

    float heightT = clamp((vWorldPosition.y - minHeight) / (maxHeight - minHeight), 0.0, 1.0);
    // Sklon svahu — strmé skalní partie mají méně "trávy".
    float slope = 1.0 - abs(normal.y);
    float rockAmount = clamp(heightT * 1.3 + slope * 0.6 - 0.15, 0.0, 1.0);

    vec3 grass = mix(grassLow, grassHigh, heightT);
    vec3 rock = mix(rockLow, rockHigh, heightT);
    vec3 baseColor = mix(grass, rock, rockAmount);

    vec3 color = ambientColor * baseColor * 0.55 + lightColor * baseColor * diffuse;

    // teplý akcent na osluněných hřebenech
    color += vec3(1.0, 0.85, 0.55) * pow(diffuse, 3.0) * 0.12;

    float fogDist = length(cameraPosition - vWorldPosition);
    float fogFactor = smoothstep(fogNear, fogFar, fogDist);
    color = mix(color, fogColor, fogFactor);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function HeroMountain() {
  const geometry = useMemo(
    () =>
      createPeakGeometry({
        width: 34,
        depth: 30,
        segments: 150,
        peakHeight: 9.5,
        peakSpread: 6.5,
        seed: 4.2,
        centerOffsetX: -2,
      }),
    []
  );

  const uniforms = useMemo(
    () => ({
      lightDir: { value: new THREE.Vector3(-0.5, 0.65, 0.4).normalize() },
      lightColor: { value: new THREE.Color(SUN_COLOR) },
      ambientColor: { value: new THREE.Color(AMBIENT_SKY) },
      grassLow: { value: new THREE.Color(GRASS_LOW) },
      grassHigh: { value: new THREE.Color(GRASS_HIGH) },
      rockLow: { value: new THREE.Color(ROCK_LOW) },
      rockHigh: { value: new THREE.Color(ROCK_HIGH) },
      minHeight: { value: 0 },
      maxHeight: { value: 9.5 },
      fogColor: { value: new THREE.Color(SKY_HORIZON) },
      fogNear: { value: 18 },
      fogFar: { value: 42 },
    }),
    []
  );

  return (
    <mesh geometry={geometry} position={[0, -2.5, -4]}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={mountainVertexShader}
        fragmentShader={mountainFragmentShader}
      />
    </mesh>
  );
}

/** Hazy vzdálené pohoří v pozadí, ať hlavní vrchol nepůsobí osaměle. */
function BackgroundRange({
  z,
  amplitude,
  seed,
  color,
  opacity,
}: {
  z: number;
  amplitude: number;
  seed: number;
  color: string;
  opacity: number;
}) {
  const geometry = useMemo(
    () =>
      createRidgeGeometry({
        width: 70,
        depth: 20,
        segments: 60,
        amplitude,
        seed,
      }),
    [amplitude, seed]
  );

  return (
    <mesh geometry={geometry} position={[0, -2.5, z]}>
      <meshStandardMaterial
        color={color}
        flatShading
        roughness={1}
        transparent
        opacity={opacity}
        fog
      />
    </mesh>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}

function useIsCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setCompact(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCompact(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return compact;
}

/** Kamera se jemně vznáší podle pozice myši. */
function ParallaxRig() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0, 2, 0));
  const reducedMotion = usePrefersReducedMotion();

  useFrame(() => {
    if (reducedMotion) return;
    const targetX = pointer.x * 1.2;
    const targetY = 2.4 + pointer.y * 0.5;
    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (targetY - camera.position.y) * 0.02;
    camera.lookAt(target.current);
  });

  return null;
}

export default function MountainScene() {
  const compact = useIsCompact();
  const snowCount = compact ? 4 : 7;

  return (
    <Canvas
      dpr={compact ? 1 : [1, 1.75]}
      camera={{ position: [0, 2.4, 16], fov: 42 }}
      gl={{ antialias: true }}
    >
      <Sky />
      <fog attach="fog" args={[SKY_HORIZON, 20, 44]} />

      <Sun position={[-9, 8, -6]} />

      <BackgroundRange z={-20} amplitude={4} seed={2.1} color="#9FB6C4" opacity={0.55} />
      <BackgroundRange z={-13} amplitude={3.2} seed={5.6} color="#82A092" opacity={0.75} />

      <HeroMountain />
      <CloudField count={snowCount} />
      <ParallaxRig />
    </Canvas>
  );
}
