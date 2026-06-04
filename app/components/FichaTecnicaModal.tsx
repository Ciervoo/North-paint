"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Producto } from "../data/productos";

function formatMin(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

export default function FichaTecnicaModal({
  producto,
  onClose,
}: {
  producto: Producto;
  onClose: () => void;
}) {
  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Bloquear scroll del body mientras el modal está abierto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90dvh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle mobile */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                <Image src={producto.imagen} alt={producto.nombre} fill className="object-contain p-1" unoptimized />
              </div>
              <div className="min-w-0">
                <span
                  className="text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: "var(--north-blue)" }}
                >
                  {producto.categoria}
                </span>
                <h2 className="font-black text-gray-800 text-sm leading-tight mt-1">{producto.nombre}</h2>
                <p className="text-xs text-gray-400 font-mono">{producto.codigo} · {producto.presentacion}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 ml-2 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors text-lg leading-none"
            >
              ×
            </button>
          </div>

          {/* Descripción */}
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">{producto.descripcion}</p>

          {/* Características */}
          {producto.caracteristicas && producto.caracteristicas.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">
                Características
              </h3>
              <ul className="space-y-2">
                {producto.caracteristicas.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span
                      className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-bold mt-0.5"
                      style={{ backgroundColor: "var(--north-blue)" }}
                    >
                      ✓
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tiempos de secado */}
          {producto.secado && (
            <div className="mb-4">
              <h3 className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">
                ⏱ Tiempos de secado — a 20 °C
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Fuera de polvo", value: producto.secado.fueraPolvo },
                  { label: "Manipulable",    value: producto.secado.manipulable },
                  { label: "Seco total",     value: producto.secado.secoTotal },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-xl p-3 text-center border" style={{ borderColor: "var(--north-blue)", backgroundColor: "#f0f5ff" }}>
                    <div className="text-base font-black" style={{ color: "var(--north-blue)" }}>
                      {formatMin(value)}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">{label}</div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5">
                * Tiempos orientativos a 20 °C con catalizador normal. Varían según temperatura y humedad.
              </p>
            </div>
          )}

          {/* Botón PDF */}
          {producto.fichaTecnica ? (
            <a
              href={producto.fichaTecnica}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 active:opacity-75"
              style={{ backgroundColor: "var(--north-blue)" }}
            >
              📄 Ver ficha técnica completa (PDF)
            </a>
          ) : (
            <p className="text-center text-xs text-gray-400 py-2">
              Ficha técnica PDF no disponible para este producto.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
