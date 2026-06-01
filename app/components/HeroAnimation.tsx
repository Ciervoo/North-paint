"use client";

import { Player } from "@remotion/player";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

function NorthPaintHero() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo bounce
  const logoScale = spring({ frame, fps, config: { damping: 10, stiffness: 80 } });

  // Título entra desde izquierda
  const titleX = interpolate(frame, [5, 30], [-80, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleOp = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Subtítulo entra desde derecha
  const subX = interpolate(frame, [20, 45], [80, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subOp = interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Línea dorada crece
  const lineW = interpolate(frame, [35, 65], [0, 260], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Badges suben
  const badgeY = interpolate(frame, [55, 75], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badgeOp = interpolate(frame, [55, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Partículas
  const ptOp = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" });

  // Rotación suave del círculo de fondo
  const rot = interpolate(frame, [0, 200], [0, 25]);

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(135deg, #0a1f3d 0%, #1e3a5f 55%, #25507a 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Montserrat, Arial Black, sans-serif",
      overflow: "hidden",
    }}>
      {/* Círculos decorativos */}
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        border: "1.5px solid rgba(245,166,35,0.15)",
        top: -180, right: -140,
        transform: `rotate(${rot}deg)`,
      }} />
      <div style={{
        position: "absolute", width: 320, height: 320, borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.07)",
        bottom: -120, left: -80,
      }} />

      {/* Partículas doradas */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${[15, 75, 35, 85, 10, 65][i]}%`,
          top: `${[20, 15, 70, 65, 50, 40][i]}%`,
          width: 5 + i, height: 5 + i,
          borderRadius: "50%",
          backgroundColor: "#f5a623",
          opacity: ptOp * [0.25, 0.15, 0.2, 0.18, 0.12, 0.22][i],
        }} />
      ))}

      {/* Logo oficial */}
      <div style={{
        transform: `scale(${logoScale})`,
        marginBottom: 22,
        boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "white",
        padding: "6px 12px",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.jpg" alt="North Paint" style={{ height: 64, width: "auto", display: "block" }} />
      </div>

      {/* Título */}
      <div style={{
        opacity: titleOp,
        transform: `translateX(${titleX}px)`,
        color: "white",
        fontSize: 40,
        fontWeight: 900,
        textAlign: "center",
        letterSpacing: -1.5,
        marginBottom: 6,
        textShadow: "0 4px 24px rgba(0,0,0,0.5)",
      }}>
        Distribuidora North Paint
      </div>

      {/* Línea dorada */}
      <div style={{
        width: lineW,
        height: 3,
        background: "linear-gradient(90deg, #f5a623, #ffd27f, #f5a623)",
        borderRadius: 3,
        marginBottom: 14,
      }} />

      {/* Subtítulo */}
      <div style={{
        opacity: subOp,
        transform: `translateX(${subX}px)`,
        color: "rgba(255,255,255,0.72)",
        fontSize: 15,
        letterSpacing: 2,
        textTransform: "uppercase",
        marginBottom: 28,
      }}>
        Pinturas automotrices • Haedo, Bs. As.
      </div>

      {/* Badges */}
      <div style={{
        opacity: badgeOp,
        transform: `translateY(${badgeY}px)`,
        display: "flex", gap: 12,
      }}>
        {[
          { label: "🎨 Línea Sprint", bg: "#f5a623", border: "none" },
          { label: "🐂 Línea Toro", bg: "transparent", border: "1.5px solid rgba(255,255,255,0.35)" },
          { label: "🚚 Entrega GBA", bg: "transparent", border: "1.5px solid rgba(255,255,255,0.35)" },
        ].map((b) => (
          <div key={b.label} style={{
            padding: "7px 18px", borderRadius: 30,
            fontSize: 12, fontWeight: 800,
            backgroundColor: b.bg,
            color: "white",
            border: b.border,
            letterSpacing: 0.3,
          }}>
            {b.label}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}

export default function HeroAnimation() {
  return (
    <Player
      component={NorthPaintHero}
      durationInFrames={180}
      compositionWidth={900}
      compositionHeight={380}
      fps={30}
      style={{ width: "100%", borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}
      autoPlay
      loop
      initiallyMuted
    />
  );
}
