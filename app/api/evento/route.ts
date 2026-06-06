import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tipo, sesion, dispositivo, pagina, producto, referrer } = body;
    if (!tipo) return NextResponse.json({ error: "tipo requerido" }, { status: 400 });

    await sb.from("eventos").insert({
      tipo,
      sesion: sesion || null,
      dispositivo: dispositivo || null,
      pagina: pagina || null,
      producto: producto || null,
      referrer: referrer || null,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
