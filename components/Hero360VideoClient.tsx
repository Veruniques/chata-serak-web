"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";

/**
 * Klientský wrapper pro 360° VIDEO hero.
 * - dynamic({ ssr: false }): WebGL jen v prohlížeči
 * - ErrorBoundary: když video /videos/hero-360.mp4 chybí nebo se
 *   nenačte, hero tiše spadne na statickou fotku a web jede dál
 */

const Hero360Video = dynamic(() => import("@/components/Hero360Video"), {
  ssr: false,
  loading: () => <StaticFallback />,
});

function StaticFallback() {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url(/images/hero.jpg)" }}
      aria-hidden="true"
    />
  );
}

class HeroVideoBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <StaticFallback /> : this.props.children;
  }
}

export default function Hero360VideoClient({ src }: { src?: string }) {
  return (
    <HeroVideoBoundary>
      <Hero360Video src={src} />
    </HeroVideoBoundary>
  );
}
