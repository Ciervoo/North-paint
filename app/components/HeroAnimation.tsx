"use client";

import { Player } from "@remotion/player";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// ── Composición animada con Remotion ──────────────────────
function NorthPaintHero() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateRight: "clamp" });

  const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" });
  const subtitleY = interpolate(frame, [15, 40], [30, 0], { extrapolateRight: "clamp" });

  const scale = spring({ frame: frame - 5, fps, config: { damping: 12, stiffness: 80 } });

  const circle1 = interpolate(frame, [0, 60], [0, 360]);
  const circle2 = interpolate(frame, [10, 70], [0, 360]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Círculos decorativos animados */}
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          border: "3px solid rgba(245,166,35,0.3)",
          top: -80,
          right: -80,
          transform: `rotate(${circle1}deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.15)",
          bottom: -50,
          left: -50,
          transform: `rotate(${circle2}deg)`,
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${scale})`,
          width: 90,
          height: 90,
          borderRadius: "50%",
          backgroundColor: "#f5a623",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
          fontSize: 40,
          fontWeight: "bold",
          color: "white",
          boxShadow: "0 8px 32px rgba(245,166,35,0.4)",
        }}
      >
        N
      </div>

      {/* Título */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          color: "white",
          fontSize: 42,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 12,
          letterSpacing: -1,
        }}
      >
        Distribuidora North Paint
      </div>

      {/* Subtítulo */}
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          color: "rgba(255,255,255,0.75)",
          fontSize: 20,
          textAlign: "center",
        }}
      >
        Pinturas automotrices • Pedí online
      </div>

      {/* Línea decorativa */}
      <div
        style={{
          marginTop: 28,
          width: interpolate(frame, [30, 60], [0, 160], { extrapolateRight: "clamp" }),
          height: 3,
          backgroundColor: "#f5a623",
          borderRadius: 2,
        }}
      />
    </AbsoluteFill>
  );
}

// ── Componente exportable con Player ──────────────────────
export default function HeroAnimation() {
  return (
    <div className="w-full flex justify-center">
      <Player
        component={NorthPaintHero}
        durationInFrames={90}
        compositionWidth={800}
        compositionHeight={340}
        fps={30}
        style={{ width: "100%", maxWidth: 800, borderRadius: 16, overflow: "hidden" }}
        autoPlay
        loop
      />
    </div>
  );
}
