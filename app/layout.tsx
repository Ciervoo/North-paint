import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Distribuidora North Paint",
  description: "Pedí tus materiales de pintura online — entregas a domicilio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
