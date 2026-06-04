export type Secado = { fueraPolvo: number; manipulable: number; secoTotal: number };

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
  fichaTecnica?: string;       // URL al PDF de ICR Ibérica
  caracteristicas?: string[];  // Bullets técnicos para el modal
  secado?: Secado;             // Tiempos de secado en minutos (a 20 °C)
};

const TDS = "https://www.icriberica.com/area-tecnica-15/CAR-REFINISH/";

const FT = {
  H59:         TDS + "H59_TDS_ES.pdf",
  H62:         TDS + "H62_TDS_ES.pdf",
  H67:         TDS + "H67_TDS_ES.pdf",
  H69:         TDS + "H69P_TDS_ES.pdf",
  H77:         TDS + "FLYER-H77-ES-PT.pdf",
  F46_49:      TDS + "F46-F47-F48-F49_TDS_ES.pdf",
  F56_59:      TDS + "F56-F57-F58-F59_TDS_ES.pdf",
  A14:         TDS + "A14_TDS_ES.pdf",
  S61:         TDS + "S61_TDS_ES.pdf",
  S97:         TDS + "S97_TDS_ES.pdf",
  S99:         TDS + "S99_TDS_ES.pdf",
  S20:         TDS + "S20_TDS_ES.pdf",
  S35:         TDS + "S35_TDS_ES.pdf",
};

const IMG = {
  H59:            "https://www.icriberica.com/wp-content/uploads/2024/09/H55-5L.jpg",
  H62:            "https://www.icriberica.com/wp-content/uploads/2024/09/H62-5L.jpg",
  H69:            "https://www.icriberica.com/wp-content/uploads/2024/10/H69-5L.jpg",
  H77:            "https://www.icriberica.com/wp-content/uploads/2025/07/H77-5L-159x300.png",
  H67:            "https://www.icriberica.com/wp-content/uploads/2024/09/H67-5L.jpg",
  PRIMER_5K:      "https://www.icriberica.com/wp-content/uploads/2024/09/F77-1L.jpg",
  PRIMER_4K:      "https://www.icriberica.com/wp-content/uploads/2024/07/F56-1L.jpg",
  GLADIATOR:      "/gladiator.jpg",
  PISTOLA:        "/sprint/pistola-gladiator.jpg",
  S20:            "https://www.icriberica.com/wp-content/uploads/2024/10/S20.jpg",
  S35:            "https://www.icriberica.com/wp-content/uploads/2024/10/S35.jpg",
  S61:            "/sprint/masilla-s61.jpg",
  S97:            "/sprint/masilla-s97.jpg",
  SPRINTER:       "/sprint/sprinter.jpg",
  B320_EXTRABODY: "/sprint/b320-extrabody.jpg",
  A14:            "https://www.icriberica.com/wp-content/uploads/2024/07/A14-1L.jpg",
};

