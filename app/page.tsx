import Link from "next/link";
import HeroWrapper from "./components/HeroWrapper";
import PromoSection from "./components/PromoSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">

      {/* ── HEADER ─────────────────────────────────────── */}
      <header style={{ backgroundColor: "var(--north-blue)" }} className="text-white py-4 px-6 flex items-center justify-between shadow-md sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <img src="/logo.jpg" alt="North Paint" className="h-10 w-auto rounded" />
        </div>
        <nav className="flex gap-5 text-sm font-bold">
          <Link href="/catalogo" className="hover:text-yellow-300 transition-colors">Catálogo</Link>
          <Link href="/catalogo?linea=Toro" className="hover:text-yellow-300 transition-colors">Línea Toro</Link>
          <Link href="/checkout" className="hover:text-yellow-300 transition-colors">🛒 Mi pedido</Link>
        </nav>
      </header>

      {/* ── HERO REMOTION ──────────────────────────────── */}
      <section style={{ backgroundColor: "#0a1f3d" }} className="px-4 pt-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <HeroWrapper />
          <div className="flex gap-4 flex-wrap justify-center mt-7">
            <Link href="/catalogo" style={{ backgroundColor: "var(--north-yellow)" }}
              className="px-8 py-3 rounded-full font-black text-white text-base shadow-lg hover:scale-105 transition-transform">
              🛒 Ver Catálogo
            </Link>
            <Link href="/catalogo?linea=Toro"
              className="px-8 py-3 rounded-full font-black text-white text-base border-2 border-white hover:bg-white hover:text-blue-900 transition-colors">
              🐂 Línea Toro
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROMO JUNIO ────────────────────────────────── */}
      <PromoSection />

      {/* ── LÍNEAS DE PRODUCTOS ────────────────────────── */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-center mb-10" style={{ color: "var(--north-blue)" }}>
            Nuestras Líneas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Sprint */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div style={{ backgroundColor: "var(--north-blue)" }} className="px-6 py-5">
                <p className="text-3xl mb-2">🎨</p>
                <h3 className="text-xl font-black text-white">Línea Sprint</h3>
                <p className="text-blue-200 text-sm mt-1">Pintura automotriz profesional</p>
              </div>
              <div className="px-6 py-5">
                <ul className="flex flex-col gap-2 text-sm text-gray-600 mb-5">
                  {["Barnices HS/UHS (H59, H62, H69, H77, H67)", "Primers 2K y aparejo", "Masillas poliéster y aluminio", "Selladores Extra Body"].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span style={{ color: "var(--north-yellow)" }} className="font-bold">✓</span> {item}
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
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div style={{ backgroundColor: "#b91c1c" }} className="px-6 py-5">
                <p className="text-3xl mb-2">🐂</p>
                <h3 className="text-xl font-black text-white">Línea Toro</h3>
                <p className="text-red-200 text-sm mt-1">Diluyentes y solventes argentinos</p>
              </div>
              <div className="px-6 py-5">
                <ul className="flex flex-col gap-2 text-sm text-gray-600 mb-5">
                  {["Thinner Universal 20 lt", "Desengrasante 20 lt", "Diluyente para barnices 20 lt", "Sin materias primas recuperadas"].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-red-500 font-bold">✓</span> {item}
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

      {/* ── POR QUÉ ELEGIRNOS ──────────────────────────── */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-center mb-8" style={{ color: "var(--north-blue)" }}>¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
            {[
              { icon: "🏆", title: "Calidad garantizada", desc: "Productos de primeras marcas" },
              { icon: "🚚", title: "Entrega a domicilio", desc: "Zona GBA, rápido y seguro" },
              { icon: "💰", title: "Mejores precios", desc: "Directamente del distribuidor" },
              { icon: "📱", title: "Pedido online", desc: "Sin filas, desde tu celular" },
            ].map(f => (
              <div key={f.title} className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-100">
                <span className="text-4xl">{f.icon}</span>
                <p className="font-black text-sm" style={{ color: "var(--north-blue)" }}>{f.title}</p>
                <p className="text-xs text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO ───────────────────────────────────── */}
      <section className="py-10 px-6 text-center" style={{ backgroundColor: "var(--north-blue)" }}>
        <p className="text-white font-black text-lg mb-4">¿Consultas? Escribinos</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://wa.me/5491168592507"
            className="flex items-center gap-2 bg-green-500 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-green-400 transition-colors">
            💬 WhatsApp: 11 6859-2507
          </a>
          <a href="https://instagram.com/distribuidora.northpaint"
            className="flex items-center gap-2 text-white px-6 py-2.5 rounded-full font-bold text-sm border-2 border-white hover:bg-white hover:text-blue-900 transition-colors">
            📸 @distribuidora.northpaint
          </a>
        </div>
        <p className="text-blue-300 text-xs mt-4">📍 Colombres 785, M.J. Haedo, Pcia. de Bs.As.</p>
      </section>

      <footer className="text-center py-4 text-xs text-gray-400 bg-gray-100">
        © {new Date().getFullYear()} Distribuidora North Paint — Todos los derechos reservados
      </footer>
    </main>
  );
}
