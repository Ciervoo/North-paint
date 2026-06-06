import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import PageTracker from "./components/PageTracker";
import { Analytics } from "@vercel/analytics/next";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-mont" });

export const metadata: Metadata = {
  title: "Distribuidora North Paint",
  description: "Pedí tus materiales de pintura online — entregas a domicilio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} min-h-full flex flex-col bg-gray-50 text-gray-900 antialiased`}>
        <CartProvider>
          <PageTracker />
          {children}
          <CartDrawer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
