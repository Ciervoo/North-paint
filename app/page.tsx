import Link from "next/link";
import HeroWrapper from "./components/HeroWrapper";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <header style={{ backgroundColor: "var(--north-blue)" }} className="text-white py-4 px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div style={{ backgroundColor: "var(--north-yellow)" }} className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg">N</div>
          <span className="text-xl font-bold tracking-wide">North Paint</span>
        </div>
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/catalogo" className="hover:text-yellow-300 transition-colors">Catálogo</Link>
          <Link href="/pedido" className="hover:text-yellow-300 transition-colors">Hacer Pedido</Link>
        </nav>
      </header>

      {/* Hero con animación Remotion */}
      <section style={{ backgroundColor: "#1e3a5f" }} className="px-6 py-8">
        <HeroWrapper />
        <div className="flex gap-4 flex-wrap justify-center mt-8">
          <Link
            href="/pedido"
            style={{ backgroundColor: "var(--north-yellow)" }}
            className="px-8 py-3 rounded-full font-bold text-white text-lg shadow-lg hover:opacity-90 transition-opacity"
          >
            Hacer un Pedido
          </Link>
          <Link
            href="/catalogo"
            className="px-8 py-3 rounded-full font-bold text-white text-lg border-2 border-white hover:bg-white hover:text-blue-900 transition-colors"
          >
            Ver Catálogo
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: "🎨", title: "Pinturas Automotrices", desc: "Barnices HS/UHS, primers, masillas, selladores y diluyentes de primera calidad." },
            { icon: "🚚", title: "Entrega a Domicilio", desc: "Llevamos tus materiales directo a la obra o taller. Zona GBA." },
            { icon: "📦", title: "Pedido Online", desc: "Pedí fácil desde el celular o la computadora, sin filas." },
          ].map((f) => (
            <div key={f.title} className="flex flex-col items-center gap-3 p-6 rounded-2xl shadow-sm border border-gray-100">
              <span className="text-5xl">{f.icon}</span>
              <h3 className="font-bold text-lg" style={{ color: "var(--north-blue)" }}>{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Datos de contacto */}
      <section className="py-10 px-6 bg-gray-50 text-center">
        <p className="text-gray-600 text-sm">📍 Colombres 785, M.J. Haedo, Pcia. de Bs.As.</p>
        <p className="text-gray-600 text-sm mt-1">📱 WhatsApp: <a href="https://wa.me/5491168592507" className="underline font-medium" style={{ color: "var(--north-blue)" }}>11 6859-2507</a></p>
        <p className="text-gray-600 text-sm mt-1">📸 Instagram: <a href="https://instagram.com/distribuidora.northpaint" className="underline font-medium" style={{ color: "var(--north-blue)" }}>@distribuidora.northpaint</a></p>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "var(--north-blue)" }} className="text-white text-center py-6 text-sm">
        © {new Date().getFullYear()} Distribuidora North Paint — Todos los derechos reservados
      </footer>
    </main>
  );
}
