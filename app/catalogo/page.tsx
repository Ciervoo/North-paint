"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion, type Variants } from "framer-motion";
import { productos, categoriasSprint, type Producto } from "../data/productos";
import AgregarCarritoBtn from "../components/AgregarCarritoBtn";
import FichaTecnicaModal from "../components/FichaTecnicaModal";

const stagger: Variants = { show: { transition: { staggerChildren: 0.07 } } };
const cardAnim: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

function CatalogoContent() {
  const searchParams = useSearchParams();
  const lineaParam = searchParams.get("linea");

  const [lineaActiva, setLineaActiva] = useState<"Sprint" | "Toro">(
    lineaParam === "Toro" ? "Toro" : "Sprint"
  );
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [fichaActiva, setFichaActiva] = useState<Producto | null>(null);

  useEffect(() => {
    if (lineaParam === "Toro") setLineaActiva("Toro");
  }, [lineaParam]);

  const productosFiltrados = productos.filter((p) => {
    if (p.linea !== lineaActiva) return false;
    const coincideCategoria = categoriaActiva === "Todos" || p.categoria === categoriaActiva;
    const coincideBusqueda =
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.codigo.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-8 flex-1">

      {/* Tabs Línea Sprint / Toro */}
      <div className="flex gap-3 mb-6">
        {(["Sprint", "Toro"] as const).map((linea) => (
          <button
            key={linea}
            onClick={() => { setLineaActiva(linea); setCategoriaActiva("Todos"); }}
            className="px-6 py-2.5 rounded-full font-black text-sm transition-all"
            style={{
              backgroundColor: lineaActiva === linea ? "var(--north-blue)" : "#e5e7eb",
              color: lineaActiva === linea ? "white" : "#374151",
              boxShadow: lineaActiva === linea ? "0 4px 12px rgba(30,58,95,0.3)" : "none",
            }}
          >
            {linea === "Sprint" ? "🎨 Línea Sprint" : "🐂 Línea Toro"}
          </button>
        ))}
      </div>

      {/* Descripción de línea */}
      {lineaActiva === "Toro" && (
        <div className="bg-red-50 border border-red-100 rounded-xl px-5 py-3 mb-6 flex items-center gap-3">
          <span className="text-2xl">🐂</span>
          <div>
            <p className="font-bold text-red-800 text-sm">Línea Toro — Producto Argentino</p>
            <p className="text-red-600 text-xs">Thinners, desengrasantes y diluyentes en bidones de 20 litros. Sin materias primas recuperadas.</p>
          </div>
        </div>
      )}

      {/* Buscador y filtros (solo Sprint) */}
      {lineaActiva === "Sprint" && (
        <>
          <input
            type="text"
            placeholder="Buscar por nombre o código..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full max-w-sm border border-gray-200 rounded-full px-5 py-2 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <div className="flex flex-wrap gap-2 mb-6">
            {["Todos", ...categoriasSprint].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
                style={{
                  backgroundColor: categoriaActiva === cat ? "var(--north-yellow)" : "#f3f4f6",
                  color: categoriaActiva === cat ? "white" : "#374151",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Grid de productos */}
      <motion.div
        className={`grid gap-5 ${lineaActiva === "Toro" ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}
        variants={stagger} initial="hidden" animate="show" key={`${lineaActiva}-${categoriaActiva}`}
      >
        {productosFiltrados.map((p) => (
          <motion.div
            key={p.id}
            variants={cardAnim}
            whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border overflow-hidden flex flex-col"
            style={{ borderColor: p.precioPromo ? "var(--north-yellow)" : "#f0f0f0", borderWidth: p.precioPromo ? 2 : 1 }}
          >
            {/* Badge promo */}
            {p.precioPromo && (
              <div className="bg-red-500 text-white text-xs font-black text-center py-1 tracking-wide">
                🔥 PROMO JUNIO — {Math.round((1 - p.precioPromo / p.precio) * 100)}% OFF
              </div>
            )}

            {/* Imagen */}
            <div className={`relative w-full bg-gray-50 ${lineaActiva === "Toro" ? "h-56" : "h-36"}`}>
              <Image
                src={p.imagen}
                alt={p.nombre}
                fill
                className="object-contain p-3"
                unoptimized
              />
            </div>

            <div className="p-4 flex flex-col gap-2 flex-1">
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-bold uppercase tracking-wide text-white px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: p.linea === "Toro" ? "#dc2626" : "var(--north-blue)" }}
                >
                  {p.categoria}
                </span>
                <span className="text-xs text-gray-400 font-mono">{p.codigo}</span>
              </div>

              <h3 className="font-bold text-gray-800 text-sm leading-tight">{p.nombre}</h3>
              <p className="text-xs text-gray-500 flex-1">{p.descripcion}</p>
              <p className="text-xs text-gray-400">Presentación: {p.presentacion}</p>

              <div className="flex flex-col">
                {p.precioPromo ? (
                  <>
                    <span className="text-xs text-gray-400 line-through">${p.precio.toLocaleString("es-AR")}</span>
                    <span className="text-xl font-black" style={{ color: "var(--north-yellow)" }}>${p.precioPromo.toLocaleString("es-AR")}</span>
                    <span className="text-xs font-bold text-green-600">PRECIO FINAL</span>
                  </>
                ) : (
                  <span className="text-xl font-black" style={{ color: "var(--north-yellow)" }}>${p.precio.toLocaleString("es-AR")}</span>
                )}
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); setFichaActiva(p); }}
                className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg text-xs font-semibold border transition-colors"
                style={{ borderColor: "var(--north-blue)", color: "var(--north-blue)", background: "transparent" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--north-blue)";
                  (e.currentTarget as HTMLButtonElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--north-blue)";
                }}
              >
                📄 Ficha técnica
              </button>
              <AgregarCarritoBtn producto={p} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {productosFiltrados.length === 0 && (
        <div className="text-center text-gray-400 py-16 text-lg">No se encontraron productos.</div>
      )}

      {fichaActiva && (
        <FichaTecnicaModal producto={fichaActiva} onClose={() => setFichaActiva(null)} />
      )}
    </div>
  );
}

export default function Catalogo() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <header style={{ backgroundColor: "var(--north-blue)" }} className="text-white py-4 px-6 flex items-center justify-between shadow-md sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.jpg" alt="North Paint" className="h-10 w-auto rounded" />
        </Link>
        <nav className="flex gap-6 text-sm font-semibold">
          <Link href="/checkout" className="hover:text-yellow-300 transition-colors">🛒 Mi pedido</Link>
        </nav>
      </header>

      <div className="px-4 py-6">
        <h1 className="text-3xl font-black text-center mb-1" style={{ color: "var(--north-blue)" }}>Catálogo de Productos</h1>
        <p className="text-gray-400 text-sm text-center mb-6">Lista de precios — Junio 2026</p>
      </div>

      <Suspense>
        <CatalogoContent />
      </Suspense>

      <footer style={{ backgroundColor: "var(--north-blue)" }} className="text-white text-center py-5 text-sm mt-8">
        © {new Date().getFullYear()} Distribuidora North Paint
      </footer>
    </main>
  );
}
