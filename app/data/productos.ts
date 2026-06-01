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

// Imágenes
const IMG = {
  H59:  "https://www.icriberica.com/wp-content/uploads/2024/09/H55-5L.jpg",
  H62:  "https://www.icriberica.com/wp-content/uploads/2024/09/H62-5L.jpg",
  H69:  "https://www.icriberica.com/wp-content/uploads/2024/10/H69-5L.jpg",
  H77:  "https://www.icriberica.com/wp-content/uploads/2025/07/H77-5L-159x300.png",
  H67:  "https://www.icriberica.com/wp-content/uploads/2024/09/H67-5L.jpg",
  PRIMER_5K: "https://www.icriberica.com/wp-content/uploads/2024/09/F77-1L.jpg",
  PRIMER_4K: "https://www.icriberica.com/wp-content/uploads/2024/07/F56-1L.jpg",
  GLADIATOR: "/gladiator.jpg",
  S20:  "https://www.icriberica.com/wp-content/uploads/2024/10/S20.jpg",
  S21:  "https://www.icriberica.com/wp-content/uploads/2024/10/S21.jpg",
  S35:  "https://www.icriberica.com/wp-content/uploads/2024/10/S35.jpg",
  S61:  "https://www.icriberica.com/wp-content/uploads/2024/09/SC4-ROYAL-SOFT-PUTTY-Padella.jpg",
  S97:  "https://www.icriberica.com/wp-content/uploads/2023/12/Sin-titulo-1.jpg",
  PISTOLA: "https://www.icriberica.com/wp-content/uploads/2024/09/SWIFT-Bulk-Filler-3_5.jpg",
};

