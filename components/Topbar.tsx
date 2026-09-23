import Link from "next/link";
import BotonWhatsApp from "./BotonWhatsApp";
import NavSecciones from "./NavSecciones";

/** Mismo lockup tipográfico que el logo: "REPAR" en Alfa Slab + ".ar" en itálica. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/#top"
      className={`font-marca leading-none text-naranja tracking-[-.02em] no-underline whitespace-nowrap ${className}`}
    >
      REPAR<i className="font-texto font-bold text-white">.ar</i>
    </Link>
  );
}

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 bg-negro border-b-[3px] border-naranja">
      {/* Sin max-width: el logo va contra el borde izquierdo y el menú contra el derecho.
          `relative` hace que NavSecciones mida su posición respecto de esta barra. */}
      <div className="relative w-full px-5 min-[820px]:px-[clamp(24px,3vw,48px)] flex items-center gap-4 h-16">
        <Wordmark className="text-[26px]" />

        <NavSecciones />

        <BotonWhatsApp
          mensaje="Hola REPAR.ar 👋 Quiero hacer una consulta."
          tamano="chico"
          className="ml-auto min-[820px]:ml-6"
        >
          WhatsApp
        </BotonWhatsApp>
      </div>
    </header>
  );
}
