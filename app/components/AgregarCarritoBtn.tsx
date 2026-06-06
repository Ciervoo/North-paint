"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Producto } from "../data/productos";
import { track } from "../lib/track";

export default function AgregarCarritoBtn({ producto }: { producto: Producto }) {
  const { agregarAlCarrito } = useCart();
  const [agregado, setAgregado] = useState(false);

  const handleClick = () => {
    agregarAlCarrito(producto);
    track("add_to_cart", { producto: producto.nombre });
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: agregado ? "#16a34a" : "var(--north-yellow)" }}
      className="w-full text-center text-white text-sm font-bold py-2.5 rounded-full transition-colors duration-300"
    >
      {agregado ? "✓ Agregado" : "Agregar al carrito"}
    </button>
  );
}
