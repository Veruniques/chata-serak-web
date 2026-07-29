"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";

/**
 * Klientský wrapper pro 360° hero.
 * - dynamic({ ssr: false }): WebGL se renderuje jen v prohlížeči
 * - ErrorBoundary: když fotka /images/hero-360.jpg chybí nebo se
 *   nenačte, hero tiše spadne na statickou fotku a web jede dál
 */

const Hero360 = dynamic(() => import("@/components/Hero360"), {
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

class Hero360Boundary extends Component<
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

export default function Hero360Client({ src }: { src?: string }) {
  return (
    <Hero360Boundary>
      <Hero360 src={src} />
    </Hero360Boundary>
  );
}
