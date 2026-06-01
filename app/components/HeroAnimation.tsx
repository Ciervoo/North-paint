"use client";

import { Player } from "@remotion/player";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Lata individual que entra volando
function Lata({ x, y, delay, src, size, rotDir, frame, fps }: {
  x: number; y: number; delay: number; src: string;
  size: number; rotDir: number; frame: number; fps: number;
}) {
  const sc = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 12, stiffness: 70 } });
  const startY = y > 50 ? 420 : -80;
  const posY = interpolate(sc, [0, 1], [startY, y]);
  const rot = interpolate(frame, [delay, delay + 40], [rotDir * 25, 0], { extrapolateRight: "clamp" });
  const floatY = Math.sin((frame + delay * 7) / 20) * 6;

  return (
    <img
      src={src}
      alt=""
      style={{
        position: "absolute",
        left: x,
        top: posY + floatY,
        width: size,
        height: size,
        objectFit: "contain",
        transform: `rotate(${rot}deg)`,
        filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.5))",
        opacity: sc,
      }}
    />
  );
}

function NorthPaintHero() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSc = spring({ frame, fps, config: { damping: 12, stiffness: 90 } });
  const titleX = interpolate(frame, [8, 30], [-100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleOp = interpolate(frame, [8, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subX = interpolate(frame, [22, 44], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subOp = interpolate(frame, [22, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineW = interpolate(frame, [38, 68], [0, 280], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badgeOp = interpolate(frame, [60, 78], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badgeY = interpolate(frame, [60, 78], [25, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rot = interpolate(frame, [0, 200], [0, 20]);

  const latas = [
    { x: 28, y: 28, delay: 15, src: "https://www.icriberica.com/wp-content/uploads/2024/10/H69-5L.jpg", size: 90, rotDir: -1 },
    { x: 740, y: 18, delay: 25, src: "https://www.icriberica.com/wp-content/uploads/2024/09/H62-5L.jpg", size: 85, rotDir: 1 },
    { x: 18, y: 210, delay: 32, src: "https://www.icriberica.com/wp-content/uploads/2024/09/H67-5L.jpg", size: 80, rotDir: -1 },
    { x: 750, y: 200, delay: 20, src: "https://www.icriberica.com/wp-content/uploads/2025/07/H77-5L-159x300.png", size: 78, rotDir: 1 },
    { x: 45, y: 295, delay: 38, src: "https://www.icriberica.com/wp-content/uploads/2024/07/F56-1L.jpg", size: 68, rotDir: -1 },
    { x: 760, y: 290, delay: 42, src: "https://www.icriberica.com/wp-content/uploads/2024/10/S20.jpg", size: 65, rotDir: 1 },
  ];

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(135deg, #060f1e 0%, #0f2540 45%, #1a3a62 100%)",
      fontFamily: "Montserrat, Arial Black, sans-serif",
      overflow: "hidden",
    }}>
      {/* Gradiente radial de fondo */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 50%, rgba(245,166,35,0.08) 0%, transparent 70%)",
      }} />

      {/* Círculos decorativos */}
      <div style={{
        position: "absolute", width: 560, height: 560, borderRadius: "50%",
        border: "1px solid rgba(245,166,35,0.12)",
        top: -220, right: -160, transform: `rotate(${rot}deg)`,
      }} />
      <div style={{
        position: "absolute", width: 360, height: 360, borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.05)",
        bottom: -140, left: -100,
      }} />

      {/* Latas volando */}
      {latas.map((l, i) => (
        <Lata key={i} {...l} frame={frame} fps={fps} />
      ))}

      {/* Contenido central */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 10,
      }}>
        {/* Logo */}
        <div style={{
          transform: `scale(${logoSc})`,
          backgroundColor: "white",
          padding: "8px 18px",
          borderRadius: 12,
          marginBottom: 20,
          boxShadow: "0 0 0 6px rgba(245,166,35,0.2), 0 16px 48px rgba(0,0,0,0.5)",
        }}>
          <img src="/logo.jpg" alt="North Paint"
            style={{ height: 52, width: "auto", display: "block", objectFit: "contain" }} />
        </div>

        {/* Título */}
        <div style={{
          opacity: titleOp, transform: `translateX(${titleX}px)`,
          color: "white", fontSize: 38, fontWeight: 900,
          textAlign: "center", letterSpacing: -1.5,
          marginBottom: 6, textShadow: "0 4px 24px rgba(0,0,0,0.6)",
        }}>
          Distribuidora North Paint
        </div>

        {/* Línea dorada */}
        <div style={{
          width: lineW, height: 3,
          background: "linear-gradient(90deg, #f5a623, #ffd27f, #f5a623)",
          borderRadius: 3, marginBottom: 14,
        }} />

        {/* Subtítulo */}
        <div style={{
          opacity: subOp, transform: `translateX(${subX}px)`,
          color: "rgba(255,255,255,0.7)", fontSize: 14,
          letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 26,
        }}>
          Pinturas automotrices • Haedo, Bs. As.
        </div>

        {/* Badges */}
        <div style={{ opacity: badgeOp, transform: `translateY(${badgeY}px)`, display: "flex", gap: 10 }}>
          {[
            { label: "🎨 Línea Sprint", gold: true },
            { label: "🐂 Línea Toro", gold: false },
            { label: "🚚 Entrega GBA", gold: false },
          ].map((b) => (
            <div key={b.label} style={{
              padding: "7px 16px", borderRadius: 30, fontSize: 12, fontWeight: 800,
              backgroundColor: b.gold ? "#f5a623" : "rgba(255,255,255,0.1)",
              color: "white",
              border: b.gold ? "none" : "1.5px solid rgba(255,255,255,0.3)",
            }}>
              {b.label}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default function HeroAnimation() {
  return (
    <Player
      component={NorthPaintHero}
      durationInFrames={200}
      compositionWidth={900}
      compositionHeight={400}
      fps={30}
      style={{ width: "100%", borderRadius: 20, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}
      autoPlay loop initiallyMuted
    />
  );
}
