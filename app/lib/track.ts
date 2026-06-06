"use client";

function getSession(): string {
  if (typeof window === "undefined") return "";
  let s = localStorage.getItem("np_sid");
  if (!s) {
    s = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("np_sid", s);
  }
  return s;
}

export async function track(
  tipo: string,
  data?: { producto?: string; pagina?: string }
) {
  try {
    const dispositivo = /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)
      ? "mobile"
      : "desktop";
    await fetch("/api/evento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo,
        sesion: getSession(),
        dispositivo,
        pagina: data?.pagina ?? window.location.pathname,
        producto: data?.producto ?? null,
        referrer: document.referrer || null,
      }),
    });
  } catch {
    // nunca romper la UX
  }
}
