import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// Catálogo Sprint — para que Claude pueda matchear correctamente
const PRODUCTOS_SPRINT = [
  { id: "H62",       nombre: "Barniz H62 HS Secado Rapido",    unidad: "kit 7.5lt" },
  { id: "H67",       nombre: "Barniz H67 UHS GT",               unidad: "kit 1.5lt" },
  { id: "H69-1",     nombre: "Barniz H69 UHS Vantix Plus",      unidad: "kit 1.5lt" },
  { id: "H69-7",     nombre: "Barniz H69 UHS Vantix Plus",      unidad: "kit 7.5lt" },
  { id: "H59-1",     nombre: "Barniz H59 HS Curado Rapido",     unidad: "kit 1.5lt" },
  { id: "H59-7",     nombre: "Barniz H59 HS Curado Rapido",     unidad: "kit 7.5lt" },
  { id: "H77",       nombre: "Barniz H77 UHS Air-Wide",         unidad: "kit 1.5lt" },
  { id: "F40",       nombre: "Primer F40 5lt kit",              unidad: "kit 5lt"   },
  { id: "F56",       nombre: "Primer GT 2K 1.2lt kit",          unidad: "kit 1.2lt" },
  { id: "A14-1",     nombre: "Primer Nitro A14 Gris",           unidad: "1lt"       },
  { id: "A14-3",     nombre: "Primer Nitro A14 Gris",           unidad: "3lt"       },
  { id: "S99",       nombre: "Masilla Poliester S99 Blanca",    unidad: "1lt"       },
  { id: "S97",       nombre: "Masilla Poliester S97 Beige",     unidad: "1lt"       },
  { id: "S61",       nombre: "Masilla One Light S61",           unidad: "1lt"       },
  { id: "S61-3",     nombre: "Masilla One Light S61",           unidad: "3lt"       },
  { id: "S20",       nombre: "Masilla S20 Aluminio",            unidad: "1.35kg"    },
  { id: "B320",      nombre: "Sellador Extra Body B320",        unidad: "1lt"       },
  { id: "GLAD",      nombre: "Gladiator (soplete)",             unidad: "1lt"       },
  { id: "THINNER",   nombre: "Thinner Universal",               unidad: "20lt"      },
  { id: "DILUYENTE", nombre: "Diluyente Mediun",                unidad: "20lt"      },
  { id: "DILUYENTE-4", nombre: "Diluyente Mediun",              unidad: "4lt"       },
  { id: "DESENG",    nombre: "Desengrasante Mediun",            unidad: "20lt"      },
  { id: "DESENG-4",  nombre: "Desengrasante Mediun",            unidad: "4lt"       },
];

const PROMPT_EXTRACCION = `Sos un asistente para una distribuidora de pinturas automotrices argentina (North Paint / Mediun).
Te voy a dar el texto o imagen de una boleta de compra de uno de sus proveedores (Derblu o Tede).

Tu tarea: extraé los productos comprados con cantidad y precio unitario.

Catálogo disponible en Sprint (usá estos IDs exactos):
${PRODUCTOS_SPRINT.map(p => `- id:"${p.id}" → ${p.nombre} (${p.unidad})`).join('\n')}

Reglas:
- Devolvé SOLO JSON válido, sin markdown ni explicaciones. Formato: {"items":[...]}
- Cada item: {"pid":"ID_DEL_CATALOGO","nombre":"nombre descriptivo","unidad":"unidad","cantidad":N,"costoUnitario":N}
- Si un producto de la boleta no tiene ID en el catálogo, usá pid:"OTRO" y completá nombre y unidad manualmente
- cantidad debe ser un número (unidades compradas, no litros)
- costoUnitario en pesos argentinos sin puntos ni símbolos
- Si no podés determinar un campo con certeza, usá null`;

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY no configurada. Agregala en las variables de entorno de Vercel y en .env.local." },
      { status: 503 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No se recibió ningún archivo" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const client = new Anthropic({ apiKey });

    let messageContent: Anthropic.MessageParam["content"];

    if (file.type === "application/pdf") {
      // PDF → extraer texto → Claude text
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require("pdf-parse");
      const pdfData = await pdfParse(buffer);
      const texto = pdfData.text.slice(0, 8000); // límite razonable

      messageContent = [
        {
          type: "text",
          text: `${PROMPT_EXTRACCION}\n\nTexto extraído de la boleta PDF:\n---\n${texto}\n---`,
        },
      ];
    } else if (file.type.startsWith("image/")) {
      // Imagen → Claude Vision
      const base64 = buffer.toString("base64");
      const mediaType = file.type as "image/jpeg" | "image/png" | "image/gif" | "image/webp";

      messageContent = [
        {
          type: "text",
          text: PROMPT_EXTRACCION + "\n\nAcá está la imagen de la boleta:",
        },
        {
          type: "image",
          source: { type: "base64", media_type: mediaType, data: base64 },
        },
      ];
    } else {
      return NextResponse.json(
        { error: "Formato no soportado. Usá PDF, JPG o PNG." },
        { status: 400 }
      );
    }

    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      messages: [{ role: "user", content: messageContent }],
    });

    const rawText = response.content[0].type === "text" ? response.content[0].text : "";

    // Limpiar posible markdown code block
    const jsonStr = rawText.replace(/```json?\n?/g, "").replace(/```/g, "").trim();

    let parsed: { items: unknown[] };
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      return NextResponse.json(
        { error: "No pude parsear la respuesta del modelo", raw: rawText },
        { status: 422 }
      );
    }

    return NextResponse.json({ ok: true, items: parsed.items || [] });
  } catch (err) {
    console.error("[leer-boleta]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
