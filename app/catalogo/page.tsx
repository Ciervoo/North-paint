"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { productos, categorias } from "../data/productos";

export default function Catalogo() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria = categoriaActiva === "Todos" || p.categoria === categoriaActiva;
    const coincideBusqueda =
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.codigo.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header style={{ backgroundColor: "var(--north-blue)" }} className="text-white py-4 px-6 flex items-center justify-between shadow-md">
        <Link href="/" className="flex items-center gap-3">
          <div style={{ backgroundColor: "var(--north-yellow)" }} className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg">N</div>
          <span className="text-xl font-bold tracking-wide">North Paint</span>
        </Link>
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/catalogo" className="text-yellow-300">Catálogo</Link>
          <Link href="/pedido" className="hover:text-yellow-300 transition-colors">Hacer Pedido</Link>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto w-full px-6 py-10 flex-1">
        <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--north-blue)" }}>Catálogo de Productos</h1>
        <p className="text-gray-500 mb-6 text-sm">Lista de precios vigente — {new Date().toLocaleDateString("es-AR")}</p>

        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar por nombre o código..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full max-w-md border border-gray-200 rounded-full px-5 py-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {/* Filtro categorías */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["Todos", ...categorias].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
              style={{
                backgroundColor: categoriaActiva === cat ? "var(--north-blue)" : "#e5e7eb",
                color: categoriaActiva === cat ? "white" : "#374151",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {productosFiltrados.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
              <div className="relative w-full h-36 bg-gray-50 rounded-xl overflow-hidden">
                <Image
                  src={p.imagen}
                  alt={p.nombre}
                  fill
                  className="object-contain p-2"
                  unoptimized
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--north-blue)" }}>
                  {p.categoria}
                </span>
                <span className="text-xs text-gray-400 font-mono">{p.codigo}</span>
              </div>
              <h3 className="font-bold text-gray-800 text-sm leading-tight">{p.nombre}</h3>
              <p className="text-xs text-gray-500">{p.descripcion}</p>
              <p className="text-xs text-gray-400">Presentación: {p.presentacion}</p>
              <p className="text-xl font-bold" style={{ color: "var(--north-yellow)" }}>
                ${p.precio.toLocaleString("es-AR")}
              </p>
              <Link
                href={`/pedido?producto=${encodeURIComponent(p.nombre)}&codigo=${p.codigo}`}
                style={{ backgroundColor: "var(--north-blue)" }}
                className="mt-auto text-center text-white text-sm font-semibold py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                Pedir este producto
              </Link>
            </div>
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <div className="text-center text-gray-400 py-16 text-lg">No se encontraron productos.</div>
        )}
      </div>

      <footer style={{ backgroundColor: "var(--north-blue)" }} className="text-white text-center py-6 text-sm">
        © {new Date().getFullYear()} Distribuidora North Paint
      </footer>
    </main>
  );
}
