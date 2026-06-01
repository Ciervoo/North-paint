import Image from "next/image";
import Link from "next/link";
import { promociones } from "../data/productos";

export default function PromoSection() {
  return (
    <section className="py-14 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Título */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 flex-1 rounded" style={{ backgroundColor: "var(--north-yellow)" }} />
          <h2 className="text-2xl font-black tracking-tight" style={{ color: "var(--north-blue)" }}>
            🔥 Promo Junio
          </h2>
          <div className="h-1 flex-1 rounded" style={{ backgroundColor: "var(--north-yellow)" }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {promociones.map((p) => {
            const descuento = Math.round((1 - p.precioPromo! / p.precio) * 100);
            return (
              <div
                key={p.id}
                className="relative bg-white rounded-2xl border-2 overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                style={{ borderColor: "var(--north-yellow)" }}
              >
                {/* Badge descuento */}
                <div
                  className="absolute top-3 right-3 z-10 text-white text-xs font-black px-2 py-1 rounded-full"
                  style={{ backgroundColor: "#e53e3e" }}
                >
                  -{descuento}%
                </div>

                {/* Imagen */}
                <div className="relative w-full h-36 bg-gray-50">
                  <Image
                    src={p.imagen}
                    alt={p.nombre}
                    fill
                    className="object-contain p-3"
                    unoptimized
                  />
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <span
                    className="text-xs font-bold uppercase tracking-wide text-white px-2 py-0.5 rounded-full w-fit"
                    style={{ backgroundColor: "var(--north-blue)" }}
                  >
                    {p.categoria}
                  </span>
                  <h3 className="font-bold text-sm text-gray-800 leading-tight">{p.nombre}</h3>
                  <p className="text-xs text-gray-400">{p.presentacion}</p>

                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 line-through">
                      ${p.precio.toLocaleString("es-AR")}
                    </span>
                    <span className="text-xl font-black" style={{ color: "var(--north-yellow)" }}>
                      ${p.precioPromo!.toLocaleString("es-AR")}
                    </span>
                    <span className="text-xs font-bold text-green-600">PRECIO FINAL</span>
                  </div>

                  <Link
                    href={`/catalogo`}
                    style={{ backgroundColor: "var(--north-blue)" }}
                    className="text-center text-white text-xs font-bold py-2 rounded-full mt-1 hover:opacity-90 transition-opacity"
                  >
                    Agregar al carrito
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
