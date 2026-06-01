import Link from "next/link";

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
          <Link href="/contacto" className="hover:text-yellow-300 transition-colors">Contacto</Link>
        </nav>
      </header>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, var(--north-blue) 0%, #2d5a8e 100%)" }} className="text-white py-24 px-6 text-center flex-1 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Distribuidora North Paint</h1>
        <p className="text-xl mb-2 text-blue-200">Pinturas, revestimientos y materiales de construcción</p>
        <p className="text-lg mb-10 text-blue-300">Pedí online y recibí en tu domicilio</p>
        <div className="flex gap-4 flex-wrap justify-center">
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
            { icon: "🎨", title: "Amplio Catálogo", desc: "Pinturas látex, esmaltes, impermeabilizantes, revestimientos y más." },
            { icon: "🚚", title: "Entrega a Domicilio", desc: "Llevamos tus materiales directo a la obra o tu casa." },
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

      {/* Footer */}
      <footer style={{ backgroundColor: "var(--north-blue)" }} className="text-white text-center py-6 text-sm">
        © {new Date().getFullYear()} Distribuidora North Paint — Todos los derechos reservados
      </footer>
    </main>
  );
}
