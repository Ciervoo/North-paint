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

async function sendEmail(subject: string, message: string) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ALERTAS,
      user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: {
        to_email: "distribuidoranorthpaint@gmail.com",
        subject,
        message,
      },
    }),
  });
  if (!res.ok) throw new Error("EmailJS error: " + res.status + " " + await res.text());
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

    // Solo alertar productos que alguna vez fueron comprados
    const { data: comprasRows } = await sb.from("compras").select("pid");
    const pidsConActividad = new Set((comprasRows || []).map((c: { pid: string }) => c.pid));

    const stockBajo = Object.entries(STOCK_MINIMO)
      .filter(([pid, min]) => pidsConActividad.has(pid) && (stock[pid] ?? 0) <= min)
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

    // ── 4. Visitas programadas (hoy + próximos 7 días) ───────────
    const en7dias = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
    const { data: visitasProg } = await sb.from("visitas_programadas").select("*").gte("fecha", hoy).lte("fecha", en7dias).order("fecha", { ascending: true });
    const visitasHoyProg = visitasProg || [];

    // ── 5. Ventas de la semana (si es lunes) ─────────────────────
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

    partes.push(`North Paint — ${hoyArgentina()}\n`);

    // Stock bajo
    if (stockBajo.length > 0) {
      partes.push(`📦 STOCK BAJO`);
      stockBajo.forEach(p => {
        const emoji = p.cant === 0 ? "🔴" : "🟡";
        partes.push(`  ${emoji} ${p.nombre}: ${p.cant === 0 ? "SIN STOCK" : p.cant + " unid."}`);
      });
      partes.push("");
    }

    // Cobros pendientes
    if (totalDeuda > 0) {
      partes.push(`💰 COBROS PENDIENTES — ${fmt(totalDeuda)} total`);
      conDeuda.forEach((c: { nombre: string; deuda: number }) => {
        partes.push(`  • ${c.nombre}: ${fmt(c.deuda)}`);
      });
      const totalConDeuda = (clientes || []).filter((c: { deuda: number }) => Number(c.deuda) > 0).length;
      if (conDeuda.length < totalConDeuda) partes.push(`  (y ${totalConDeuda - conDeuda.length} más)`);
      partes.push("");
    }

    // Visitas programadas
    if (visitasHoyProg.length > 0) {
      partes.push(`📅 VISITAS PROGRAMADAS`);
      visitasHoyProg.forEach((v: { nombre_taller: string; dueno: string; vendedor: string; notas: string; fecha: string }) => {
        const esHoy = v.fecha === hoy;
        const [y, m, d] = v.fecha.split("-");
        const meses = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
        const fechaLabel = esHoy ? "HOY" : `${d} ${meses[parseInt(m)-1]}`;
        partes.push(`  ${esHoy ? "🔔" : "📌"} ${fechaLabel} — ${v.nombre_taller}${v.dueno ? ' (' + v.dueno + ')' : ''} · ${v.vendedor}`);
        if (v.notas) partes.push(`    ${v.notas}`);
      });
      partes.push("");
    }

    // Ventas del mes
    partes.push(`📈 MES ACTUAL`);
    partes.push(`  Ventas:   ${fmt(totalVentasMes)}`);
    partes.push(`  Ganancia: ${fmt(gananciasMes)} (${margenMes}%)`);
    if (ventasHoy > 0) partes.push(`  Hoy: ${ventasHoy} venta${ventasHoy > 1 ? "s" : ""}`);

    // Resumen semanal (lunes)
    if (resumenSemanal) {
      partes.push("");
      partes.push(resumenSemanal);
    }

    const mensaje = partes.join("\n");

    // Asunto dinámico
    const alertas = [];
    if (stockBajo.some(p => p.cant === 0)) alertas.push("sin stock");
    else if (stockBajo.length > 0) alertas.push("stock bajo");
    if (totalDeuda > 0) alertas.push("cobros pendientes");
    if (esLunes()) alertas.push("resumen semanal");
    if (visitasHoyProg.length > 0) alertas.push(`${visitasHoyProg.length} visita${visitasHoyProg.length > 1 ? "s" : ""} hoy`);
    const subject = alertas.length > 0
      ? `⚠️ North Paint — ${alertas.join(" · ")}`
      : `North Paint — Reporte diario`;

    // Si no hay nada urgente y no es lunes, no mandar
    const hayAlgo = stockBajo.length > 0 || totalDeuda > 0 || esLunes() || visitasHoyProg.length > 0;
    if (!hayAlgo) {
      return NextResponse.json({ ok: true, skipped: true, reason: "Nada urgente hoy" });
    }

    await sendEmail(subject, mensaje);

    return NextResponse.json({ ok: true, subject, mensaje });
  } catch (e) {
    console.error("[alertas]", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
