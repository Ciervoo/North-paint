import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const hace30 = new Date(Date.now() - 30 * 86400000).toISOString();

    const { data: eventos } = await sb
      .from("eventos")
      .select("*")
      .gte("created_at", hace30)
      .order("created_at", { ascending: false });

    const ev = eventos || [];

    // ── Sesiones únicas (visitantes)
    const sesiones = new Set(ev.filter(e => e.sesion).map(e => e.sesion));
    const visitantes = sesiones.size;

    // ── Por tipo
    const contar = (tipo: string) => ev.filter(e => e.tipo === tipo).length;
    const contarSesiones = (tipo: string) =>
      new Set(ev.filter(e => e.tipo === tipo && e.sesion).map(e => e.sesion)).size;

    const pageViews      = contar("page_view");
    const productViews   = contar("product_view");
    const addToCart      = contar("add_to_cart");
    const cartOpen       = contar("cart_open");
    const checkoutStart  = contar("checkout_start");
    const pedidos        = contar("checkout_complete");

    // ── Sesiones únicas por etapa del funnel
    const funnelVisitantes    = contarSesiones("page_view");
    const funnelProductView   = contarSesiones("product_view");
    const funnelCart          = contarSesiones("add_to_cart");
    const funnelCheckout      = contarSesiones("checkout_start");
    const funnelPedidos       = contarSesiones("checkout_complete");

    // ── Dispositivos
    const mobile  = ev.filter(e => e.tipo === "page_view" && e.dispositivo === "mobile").length;
    const desktop = ev.filter(e => e.tipo === "page_view" && e.dispositivo === "desktop").length;

    // ── Top productos vistos
    const vistoMap: Record<string, number> = {};
    ev.filter(e => e.tipo === "product_view" && e.producto).forEach(e => {
      vistoMap[e.producto] = (vistoMap[e.producto] || 0) + 1;
    });
    const topVistos = Object.entries(vistoMap).sort((a, b) => b[1] - a[1]).slice(0, 8);

    // ── Top productos al carrito
    const carritoMap: Record<string, number> = {};
    ev.filter(e => e.tipo === "add_to_cart" && e.producto).forEach(e => {
      carritoMap[e.producto] = (carritoMap[e.producto] || 0) + 1;
    });
    const topCarrito = Object.entries(carritoMap).sort((a, b) => b[1] - a[1]).slice(0, 8);

    // ── Visitas por día (últimos 30)
    const porDia: Record<string, number> = {};
    ev.filter(e => e.tipo === "page_view").forEach(e => {
      const dia = e.created_at.slice(0, 10);
      porDia[dia] = (porDia[dia] || 0) + 1;
    });
    // Rellenar días sin datos
    const diasSeries: { fecha: string; vistas: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      diasSeries.push({ fecha: d, vistas: porDia[d] || 0 });
    }

    // ── Páginas más vistas
    const paginaMap: Record<string, number> = {};
    ev.filter(e => e.tipo === "page_view" && e.pagina).forEach(e => {
      paginaMap[e.pagina] = (paginaMap[e.pagina] || 0) + 1;
    });
    const topPaginas = Object.entries(paginaMap).sort((a, b) => b[1] - a[1]).slice(0, 6);

    return NextResponse.json({
      visitantes, pageViews, productViews, addToCart, cartOpen, checkoutStart, pedidos,
      funnel: { visitantes: funnelVisitantes, productView: funnelProductView, cart: funnelCart, checkout: funnelCheckout, pedidos: funnelPedidos },
      dispositivos: { mobile, desktop },
      topVistos, topCarrito, diasSeries, topPaginas,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
