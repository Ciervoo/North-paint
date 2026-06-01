"use client";

import { Player } from "@remotion/player";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

function FloatingCan({ x, y, delay, emoji, frame }: { x: number; y: number; delay: number; emoji: string; frame: number }) {
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delay);
  const sc = spring({ frame: localFrame, fps, config: { damping: 10, stiffness: 60 } });
  const floatY = Math.sin((frame + delay * 10) / 18) * 8;
  return (
    <div style={{
      position: "absolute", left: x, top: y,
      transform: `scale(${sc}) translateY(${floatY}px)`,
      fontSize: 52,
      filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.3))",
    }}>
      {emoji}
    </div>
  );
}

function NorthPaintHero() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const titleOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleX = interpolate(frame, [10, 35], [-60, 0], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: "clamp" });
  const lineWidth = interpolate(frame, [35, 65], [0, 220], { extrapolateRight: "clamp" });
  const badgeOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" });
  const badgeY = interpolate(frame, [50, 70], [20, 0], { extrapolateRight: "clamp" });

  // Fondo con partículas
  const particles = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
    x: (i * 137) % 100,
    y: (i * 89) % 100,
    size: 2 + (i % 3),
    opacity: interpolate(frame, [i * 5, i * 5 + 30], [0, 0.15], { extrapolateRight: "clamp" }),
  }));

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(135deg, #0f2540 0%, #1e3a5f 50%, #2d5a8e 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial Black, Arial, sans-serif",
      overflow: "hidden",
    }}>
      {/* Partículas de fondo */}
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.size * 4, height: p.size * 4,
          borderRadius: "50%",
          backgroundColor: "#f5a623",
          opacity: p.opacity,
        }} />
      ))}

      {/* Círculo decorativo grande */}
      <div style={{
        position: "absolute",
        width: 500, height: 500,
        borderRadius: "50%",
        border: "1px solid rgba(245,166,35,0.1)",
        top: -150, right: -150,
        transform: `rotate(${interpolate(frame, [0, 200], [0, 30])}deg)`,
      }} />
      <div style={{
        position: "absolute",
        width: 300, height: 300,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.06)",
        bottom: -100, left: -100,
      }} />

      {/* Latas flotando */}
      <FloatingCan x={30} y={30} delay={20} emoji="🎨" frame={frame} />
      <FloatingCan x={680} y={20} delay={30} emoji="🖌️" frame={frame} />
      <FloatingCan x={50} y={200} delay={40} emoji="🪣" frame={frame} />
      <FloatingCan x={700} y={220} delay={35} emoji="⚗️" frame={frame} />

      {/* Contenido central */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 10 }}>

        {/* Logo circular */}
        <div style={{
          transform: `scale(${logoScale})`,
          width: 90, height: 90,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f5a623, #e8960f)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          fontSize: 38,
          fontWeight: "900",
          color: "white",
          boxShadow: "0 0 0 6px rgba(245,166,35,0.2), 0 12px 40px rgba(245,166,35,0.35)",
          letterSpacing: -1,
        }}>
          N
        </div>

        {/* Título principal */}
        <div style={{
          opacity: titleOpacity,
          transform: `translateX(${titleX}px)`,
          color: "white",
          fontSize: 38,
          fontWeight: "900",
          textAlign: "center",
          marginBottom: 8,
          letterSpacing: -1,
          textShadow: "0 2px 20px rgba(0,0,0,0.4)",
        }}>
          Distribuidora North Paint
        </div>

        {/* Línea dorada */}
        <div style={{
          width: lineWidth,
          height: 3,
          background: "linear-gradient(90deg, #f5a623, #ffd27f)",
          borderRadius: 2,
          marginBottom: 12,
        }} />

        {/* Subtítulo */}
        <div style={{
          opacity: subtitleOpacity,
          color: "rgba(255,255,255,0.75)",
          fontSize: 16,
          textAlign: "center",
          letterSpacing: 1,
          marginBottom: 20,
        }}>
          Pinturas automotrices de alta calidad
        </div>

        {/* Badges de líneas */}
        <div style={{
          opacity: badgeOpacity,
          transform: `translateY(${badgeY}px)`,
          display: "flex",
          gap: 12,
        }}>
          {["Línea Sprint", "Línea Toro"].map((label, i) => (
            <div key={label} style={{
              padding: "6px 18px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: "bold",
              backgroundColor: i === 0 ? "#f5a623" : "rgba(255,255,255,0.12)",
              color: "white",
              border: i === 1 ? "1px solid rgba(255,255,255,0.3)" : "none",
              letterSpacing: 0.5,
            }}>
              {label}
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
      durationInFrames={150}
      compositionWidth={800}
      compositionHeight={360}
      fps={30}
      style={{ width: "100%", borderRadius: 20, overflow: "hidden" }}
      autoPlay
      loop
    />
  );
}
