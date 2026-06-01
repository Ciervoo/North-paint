import Link from "next/link";

const productos = [
  { id: 1, nombre: "Pintura Látex Interior", marca: "Tersuave", precio: 12500, unidad: "20L", categoria: "Pinturas" },
  { id: 2, nombre: "Pintura Látex Exterior", marca: "Sinteplast", precio: 14800, unidad: "20L", categoria: "Pinturas" },
  { id: 3, nombre: "Esmalte Sintético", marca: "Alba", precio: 8900, unidad: "4L", categoria: "Esmaltes" },
  { id: 4, nombre: "Impermeabilizante", marca: "Plavicon", precio: 18000, unidad: "20L", categoria: "Impermeabilizantes" },
  { id: 5, nombre: "Fijador al Agua", marca: "Tersuave", precio: 6500, unidad: "10L", categoria: "Fijadores" },
  { id: 6, nombre: "Revestimiento Plástico", marca: "Revear", precio: 22000, unidad: "30kg", categoria: "Revestimientos" },
];

export default function Catalogo() {
  return (
    <main className="min-h-screen flex flex-col">
      <header style={{ backgroundColor: "var(--north-blue)" }} className="text-white py-4 px-6 flex items-center justify-between shadow-md">
        <Link href="/" className="flex items-center gap-3">
          <div style={{ backgroundColor: "var(--north-yellow)" }} className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg">N</div>
          <span className="text-xl font-bold tracking-wide">North Paint</span>
        </Link>
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/catalogo" className="text-yellow-300">Catálogo</Link>
          <Link href="/pedido" className="hover:text-yellow-300 transition-colors">Hacer Pedido</Link>
          <Link href="/contacto" className="hover:text-yellow-300 transition-colors">Contacto</Link>
        </nav>
      </header>

      <div className="max-w-5xl mx-auto w-full px-6 py-12 flex-1">
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--north-blue)" }}>Catálogo de Productos</h1>
        <p className="text-gray-500 mb-8">Seleccioná lo que necesitás y hacé tu pedido</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-white px-2 py-1 rounded-full" style={{ backgroundColor: "var(--north-blue)" }}>
                  {p.categoria}
                </span>
                <span className="text-xs text-gray-400">{p.marca}</span>
              </div>
              <div className="w-full h-24 bg-gray-50 rounded-xl flex items-center justify-center text-5xl">🎨</div>
              <h3 className="font-bold text-gray-800">{p.nombre}</h3>
              <p className="text-sm text-gray-500">Presentación: {p.unidad}</p>
              <p className="text-xl font-bold" style={{ color: "var(--north-yellow)" }}>
                ${p.precio.toLocaleString("es-AR")}
              </p>
              <Link
                href={`/pedido?producto=${encodeURIComponent(p.nombre)}`}
                style={{ backgroundColor: "var(--north-blue)" }}
                className="mt-auto text-center text-white text-sm font-semibold py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                Pedir este producto
              </Link>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ backgroundColor: "var(--north-blue)" }} className="text-white text-center py-6 text-sm">
        © {new Date().getFullYear()} Distribuidora North Paint
      </footer>
    </main>
  );
}
