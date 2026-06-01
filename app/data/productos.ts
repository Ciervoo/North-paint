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
  { id: 1,  codigo: "H59",    linea: "Sprint", categoria: "Barnices", nombre: "Kit Barniz H59 HS Sprint-Air GT Clear", presentacion: "Kit 1,5 lt", precio: 85700,  imagen: IMG.H59,  descripcion: "Barniz alto sólidos curado rápido 2:1. Kit incluye catalizador." },
  { id: 2,  codigo: "H59-7",  linea: "Sprint", categoria: "Barnices", nombre: "Kit Barniz H59 HS Sprint-Air GT Clear", presentacion: "Kit 7,5 lt", precio: 406800, imagen: IMG.H59,  descripcion: "Barniz HS curado rápido, presentación profesional. Incluye catalizador." },
  { id: 3,  codigo: "H62",    linea: "Sprint", categoria: "Barnices", nombre: "Kit Barniz H62 HS Fast Anti-Rayado",    presentacion: "Kit 7,5 lt", precio: 283950, precioPromo: 239000, imagen: IMG.H62, descripcion: "Barniz HS secado rápido con resistencia a rayaduras. Incluye catalizador." },
  { id: 4,  codigo: "H69",    linea: "Sprint", categoria: "Barnices", nombre: "Kit Barniz H69 UHS Vantix Plus",        presentacion: "Kit 1,5 lt", precio: 106150, imagen: IMG.H69,  descripcion: "Ultra alto sólidos, máximo brillo y profundidad 2:1. Incluye catalizador." },
  { id: 5,  codigo: "H69-7",  linea: "Sprint", categoria: "Barnices", nombre: "Kit Barniz H69 UHS Vantix Plus",        presentacion: "Kit 7,5 lt", precio: 486300, imagen: IMG.H69,  descripcion: "Ultra alto sólidos Vantix Plus profesional. Incluye catalizador." },
  { id: 6,  codigo: "H77",    linea: "Sprint", categoria: "Barnices", nombre: "Kit Barniz H77 UHS Air-Wide",           presentacion: "Kit 1,5 lt", precio: 89640,  imagen: IMG.H77,  descripcion: "Barniz UHS secado rápido, amplia ventana de aplicación. Incluye catalizador." },
  { id: 7,  codigo: "H77-7",  linea: "Sprint", categoria: "Barnices", nombre: "Kit Barniz H77 UHS Air-Wide",           presentacion: "Kit 7,5 lt", precio: 448200, imagen: IMG.H77,  descripcion: "Barniz UHS Air-Wide presentación profesional. Incluye catalizador." },
  { id: 8,  codigo: "H67",    linea: "Sprint", categoria: "Barnices", nombre: "Kit Barniz H67 UHS GT",                 presentacion: "Kit 1,5 lt", precio: 69700,  imagen: IMG.H67,  descripcion: "Ultra alto sólidos tecnología GT. Incluye catalizador." },

  // =
  //  PRIMERS 4:1 — F46/F47/F48/F49
  // =
  { id: 9,  codigo: "F46", linea: "Sprint", categoria: "Primers 4:1", nombre: "Primer F46 Blanco 4:1",      presentacion: "Kit 5 lt", precio: 217080, precioPromo: 169000, imagen: IMG.PRIMER_4K, descripcion: "Primer aparejo GT 4:1 color blanco. Alta adherencia, gran relleno. Kit incluye catalizador." },
  { id: 10, codigo: "F47", linea: "Sprint", categoria: "Primers 4:1", nombre: "Primer F47 Gris Claro 4:1",  presentacion: "Kit 5 lt", precio: 217080, precioPromo: 169000, imagen: IMG.PRIMER_4K, descripcion: "Primer aparejo GT 4:1 color gris claro. Alta adherencia, gran relleno. Kit incluye catalizador." },
  { id: 11, codigo: "F48", linea: "Sprint", categoria: "Primers 4:1", nombre: "Primer F48 Gris Oscuro 4:1", presentacion: "Kit 5 lt", precio: 217080, precioPromo: 169000, imagen: IMG.PRIMER_4K, descripcion: "Primer aparejo GT 4:1 color gris oscuro. Alta adherencia, gran relleno. Kit incluye catalizador." },
  { id: 12, codigo: "F49", linea: "Sprint", categoria: "Primers 4:1", nombre: "Primer F49 Negro 4:1",        presentacion: "Kit 5 lt", precio: 217080, precioPromo: 169000, imagen: IMG.PRIMER_4K, descripcion: "Primer aparejo GT 4:1 color negro. Alta adherencia, gran relleno. Kit incluye catalizador." },

  // =
  //  PRIMERS 5:1 2K — F56/F57/F58/F59
  // =
  { id: 13, codigo: "F56", linea: "Sprint", categoria: "Primers 5:1", nombre: "Primer F56 Blanco 5:1 2K",     presentacion: "Kit 1,2 lt", precio: 65000, imagen: IMG.PRIMER_5K, descripcion: "Primer GT 2K HS 5:1 color blanco. Excelente relleno y nivelado. Kit incluye catalizador." },
  { id: 14, codigo: "F57", linea: "Sprint", categoria: "Primers 5:1", nombre: "Primer F57 Gris Claro 5:1 2K", presentacion: "Kit 1,2 lt", precio: 65000, imagen: IMG.PRIMER_5K, descripcion: "Primer GT 2K HS 5:1 color gris claro. Excelente relleno y nivelado. Kit incluye catalizador." },
  { id: 15, codigo: "F58", linea: "Sprint", categoria: "Primers 5:1", nombre: "Primer F58 Gris Oscuro 5:1 2K", presentacion: "Kit 1,2 lt", precio: 65000, imagen: IMG.PRIMER_5K, descripcion: "Primer GT 2K HS 5:1 color gris oscuro. Excelente relleno y nivelado. Kit incluye catalizador." },
  { id: 16, codigo: "F59", linea: "Sprint", categoria: "Primers 5:1", nombre: "Primer F59 Negro 5:1 2K",       presentacion: "Kit 1,2 lt", precio: 65000, imagen: IMG.PRIMER_5K, descripcion: "Primer GT 2K HS 5:1 color negro. Excelente relleno y nivelado. Kit incluye catalizador." },

  // =
  //  KIT PRIMERS
  // =
  { id: 17, codigo: "PRIMER-GT", linea: "Sprint", categoria: "Primers 4:1", nombre: "Kit Primer GT 4:1",      presentacion: "Kit 1,2 lt (primer + cat.)", precio: 65000, imagen: IMG.PRIMER_4K, descripcion: "Kit primer GT 4:1 listo para usar. Incluye catalizador. Varios colores." },
  { id: 19, codigo: "A14",       linea: "Sprint", categoria: "Primers 5:1", nombre: "Primer Surfacer Nitro A14", presentacion: "1 lt",                   precio: 84850, imagen: IMG.A14, descripcion: "Primer surfacer nitro, excelente nivelado. Listo para lijar." },

  // =
  //  MASILLAS
  // =
  { id: 20, codigo: "S61", linea: "Sprint", categoria: "Masillas", nombre: "Masilla One Light S61 Yellow", presentacion: "3 lt",    precio: 93000,  precioPromo: 74900, imagen: IMG.S61, descripcion: "Masilla ligera, fácil lijado y acabado liso. Alta capacidad de relleno." },
  { id: 21, codigo: "S97", linea: "Sprint", categoria: "Masillas", nombre: "Masilla Poliéster S97 Beige",  presentacion: "1 lt",    precio: 46900,  imagen: IMG.S97, descripcion: "Masilla poliéster beige de uso universal, alta capacidad de relleno." },
  { id: 22, codigo: "S99", linea: "Sprint", categoria: "Masillas", nombre: "Masilla Poliéster S99 Blanca", presentacion: "1 lt",    precio: 50300,  precioPromo: 42900, imagen: IMG.S97, descripcion: "Masilla poliéster blanca, acabado suave y fácil aplicación." },
  { id: 23, codigo: "S20", linea: "Sprint", categoria: "Masillas", nombre: "Masilla S20 Aluminio",         presentacion: "1 lt",    precio: 49200,  imagen: IMG.S20, descripcion: "Masilla con aluminio, resistente a altas temperaturas." },
  { id: 24, codigo: "S35", linea: "Sprint", categoria: "Masillas", nombre: "Masilla S35 Plásticos",        presentacion: "1 lt",    precio: 49200,  imagen: IMG.S35, descripcion: "Masilla especial para plásticos, excelente adherencia y flexibilidad." },

  // =
  //  SELLADORES
  // =
  { id: 25, codigo: "32010", linea: "Sprint", categoria: "Selladores", nombre: "Sellador Extra Body B320 Gris",   presentacion: "1 lt", precio: 46900, imagen: IMG.B320_EXTRABODY, descripcion: "Sellador Extra Body B320 color gris. Alta viscosidad y cobertura." },
  { id: 26, codigo: "32110", linea: "Sprint", categoria: "Selladores", nombre: "Sellador Extra Body B320 Negro",  presentacion: "1 lt", precio: 46900, imagen: IMG.B320_EXTRABODY, descripcion: "Sellador Extra Body B320 color negro. Alta viscosidad y cobertura." },
  { id: 27, codigo: "32210", linea: "Sprint", categoria: "Selladores", nombre: "Sellador Extra Body B320 Blanco", presentacion: "1 lt", precio: 46900, imagen: IMG.B320_EXTRABODY, descripcion: "Sellador Extra Body B320 color blanco. Alta viscosidad y cobertura." },

  // =
  //  ACELERANTES
  // =
  { id: 28, codigo: "V03", linea: "Sprint", categoria: "Acelerantes", nombre: "V03 Sprint Acelerante", presentacion: "200 ml", precio: 50200, imagen: IMG.SPRINTER, descripcion: "Acelerante Sprint para reducir tiempos de secado de barnices y primers." },

  // =
  //  ACCESORIOS
  // =
  { id: 31, codigo: "PISTOLA", linea: "Sprint", categoria: "Accesorios", nombre: "Gladiator Gun — Pistola Aplicadora", presentacion: "Unidad", precio: 180000, imagen: IMG.PISTOLA, descripcion: "Pistola Gladiator Gun, se atornilla directamente a la botella. Ajustable, ergonómica y fácil de usar." },

  // =
  //  LÍNEA TORO
  // =
  { id: 32, codigo: "001", linea: "Toro", categoria: "Diluyentes", nombre: "Thinner Universal",  presentacion: "20 lt", precio: 98000,  precioPromo: 83300,  imagen: "/toro/thinner.jpg",      descripcion: "Para limpieza y aplicación de fondos. Secado normal. Sin materias primas recuperadas." },
  { id: 33, codigo: "003", linea: "Toro", categoria: "Diluyentes", nombre: "Desengrasante",       presentacion: "20 lt", precio: 128000, precioPromo: 108800, imagen: "/toro/desengrasante.jpg", descripcion: "Para todo tipo de superficies. Secado rápido. Control de aplicación por beteado." },
  { id: 34, codigo: "010", linea: "Toro", categoria: "Diluyentes", nombre: "Diluyente",           presentacion: "20 lt", precio: 228000, precioPromo: 193800, imagen: "/toro/diluyente.jpg",     descripcion: "Para fondos, colores y barnices. Excelente nivelado y realzador de brillo." },
];

export const promociones = productos.filter((p) => p.precioPromo !== undefined);

export const categoriasSprint = [...new Set(
  productos.filter((p) => p.linea === "Sprint").map((p) => p.categoria)
)];
