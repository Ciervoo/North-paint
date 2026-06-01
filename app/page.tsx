import Link from "next/link";
import HeroWrapper from "./components/HeroWrapper";
import PromoSection from "./components/PromoSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">

      {/* ── HEADER ─────────────────────────────────────── */}
      <header style={{ backgroundColor: "var(--north-blue)" }} className="text-white py-3 px-6 flex items-center justify-between shadow-lg sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-3">
          {/* Logo con fondo que coincide con el header — sin borde blanco */}
          <div style={{ backgroundColor: "var(--north-blue)", padding: "4px 10px", borderRadius: 8 }}
            className="flex items-center">
            <Image src="/logo.jpg" alt="North Paint" width={120} height={40}
              style={{ filter: "brightness(1.1) saturate(1.2)", objectFit: "contain" }} unoptimized />
          </div>
        </Link>
        <nav className="flex gap-5 text-sm font-bold">
          <Link href="/catalogo" className="hover:text-yellow-300 transition-colors">Catálogo</Link>
          <Link href="/catalogo?linea=Toro" className="hover:text-yellow-300 transition-colors">Línea Toro</Link>
          <Link href="/checkout" className="hover:text-yellow-300 transition-colors">🛒 Mi pedido</Link>
        </nav>
      </header>

      {/* ── HERO REMOTION ──────────────────────────────── */}
      <section style={{ backgroundColor: "#0a1f3d" }} className="px-4 pt-8 pb-10 relative overflow-hidden">
        {/* Gradiente animado de fondo */}
        <div className="absolute inset-0 opacity-20" style={{
          background: "radial-gradient(ellipse at 20% 50%, #f5a623 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, #3b82f6 0%, transparent 60%)"
        }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <HeroWrapper />
          <div className="flex gap-4 flex-wrap justify-center mt-7">
            <Link href="/catalogo" style={{ backgroundColor: "var(--north-yellow)" }}
              className="px-8 py-3.5 rounded-full font-black text-white text-base shadow-xl hover:scale-105 transition-transform">
              🛒 Ver Catálogo
            </Link>
            <Link href="/catalogo?linea=Toro"
              className="px-8 py-3.5 rounded-full font-black text-white text-base border-2 border-white hover:bg-white hover:text-blue-900 transition-colors">
              🐂 Línea Toro
            </Link>
          </div>
        </div>
      </section>

      {/* ── BANNER STATS ───────────────────────────────── */}
      <section style={{ backgroundColor: "var(--north-yellow)" }} className="py-5 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { num: "2+", label: "Años en el mercado" },
            { num: "50+", label: "Productos disponibles" },
            { num: "GBA", label: "Entrega a domicilio" },
            { num: "100%", label: "Calidad garantizada" },
          ].map(s => (
            <div key={s.label}>
              <p className="text-3xl font-black text-white">{s.num}</p>
              <p className="text-yellow-100 text-xs font-semibold">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROMO JUNIO ────────────────────────────────── */}
      <PromoSection />

      {/* ── LÍNEAS DE PRODUCTOS ────────────────────────── */}
      <section className="py-16 px-6" style={{ backgroundColor: "#0a1f3d" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center text-white mb-2">Nuestras Líneas</h2>
          <p className="text-center text-blue-300 text-sm mb-10">Productos profesionales para pintura automotriz</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Sprint */}
            <div className="rounded-2xl overflow-hidden shadow-xl group hover:scale-[1.02] transition-transform">
              <div className="relative h-48 overflow-hidden">
                <img src="https://www.icriberica.com/wp-content/uploads/2024/10/H69-5L.jpg"
                  alt="Línea Sprint" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(30,58,95,0.95) 0%, rgba(30,58,95,0.3) 100%)" }} />
                <div className="absolute bottom-4 left-5">
                  <p className="text-4xl mb-1">🎨</p>
                  <h3 className="text-2xl font-black text-white">Línea Sprint</h3>
                  <p className="text-blue-200 text-sm">Pintura automotriz profesional</p>
                </div>
              </div>
              <div className="bg-white px-6 py-5">
                <ul className="flex flex-col gap-2 text-sm text-gray-600 mb-5">
                  {["Barnices HS/UHS (H59, H62, H69, H77, H67)", "Primers 2K y aparejos", "Masillas poliéster y aluminio", "Selladores Extra Body"].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span style={{ color: "var(--north-yellow)" }} className="font-bold text-base">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/catalogo" style={{ backgroundColor: "var(--north-blue)" }}
                  className="block text-center text-white font-bold py-2.5 rounded-full hover:opacity-90 transition-opacity text-sm">
                  Ver Línea Sprint →
                </Link>
              </div>
            </div>

            {/* Toro */}
            <div className="rounded-2xl overflow-hidden shadow-xl group hover:scale-[1.02] transition-transform">
              <div className="relative h-48 overflow-hidden">
                <img src="/toro/diluyente.jpg"
                  alt="Línea Toro" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(185,28,28,0.92) 0%, rgba(185,28,28,0.2) 100%)" }} />
                <div className="absolute bottom-4 left-5">
                  <p className="text-4xl mb-1">🐂</p>
                  <h3 className="text-2xl font-black text-white">Línea Toro</h3>
                  <p className="text-red-200 text-sm">Diluyentes y solventes argentinos</p>
                </div>
              </div>
              <div className="bg-white px-6 py-5">
                <ul className="flex flex-col gap-2 text-sm text-gray-600 mb-5">
                  {["Thinner Universal 20 lt", "Desengrasante 20 lt", "Diluyente para barnices 20 lt", "Sin materias primas recuperadas"].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-red-500 font-bold text-base">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/catalogo?linea=Toro" style={{ backgroundColor: "#b91c1c" }}
                  className="block text-center text-white font-bold py-2.5 rounded-full hover:opacity-90 transition-opacity text-sm">
                  Ver Línea Toro →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTOS DESTACADOS (animated scroll) ─────── */}
      <section className="py-14 px-6 bg-gray-50 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-center mb-2" style={{ color: "var(--north-blue)" }}>Productos Destacados</h2>
          <p className="text-center text-gray-400 text-sm mb-8">Los más elegidos por los profesionales</p>
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {[
              { nombre: "H69 UHS Vantix Plus", desc: "Barniz ultra alto sólidos", img: "https://www.icriberica.com/wp-content/uploads/2024/10/H69-5L.jpg", precio: "Kit 1,5 lt — $106.150" },
              { nombre: "H62 HS Anti-Rayado", desc: "Barniz secado rápido — PROMO", img: "https://www.icriberica.com/wp-content/uploads/2024/09/H62-5L.jpg", precio: "Kit 7,5 lt — $239.000", promo: true },
              { nombre: "H77 UHS Air-Wide", desc: "Barniz de amplia ventana", img: "https://www.icriberica.com/wp-content/uploads/2025/07/H77-5L-159x300.png", precio: "Kit 1,5 lt — $89.640" },
              { nombre: "Primer F40 2K", desc: "Aparejo 5:1 profesional — PROMO", img: "https://www.icriberica.com/wp-content/uploads/2024/07/F77-1L.jpg", precio: "Kit 5 lt — $169.000", promo: true },
              { nombre: "Masilla S61", desc: "One Light amarilla", img: "https://www.icriberica.com/wp-content/uploads/2023/12/Sin-titulo-1.jpg", precio: "3 lt — $74.900", promo: true },
              { nombre: "H67 UHS GT", desc: "Alto brillo fácil aplicación", img: "https://www.icriberica.com/wp-content/uploads/2024/09/H67-5L.jpg", precio: "Kit 1,5 lt — $69.700" },
            ].map((p) => (
              <Link key={p.nombre} href="/catalogo"
                className="snap-start flex-shrink-0 w-48 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
                style={{ borderColor: p.promo ? "var(--north-yellow)" : undefined, borderWidth: p.promo ? 2 : 1 }}>
                {p.promo && <div className="bg-red-500 text-white text-xs font-black text-center py-1">🔥 PROMO</div>}
                <div className="h-32 bg-gray-50 relative">
                  <img src={p.img} alt={p.nombre} className="w-full h-full object-contain p-2" />
                </div>
                <div className="p-3">
                  <p className="font-black text-xs text-gray-800 leading-tight">{p.nombre}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.desc}</p>
                  <p className="text-xs font-bold mt-2" style={{ color: "var(--north-yellow)" }}>{p.precio}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUÉ ELEGIRNOS ──────────────────────────── */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-center mb-8" style={{ color: "var(--north-blue)" }}>¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
            {[
              { icon: "🏆", title: "Calidad garantizada", desc: "Productos de primeras marcas" },
              { icon: "🚚", title: "Entrega a domicilio", desc: "Zona GBA, rápido y seguro" },
              { icon: "💰", title: "Mejores precios", desc: "Directo del distribuidor" },
              { icon: "📱", title: "Pedido online 24hs", desc: "Sin filas, desde tu celular" },
            ].map(f => (
              <div key={f.title} className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <span className="text-4xl">{f.icon}</span>
                <p className="font-black text-sm" style={{ color: "var(--north-blue)" }}>{f.title}</p>
                <p className="text-xs text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO ───────────────────────────────────── */}
      <section className="py-12 px-6 text-center" style={{ backgroundColor: "var(--north-blue)" }}>
        <p className="text-white font-black text-2xl mb-2">¿Consultas? Escribinos</p>
        <p className="text-blue-300 text-sm mb-6">Respondemos rápido por WhatsApp</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://wa.me/5491168592507"
            className="flex items-center gap-2 bg-green-500 text-white px-7 py-3 rounded-full font-bold text-sm hover:bg-green-400 transition-colors shadow-lg">
            💬 WhatsApp: 11 6859-2507
          </a>
          <a href="https://instagram.com/distribuidora.northpaint"
            className="flex items-center gap-2 text-white px-7 py-3 rounded-full font-bold text-sm border-2 border-white hover:bg-white hover:text-blue-900 transition-colors">
            📸 @distribuidora.northpaint
          </a>
        </div>
        <p className="text-blue-300 text-xs mt-5">📍 Colombres 785, M.J. Haedo, Pcia. de Bs.As.</p>
      </section>

      <footer className="text-center py-4 text-xs text-gray-400 bg-gray-100">
        © {new Date().getFullYear()} Distribuidora North Paint — Todos los derechos reservados
      </footer>
    </main>
  );
}
