"use client";

import { Player } from "@remotion/player";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Gota de pintura animada
function PaintDrop({ x, y, size, color, delay, frame, fps }: {
  x: number; y: number; size: number; color: string;
  delay: number; frame: number; fps: number;
}) {
  const sc = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 10, stiffness: 60 } });
  const floatY = Math.sin((frame + delay * 5) / 22) * 7;
  const rot = interpolate(frame, [delay, delay + 180], [0, 360], { extrapolateRight: "clamp" });

  return (
    <div style={{
      position: "absolute",
      left: x, top: y + floatY,
      width: size, height: size,
      borderRadius: "60% 40% 50% 50% / 50% 50% 40% 60%",
      background: color,
      opacity: sc * 0.85,
      transform: `scale(${sc}) rotate(${rot}deg)`,
      filter: "blur(0.5px)",
      boxShadow: `0 8px 32px ${color}66`,
    }} />
  );
}

// Círculo con borde
function Ring({ x, y, size, color, delay, frame, fps }: {
  x: number; y: number; size: number; color: string;
  delay: number; frame: number; fps: number;
}) {
  const sc = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 14, stiffness: 50 } });
  const floatY = Math.sin((frame + delay * 8) / 25) * 5;
  return (
    <div style={{
      position: "absolute",
      left: x, top: y + floatY,
      width: size, height: size,
      borderRadius: "50%",
      border: `3px solid ${color}`,
      opacity: sc * 0.5,
      transform: `scale(${sc})`,
    }} />
  );
}

function NorthPaintHero() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSc  = spring({ frame, fps, config: { damping: 12, stiffness: 90 } });
  const titleX  = interpolate(frame, [8,  30], [-100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleOp = interpolate(frame, [8,  30], [0, 1],    { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subX    = interpolate(frame, [22, 44], [100, 0],  { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subOp   = interpolate(frame, [22, 44], [0, 1],    { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineW   = interpolate(frame, [38, 68], [0, 280],  { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badgeOp = interpolate(frame, [60, 78], [0, 1],    { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badgeY  = interpolate(frame, [60, 78], [25, 0],   { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bgRot   = interpolate(frame, [0, 200], [0, 15]);

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(155deg, #060e1c 0%, #0f2540 55%, #1a3a62 100%)",
      fontFamily: "Montserrat, Arial Black, sans-serif",
      overflow: "hidden",
    }}>
      {/* Fondo con glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 55%, rgba(245,166,35,0.10) 0%, transparent 65%)",
      }} />

      {/* Anillo decorativo giratorio */}
      <div style={{
        position: "absolute", width: 580, height: 580, borderRadius: "50%",
        border: "1px solid rgba(245,166,35,0.10)",
        top: -230, right: -170,
        transform: `rotate(${bgRot}deg)`,
      }} />
      <div style={{
        position: "absolute", width: 380, height: 380, borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.04)",
        bottom: -150, left: -110,
      }} />

      {/* Gotas de pintura flotantes */}
      <PaintDrop x={30}  y={25}  size={55} color="#f5a623" delay={10} frame={frame} fps={fps} />
      <PaintDrop x={790} y={18}  size={48} color="#3b82f6" delay={22} frame={frame} fps={fps} />
      <PaintDrop x={18}  y={220} size={42} color="#f5a623" delay={35} frame={frame} fps={fps} />
      <PaintDrop x={800} y={210} size={50} color="#60a5fa" delay={18} frame={frame} fps={fps} />
      <PaintDrop x={55}  y={310} size={32} color="#fbbf24" delay={42} frame={frame} fps={fps} />
      <PaintDrop x={810} y={295} size={36} color="#93c5fd" delay={28} frame={frame} fps={fps} />

      {/* Anillos decorativos */}
      <Ring x={760} y={60}  size={80} color="#f5a623" delay={15} frame={frame} fps={fps} />
      <Ring x={20}  y={290} size={60} color="#60a5fa" delay={30} frame={frame} fps={fps} />
      <Ring x={770} y={260} size={50} color="#fbbf24" delay={40} frame={frame} fps={fps} />

      {/* Contenido central */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", zIndex: 10,
      }}>
        {/* Logo */}
        <div style={{
          transform: `scale(${logoSc})`,
          backgroundColor: "white",
          padding: "8px 18px",
          borderRadius: 12,
          marginBottom: 22,
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
            { label: "🐂 Línea Toro",   gold: false },
            { label: "🚚 Entrega GBA",  gold: false },
          ].map((b) => (
            <div key={b.label} style={{
              padding: "7px 16px", borderRadius: 30, fontSize: 12, fontWeight: 800,
              backgroundColor: b.gold ? "#f5a623" : "rgba(255,255,255,0.10)",
              color: "white",
              border: b.gold ? "none" : "1.5px solid rgba(255,255,255,0.28)",
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
