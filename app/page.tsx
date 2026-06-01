import Link from "next/link";
import HeroWrapper from "./components/HeroWrapper";
import PromoSection from "./components/PromoSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <header style={{ backgroundColor: "var(--north-blue)" }} className="text-white py-4 px-6 flex items-center justify-between shadow-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div style={{ backgroundColor: "var(--north-yellow)" }} className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-lg shadow">N</div>
          <span className="text-xl font-black tracking-tight">North Paint</span>
        </div>
        <nav className="flex gap-6 text-sm font-semibold">
          <Link href="/catalogo" className="hover:text-yellow-300 transition-colors">Catálogo</Link>
          <Link href="/catalogo?linea=Toro" className="hover:text-yellow-300 transition-colors">Línea Toro</Link>
        </nav>
      </header>

      {/* Hero Remotion */}
      <section style={{ backgroundColor: "#0f2540" }} className="px-4 pt-8 pb-6">
        <div className="max-w-4xl mx-auto">
          <HeroWrapper />
          <div className="flex gap-4 flex-wrap justify-center mt-7">
            <Link
              href="/catalogo"
              style={{ backgroundColor: "var(--north-yellow)" }}
              className="px-8 py-3 rounded-full font-black text-white text-base shadow-lg hover:scale-105 transition-transform"
            >
              🛒 Ver Catálogo
            </Link>
            <Link
              href="/catalogo?linea=Toro"
              className="px-8 py-3 rounded-full font-black text-white text-base border-2 border-white hover:bg-white hover:text-blue-900 transition-colors"
            >
              🐂 Línea Toro
            </Link>
          </div>
        </div>
      </section>

      {/* Promociones */}
      <PromoSection />

      {/* Features */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { icon: "🎨", title: "Línea Sprint", desc: "Barnices HS/UHS, primers 2K, masillas y selladores para pintura automotriz." },
            { icon: "🐂", title: "Línea Toro", desc: "Thinner, desengrasante y diluyente en bidones de 20 litros. Calidad argentina." },
            { icon: "🚚", title: "Entrega a domicilio", desc: "Llevamos tus materiales directo al taller. Zona GBA." },
          ].map((f) => (
            <div key={f.title} className="flex flex-col items-center gap-3 p-6 rounded-2xl shadow-sm border border-gray-100 bg-white">
              <span className="text-5xl">{f.icon}</span>
              <h3 className="font-black text-lg" style={{ color: "var(--north-blue)" }}>{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section className="py-10 px-6 text-center" style={{ backgroundColor: "var(--north-blue)" }}>
        <p className="text-white font-black text-lg mb-4">¿Consultas? Escribinos</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/5491168592507"
            className="flex items-center gap-2 bg-green-500 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-green-400 transition-colors"
          >
            💬 WhatsApp: 11 6859-2507
          </a>
          <a
            href="https://instagram.com/distribuidora.northpaint"
            className="flex items-center gap-2 text-white px-6 py-2.5 rounded-full font-bold text-sm border-2 border-white hover:bg-white hover:text-blue-900 transition-colors"
          >
            📸 @distribuidora.northpaint
          </a>
        </div>
        <p className="text-blue-200 text-xs mt-4">📍 Colombres 785, M.J. Haedo, Pcia. de Bs.As.</p>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-gray-400 bg-gray-100">
        © {new Date().getFullYear()} Distribuidora North Paint — Todos los derechos reservados
      </footer>
    </main>
  );
}
