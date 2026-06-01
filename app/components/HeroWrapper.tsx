"use client";

import dynamic from "next/dynamic";

const HeroAnimation = dynamic(() => import("./HeroAnimation"), { ssr: false });

export default function HeroWrapper() {
  return <HeroAnimation />;
}
