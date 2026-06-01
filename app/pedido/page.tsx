"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function PedidoForm() {
  const searchParams = useSearchParams();
  const productoInicial = searchParams.get("producto") || "";

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    localidad: "",
    producto: productoInicial,
    cantidad: "1",
    notas: "",
  });
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    await new Promise((r) => setTimeout(r, 1200));
    setCargando(false);
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="text-center py-16 flex flex-col items-center gap-4">
        <div className="text-6xl">✅</div>
        <h2 className="text-2xl font-bold" style={{ color: "var(--north-blue)" }}>¡Pedido recibido!</h2>
        <p className="text-gray-600 max-w-sm">
          Gracias <strong>{form.nombre}</strong>, recibimos tu pedido de <strong>{form.producto}</strong>.
          Nos comunicamos a la brevedad al <strong>{form.telefono}</strong>.
        </p>
        <Link href="/" style={{ backgroundColor: "var(--north-blue)" }} className="mt-4 px-6 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-opacity">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-xl mx-auto flex flex-col gap-5">
      <h2 className="text-xl font-bold" style={{ color: "var(--north-blue)" }}>Datos del pedido</h2>

      {[
        { label: "Nombre completo", name: "nombre", type: "text", placeholder: "Juan Pérez", required: true },
        { label: "Teléfono / WhatsApp", name: "telefono", type: "tel", placeholder: "+54 9 11 1234-5678", required: true },
        { label: "Dirección de entrega", name: "direccion", type: "text", placeholder: "Av. Siempreviva 742", required: true },
        { label: "Localidad", name: "localidad", type: "text", placeholder: "Buenos Aires", required: true },
      ].map((field) => (
        <div key={field.name} className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            value={form[field.name as keyof typeof form]}
            onChange={handleChange}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      ))}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">Producto</label>
        <input
          type="text"
          name="producto"
          placeholder="Ej: Pintura Látex Interior 20L"
          required
          value={form.producto}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">Cantidad</label>
        <input
          type="number"
          name="cantidad"
          min="1"
          value={form.cantidad}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">Notas adicionales</label>
        <textarea
          name="notas"
          placeholder="Color, marca preferida, instrucciones de entrega..."
          value={form.notas}
          onChange={handleChange}
          rows={3}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={cargando}
        style={{ backgroundColor: cargando ? "#9ca3af" : "var(--north-yellow)" }}
        className="w-full py-3 rounded-full text-white font-bold text-lg transition-colors"
      >
        {cargando ? "Enviando..." : "Confirmar Pedido"}
      </button>
    </form>
  );
}

export default function Pedido() {
  return (
    <main className="min-h-screen flex flex-col">
      <header style={{ backgroundColor: "var(--north-blue)" }} className="text-white py-4 px-6 flex items-center justify-between shadow-md">
        <Link href="/" className="flex items-center gap-3">
          <div style={{ backgroundColor: "var(--north-yellow)" }} className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg">N</div>
          <span className="text-xl font-bold tracking-wide">North Paint</span>
        </Link>
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/catalogo" className="hover:text-yellow-300 transition-colors">Catálogo</Link>
          <Link href="/pedido" className="text-yellow-300">Hacer Pedido</Link>
          <Link href="/contacto" className="hover:text-yellow-300 transition-colors">Contacto</Link>
        </nav>
      </header>

      <div className="max-w-5xl mx-auto w-full px-6 py-12 flex-1">
        <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: "var(--north-blue)" }}>Hacer un Pedido</h1>
        <p className="text-gray-500 mb-8 text-center">Completá el formulario y nos contactamos a la brevedad</p>
        <Suspense>
          <PedidoForm />
        </Suspense>
      </div>

      <footer style={{ backgroundColor: "var(--north-blue)" }} className="text-white text-center py-6 text-sm">
        © {new Date().getFullYear()} Distribuidora North Paint
      </footer>
    </main>
  );
}
