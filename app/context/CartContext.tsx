"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Producto } from "../data/productos";

export type CartItem = Producto & { cantidad: number };

type CartContextType = {
  items: CartItem[];
  agregarAlCarrito: (producto: Producto) => void;
  quitarDelCarrito: (id: number) => void;
  cambiarCantidad: (id: number, cantidad: number) => void;
  vaciarCarrito: () => void;
  totalItems: number;
  totalPrecio: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const agregarAlCarrito = (producto: Producto) => {
    setItems((prev) => {
      const existe = prev.find((i) => i.id === producto.id);
      if (existe) {
        return prev.map((i) =>
          i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const quitarDelCarrito = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const cambiarCantidad = (id: number, cantidad: number) => {
    if (cantidad <= 0) {
      quitarDelCarrito(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, cantidad } : i))
    );
  };

  const vaciarCarrito = () => setItems([]);

  const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0);
  // Usa precioPromo si existe, si no el precio normal
  const totalPrecio = items.reduce((acc, i) => acc + (i.precioPromo ?? i.precio) * i.cantidad, 0);

  return (
    <CartContext.Provider
      value={{ items, agregarAlCarrito, quitarDelCarrito, cambiarCantidad, vaciarCarrito, totalItems, totalPrecio }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
