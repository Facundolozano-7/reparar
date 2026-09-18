import Image from "next/image";
import BotonWhatsApp from "./BotonWhatsApp";

/** Los 4 datos de arriba, tal cual la referencia aprobada. */
const datos = [
  { dato: "Todas las marcas", detalle: "Samsung, LG, Philco, BGH, Gafa, Drean y más" },
  { dato: "Presupuesto sin cargo", detalle: "Si traés el equipo al taller" },
  { dato: "Taller o domicilio", detalle: "Dos talleres en Córdoba y visitas con turno" },
  { dato: "Garantía de 3 a 6 meses", detalle: "Según el equipo y la reparación" },
];

export default function Hero() {
  return (
    <section className="relative bg-negro text-[#F5F0E8] overflow-hidden pt-10 pb-[92px] min-[880px]:pt-14 min-[880px]:pb-[110px]">
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

      <div className="relative z-[1] w-full max-w-[1120px] mx-auto px-5 grid gap-[26px] min-[880px]:grid-cols-[1fr_340px] min-[880px]:items-center min-[880px]:gap-10">
        <Image
          src="/logo.webp"
          alt="Logo de REPAR.ar: flechas de reciclado, engranaje, copo de nieve, llama y chip."
          width={760}
          height={726}
          priority
          sizes="(min-width: 880px) 340px, (min-width: 420px) 260px, 62vw"
          className="w-[min(260px,62vw)] h-auto mx-auto drop-shadow-[0_10px_26px_rgba(0,0,0,.6)]
                     min-[880px]:w-[340px] min-[880px]:order-2 min-[880px]:mx-0"
        />

        <div className="min-[880px]:order-1">
          <p className="font-display font-bold text-[19px] text-naranja m-0">
            Servicio técnico multimarcas en Córdoba
          </p>
          <h1 className="font-display font-extrabold text-[clamp(46px,14vw,86px)] leading-[.92] tracking-[-.02em] mt-[6px] mb-[14px]">
            Se repara.
            <br />
            No se tira.
          </h1>
          <p className="m-0 mb-6 text-[18px] text-[#CFC6BA] max-w-[52ch]">
            Lavarropas, aire acondicionado, heladeras, microondas y televisores.
            Revisamos el equipo, te pasamos el presupuesto antes de tocar nada y
            lo entregamos andando, con garantía.
          </p>
          <div className="flex flex-wrap gap-3">
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

        <ul className="list-none m-0 mt-[30px] p-0 grid gap-[14px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] min-[880px]:col-span-full">
          {datos.map((d) => (
            <li key={d.dato} className="border-t-[3px] border-naranja pt-[9px]">
              <b className="block font-display text-[21px] font-bold leading-[1.1]">
                {d.dato}
              </b>
              <span className="text-[15px] text-[#A99F94]">{d.detalle}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