export const productos: Producto[] = [

  // ══════════════════════════════════════════
  //  LÍNEA SPRINT — BARNICES (precios de KIT)
  // ══════════════════════════════════════════
  {
    id: 1, codigo: "H59", linea: "Sprint", categoria: "Barnices",
    nombre: "Kit Barniz H59 HS Sprint-Air GT Clear",
    presentacion: "Kit 1,5 lt (barniz + catalizador)",
    precio: 85700,
    imagen: IMG.H59,
    descripcion: "Barniz alto sólidos, curado rápido 2:1. Kit incluye barniz y catalizador.",
  },
  {
    id: 2, codigo: "H59-7.5", linea: "Sprint", categoria: "Barnices",
    nombre: "Kit Barniz H59 HS Sprint-Air GT Clear",
    presentacion: "Kit 7,5 lt (barniz + catalizador)",
    precio: 406800,
    imagen: IMG.H59,
    descripcion: "Barniz HS curado rápido, presentación profesional. Kit incluye catalizador.",
  },
  {
    id: 3, codigo: "H62", linea: "Sprint", categoria: "Barnices",
    nombre: "Kit Barniz H62 HS Fast Anti-Rayado",
    presentacion: "Kit 7,5 lt (barniz + catalizador)",
    precio: 283950, precioPromo: 239000,
    imagen: IMG.H62,
    descripcion: "Barniz HS de secado rápido con resistencia a rayaduras. Kit incluye catalizador.",
  },
  {
    id: 4, codigo: "H69-1.5", linea: "Sprint", categoria: "Barnices",
    nombre: "Kit Barniz H69 UHS Vantix Plus",
    presentacion: "Kit 1,5 lt (barniz + catalizador)",
    precio: 106150,
    imagen: IMG.H69,
    descripcion: "Ultra alto sólidos, máximo brillo y profundidad. Relación 2:1. Kit completo.",
  },
  {
    id: 5, codigo: "H69-7.5", linea: "Sprint", categoria: "Barnices",
    nombre: "Kit Barniz H69 UHS Vantix Plus",
    presentacion: "Kit 7,5 lt (barniz + catalizador)",
    precio: 486300,
    imagen: IMG.H69,
    descripcion: "Ultra alto sólidos Vantix Plus, presentación profesional. Kit completo.",
  },
  {
    id: 6, codigo: "H77-1.5", linea: "Sprint", categoria: "Barnices",
    nombre: "Kit Barniz H77 UHS Air-Wide",
    presentacion: "Kit 1,5 lt (barniz + catalizador)",
    precio: 89640,
    imagen: IMG.H77,
    descripcion: "Barniz UHS de secado rápido, amplia ventana de aplicación. Kit completo.",
  },
  {
    id: 7, codigo: "H77-7.5", linea: "Sprint", categoria: "Barnices",
    nombre: "Kit Barniz H77 UHS Air-Wide",
    presentacion: "Kit 7,5 lt (barniz + catalizador)",
    precio: 448200,
    imagen: IMG.H77,
    descripcion: "Barniz UHS Air-Wide presentación profesional. Kit completo con catalizador.",
  },
  {
    id: 8, codigo: "H67", linea: "Sprint", categoria: "Barnices",
    nombre: "Kit Barniz H67 UHS GT",
    presentacion: "Kit 1,5 lt (barniz + catalizador)",
    precio: 69700,
    imagen: IMG.H67,
    descripcion: "Ultra alto sólidos, tecnología GT. Kit incluye barniz y catalizador.",
  },

  // ══════════════════════════════════════════
  //  PRIMERS / APAREJOS
  // ══════════════════════════════════════════
  {
    id: 9, codigo: "PRIMER-GT", linea: "Sprint", categoria: "Primers",
    nombre: "Kit Primer GT 4:1",
    presentacion: "Kit 1,2 lt (primer + catalizador)",
    precio: 65000,
    imagen: IMG.GLADIATOR,
    descripcion: "Primer aparejo GT 4:1. Kit listo para usar, incluye catalizador. Colores: blanco, gris, negro.",
  },
  {
    id: 10, codigo: "F40", linea: "Sprint", categoria: "Primers",
    nombre: "Kit Primer F40 5:1 2K",
    presentacion: "Kit 5 lt (primer + catalizador)",
    precio: 217080, precioPromo: 169000,
    imagen: IMG.GLADIATOR,
    descripcion: "Primer 2K de alta calidad, relación 5:1. Excelente adherencia y relleno. Kit completo.",
  },
  {
    id: 11, codigo: "F56-F59", linea: "Sprint", categoria: "Primers",
    nombre: "Primer 5:1 2K (F56/F57/F58/F59)",
    presentacion: "1 lt — Blanco / Gris Claro / Gris Oscuro / Negro",
    precio: 49200,
    imagen: IMG.GLADIATOR,
    descripcion: "Primer GT 2K HS 5:1. Disponible en blanco, gris claro, gris oscuro y negro.",
  },
  {
    id: 12, codigo: "F46-F49", linea: "Sprint", categoria: "Primers",
    nombre: "Primer 4:1 (F46/F47/F48/F49)",
    presentacion: "4 lt — Blanco / Gris Claro / Gris Oscuro / Negro",
    precio: 105000,
    imagen: IMG.GLADIATOR,
    descripcion: "Primer aparejo GT 4:1. Gran capacidad de relleno. Colores: blanco, gris y negro.",
  },
  {
    id: 13, codigo: "A14", linea: "Sprint", categoria: "Primers",
    nombre: "Primer Surfacer Nitro A14",
    presentacion: "1 lt",
    precio: 84850,
    imagen: "https://www.icriberica.com/wp-content/uploads/2024/07/A14-1L.jpg",
    descripcion: "Primer surfacer nitro, excelente nivelado y agarre. Listo para lijar.",
  },

  // ══════════════════════════════════════════
  //  MASILLAS
  // ══════════════════════════════════════════
  {
    id: 14, codigo: "S61", linea: "Sprint", categoria: "Masillas",
    nombre: "Masilla One Light S61 Yellow",
    presentacion: "3 lt",
    precio: 93000, precioPromo: 74900,
    imagen: IMG.S61,
    descripcion: "Masilla ligera amarilla, fácil lijado y acabado liso. Alta capacidad de relleno.",
  },
  {
    id: 15, codigo: "S97", linea: "Sprint", categoria: "Masillas",
    nombre: "Masilla Poliéster S97 Beige",
    presentacion: "1 lt",
    precio: 46900,
    imagen: IMG.S97,
    descripcion: "Masilla poliéster beige de uso universal, alta capacidad de relleno.",
  },
  {
    id: 16, codigo: "S99", linea: "Sprint", categoria: "Masillas",
    nombre: "Masilla Poliéster S99 Blanca",
    presentacion: "1 lt",
    precio: 50300, precioPromo: 42900,
    imagen: IMG.S97,
    descripcion: "Masilla poliéster blanca, acabado suave y fácil aplicación.",
  },
  {
    id: 17, codigo: "S20", linea: "Sprint", categoria: "Masillas",
    nombre: "Masilla S20 Aluminio",
    presentacion: "1 lt",
    precio: 49200,
    imagen: IMG.S20,
    descripcion: "Masilla con aluminio, resistente a altas temperaturas.",
  },
  {
    id: 18, codigo: "S35", linea: "Sprint", categoria: "Masillas",
    nombre: "Masilla S35 Plásticos",
    presentacion: "1 lt",
    precio: 49200,
    imagen: IMG.S35,
    descripcion: "Masilla especial para plásticos flexible, excelente adherencia.",
  },

  // ══════════════════════════════════════════
  //  SELLADORES
  // ══════════════════════════════════════════
  {
    id: 19, codigo: "B320-GR", linea: "Sprint", categoria: "Selladores",
    nombre: "Sellador Extra Body B320 Gris",
    presentacion: "3 lt",
    precio: 130000,
    imagen: IMG.GLADIATOR,
    descripcion: "Sellador Extra Body gris, alta viscosidad y excelente cobertura. 3 litros.",
  },
  {
    id: 20, codigo: "B320-BK", linea: "Sprint", categoria: "Selladores",
    nombre: "Gladiator Black — Sellador",
    presentacion: "1 lt",
    precio: 46900,
    imagen: IMG.GLADIATOR,
    descripcion: "Sellador Gladiator negro, máxima cobertura y adherencia.",
  },
  {
    id: 21, codigo: "B320-TI", linea: "Sprint", categoria: "Selladores",
    nombre: "Gladiator Tinteable — Sellador",
    presentacion: "1 lt",
    precio: 46900,
    imagen: IMG.GLADIATOR,
    descripcion: "Sellador Gladiator tinteable, adaptable a cualquier fondo.",
  },

  // ══════════════════════════════════════════
  //  ACELERANTES
  // ══════════════════════════════════════════
  {
    id: 22, codigo: "SPRINT-AC", linea: "Sprint", categoria: "Acelerantes",
    nombre: "Acelerante Sprint",
    presentacion: "200 ml",
    precio: 50200,
    imagen: "https://www.icriberica.com/wp-content/uploads/2024/09/H55-5L.jpg",
    descripcion: "Acelerante Sprint para reducir tiempos de secado. Uso con barnices y primers.",
  },
  {
    id: 23, codigo: "AC-XRAP", linea: "Sprint", categoria: "Acelerantes",
    nombre: "Acelerante Extra Rápido",
    presentacion: "1 lt",
    precio: 46900,
    imagen: "https://www.icriberica.com/wp-content/uploads/2024/09/H55-5L.jpg",
    descripcion: "Acelerante extra rápido, máxima reducción del tiempo de secado.",
  },
  {
    id: 24, codigo: "AC-RAP", linea: "Sprint", categoria: "Acelerantes",
    nombre: "Acelerante Rápido",
    presentacion: "1 lt",
    precio: 46900,
    imagen: "https://www.icriberica.com/wp-content/uploads/2024/09/H55-5L.jpg",
    descripcion: "Acelerante rápido para pinturas y barnices de secado estándar.",
  },

  // ══════════════════════════════════════════
  //  ACCESORIOS
  // ══════════════════════════════════════════
  {
    id: 25, codigo: "PISTOLA", linea: "Sprint", categoria: "Accesorios",
    nombre: "Pistola Aplicadora",
    presentacion: "Unidad",
    precio: 180000,
    imagen: "https://www.icriberica.com/wp-content/uploads/2024/09/ACE-Super-Lightweight.jpg",
    descripcion: "Pistola aplicadora profesional para selladores y productos de textura.",
  },

  // ══════════════════════════════════════════
  //  LÍNEA TORO
  // ══════════════════════════════════════════
  {
    id: 26, codigo: "001", linea: "Toro", categoria: "Diluyentes",
    nombre: "Thinner Universal",
    presentacion: "20 lt",
    precio: 98000,
    imagen: "/toro/thinner.jpg",
    descripcion: "Thinner para limpieza y aplicación de fondos. Secado normal. Para remoción de pinturas, primers y barnices.",
  },
  {
    id: 27, codigo: "003", linea: "Toro", categoria: "Diluyentes",
    nombre: "Desengrasante",
    presentacion: "20 lt",
    precio: 128000,
    imagen: "/toro/desengrasante.jpg",
    descripcion: "Desengrasante para todo tipo de superficies. Secado rápido. Control de aplicación por beteado.",
  },
  {
    id: 28, codigo: "010", linea: "Toro", categoria: "Diluyentes",
    nombre: "Diluyente",
    presentacion: "20 lt",
    precio: 228000,
    imagen: "/toro/diluyente.jpg",
    descripcion: "Para fondos, colores y barnices. Excelente nivelado de barnices y realzador de brillo.",
  },
];

export const promociones = productos.filter((p) => p.precioPromo !== undefined);

export const categoriasSprint = [...new Set(
  productos.filter((p) => p.linea === "Sprint").map((p) => p.categoria)
)];
