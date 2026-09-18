import BotonWhatsApp from "./BotonWhatsApp";

/** Mismo lockup tipográfico que el logo: "REPAR" en Alfa Slab + ".ar" en itálica. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a
      href="#top"
      className={`font-marca leading-none text-naranja tracking-[-.02em] no-underline whitespace-nowrap ${className}`}
    >
      REPAR<i className="font-texto font-bold text-white">.ar</i>
    </a>
  );
}

const secciones = [
  { href: "#servicios", texto: "Servicios" },
  { href: "#trabajos", texto: "Trabajos" },
  { href: "#condiciones", texto: "Presupuesto" },
  { href: "#talleres", texto: "Talleres" },
];

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 bg-negro border-b-[3px] border-naranja">
      <div className="w-full max-w-[1120px] mx-auto px-5 flex items-center gap-4 h-16">
        <Wordmark className="text-[26px]" />

        <nav
          aria-label="Secciones"
          className="hidden min-[820px]:flex ml-auto gap-[22px]"
        >
          {secciones.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="font-display font-bold text-[19px] text-[#F5F0E8] no-underline hover:text-naranja"
            >
              {s.texto}
            </a>
          ))}
        </nav>

        <BotonWhatsApp
          mensaje="Hola REPAR.ar 👋 Quiero hacer una consulta."
          tamano="chico"
          className="ml-auto min-[820px]:ml-0"
        >
          WhatsApp
        </BotonWhatsApp>
      </div>
    </header>
  );
}
