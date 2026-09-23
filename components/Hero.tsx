import Image from "next/image";
import BotonWhatsApp from "./BotonWhatsApp";

export default function Hero() {
  return (
    // Ocupa toda la pantalla menos la barra de arriba (64px + 3px de borde),
    // así no se pega visualmente con "Qué reparamos".
    <section
      id="inicio"
      className="relative bg-negro text-[#F5F0E8] overflow-hidden flex flex-col justify-center
                 min-h-[calc(100svh-67px)] pt-12 pb-[110px] min-[880px]:pt-16 min-[880px]:pb-[140px]"
    >
      {/* Halo naranja arriba a la izquierda (.hero::before) */}
      <div
        aria-hidden="true"
        className="absolute -top-[30%] right-[40%] bottom-[40%] -left-[30%] pointer-events-none
                   bg-[radial-gradient(closest-side,rgba(253,78,1,.30),transparent_70%)]"
      />
      {/* Cuña naranja del borde inferior (.hero::after) */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 -bottom-px h-[54px] bg-naranja
                   [clip-path:polygon(0_100%,100%_0,100%_100%)]"
      />

      <div className="relative z-[1] w-full max-w-[1120px] mx-auto px-5 grid gap-[30px] min-[880px]:grid-cols-[1fr_340px] min-[880px]:items-center min-[880px]:gap-12">
        <Image
          src="/logo.webp"
          alt="Logo de REPAR.ar: engranaje con copo de nieve, llama, espiral y chip."
          width={655}
          height={646}
          priority
          data-revelar
          style={{ "--retraso": "320ms" } as React.CSSProperties}
          sizes="(min-width: 880px) 340px, (min-width: 420px) 260px, 62vw"
          className="w-[min(260px,62vw)] h-auto mx-auto drop-shadow-[0_10px_26px_rgba(0,0,0,.6)]
                     min-[880px]:w-[340px] min-[880px]:order-2 min-[880px]:mx-0"
        />

        <div className="min-[880px]:order-1">
          <p data-revelar className="font-display font-bold text-[19px] text-naranja m-0">
            Servicio técnico multimarcas en Córdoba
          </p>
          <h1
            data-revelar
            style={{ "--retraso": "80ms" } as React.CSSProperties}
            className="font-display font-extrabold text-[clamp(46px,14vw,86px)] leading-[.92] tracking-[-.02em] mt-[6px] mb-[14px]">
            Se repara.
            <br />
            No se tira.
          </h1>
          <p
            data-revelar
            style={{ "--retraso": "160ms" } as React.CSSProperties}
            className="m-0 mb-6 text-[18px] text-[#CFC6BA] max-w-[52ch]">
            Lavarropas, aire acondicionado, heladeras, microondas y televisores.
            Revisamos el equipo, te pasamos el presupuesto antes de tocar nada y
            lo entregamos andando, con garantía.
          </p>
          <div
            data-revelar
            style={{ "--retraso": "240ms" } as React.CSSProperties}
            className="flex flex-wrap gap-3"
          >
            <BotonWhatsApp mensaje="Hola REPAR.ar 👋 Tengo un equipo con falla y quiero un presupuesto.">
              Escribir por WhatsApp
            </BotonWhatsApp>
            <a
              href="#trabajos"
              className="inline-flex items-center justify-center gap-[9px] font-display font-bold text-[20px]
                         px-5 py-3 rounded-[10px] border-2 border-[rgba(245,240,232,.45)] text-[#F5F0E8] no-underline
                         transition-colors duration-[120ms] hover:border-naranja hover:text-naranja active:translate-y-px"
            >
              Ver trabajos hechos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
