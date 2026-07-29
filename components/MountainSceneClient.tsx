"use client";

import dynamic from "next/dynamic";

const MountainScene = dynamic(() => import("@/components/MountainScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[var(--spruce-950)]" />,
});

export default function MountainSceneClient() {
  return <MountainScene />;
}