export const productos: Producto[] = [

  // =
  //  BARNICES — KIT (barniz + catalizador)
  // =
  // ── BARNICES ──
  { id: 1, codigo: "H59", linea: "Sprint", categoria: "Barnices",
    nombre: "Kit Barniz H59 HS Sprint-Air GT Clear", presentacion: "Kit 1,5 lt", precio: 85700,
    imagen: IMG.H59, fichaTecnica: FT.H59,
    descripcion: "Barniz alto sólidos curado rápido 2:1. Kit incluye catalizador.",
    secado: { fueraPolvo: 20, manipulable: 60, secoTotal: 150 },
    caracteristicas: [
      "Barniz HS 2:1 de alto contenido en sólidos",
      "Curado muy rápido, ideal para reparaciones express y producción",
      "Excelente brillo, dureza y resistencia a la intemperie",
    ],
  },
  { id: 2, codigo: "H59-7", linea: "Sprint", categoria: "Barnices",
    nombre: "Kit Barniz H59 HS Sprint-Air GT Clear", presentacion: "Kit 7,5 lt", precio: 406800,
    imagen: IMG.H59, fichaTecnica: FT.H59,
    descripcion: "Barniz HS curado rápido, presentación profesional. Incluye catalizador.",
    secado: { fueraPolvo: 20, manipulable: 60, secoTotal: 150 },
    caracteristicas: [
      "Barniz HS 2:1 de alto contenido en sólidos",
      "Curado muy rápido, ideal para reparaciones express y producción",
      "Presentación profesional 7,5 lt para mayor rendimiento",
    ],
  },
  { id: 3, codigo: "H62", linea: "Sprint", categoria: "Barnices",
    nombre: "Kit Barniz H62 HS Fast Anti-Rayado", presentacion: "Kit 7,5 lt", precio: 283950, precioPromo: 239000,
    imagen: IMG.H62, fichaTecnica: FT.H62,
    descripcion: "Barniz HS secado rápido con resistencia a rayaduras. Incluye catalizador.",
    secado: { fueraPolvo: 60, manipulable: 240, secoTotal: 1080 },
    caracteristicas: [
      "Tecnología anti-rayado: resistencia superior a rayaduras finas",
      "Alto contenido en sólidos (HS), secado rápido",
      "Alta resistencia mecánica y química",
    ],
  },
  { id: 4, codigo: "H69", linea: "Sprint", categoria: "Barnices",
    nombre: "Kit Barniz H69 UHS Vantix Plus", presentacion: "Kit 1,5 lt", precio: 106150,
    imagen: IMG.H69, fichaTecnica: FT.H69,
    descripcion: "Ultra alto sólidos, máximo brillo y profundidad 2:1. Incluye catalizador.",
    secado: { fueraPolvo: 90, manipulable: 360, secoTotal: 1200 },
    caracteristicas: [
      "Ultra alto sólidos (UHS) 2:1 — tecnología Vantix Plus",
      "Máximo brillo, profundidad y dureza superficial",
      "Excelente resistencia UV y a productos químicos",
    ],
  },
  { id: 5, codigo: "H69-7", linea: "Sprint", categoria: "Barnices",
    nombre: "Kit Barniz H69 UHS Vantix Plus", presentacion: "Kit 7,5 lt", precio: 486300,
    imagen: IMG.H69, fichaTecnica: FT.H69,
    descripcion: "Ultra alto sólidos Vantix Plus profesional. Incluye catalizador.",
    secado: { fueraPolvo: 90, manipulable: 360, secoTotal: 1200 },
    caracteristicas: [
      "Ultra alto sólidos (UHS) 2:1 — tecnología Vantix Plus",
      "Máximo brillo, profundidad y dureza superficial",
      "Presentación profesional 7,5 lt para mayor rendimiento",
    ],
  },
  { id: 6, codigo: "H77", linea: "Sprint", categoria: "Barnices",
    nombre: "Kit Barniz H77 UHS Air-Wide", presentacion: "Kit 1,5 lt", precio: 89640,
    imagen: IMG.H77, fichaTecnica: FT.H77,
    descripcion: "Barniz UHS secado rápido, amplia ventana de aplicación. Incluye catalizador.",
    secado: { fueraPolvo: 40, manipulable: 240, secoTotal: 600 },
    caracteristicas: [
      "Ultra alto sólidos (UHS) con amplia ventana de aplicación",
      "Muy versátil: apto para pistola convencional y HVLP",
      "Buena resistencia a la humedad durante la aplicación",
    ],
  },
  { id: 7, codigo: "H77-7", linea: "Sprint", categoria: "Barnices",
    nombre: "Kit Barniz H77 UHS Air-Wide", presentacion: "Kit 7,5 lt", precio: 448200,
    imagen: IMG.H77, fichaTecnica: FT.H77,
    descripcion: "Barniz UHS Air-Wide presentación profesional. Incluye catalizador.",
    secado: { fueraPolvo: 40, manipulable: 240, secoTotal: 600 },
    caracteristicas: [
      "Ultra alto sólidos (UHS) con amplia ventana de aplicación",
      "Muy versátil: apto para pistola convencional y HVLP",
      "Presentación profesional 7,5 lt para mayor rendimiento",
    ],
  },
  { id: 8, codigo: "H67", linea: "Sprint", categoria: "Barnices",
    nombre: "Kit Barniz H67 UHS GT", presentacion: "Kit 1,5 lt", precio: 69700,
    imagen: IMG.H67, fichaTecnica: FT.H67,
    descripcion: "Ultra alto sólidos tecnología GT. Incluye catalizador.",
    secado: { fueraPolvo: 180, manipulable: 600, secoTotal: 1800 },
    caracteristicas: [
      "Ultra alto sólidos (UHS) 2:1, baja emisión VOC (420 g/l)",
      "Máximo brillo y profundidad, acabado de alta gama",
      "Compatible con catalizadores C15 / C16 / C22",
    ],
  },

  // ── PRIMERS 4:1 ──
  { id: 9,  codigo: "F46", linea: "Sprint", categoria: "Primers 4:1", nombre: "Primer F46 Blanco 4:1",      presentacion: "Kit 5 lt", precio: 217080, precioPromo: 169000, imagen: IMG.PRIMER_4K, fichaTecnica: FT.F46_49,
    descripcion: "Primer aparejo GT 4:1 color blanco. Alta adherencia, gran relleno. Kit incluye catalizador.",
    caracteristicas: ["Aparejo acrílico 2K HS 4:1, gran capacidad de relleno", "Excelente adherencia sobre metales, plásticos y chapas reparadas", "Fácil de lijar y nivelar, listo para barnizar"],
  },
  { id: 10, codigo: "F47", linea: "Sprint", categoria: "Primers 4:1", nombre: "Primer F47 Gris Claro 4:1",  presentacion: "Kit 5 lt", precio: 217080, precioPromo: 169000, imagen: IMG.PRIMER_4K, fichaTecnica: FT.F46_49,
    descripcion: "Primer aparejo GT 4:1 color gris claro. Alta adherencia, gran relleno. Kit incluye catalizador.",
    caracteristicas: ["Aparejo acrílico 2K HS 4:1, gran capacidad de relleno", "Excelente adherencia sobre metales, plásticos y chapas reparadas", "Fácil de lijar y nivelar, listo para barnizar"],
  },
  { id: 11, codigo: "F48", linea: "Sprint", categoria: "Primers 4:1", nombre: "Primer F48 Gris Oscuro 4:1", presentacion: "Kit 5 lt", precio: 217080, precioPromo: 169000, imagen: IMG.PRIMER_4K, fichaTecnica: FT.F46_49,
    descripcion: "Primer aparejo GT 4:1 color gris oscuro. Alta adherencia, gran relleno. Kit incluye catalizador.",
    caracteristicas: ["Aparejo acrílico 2K HS 4:1, gran capacidad de relleno", "Excelente adherencia sobre metales, plásticos y chapas reparadas", "Fácil de lijar y nivelar, listo para barnizar"],
  },
  { id: 12, codigo: "F49", linea: "Sprint", categoria: "Primers 4:1", nombre: "Primer F49 Negro 4:1",        presentacion: "Kit 5 lt", precio: 217080, precioPromo: 169000, imagen: IMG.PRIMER_4K, fichaTecnica: FT.F46_49,
    descripcion: "Primer aparejo GT 4:1 color negro. Alta adherencia, gran relleno. Kit incluye catalizador.",
    caracteristicas: ["Aparejo acrílico 2K HS 4:1, gran capacidad de relleno", "Excelente adherencia sobre metales, plásticos y chapas reparadas", "Fácil de lijar y nivelar, listo para barnizar"],
  },

  // ── PRIMERS 5:1 ──
  { id: 13, codigo: "F56", linea: "Sprint", categoria: "Primers 5:1", nombre: "Primer F56 Blanco 5:1 2K",     presentacion: "Kit 1,2 lt", precio: 65000, imagen: IMG.PRIMER_5K, fichaTecnica: FT.F56_59,
    descripcion: "Primer GT 2K HS 5:1 color blanco. Excelente relleno y nivelado. Kit incluye catalizador.",
    caracteristicas: ["Aparejo GT 2K HS 5:1, alto contenido en sólidos", "Excelente nivelado y capacidad de relleno en pocas capas", "Rápido lijado, ideal para reparaciones de media superficie"],
  },
  { id: 14, codigo: "F57", linea: "Sprint", categoria: "Primers 5:1", nombre: "Primer F57 Gris Claro 5:1 2K", presentacion: "Kit 1,2 lt", precio: 65000, imagen: IMG.PRIMER_5K, fichaTecnica: FT.F56_59,
    descripcion: "Primer GT 2K HS 5:1 color gris claro. Excelente relleno y nivelado. Kit incluye catalizador.",
    caracteristicas: ["Aparejo GT 2K HS 5:1, alto contenido en sólidos", "Excelente nivelado y capacidad de relleno en pocas capas", "Rápido lijado, ideal para reparaciones de media superficie"],
  },
  { id: 15, codigo: "F58", linea: "Sprint", categoria: "Primers 5:1", nombre: "Primer F58 Gris Oscuro 5:1 2K", presentacion: "Kit 1,2 lt", precio: 65000, imagen: IMG.PRIMER_5K, fichaTecnica: FT.F56_59,
    descripcion: "Primer GT 2K HS 5:1 color gris oscuro. Excelente relleno y nivelado. Kit incluye catalizador.",
    caracteristicas: ["Aparejo GT 2K HS 5:1, alto contenido en sólidos", "Excelente nivelado y capacidad de relleno en pocas capas", "Rápido lijado, ideal para reparaciones de media superficie"],
  },
  { id: 16, codigo: "F59", linea: "Sprint", categoria: "Primers 5:1", nombre: "Primer F59 Negro 5:1 2K",       presentacion: "Kit 1,2 lt", precio: 65000, imagen: IMG.PRIMER_5K, fichaTecnica: FT.F56_59,
    descripcion: "Primer GT 2K HS 5:1 color negro. Excelente relleno y nivelado. Kit incluye catalizador.",
    caracteristicas: ["Aparejo GT 2K HS 5:1, alto contenido en sólidos", "Excelente nivelado y capacidad de relleno en pocas capas", "Rápido lijado, ideal para reparaciones de media superficie"],
  },
  { id: 17, codigo: "PRIMER-GT", linea: "Sprint", categoria: "Primers 4:1", nombre: "Kit Primer GT 4:1", presentacion: "Kit 1,2 lt (primer + cat.)", precio: 65000, imagen: IMG.PRIMER_4K, fichaTecnica: FT.F46_49,
    descripcion: "Kit primer GT 4:1 listo para usar. Incluye catalizador. Varios colores.",
    caracteristicas: ["Aparejo GT 2K HS 4:1, kit completo listo para usar", "Excelente adherencia y gran capacidad de relleno", "Disponible en blanco, gris claro, gris oscuro y negro"],
  },
  { id: 19, codigo: "A14", linea: "Sprint", categoria: "Primers 5:1", nombre: "Primer Surfacer Nitro A14", presentacion: "1 lt", precio: 84850, imagen: IMG.A14, fichaTecnica: FT.A14,
    descripcion: "Primer surfacer nitro, excelente nivelado. Listo para lijar.",
    caracteristicas: ["Primer surfacer nitro monocomponente, sin catalizador", "Excelente nivelado de superficie, listo para lijar en minutos", "Aplicación directa a pistola o brocha, fácil uso"],
  },

  // ── MASILLAS ──
  { id: 20, codigo: "S61", linea: "Sprint", categoria: "Masillas", nombre: "Masilla One Light S61 Yellow", presentacion: "3 lt", precio: 93000, precioPromo: 74900, imagen: IMG.S61, fichaTecnica: FT.S61,
    descripcion: "Masilla ligera, fácil lijado y acabado liso. Alta capacidad de relleno.",
    caracteristicas: ["Ultra ligera, requiere mínimo esfuerzo al lijar", "Alta capacidad de relleno, ideal para grandes superficies", "Color amarillo para detectar fácilmente zonas rellenas"],
  },
  { id: 21, codigo: "S97", linea: "Sprint", categoria: "Masillas", nombre: "Masilla Poliéster S97 Beige", presentacion: "1 lt", precio: 46900, imagen: IMG.S97, fichaTecnica: FT.S97,
    descripcion: "Masilla poliéster beige de uso universal, alta capacidad de relleno.",
    caracteristicas: ["Masilla poliéster beige de uso universal", "Alta capacidad de relleno, fácil aplicación con espátula", "Buena adherencia sobre chapa, aluminio y fibra"],
  },
  { id: 22, codigo: "S99", linea: "Sprint", categoria: "Masillas", nombre: "Masilla Poliéster S99 Blanca", presentacion: "1 lt", precio: 50300, precioPromo: 42900, imagen: IMG.S97, fichaTecnica: FT.S99,
    descripcion: "Masilla poliéster blanca, acabado suave y fácil aplicación.",
    caracteristicas: ["Masilla poliéster blanca, acabado suave y homogéneo", "Ideal para superficies claras y trabajos de acabado fino", "Excelente nivelado, fácil de lijar"],
  },
  { id: 23, codigo: "S20", linea: "Sprint", categoria: "Masillas", nombre: "Masilla S20 Aluminio", presentacion: "1 lt", precio: 49200, imagen: IMG.S20, fichaTecnica: FT.S20,
    descripcion: "Masilla con aluminio, resistente a altas temperaturas.",
    caracteristicas: ["Contiene partículas de aluminio para máxima resistencia", "Resistente a altas temperaturas, vibraciones y flexión", "Ideal para zonas de motor, escapes y estructura"],
  },
  { id: 24, codigo: "S35", linea: "Sprint", categoria: "Masillas", nombre: "Masilla S35 Plásticos", presentacion: "1 lt", precio: 49200, imagen: IMG.S35, fichaTecnica: FT.S35,
    descripcion: "Masilla especial para plásticos, excelente adherencia y flexibilidad.",
    caracteristicas: ["Formulada especialmente para bumpers y piezas plásticas", "Alta flexibilidad para evitar cuarteamientos con la deformación", "Excelente adherencia sobre poliuretano y polipropileno"],
  },

  // ── SELLADORES ──
  { id: 25, codigo: "32010", linea: "Sprint", categoria: "Selladores", nombre: "Sellador Extra Body B320 Gris",   presentacion: "1 lt", precio: 46900, imagen: IMG.B320_EXTRABODY,
    descripcion: "Sellador Extra Body B320 color gris. Alta viscosidad y cobertura.",
    caracteristicas: ["Sellador de alta viscosidad, excelente cobertura de porosidades", "Prepara la superficie para recibir el barniz, sin lijado previo del fondo", "Color gris, apto para fondos oscuros"],
  },
  { id: 26, codigo: "32110", linea: "Sprint", categoria: "Selladores", nombre: "Sellador Extra Body B320 Negro",  presentacion: "1 lt", precio: 46900, imagen: IMG.B320_EXTRABODY,
    descripcion: "Sellador Extra Body B320 color negro. Alta viscosidad y cobertura.",
    caracteristicas: ["Sellador de alta viscosidad, excelente cobertura de porosidades", "Prepara la superficie para recibir el barniz, sin lijado previo del fondo", "Color negro, ideal para fondos muy oscuros"],
  },
  { id: 27, codigo: "32210", linea: "Sprint", categoria: "Selladores", nombre: "Sellador Extra Body B320 Blanco", presentacion: "1 lt", precio: 46900, imagen: IMG.B320_EXTRABODY,
    descripcion: "Sellador Extra Body B320 color blanco. Alta viscosidad y cobertura.",
    caracteristicas: ["Sellador de alta viscosidad, excelente cobertura de porosidades", "Prepara la superficie para recibir el barniz, sin lijado previo del fondo", "Color blanco, ideal para fondos claros"],
  },

  // ── ACELERANTES ──
  { id: 28, codigo: "V03", linea: "Sprint", categoria: "Acelerantes", nombre: "V03 Sprint Acelerante", presentacion: "200 ml", precio: 50200, imagen: IMG.SPRINTER,
    descripcion: "Acelerante Sprint para reducir tiempos de secado de barnices y primers.",
    caracteristicas: ["Reduce significativamente los tiempos de secado", "Compatible con barnices y primers de la línea Sprint / Mediun", "Uso en pequeñas dosis, no afecta el brillo final"],
  },

  // ── ACCESORIOS ──
  { id: 31, codigo: "PISTOLA", linea: "Sprint", categoria: "Accesorios", nombre: "Gladiator Gun — Pistola Aplicadora", presentacion: "Unidad", precio: 180000, imagen: IMG.PISTOLA,
    descripcion: "Pistola Gladiator Gun, se atornilla directamente a la botella. Ajustable, ergonómica y fácil de usar.",
    caracteristicas: ["Se atornilla directamente en la botella del producto, sin trasvasar", "Caudal y abanico ajustable, apta para barnices y primers", "Diseño ergonómico, liviana y fácil de limpiar"],
  },

  // ── LÍNEA TORO ──
  { id: 32, codigo: "001", linea: "Toro", categoria: "Diluyentes", nombre: "Thinner Universal",  presentacion: "20 lt", precio: 98000,  precioPromo: 83300,  imagen: "/toro/thinner.jpg",
    descripcion: "Para limpieza y aplicación de fondos. Secado normal. Sin materias primas recuperadas.",
    caracteristicas: ["Para limpieza de equipos y dilución de fondos", "Secado normal, sin materias primas recuperadas", "Bidón 20 lt de fabricación argentina"],
  },
  { id: 33, codigo: "003", linea: "Toro", categoria: "Diluyentes", nombre: "Desengrasante", presentacion: "20 lt", precio: 128000, precioPromo: 108800, imagen: "/toro/desengrasante.jpg",
    descripcion: "Para todo tipo de superficies. Secado rápido. Control de aplicación por beteado.",
    caracteristicas: ["Desengrasante rápido para todo tipo de superficies", "Beteado de evaporación para controlar aplicación correcta", "Sin materias primas recuperadas, bidón 20 lt"],
  },
  { id: 34, codigo: "010", linea: "Toro", categoria: "Diluyentes", nombre: "Diluyente", presentacion: "20 lt", precio: 228000, precioPromo: 193800, imagen: "/toro/diluyente.jpg",
    descripcion: "Para fondos, colores y barnices. Excelente nivelado y realzador de brillo.",
    caracteristicas: ["Para fondos, colores y barnices de alta calidad", "Excelente nivelado y efecto realzador de brillo", "Sin materias primas recuperadas, bidón 20 lt"],
  },
];

export const promociones = productos.filter((p) => p.precioPromo !== undefined);

export const categoriasSprint = [...new Set(
  productos.filter((p) => p.linea === "Sprint").map((p) => p.categoria)
)];
