"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { items, totalItems, totalPrecio, quitarDelCarrito, cambiarCantidad } = useCart();
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      {/* Botón flotante del carrito */}
      <button
        onClick={() => setAbierto(true)}
        style={{ backgroundColor: "var(--north-yellow)" }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-xl flex items-center justify-center text-white text-2xl hover:scale-110 transition-transform"
        aria-label="Ver carrito"
      >
        🛒
        {totalItems > 0 && (
          <span
            style={{ backgroundColor: "var(--north-blue)" }}
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white"
          >
            {totalItems}
          </span>
        )}
      </button>

      {/* Overlay */}
      {abierto && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setAbierto(false)}
        />
      )}

      {/* Drawer lateral */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          abierto ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header del drawer */}
        <div style={{ backgroundColor: "var(--north-blue)" }} className="text-white px-5 py-4 flex items-center justify-between">
          <h2 className="font-bold text-lg">Tu carrito ({totalItems})</h2>
          <button onClick={() => setAbierto(false)} className="text-2xl hover:opacity-70">✕</button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="text-center text-gray-400 py-16">
              <p className="text-4xl mb-3">🛒</p>
              <p>Tu carrito está vacío</p>
              <button onClick={() => setAbierto(false)} className="mt-4 underline text-sm" style={{ color: "var(--north-blue)" }}>
                Ver catálogo
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-800 leading-tight truncate">{item.nombre}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.presentacion}</p>
                  <p className="font-bold text-sm mt-1" style={{ color: "var(--north-yellow)" }}>
                    ${(item.precio * item.cantidad).toLocaleString("es-AR")}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                      className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 font-bold text-lg flex items-center justify-center hover:bg-gray-300"
                    >−</button>
                    <span className="w-6 text-center text-sm font-bold">{item.cantidad}</span>
                    <button
                      onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                      className="w-7 h-7 rounded-full text-white font-bold text-lg flex items-center justify-center hover:opacity-90"
                      style={{ backgroundColor: "var(--north-blue)" }}
                    >+</button>
                  </div>
                  <button
                    onClick={() => quitarDelCarrito(item.id)}
                    className="text-xs text-red-400 hover:text-red-600 mt-1"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer con total y botón */}
        {items.length > 0 && (
          <div className="border-t px-5 py-4 flex flex-col gap-3">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span style={{ color: "var(--north-yellow)" }}>${totalPrecio.toLocaleString("es-AR")}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setAbierto(false)}
              style={{ backgroundColor: "var(--north-blue)" }}
              className="w-full text-center text-white font-bold py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Confirmar Pedido
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
