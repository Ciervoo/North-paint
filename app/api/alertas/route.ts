import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Catálogo de productos (nombres legibles)
const NOMBRES: Record<string, string> = {
  H62: "Barniz H62 HS 7.5lt", H67: "Barniz H67 UHS 1.5lt",
  "H69-1": "Barniz H69 UHS 1.5lt", "H69-7": "Barniz H69 UHS 7.5lt",
  "H59-1": "Barniz H59 HS 1.5lt", "H59-7": "Barniz H59 HS 7.5lt",
  H77: "Barniz H77 UHS 1.5lt", F40: "Primer F40 5lt",
  F56: "Primer GT 2K 1.2lt", "A14-1": "Primer Nitro A14 1lt",
  "A14-3": "Primer Nitro A14 3lt", S99: "Masilla S99 Blanca",
  S97: "Masilla S97 Beige", S61: "Masilla S61 1lt",
  "S61-3": "Masilla S61 3lt", S20: "Masilla S20 Aluminio",
  B320: "Sellador B320", GLAD: "Gladiator (soplete)",
  THINNER: "Thinner Universal 20lt", DILUYENTE: "Diluyente 20lt",
  "DILUYENTE-4": "Diluyente 4lt", DESENG: "Desengrasante 20lt",
  "DESENG-4": "Desengrasante 4lt",
};

const STOCK_MINIMO: Record<string, number> = {
  H62: 1, H67: 1, "H69-1": 1, "H69-7": 1,
  "H59-1": 1, "H59-7": 1, H77: 1,
  F40: 1, F56: 2, "A14-1": 2, "A14-3": 1,
  S99: 2, S97: 2, "S61-3": 2, S20: 1,
  B320: 2, THINNER: 1, DILUYENTE: 1,
  DESENG: 1, "DESENG-4": 1, "DILUYENTE-4": 1,
};

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString("es-AR");
}

function hoyArgentina() {
  return new Date().toLocaleDateString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    weekday: "long", day: "numeric", month: "long",
  });
}

function mesActual() {
  return new Date().toLocaleString("default", { timeZone: "America/Argentina/Buenos_Aires" })
    .slice(0, 7).replace(/(\d+)\/(\d+)\/(\d+).*/, "$3-$2");
}

function esLunes() {
  const d = new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires", weekday: "long" });
  return d === "Monday";
}

