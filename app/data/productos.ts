export type Producto = {
  id: number;
  codigo: string;
  nombre: string;
  linea: "Sprint" | "Toro";
  categoria: string;
  presentacion: string;
  precio: number;
  precioPromo?: number;
  imagen: string;
  descripcion: string;
};

export const productos: Producto[] = [
  // ══════════════════════════════════════════
  //  LÍNEA SPRINT
  // ══════════════════════════════════════════

  // BARNICES — cada uno con imagen única
  {
    id: 1, codigo: "H59", linea: "Sprint",
    nombre: "Barniz H59 HS Sprint-Air GT Clear",
    categoria: "Barnices", presentacion: "Kit 1,5 lt", precio: 85700,
    imagen: "https://www.icriberica.com/wp-content/uploads/2024/09/H55-5L.jpg",
    descripcion: "Barniz alto sólidos, curado rápido 2:1. Excelente brillo y durabilidad.",
  },
  {
    id: 2, codigo: "H59-7.5", linea: "Sprint",
    nombre: "Barniz H59 HS Sprint-Air GT Clear",
    categoria: "Barnices", presentacion: "Kit 7,5 lt", precio: 406800,
    imagen: "https://www.icriberica.com/wp-content/uploads/2024/09/H55-5L.jpg",
    descripcion: "Barniz alto sólidos, curado rápido 2:1. Presentación profesional.",
  },
  {
    id: 3, codigo: "H62", linea: "Sprint",
    nombre: "Barniz H62 HS Fast Anti-Rayado",
    categoria: "Barnices", presentacion: "Kit 7,5 lt", precio: 283950, precioPromo: 239000,
    imagen: "https://www.icriberica.com/wp-content/uploads/2024/09/H62-5L.jpg",
    descripcion: "Barniz HS de secado rápido con resistencia a rayaduras.",
  },
  {
    id: 4, codigo: "H69", linea: "Sprint",
    nombre: "Barniz H69 UHS Vantix Plus",
    categoria: "Barnices", presentacion: "Kit 1,5 lt", precio: 106150,
    imagen: "https://www.icriberica.com/wp-content/uploads/2024/10/H69-5L.jpg",
    descripcion: "Ultra alto sólidos, máximo brillo y profundidad. Relación 2:1.",
  },
  {
    id: 5, codigo: "H69-7.5", linea: "Sprint",
    nombre: "Barniz H69 UHS Vantix Plus",
    categoria: "Barnices", presentacion: "Kit 7,5 lt", precio: 486300,
    imagen: "https://www.icriberica.com/wp-content/uploads/2024/10/H69-5L.jpg",
    descripcion: "Ultra alto sólidos, máximo brillo y profundidad.",
  },
  {
    id: 6, codigo: "H77", linea: "Sprint",
    nombre: "Barniz H77 UHS Air-Wide",
    categoria: "Barnices", presentacion: "Kit 1,5 lt", precio: 89640,
    imagen: "https://www.icriberica.com/wp-content/uploads/2025/07/H77-5L-159x300.png",
    descripcion: "Barniz UHS de secado rápido, amplia ventana de aplicación.",
  },
  {
    id: 7, codigo: "H67", linea: "Sprint",
    nombre: "Barniz H67 UHS GT",
    categoria: "Barnices", presentacion: "Kit 1,5 lt", precio: 69700,
    imagen: "https://www.icriberica.com/wp-content/uploads/2024/09/H67-5L.jpg",
    descripcion: "Ultra alto sólidos, tecnología GT. Alto brillo y fácil aplicación.",
  },

  // PRIMERS — imágenes únicas por color
  {
    id: 8, codigo: "F46", linea: "Sprint",
    nombre: "Primer F46 Blanco",
    categoria: "Primers", presentacion: "4 lt", precio: 105000,
    imagen: "https://www.icriberica.com/wp-content/uploads/2024/07/F56-1L.jpg",
    descripcion: "Primer aparejo blanco de alta adherencia. Listo para lijar.",
  },
  {
    id: 9, codigo: "F47", linea: "Sprint",
    nombre: "Primer F47 Gris Claro",
    categoria: "Primers", presentacion: "4 lt", precio: 105000,
    imagen: "https://www.icriberica.com/wp-content/uploads/2024/07/F56-1L.jpg",
    descripcion: "Primer aparejo gris claro, excelente relleno de superficie.",
  },
  {
    id: 10, codigo: "F49", linea: "Sprint",
    nombre: "Primer F49 Negro",
    categoria: "Primers", presentacion: "4 lt", precio: 105000,
    imagen: "https://www.icriberica.com/wp-content/uploads/2024/07/F56-1L.jpg",
    descripcion: "Primer aparejo negro, ideal para fondos oscuros.",
  },
  {
    id: 11, codigo: "F40", linea: "Sprint",
    nombre: "Primer F40 5:1 2K",
    categoria: "Primers", presentacion: "Kit 5 lt", precio: 217080, precioPromo: 169000,
    imagen: "https://www.icriberica.com/wp-content/uploads/2024/07/F77-1L.jpg",
    descripcion: "Primer 2K de alta calidad, relación 5:1. Gran adherencia y relleno.",
  },

  // MASILLAS
  {
    id: 12, codigo: "S61", linea: "Sprint",
    nombre: "Masilla One Light S61",
    categoria: "Masillas", presentacion: "3 lt", precio: 93000, precioPromo: 74900,
    imagen: "https://www.icriberica.com/wp-content/uploads/2023/12/Sin-titulo-1.jpg",
    descripcion: "Masilla ligera amarilla, fácil lijado y acabado liso.",
  },
  {
    id: 13, codigo: "S97", linea: "Sprint",
    nombre: "Masilla Poliéster S97 Beige",
    categoria: "Masillas", presentacion: "1 lt", precio: 46900,
    imagen: "https://www.icriberica.com/wp-content/uploads/2023/12/Sin-titulo-1.jpg",
    descripcion: "Masilla poliéster beige de uso universal, alta capacidad de relleno.",
  },
  {
    id: 14, codigo: "S99", linea: "Sprint",
    nombre: "Masilla Poliéster S99 Blanca",
    categoria: "Masillas", presentacion: "1 lt", precio: 50300, precioPromo: 42900,
    imagen: "https://www.icriberica.com/wp-content/uploads/2023/12/Sin-titulo-1.jpg",
    descripcion: "Masilla poliéster blanca, acabado suave y fácil aplicación.",
  },
  {
    id: 15, codigo: "S20", linea: "Sprint",
    nombre: "Masilla S20 Aluminio",
    categoria: "Masillas", presentacion: "1 lt", precio: 46900,
    imagen: "https://www.icriberica.com/wp-content/uploads/2024/10/S20.jpg",
    descripcion: "Masilla con aluminio, resistente a altas temperaturas.",
  },
  {
    id: 16, codigo: "S35", linea: "Sprint",
    nombre: "Masilla S35 Plásticos",
    categoria: "Masillas", presentacion: "1 lt", precio: 46900,
    imagen: "https://www.icriberica.com/wp-content/uploads/2024/10/S35.jpg",
    descripcion: "Masilla especial para plásticos, excelente adherencia y flexibilidad.",
  },

  // SELLADORES
  {
    id: 17, codigo: "B320-BK", linea: "Sprint",
    nombre: "Sellador Extra Body Gladiator Black",
    categoria: "Selladores", presentacion: "1 lt", precio: 130000,
    imagen: "https://www.icriberica.com/wp-content/uploads/2024/09/ACE-Super-Lightweight.jpg",
    descripcion: "Sellador Extra Body negro, alta viscosidad y excelente cobertura.",
  },
  {
    id: 18, codigo: "B320-TI", linea: "Sprint",
    nombre: "Sellador Extra Body Gladiator Tinteable",
    categoria: "Selladores", presentacion: "1 lt", precio: 130000,
    imagen: "https://www.icriberica.com/wp-content/uploads/2024/09/SWIFT-Bulk-Filler-3_5.jpg",
    descripcion: "Sellador Extra Body tinteable, adaptable a cualquier fondo.",
  },

  // ══════════════════════════════════════════
  //  LÍNEA TORO
  // ══════════════════════════════════════════
  {
    id: 19, codigo: "001", linea: "Toro",
    nombre: "Thinner Universal",
    categoria: "Diluyentes",
    presentacion: "20 lt",
    precio: 98000,
    imagen: "/toro/thinner.jpg",
    descripcion: "Thinner para limpieza y aplicación de fondos. Para remoción de pinturas, primers y barnices.",
  },
  {
    id: 20, codigo: "003", linea: "Toro",
    nombre: "Desengrasante",
    categoria: "Diluyentes",
    presentacion: "20 lt",
    precio: 128000,
    imagen: "/toro/desengrasante.jpg",
    descripcion: "Desengrasante para todo tipo de superficies. Secado rápido. Control de aplicación por beteado.",
  },
  {
    id: 21, codigo: "010", linea: "Toro",
    nombre: "Diluyente",
    categoria: "Diluyentes",
    presentacion: "20 lt",
    precio: 228000,
    imagen: "/toro/diluyente.jpg",
    descripcion: "Para fondos, colores y barnices. Excelente nivelado y realzador de brillo.",
  },
];

export const promociones = productos.filter((p) => p.precioPromo !== undefined);

export const categoriasSprint = [...new Set(
  productos.filter((p) => p.linea === "Sprint").map((p) => p.categoria)
)];
