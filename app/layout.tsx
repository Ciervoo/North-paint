import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";

export const metadata: Metadata = {
  title: "Distribuidora North Paint",
  description: "Pedí tus materiales de pintura online — entregas a domicilio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 antialiased">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
