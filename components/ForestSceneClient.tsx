"use client";

import dynamic from "next/dynamic";

const ForestScene = dynamic(() => import("@/components/ForestScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] md:h-[560px] rounded-sm bg-[var(--mist-100)] flex items-center justify-center">
      <p className="font-mono-label text-xs text-[var(--granite-600)]">
        Načítám 3D prostředí…
      </p>
    </div>
  ),
});

export default function ForestSceneClient() {
  return <ForestScene />;
}
