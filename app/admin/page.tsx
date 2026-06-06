"use client";

import { useState, useEffect, useCallback } from "react";

type Stats = {
  visitantes: number; pageViews: number; productViews: number;
  addToCart: number; cartOpen: number; checkoutStart: number; pedidos: number;
  funnel: { visitantes: number; productView: number; cart: number; checkout: number; pedidos: number };
  dispositivos: { mobile: number; desktop: number };
  topVistos: [string, number][];
  topCarrito: [string, number][];
  diasSeries: { fecha: string; vistas: number }[];
  topPaginas: [string, number][];
};

function pct(a: number, b: number) {
  return b > 0 ? Math.round((a / b) * 100) : 0;
}

function fmt(n: number) {
  return n.toLocaleString("es-AR");
}

function BarMini({ value, max, color = "#5b8dee" }: { value: number; max: number; color?: string }) {
  const w = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ background: "#26262c", borderRadius: 4, height: 8, flex: 1 }}>
      <div style={{ width: `${w}%`, height: 8, background: color, borderRadius: 4, transition: "width 0.4s" }} />
    </div>
  );
}

function Metric({ label, value, sub, color = "#f0f0f2" }: { label: string; value: number | string; sub?: string; color?: string }) {
  return (
    <div style={{ background: "#17171a", border: "1px solid #2e2e36", borderRadius: 10, padding: "14px 16px" }}>
      <div style={{ fontSize: 10, color: "#9999aa", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color, fontFamily: "monospace" }}>{typeof value === "number" ? fmt(value) : value}</div>
      {sub && <div style={{ fontSize: 11, color: "#555566", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = useCallback(async (pwd: string) => {
    setLoading(true);
    const res = await fetch("/api/admin/stats", {
      headers: { Authorization: `Bearer ${pwd}` },
    });
    if (res.status === 401) { setError("Contraseña incorrecta"); setLoading(false); return; }
    const data = await res.json();
    setStats(data);
    setAuthed(true);
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    fetchStats(password);
  };

  // Auto-refresh cada 60s
  useEffect(() => {
    if (!authed || !password) return;
    const t = setInterval(() => fetchStats(password), 60000);
    return () => clearInterval(t);
  }, [authed, password, fetchStats]);

  const bg = "#0f0f11";
  const card = { background: "#17171a", border: "1px solid #2e2e36", borderRadius: 10 };

  if (!authed) {
    return (
      <main style={{ minHeight: "100dvh", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        <div style={{ ...card, padding: 32, width: "100%", maxWidth: 360 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <div style={{ width: 32, height: 32, background: "#f5c518", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#1a1a2e" }}>N</div>
            <div>
              <div style={{ fontWeight: 700, color: "#f0f0f2", fontSize: 15 }}>North Paint</div>
              <div style={{ fontSize: 11, color: "#555566" }}>Panel de administración</div>
            </div>
          </div>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              style={{ padding: "10px 12px", background: "#1e1e22", border: "1px solid #3a3a44", borderRadius: 8, color: "#f0f0f2", fontSize: 15, outline: "none" }}
            />
            {error && <p style={{ color: "#f87171", fontSize: 12 }}>{error}</p>}
            <button
              type="submit"
              disabled={loading}
              style={{ padding: "11px", background: "#5b8dee", border: "none", borderRadius: 8, color: "white", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
            >
              {loading ? "Cargando..." : "Entrar"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  if (!stats) return null;

  const { funnel, dispositivos, topVistos, topCarrito, diasSeries, topPaginas } = stats;
  const maxDia = Math.max(...diasSeries.map(d => d.vistas), 1);
  const maxVisto = topVistos[0]?.[1] || 1;
  const maxCarrito = topCarrito[0]?.[1] || 1;

  const PAGINAS_LABELS: Record<string, string> = {
    "/": "Inicio", "/catalogo": "Catálogo", "/checkout": "Checkout", "/pedido": "Pedido enviado"
  };

  return (
    <main style={{ minHeight: "100dvh", background: bg, color: "#f0f0f2", fontFamily: "sans-serif", padding: "20px 16px 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: "#f5c518", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#1a1a2e" }}>N</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>North Paint — Admin</div>
              <div style={{ fontSize: 11, color: "#555566" }}>Últimos 30 días · actualiza cada 60s</div>
            </div>
          </div>
          <button onClick={() => { setAuthed(false); setStats(null); }} style={{ background: "transparent", border: "1px solid #3a3a44", borderRadius: 6, color: "#9999aa", padding: "6px 12px", cursor: "pointer", fontSize: 12 }}>
            Cerrar sesión
          </button>
        </div>

        {/* Métricas principales */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 20 }}>
          <Metric label="Visitantes únicos" value={stats.visitantes} color="#5b8dee" />
          <Metric label="Páginas vistas" value={stats.pageViews} />
          <Metric label="Fichas abiertas" value={stats.productViews} color="#a78bfa" />
          <Metric label="Al carrito" value={stats.addToCart} color="#fbbf24" />
          <Metric label="Checkouts" value={stats.checkoutStart} color="#f97316" />
          <Metric label="Pedidos" value={stats.pedidos} color="#4ade80" sub={`tasa ${pct(stats.pedidos, stats.visitantes)}%`} />
        </div>

        {/* Funnel */}
        <div style={{ ...card, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#9999aa", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 16 }}>Funnel de conversión (sesiones únicas)</div>
          {[
            { label: "Visitantes", value: funnel.visitantes, color: "#5b8dee" },
            { label: "Vieron un producto", value: funnel.productView, color: "#a78bfa" },
            { label: "Agregaron al carrito", value: funnel.cart, color: "#fbbf24" },
            { label: "Llegaron al checkout", value: funnel.checkout, color: "#f97316" },
            { label: "Completaron el pedido", value: funnel.pedidos, color: "#4ade80" },
          ].map((step, i, arr) => (
            <div key={step.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ width: 130, fontSize: 12, color: "#9999aa", flexShrink: 0 }}>{step.label}</div>
              <div style={{ background: "#26262c", borderRadius: 6, height: 24, flex: 1, overflow: "hidden" }}>
                <div style={{
                  width: `${pct(step.value, funnel.visitantes)}%`,
                  height: 24, background: step.color, borderRadius: 6,
                  transition: "width 0.5s", display: "flex", alignItems: "center", paddingLeft: 8
                }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#000", whiteSpace: "nowrap" }}>
                    {fmt(step.value)}
                  </span>
                </div>
              </div>
              <div style={{ width: 44, textAlign: "right", fontSize: 12, fontFamily: "monospace", color: step.color, flexShrink: 0 }}>
                {i === 0 ? "100%" : `${pct(step.value, arr[0].value)}%`}
              </div>
            </div>
          ))}
        </div>

        {/* Gráfico por día */}
        <div style={{ ...card, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#9999aa", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 16 }}>Visitas por día</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 80 }}>
            {diasSeries.map(d => {
              const h = maxDia > 0 ? Math.max(2, Math.round((d.vistas / maxDia) * 76)) : 2;
              const isToday = d.fecha === new Date().toISOString().slice(0, 10);
              return (
                <div key={d.fecha} title={`${d.fecha}: ${d.vistas} vistas`} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", cursor: "default" }}>
                  <div style={{ width: "100%", height: h, background: isToday ? "#f5c518" : "#5b8dee", borderRadius: "3px 3px 0 0", opacity: d.vistas === 0 ? 0.2 : 1 }} />
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ fontSize: 10, color: "#555566" }}>{diasSeries[0]?.fecha.slice(5)}</span>
            <span style={{ fontSize: 10, color: "#555566" }}>{diasSeries[diasSeries.length - 1]?.fecha.slice(5)}</span>
          </div>
        </div>

        {/* Top productos */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{ ...card, padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#9999aa", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14 }}>Más vistos</div>
            {topVistos.length === 0 && <div style={{ fontSize: 12, color: "#555566" }}>Sin datos</div>}
            {topVistos.map(([nombre, cnt]) => (
              <div key={nombre} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ fontSize: 12, color: "#9999aa", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{nombre}</div>
                <BarMini value={cnt} max={maxVisto} color="#a78bfa" />
                <div style={{ fontSize: 12, fontFamily: "monospace", color: "#a78bfa", width: 28, textAlign: "right", flexShrink: 0 }}>{cnt}</div>
              </div>
            ))}
          </div>
          <div style={{ ...card, padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#9999aa", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14 }}>Más al carrito</div>
            {topCarrito.length === 0 && <div style={{ fontSize: 12, color: "#555566" }}>Sin datos</div>}
            {topCarrito.map(([nombre, cnt]) => (
              <div key={nombre} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ fontSize: 12, color: "#9999aa", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{nombre}</div>
                <BarMini value={cnt} max={maxCarrito} color="#fbbf24" />
                <div style={{ fontSize: 12, fontFamily: "monospace", color: "#fbbf24", width: 28, textAlign: "right", flexShrink: 0 }}>{cnt}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Páginas + Dispositivos */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ ...card, padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#9999aa", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14 }}>Páginas más visitadas</div>
            {topPaginas.map(([pag, cnt]) => (
              <div key={pag} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 8 }}>
                <span style={{ color: "#9999aa" }}>{PAGINAS_LABELS[pag] || pag}</span>
                <span style={{ fontFamily: "monospace", color: "#5b8dee" }}>{fmt(cnt)}</span>
              </div>
            ))}
          </div>
          <div style={{ ...card, padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#9999aa", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14 }}>Dispositivos</div>
            {[
              { label: "📱 Mobile", value: dispositivos.mobile, color: "#5b8dee" },
              { label: "🖥️ Desktop", value: dispositivos.desktop, color: "#a78bfa" },
            ].map(d => (
              <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ fontSize: 12, color: "#9999aa", width: 80, flexShrink: 0 }}>{d.label}</div>
                <BarMini value={d.value} max={Math.max(dispositivos.mobile, dispositivos.desktop, 1)} color={d.color} />
                <div style={{ fontSize: 12, fontFamily: "monospace", color: d.color, width: 50, textAlign: "right", flexShrink: 0 }}>
                  {fmt(d.value)} ({pct(d.value, dispositivos.mobile + dispositivos.desktop)}%)
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
