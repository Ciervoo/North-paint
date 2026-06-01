"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

export default function Checkout() {
  const { items, totalPrecio, vaciarCarrito } = useCart();

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
    localidad: "",
    notas: "",
  });
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setEstado("enviando");

    const listaProductos = items
      .map((i) => `• ${i.nombre} (${i.presentacion}) x${i.cantidad} = $${(i.precio * i.cantidad).toLocaleString("es-AR")}`)
      .join("\n");

    const templateParams = {
      cliente_nombre: form.nombre,
      cliente_telefono: form.telefono,
      cliente_email: form.email || "No indicó",
      cliente_direccion: `${form.direccion}, ${form.localidad}`,
      productos: listaProductos,
      total: `$${totalPrecio.toLocaleString("es-AR")}`,
      notas: form.notas || "Sin notas",
      to_email: "distribuidoranorthpaint@gmail.com",
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      setEstado("ok");
      vaciarCarrito();
    } catch {
      setEstado("error");
    }
  };

  if (estado === "ok") {
    return (
      <main className="min-h-screen flex flex-col">
        <header style={{ backgroundColor: "var(--north-blue)" }} className="text-white py-4 px-6 flex items-center shadow-md">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.jpg" alt="North Paint" className="h-10 w-auto rounded" />
          </Link>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 gap-4">
          <div className="text-7xl">✅</div>
          <h2 className="text-3xl font-bold" style={{ color: "var(--north-blue)" }}>¡Pedido enviado!</h2>
          <p className="text-gray-600 max-w-sm text-lg">
            Gracias <strong>{form.nombre}</strong>. Recibimos tu pedido y nos comunicamos a la brevedad al <strong>{form.telefono}</strong>.
          </p>
          <Link href="/catalogo" style={{ backgroundColor: "var(--north-blue)" }} className="mt-4 px-8 py-3 rounded-full text-white font-bold hover:opacity-90 transition-opacity">
            Seguir comprando
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header style={{ backgroundColor: "var(--north-blue)" }} className="text-white py-4 px-6 flex items-center justify-between shadow-md">
        <Link href="/" className="flex items-center gap-3">
          <div style={{ backgroundColor: "var(--north-yellow)" }} className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg">N</div>
          <span className="text-xl font-bold tracking-wide">North Paint</span>
        </Link>
        <Link href="/catalogo" className="text-sm hover:text-yellow-300 transition-colors">← Seguir comprando</Link>
      </header>

      <div className="max-w-4xl mx-auto w-full px-4 py-10 flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Resumen del pedido */}
        <div>
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--north-blue)" }}>Tu pedido</h2>
          {items.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center text-gray-400 border border-gray-100">
              <p className="text-3xl mb-2">🛒</p>
              <p>No tenés productos en el carrito.</p>
              <Link href="/catalogo" className="underline text-sm mt-2 block" style={{ color: "var(--north-blue)" }}>
                Ver catálogo
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center px-4 py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{item.nombre}</p>
                    <p className="text-xs text-gray-400">{item.presentacion} × {item.cantidad}</p>
                  </div>
                  <p className="font-bold text-sm" style={{ color: "var(--north-yellow)" }}>
                    ${(item.precio * item.cantidad).toLocaleString("es-AR")}
                  </p>
                </div>
              ))}
              <div className="px-4 py-3 flex justify-between font-bold text-lg border-t border-gray-100">
                <span>Total</span>
                <span style={{ color: "var(--north-yellow)" }}>${totalPrecio.toLocaleString("es-AR")}</span>
              </div>
            </div>
          )}
        </div>

        {/* Formulario */}
        <div>
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--north-blue)" }}>Tus datos</h2>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4">

            {[
              { label: "Nombre completo *", name: "nombre", type: "text", placeholder: "Juan Pérez", required: true },
              { label: "Teléfono / WhatsApp *", name: "telefono", type: "tel", placeholder: "11 1234-5678", required: true },
              { label: "Email (opcional)", name: "email", type: "email", placeholder: "juan@mail.com", required: false },
              { label: "Dirección de entrega *", name: "direccion", type: "text", placeholder: "Av. Siempreviva 742", required: true },
              { label: "Localidad *", name: "localidad", type: "text", placeholder: "Haedo, Buenos Aires", required: true },
            ].map((f) => (
              <div key={f.name} className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">{f.label}</label>
                <input
                  type={f.type}
                  name={f.name}
                  placeholder={f.placeholder}
                  required={f.required}
                  value={form[f.name as keyof typeof form]}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">Notas adicionales</label>
              <textarea
                name="notas"
                placeholder="Horario de entrega, instrucciones especiales..."
                value={form.notas}
                onChange={handleChange}
                rows={3}
                className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              />
            </div>

            {estado === "error" && (
              <p className="text-red-500 text-sm">❌ Hubo un error al enviar. Intentá de nuevo o contactanos por WhatsApp.</p>
            )}

            <button
              type="submit"
              disabled={estado === "enviando" || items.length === 0}
              style={{ backgroundColor: estado === "enviando" ? "#9ca3af" : "var(--north-blue)" }}
              className="w-full py-3 rounded-full text-white font-bold text-lg transition-colors"
            >
              {estado === "enviando" ? "Enviando pedido..." : "Confirmar Pedido"}
            </button>

            <p className="text-xs text-gray-400 text-center">
              No se realiza ningún cobro online. Te contactamos para coordinar el pago y la entrega.
            </p>
          </form>
        </div>
      </div>

      <footer style={{ backgroundColor: "var(--north-blue)" }} className="text-white text-center py-6 text-sm">
        © {new Date().getFullYear()} Distribuidora North Paint
      </footer>
    </main>
  );
}
