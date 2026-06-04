import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Mapeo de códigos de North Paint → IDs de productos en Sprint
const CODIGO_A_SPRINT: Record<string, string | null> = {
  H59: "H59-1",   "H59-7": "H59-7",
  H62: "H62",     H67: "H67",
  H69: "H69-1",   "H69-7": "H69-7",
  H77: "H77",     "H77-7": "H77",
  F46: "F40",     F47: "F40",     F48: "F40",     F49: "F40",
  F56: "F56",     F57: "F56",     F58: "F56",     F59: "F56",
  "PRIMER-GT": "F56",
  A14: "A14-1",
  S61: "S61-3",   S97: "S97",     S99: "S99",     S20: "S20",
  S35: null,      V03: null,
  "32010": "B320", "32110": "B320", "32210": "B320",
  PISTOLA: "GLAD",
  "001": "THINNER", "003": "DESENG", "010": "DILUYENTE",
};

const SPRINT_COSTOS: Record<string, number> = {
  H62: 184268,  H67: 45305,   "H69-1": 69000,  "H69-7": 316095,
  "H59-1": 55705, "H59-7": 264420, H77: 58266,  F40: 141102,
  F56: 42250,   "A14-1": 27950, "S61-3": 55153,
  S99: 32695,   S97: 32695,   S20: 31525,
  B320: 30485,  GLAD: 68250,
  THINNER: 55035, DILUYENTE: 82898, DESENG: 52502,
};

type CartItem = {
  codigo: string;
  nombre: string;
  presentacion: string;
  cantidad: number;
  precio: number;
  precioPromo?: number;
};

type CheckoutForm = {
  nombre: string;
  telefono: string;
  email?: string;
  direccion: string;
  localidad: string;
  notas?: string;
};

/** Normaliza teléfono para comparación: solo dígitos */
function normalizarTel(tel: string): string {
  return tel.replace(/\D/g, "");
}

export async function POST(req: Request) {
  const { form, items }: { form: CheckoutForm; items: CartItem[] } =
    await req.json();

  try {
    const fecha = new Date().toISOString().slice(0, 10);
    const baseId = Date.now();
    const telNorm = normalizarTel(form.telefono);

    // ── 1. Buscar taller/cliente existente ──────────────────────────────
    // Busca por teléfono normalizado (solo dígitos) para tolerar distintos formatos
    const { data: todos } = await sb
      .from("clientes")
      .select("id, deuda, tel, nombre");

    const clExistente = (todos || []).find(
      (c) => normalizarTel(c.tel || "") === telNorm && telNorm.length >= 8
    );

    let clienteId: string;
    let deudaActual = 0;

    if (clExistente) {
      // Taller existente → actualizar datos con los del pedido web
      clienteId = clExistente.id;
      deudaActual = Number(clExistente.deuda) || 0;
      await sb
        .from("clientes")
        .update({
          nombre: form.nombre,          // actualiza nombre por si cambió
          zona: form.localidad,
          dir: form.direccion,
        })
        .eq("id", clienteId);
      console.log(`[pedido-web] Cliente existente: ${clExistente.nombre} → ${form.nombre} (id: ${clienteId})`);
    } else {
      // Cliente nuevo → crearlo con los datos del checkout
      clienteId = `web-${baseId}`;
      const { error } = await sb.from("clientes").insert({
        id: clienteId,
        nombre: form.nombre,
        tel: form.telefono.trim(),
        zona: form.localidad,
        dir: form.direccion,
        contacto: form.email || "",
        deuda: 0,
      });
      if (error) throw new Error("crear cliente: " + error.message);
      console.log(`[pedido-web] Nuevo cliente creado: ${form.nombre} (id: ${clienteId})`);
    }

    // ── 2. Armar ventas ─────────────────────────────────────────────────
    const sinMapeo: string[] = [];
    const ventasParaInsertar: object[] = [];
    const stockUpdates: { pid: string; delta: number }[] = [];
    let totalDeuda = 0;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const pid = CODIGO_A_SPRINT[item.codigo];

      if (!pid) {
        sinMapeo.push(`${item.nombre} ${item.presentacion} ×${item.cantidad}`);
        continue;
      }

      const precioUnit = item.precioPromo ?? item.precio;
      const total = precioUnit * item.cantidad;
      const costo = (SPRINT_COSTOS[pid] || 0) * item.cantidad;

      const notas = [
        `Web · ${item.nombre} ${item.presentacion}`,
        sinMapeo.length ? `Sin stock: ${sinMapeo.join(", ")}` : "",
        form.notas || "",
      ].filter(Boolean).join(" | ");

      ventasParaInsertar.push({
        id: baseId + i,
        cid: clienteId,
        pid,
        cant: item.cantidad,
        precio: precioUnit,
        total,
        costo,
        pago: "Transferencia",
        fecha,
        notas,
        cobrado: 0,
        entregado: false,
        origen: "web",
      });

      stockUpdates.push({ pid, delta: -item.cantidad });
      totalDeuda += total;
    }

    // ── 3. Insertar ventas ──────────────────────────────────────────────
    if (ventasParaInsertar.length) {
      const { error } = await sb.from("ventas").insert(ventasParaInsertar);
      if (error) throw new Error("insertar ventas: " + error.message);
    }

    // ── 4. Actualizar stock ─────────────────────────────────────────────
    for (const { pid, delta } of stockUpdates) {
      const { data: stockRow } = await sb
        .from("stock").select("cantidad").eq("pid", pid).maybeSingle();
      await sb.from("stock").upsert(
        { pid, cantidad: (Number(stockRow?.cantidad) || 0) + delta },
        { onConflict: "pid" }
      );
    }

    // ── 5. Actualizar deuda ─────────────────────────────────────────────
    if (totalDeuda > 0) {
      await sb
        .from("clientes")
        .update({ deuda: deudaActual + totalDeuda })
        .eq("id", clienteId);
    }

    if (sinMapeo.length) {
      console.log(`[pedido-web] Sin mapeo en Sprint:`, sinMapeo);
    }

    return NextResponse.json({ ok: true, clienteId, ventas: ventasParaInsertar.length });
  } catch (e) {
    console.error("[pedido-web] Error:", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
