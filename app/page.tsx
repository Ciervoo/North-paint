"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import HeroWrapper from "./components/HeroWrapper";
import PromoSection from "./components/PromoSection";
import CountUp from "./components/CountUp";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.7, ease: "easeOut" as const } },
};
const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.7, ease: "easeOut" as const } },
};
const stagger: Variants = {
  show: { transition: { staggerChildren: 0.12 } },
};
const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden" style={{ overflowX: "hidden" }}>

      {/* - HEADER - */}
      <header style={{ backgroundColor: "var(--north-blue)" }}
        className="text-white py-3 px-6 flex items-center justify-between shadow-lg sticky top-0 z-30 backdrop-blur">
        <Link href="/" className="flex items-center">
          <div className="bg-white rounded-lg px-3 py-1.5">
            <img src="/logo.jpg" alt="North Paint" className="h-9 w-auto object-contain" />
          </div>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4 text-sm font-bold">
          <Link href="/catalogo"
            style={{ backgroundColor: "var(--north-yellow)" }}
            className="px-4 sm:px-5 py-2 rounded-full text-white hover:opacity-90 transition-opacity shadow text-xs sm:text-sm">
            <span className="hidden sm:inline">Ver </span>Catálogo
          </Link>
          <Link href="/checkout" className="hover:text-yellow-300 transition-colors text-xs sm:text-sm">
            🛒 <span className="hidden sm:inline">Mi pedido</span>
          </Link>
        </nav>
      </header>

      {/* - HERO - */}
      <section style={{ background: "linear-gradient(160deg, #060e1c 0%, #0f2540 60%, #1a3a62 100%)" }}
        className="relative overflow-hidden px-4 pt-10 pb-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #f5a623 0%, transparent 70%)", filter: "blur(60px)" }} />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Animación Remotion — solo desktop */}
          <div className="hidden md:block">
            <HeroWrapper />
          </div>

          {/* Hero estático — solo mobile */}
          <div className="flex flex-col items-center text-center md:hidden py-6 gap-4">
            <div className="bg-white rounded-xl px-4 py-2 shadow-xl">
              <img src="/logo.jpg" alt="North Paint" className="h-12 w-auto object-contain" />
            </div>
            <h1 className="text-2xl font-black text-white leading-tight">Distribuidora<br />North Paint</h1>
            <div className="h-1 w-24 rounded" style={{ background: "linear-gradient(90deg,#f5a623,#ffd27f)" }} />
            <p className="text-gray-300 text-xs tracking-widest uppercase">Pinturas automotrices · Haedo, Bs. As.</p>
            <div className="flex gap-2 flex-wrap justify-center mt-1">
              {["🎨 Línea Sprint","🐂 Línea Toro","🚚 Entrega GBA"].map(b => (
                <span key={b} className="text-xs font-bold px-3 py-1.5 rounded-full text-white border border-white/30 bg-white/10">{b}</span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 flex-wrap justify-center mt-8 anim-fade-up delay-300">
            <Link href="/catalogo"
              style={{ background: "linear-gradient(135deg, #f5a623, #e08b0a)" }}
              className="px-7 sm:px-9 py-3 sm:py-4 rounded-full font-black text-white text-sm sm:text-base shadow-2xl hover:scale-105 transition-all">
              🛒 Ver Catálogo Completo
            </Link>
            <a href="https://wa.me/5491168592507"
              className="px-7 sm:px-9 py-3 sm:py-4 rounded-full font-black text-white text-sm sm:text-base border-2 border-white/40 hover:bg-white/10 transition-all backdrop-blur-sm">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* - STATS BAR - */}
      <section style={{ background: "linear-gradient(90deg, #f5a623, #e08b0a)" }} className="py-5 px-6">
        <motion.div
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          {[
            { num: "2+", label: "Años en el mercado" },
            { num: "50+", label: "Productos disponibles" },
            { num: "GBA", label: "Zona de entrega" },
            { num: "100%", label: "Calidad garantizada" },
          ].map((s) => (
            <motion.div key={s.label} variants={cardVariant}>
              <p className="text-3xl font-black text-white drop-shadow">
                <CountUp end={s.num} />
              </p>
              <p className="text-yellow-100 text-xs font-semibold mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* - PROMOS - */}
      <PromoSection />

      {/* - LÍNEAS — showcase - */}
      <section style={{ background: "#060e1c" }}>

        {/* Sprint */}
        <div style={{ background: "#060e1c" }} className="px-6 py-12">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <motion.div className="flex-1 text-center md:text-left order-2 md:order-1"
              variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <span className="text-xs font-black uppercase tracking-widest text-yellow-400 mb-2 block">Pintura automotriz</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                🎨 Línea<br /><span className="shimmer-text">Sprint</span>
              </h2>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed max-w-sm mx-auto md:mx-0">
                Barnices HS/UHS, primers 2K, masillas, selladores y acelerantes profesionales.
              </p>
              <Link href="/catalogo?linea=Sprint"
                style={{ backgroundColor: "var(--north-yellow)" }}
                className="inline-block px-7 py-3 rounded-full font-black text-white hover:scale-105 transition-transform shadow-lg">
                Ver Línea Sprint →
              </Link>
            </motion.div>
            <motion.div className="flex-1 flex items-center justify-center order-1 md:order-2 relative"
              variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <img src="https://www.icriberica.com/wp-content/uploads/2024/10/H69-5L.jpg"
                alt="Línea Sprint"
                className="w-56 md:w-72 object-contain" />
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse at center, transparent 38%, #060e1c 68%)"
              }} />
            </motion.div>
          </div>
        </div>

        {/* Toro */}
        <div style={{ background: "#1a0505" }} className="px-6 py-12">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <motion.div className="flex-1 flex items-center justify-center order-1 relative"
              variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <img src="/toro/diluyente.jpg"
                alt="Línea Toro"
                className="w-56 md:w-72 object-contain anim-float" />
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse at center, transparent 38%, #1a0505 68%)"
              }} />
            </motion.div>
            <motion.div className="flex-1 text-center md:text-left order-2"
              variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <span className="text-xs font-black uppercase tracking-widest text-red-400 mb-2 block">Producto argentino</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                🐂 Línea<br /><span style={{ color: "#ef4444" }}>Toro</span>
              </h2>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed max-w-sm mx-auto md:mx-0">
                Thinner, desengrasante y diluyente en bidones de 20 litros. Sin materias primas recuperadas.
              </p>
              <Link href="/catalogo?linea=Toro"
                style={{ backgroundColor: "#dc2626" }}
                className="inline-block px-7 py-3 rounded-full font-black text-white hover:scale-105 transition-transform shadow-lg">
                Ver Línea Toro →
              </Link>
            </motion.div>
          </div>
        </div>

      </section>

      {/* - PRODUCTOS DESTACADOS - */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-8"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-1" style={{ color: "var(--north-blue)" }}>Los más elegidos</h2>
            <p className="text-gray-400 text-sm">Deslizá para ver más →</p>
          </motion.div>
          <motion.div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {[
              { nombre: "H69 UHS Vantix Plus",        precio: "$106.150", img: "https://www.icriberica.com/wp-content/uploads/2024/10/H69-5L.jpg",         promo: false },
              { nombre: "H62 HS Anti-Rayado",          precio: "$239.000", img: "https://www.icriberica.com/wp-content/uploads/2024/09/H62-5L.jpg",         promo: true  },
              { nombre: "H77 UHS Air-Wide",            precio: "$89.640",  img: "https://www.icriberica.com/wp-content/uploads/2025/07/H77-5L-159x300.png", promo: false },
              { nombre: "Kit Primer F56 5:1 2K",       precio: "$65.000",  img: "https://www.icriberica.com/wp-content/uploads/2024/09/F77-1L.jpg",         promo: false },
              { nombre: "Masilla One Light S61",        precio: "$74.900",  img: "/sprint/masilla-s61.jpg",                                                  promo: true  },
              { nombre: "Sellador Extra Body B320",     precio: "$46.900",  img: "/sprint/b320-extrabody.jpg",                                               promo: false },
              { nombre: "Diluyente Toro 20L",           precio: "$193.800", img: "/toro/diluyente.jpg",                                                      promo: true  },
              { nombre: "Desengrasante Toro 20L",       precio: "$108.800", img: "/toro/desengrasante.jpg",                                                  promo: true  },
            ].map((p) => (
              <motion.div key={p.nombre} variants={cardVariant} whileHover={{ y: -6, scale: 1.03 }} transition={{ duration: 0.2 }}>
                <Link href="/catalogo"
                  className="snap-start flex-shrink-0 w-44 bg-white rounded-2xl overflow-hidden border block"
                  style={{ borderColor: p.promo ? "var(--north-yellow)" : "#e5e7eb", borderWidth: p.promo ? 2 : 1 }}>
                  {p.promo && (
                    <div className="bg-red-500 text-white text-xs font-black text-center py-1">🔥 PROMO</div>
                  )}
                  <div className="h-28 bg-gray-50 flex items-center justify-center p-2">
                    <img src={p.img} alt={p.nombre} className="h-full w-full object-contain" />
                  </div>
                  <div className="p-3">
                    <p className="font-black text-xs text-gray-800 leading-tight">{p.nombre}</p>
                    <p className="font-black text-sm mt-2" style={{ color: "var(--north-yellow)" }}>{p.precio}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* - POR QUÉ ELEGIRNOS - */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.h2 className="text-3xl font-black text-center mb-10" style={{ color: "var(--north-blue)" }}
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            ¿Por qué elegirnos?
          </motion.h2>
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-5"
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {[
              { icon: "🏆", title: "Calidad", desc: "Marcas líderes del mercado" },
              { icon: "🚚", title: "Entrega GBA", desc: "Rápido y seguro a tu taller" },
              { icon: "💰", title: "Precio real", desc: "Directo del distribuidor" },
              { icon: "📱", title: "24hs online", desc: "Pedí cuando quieras" },
            ].map((f) => (
              <motion.div key={f.title} variants={cardVariant}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(30,58,95,0.12)" }}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-gray-100 text-center cursor-default">
                <motion.div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl"
                  style={{ backgroundColor: "rgba(245,166,35,0.12)" }}
                  whileHover={{ scale: 1.2, rotate: 8 }} transition={{ type: "spring", stiffness: 300 }}>
                  {f.icon}
                </motion.div>
                <p className="font-black text-sm" style={{ color: "var(--north-blue)" }}>{f.title}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* - CTA FINAL - */}
      <section className="py-16 px-6 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f2540 0%, #1e3a5f 50%, #25507a 100%)" }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #f5a623 0%, transparent 50%), radial-gradient(circle at 80% 50%, #60a5fa 0%, transparent 50%)" }} />

        {/* Círculos decorativos */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 w-28 h-28 rounded-full hidden md:block opacity-10 border-4 border-yellow-400" />
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full hidden md:block opacity-10 border-4 border-blue-300" />

        <motion.div className="relative z-10 max-w-lg mx-auto"
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="text-white font-black text-3xl mb-2">¿Listo para pintar?</p>
          <p className="text-blue-300 text-sm mb-8">Hacé tu pedido ahora y te contactamos a la brevedad</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
              <Link href="/catalogo"
                style={{ background: "linear-gradient(135deg, #f5a623, #e08b0a)" }}
                className="block px-8 py-4 rounded-full font-black text-white shadow-xl text-base text-center">
                🛒 Ir al Catálogo
              </Link>
            </motion.div>
            <motion.a href="https://wa.me/5491168592507"
              whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-full font-black text-white border-2 border-white/40 hover:bg-white/10 transition-colors text-base text-center">
              💬 11 6859-2507
            </motion.a>
          </div>
          <p className="text-blue-400 text-xs mt-6">📍 Colombres 785, M.J. Haedo, Pcia. de Bs.As.</p>
        </motion.div>
      </section>

      <footer className="text-center py-4 text-xs text-gray-400 bg-gray-100">
        © {new Date().getFullYear()} Distribuidora North Paint — Todos los derechos reservados
      </footer>
    </main>
  );
}