async function sendWhatsApp(mensaje: string) {
  const phone = process.env.CALLMEBOT_PHONE!;
  const apikey = process.env.CALLMEBOT_APIKEY!;
  if (!phone || !apikey) throw new Error("CALLMEBOT_PHONE o CALLMEBOT_APIKEY no configurados");
  const texto = encodeURIComponent(mensaje);
  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${texto}&apikey=${apikey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("CallMeBot error: " + res.status);
}

export async function GET(req: Request) {
  // Verificar que viene de Vercel Cron (seguridad básica)
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const hoy = new Date().toISOString().slice(0, 10);
    const mes = mesActual();

    // ── 1. Stock actual ──────────────────────────────────────────
    const { data: stockRows } = await sb.from("stock").select("*");
    const stock: Record<string, number> = {};
    (stockRows || []).forEach((r: { pid: string; cantidad: number }) => { stock[r.pid] = Number(r.cantidad); });

    const stockBajo = Object.entries(STOCK_MINIMO)
      .filter(([pid, min]) => (stock[pid] ?? 0) <= min)
      .map(([pid]) => ({ pid, nombre: NOMBRES[pid] || pid, cant: stock[pid] ?? 0 }));

    // ── 2. Ventas del mes ────────────────────────────────────────
    const { data: ventas } = await sb.from("ventas").select("*");
    const ventasMes = (ventas || []).filter((v: { fecha: string }) => v.fecha?.startsWith(mes));
    const totalVentasMes = ventasMes.reduce((a: number, v: { total: number }) => a + Number(v.total), 0);
    const gananciasMes = ventasMes.reduce((a: number, v: { total: number; costo: number }) => a + (Number(v.total) - Number(v.costo)), 0);
    const margenMes = totalVentasMes > 0 ? Math.round(gananciasMes / totalVentasMes * 100) : 0;
    const ventasHoy = ventasMes.filter((v: { fecha: string }) => v.fecha === hoy).length;

    // ── 3. Cobros pendientes ─────────────────────────────────────
    const { data: clientes } = await sb.from("clientes").select("id, nombre, deuda");
    const conDeuda = (clientes || [])
      .filter((c: { deuda: number }) => Number(c.deuda) > 0)
      .sort((a: { deuda: number }, b: { deuda: number }) => Number(b.deuda) - Number(a.deuda))
      .slice(0, 5);
    const totalDeuda = (clientes || []).reduce((a: number, c: { deuda: number }) => a + Number(c.deuda), 0);

    // ── 4. Ventas de la semana (si es lunes) ─────────────────────
    let resumenSemanal = "";
    if (esLunes()) {
      const hace7 = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
      const ventasSemana = (ventas || []).filter((v: { fecha: string }) => v.fecha >= hace7 && v.fecha < hoy);
      const tvSem = ventasSemana.reduce((a: number, v: { total: number }) => a + Number(v.total), 0);
      const tgSem = ventasSemana.reduce((a: number, v: { total: number; costo: number }) => a + (Number(v.total) - Number(v.costo)), 0);
      resumenSemanal = `\n📊 *Resumen semana anterior*\nVentas: ${fmt(tvSem)}\nGanancia: ${fmt(tgSem)} (${tvSem > 0 ? Math.round(tgSem / tvSem * 100) : 0}%)\nPedidos: ${ventasSemana.length}\n`;
    }

    // ── 5. Armar mensaje ─────────────────────────────────────────
    const partes: string[] = [];

    partes.push(`🎨 *North Paint — ${hoyArgentina()}*`);

    // Stock bajo
    if (stockBajo.length > 0) {
      partes.push(`\n📦 *STOCK BAJO*`);
      stockBajo.forEach(p => {
        const emoji = p.cant === 0 ? "🔴" : "🟡";
        partes.push(`${emoji} ${p.nombre}: ${p.cant === 0 ? "SIN STOCK" : p.cant + " unid."}`);
      });
    }

    // Cobros pendientes (solo si hay deuda significativa)
    if (totalDeuda > 0) {
      partes.push(`\n💰 *COBROS PENDIENTES* (${fmt(totalDeuda)} total)`);
      conDeuda.forEach((c: { nombre: string; deuda: number }) => {
        partes.push(`• ${c.nombre}: ${fmt(c.deuda)}`);
      });
      if (conDeuda.length < (clientes || []).filter((c: { deuda: number }) => Number(c.deuda) > 0).length) {
        partes.push(`  _(y otros más)_`);
      }
    }

    // Ventas del mes
    partes.push(`\n📈 *Mes actual*`);
    partes.push(`Ventas: ${fmt(totalVentasMes)}`);
    partes.push(`Ganancia: ${fmt(gananciasMes)} (${margenMes}%)`);
    if (ventasHoy > 0) partes.push(`Hoy: ${ventasHoy} venta${ventasHoy > 1 ? "s" : ""}`);

    // Resumen semanal (lunes)
    if (resumenSemanal) partes.push(resumenSemanal);

    partes.push(`\n_Sprint App — North Paint_`);

    const mensaje = partes.join("\n");

    // Si no hay nada urgente y no es lunes, no mandar
    const hayAlgo = stockBajo.length > 0 || totalDeuda > 0 || esLunes();
    if (!hayAlgo) {
      return NextResponse.json({ ok: true, skipped: true, reason: "Nada urgente hoy" });
    }

    await sendWhatsApp(mensaje);

    return NextResponse.json({ ok: true, mensaje });
  } catch (e) {
    console.error("[alertas]", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
