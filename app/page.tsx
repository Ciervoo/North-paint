import Link from "next/link";
import HeroWrapper from "./components/HeroWrapper";
import PromoSection from "./components/PromoSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">

      {/* ── HEADER ─────────────────────────────────────── */}
      <header style={{ backgroundColor: "var(--north-blue)" }}
        className="text-white py-3 px-6 flex items-center justify-between shadow-lg sticky top-0 z-30 backdrop-blur">
        <Link href="/" className="flex items-center">
          <div className="bg-white rounded-lg px-3 py-1.5">
            <img src="/logo.jpg" alt="North Paint" className="h-9 w-auto object-contain" />
          </div>
        </Link>
        <nav className="flex items-center gap-4 text-sm font-bold">
          <Link href="/catalogo"
            style={{ backgroundColor: "var(--north-yellow)" }}
            className="px-5 py-2 rounded-full text-white hover:opacity-90 transition-opacity shadow">
            Ver Catálogo
          </Link>
          <Link href="/checkout" className="hover:text-yellow-300 transition-colors">
            🛒 Mi pedido
          </Link>
        </nav>
      </header>

      {/* ── HERO ───────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(160deg, #060e1c 0%, #0f2540 60%, #1a3a62 100%)" }}
        className="relative overflow-hidden px-4 pt-10 pb-12">
        {/* Glow de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #f5a623 0%, transparent 70%)", filter: "blur(60px)" }} />

        <div className="max-w-4xl mx-auto relative z-10">
          <HeroWrapper />
          <div className="flex gap-4 flex-wrap justify-center mt-8 anim-fade-up delay-300">
            <Link href="/catalogo"
              style={{ background: "linear-gradient(135deg, #f5a623, #e08b0a)" }}
              className="px-9 py-4 rounded-full font-black text-white text-base shadow-2xl hover:scale-105 hover:shadow-yellow-500/30 transition-all">
              🛒 Ver Catálogo Completo
            </Link>
            <a href="https://wa.me/5491168592507"
              className="px-9 py-4 rounded-full font-black text-white text-base border-2 border-white/40 hover:bg-white/10 transition-all backdrop-blur-sm">
              💬 Consultá por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────── */}
      <section style={{ background: "linear-gradient(90deg, #f5a623, #e08b0a)" }} className="py-5 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { num: "2+", label: "Años en el mercado" },
            { num: "50+", label: "Productos disponibles" },
            { num: "GBA", label: "Zona de entrega" },
            { num: "100%", label: "Calidad garantizada" },
          ].map((s, i) => (
            <div key={s.label} className={`anim-scale-in delay-${(i + 1) * 100}`}>
              <p className="text-3xl font-black text-white drop-shadow">{s.num}</p>
              <p className="text-yellow-100 text-xs font-semibold mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROMOS ─────────────────────────────────────── */}
      <PromoSection />

      {/* ── LÍNEAS — showcase con fotos reales ─────────── */}
      <section className="py-0" style={{ background: "#060e1c" }}>
        {/* Sprint */}
        <div className="relative overflow-hidden min-h-72 flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
          <img src="https://www.icriberica.com/wp-content/uploads/2024/10/H69-5L.jpg"
            alt="Línea Sprint"
            className="absolute right-0 top-1/2 -translate-y-1/2 h-full object-contain opacity-60"
            style={{ maxWidth: "55%" }}
          />
          <div className="relative z-20 px-8 md:px-16 py-12 max-w-lg">
            <span className="text-xs font-black uppercase tracking-widest text-yellow-400 mb-2 block">Pintura automotriz</span>
            <h2 className="text-4xl font-black text-white mb-3 leading-tight">
              🎨 Línea<br />
              <span className="shimmer-text">Sprint</span>
            </h2>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              Barnices HS/UHS, primers 2K, masillas, selladores Gladiator y acelerantes profesionales.
            </p>
            <Link href="/catalogo?linea=Sprint"
              style={{ backgroundColor: "var(--north-yellow)" }}
              className="inline-block px-7 py-3 rounded-full font-black text-white hover:scale-105 transition-transform shadow-lg">
              Ver Línea Sprint →
            </Link>
          </div>
        </div>

        {/* Toro */}
        <div className="relative overflow-hidden min-h-72 flex items-center" style={{ backgroundColor: "#1a0505" }}>
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-transparent z-10" />
          <img src="/toro/diluyente.jpg"
            alt="Línea Toro"
            className="absolute left-0 top-1/2 -translate-y-1/2 h-full object-contain opacity-70 anim-float"
            style={{ maxWidth: "50%" }}
          />
          <div className="relative z-20 px-8 md:px-16 py-12 max-w-lg ml-auto text-right">
            <span className="text-xs font-black uppercase tracking-widest text-red-400 mb-2 block">Producto argentino</span>
            <h2 className="text-4xl font-black text-white mb-3 leading-tight">
              🐂 Línea<br />
              <span style={{ color: "#ef4444" }}>Toro</span>
            </h2>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              Thinner, desengrasante y diluyente en bidones de 20 litros. Sin materias primas recuperadas.
            </p>
            <Link href="/catalogo?linea=Toro"
              style={{ backgroundColor: "#dc2626" }}
              className="inline-block px-7 py-3 rounded-full font-black text-white hover:scale-105 transition-transform shadow-lg">
              Ver Línea Toro →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRODUCTOS DESTACADOS ───────────────────────── */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 anim-fade-up">
            <h2 className="text-3xl font-black mb-1" style={{ color: "var(--north-blue)" }}>Los más elegidos</h2>
            <p className="text-gray-400 text-sm">Deslizá para ver más →</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {[
              { nombre: "H69 UHS Vantix Plus", precio: "$106.150", img: "https://www.icriberica.com/wp-content/uploads/2024/10/H69-5L.jpg", promo: false },
              { nombre: "H62 HS Anti-Rayado", precio: "$239.000", img: "https://www.icriberica.com/wp-content/uploads/2024/09/H62-5L.jpg", promo: true },
              { nombre: "H77 UHS Air-Wide", precio: "$89.640", img: "https://www.icriberica.com/wp-content/uploads/2025/07/H77-5L-159x300.png", promo: false },
              { nombre: "Primer F40 2K", precio: "$169.000", img: "https://www.icriberica.com/wp-content/uploads/2024/09/F77-1L.jpg", promo: true },
              { nombre: "Masilla S61", precio: "$74.900", img: "https://www.icriberica.com/wp-content/uploads/2024/09/SC4-ROYAL-SOFT-PUTTY-Padella.jpg", promo: true },
              { nombre: "Gladiator Black", precio: "$46.900", img: "/gladiator.jpg", promo: false },
              { nombre: "Diluyente Toro 20L", precio: "$228.000", img: "/toro/diluyente.jpg", promo: false },
              { nombre: "Desengrasante 20L", precio: "$128.000", img: "/toro/desengrasante.jpg", promo: false },
            ].map((p) => (
              <Link key={p.nombre} href="/catalogo"
                className="snap-start flex-shrink-0 w-44 bg-white rounded-2xl overflow-hidden card-hover border"
                style={{ borderColor: p.promo ? "var(--north-yellow)" : "#e5e7eb", borderWidth: p.promo ? 2 : 1 }}>
                {p.promo && (
                  <div className="bg-red-500 text-white text-xs font-black text-center py-1">🔥 PROMO</div>
                )}
                <div className="h-28 bg-gray-50 flex items-center justify-center p-2">
                  <img src={p.img} alt={p.nombre} className="h-full w-full object-contain" />
                </div>
                <div className="p-3">
                  <p className="font-black text-xs text-gray-800 leading-tight">{p.nombre}</p>
                  <p className="font-black text-sm mt-2" style={{ color: "var(--north-yellow)" }}>{p.precio}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUÉ ELEGIRNOS ──────────────────────────── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-10" style={{ color: "var(--north-blue)" }}>
            ¿Por qué elegirnos?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: "🏆", title: "Calidad", desc: "Marcas líderes del mercado" },
              { icon: "🚚", title: "Entrega GBA", desc: "Rápido y seguro a tu taller" },
              { icon: "💰", title: "Precio real", desc: "Directo del distribuidor" },
              { icon: "📱", title: "24hs online", desc: "Pedí cuando quieras" },
            ].map((f, i) => (
              <div key={f.title}
                className={`flex flex-col items-center gap-3 p-5 rounded-2xl border border-gray-100 text-center card-hover anim-fade-up delay-${(i + 1) * 100}`}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl"
                  style={{ backgroundColor: "rgba(245,166,35,0.12)" }}>
                  {f.icon}
                </div>
                <p className="font-black text-sm" style={{ color: "var(--north-blue)" }}>{f.title}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ──────────────────────────────────── */}
      <section className="py-16 px-6 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f2540 0%, #1e3a5f 50%, #25507a 100%)" }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #f5a623 0%, transparent 50%), radial-gradient(circle at 80% 50%, #60a5fa 0%, transparent 50%)" }} />

        {/* Círculos decorativos */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 w-28 h-28 rounded-full hidden md:block opacity-10 border-4 border-yellow-400" />
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full hidden md:block opacity-10 border-4 border-blue-300" />

        <div className="relative z-10 max-w-lg mx-auto">
          <p className="text-white font-black text-3xl mb-2">¿Listo para pintar?</p>
          <p className="text-blue-300 text-sm mb-8">Hacé tu pedido ahora y te contactamos a la brevedad</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalogo"
              style={{ background: "linear-gradient(135deg, #f5a623, #e08b0a)" }}
              className="px-8 py-4 rounded-full font-black text-white shadow-xl hover:scale-105 transition-transform text-base">
              🛒 Ir al Catálogo
            </Link>
            <a href="https://wa.me/5491168592507"
              className="px-8 py-4 rounded-full font-black text-white border-2 border-white/40 hover:bg-white/10 transition-all text-base">
              💬 11 6859-2507
            </a>
          </div>
          <p className="text-blue-400 text-xs mt-6">📍 Colombres 785, M.J. Haedo, Pcia. de Bs.As.</p>
        </div>
      </section>

      <footer className="text-center py-4 text-xs text-gray-400 bg-gray-100">
        © {new Date().getFullYear()} Distribuidora North Paint — Todos los derechos reservados
      </footer>
    </main>
  );
}
