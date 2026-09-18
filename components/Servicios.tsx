import { servicios } from "@/lib/contenido";
import BotonWhatsApp from "./BotonWhatsApp";
import Placas from "./Placas";

export default function Servicios() {
  return (
    <section id="servicios" className="py-16">
      <div className="w-full max-w-[1120px] mx-auto px-5">
        <h2 className="font-display font-extrabold text-[clamp(30px,7vw,46px)] leading-[1.02] tracking-[-.01em] m-0 mb-[10px]">
          Qué reparamos
        </h2>
        <p className="m-0 mb-8 max-w-[60ch] text-tinta-suave text-[17px]">
          Cinco rubros, un mismo criterio: primero se diagnostica la falla real y
          recién después se cambia algo. Elegí el tuyo y contanos qué le pasa.
        </p>

        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
          {servicios.map((s) => (
            <article
              key={s.slug}
              className="bg-papel border border-[rgba(23,19,16,.14)] border-l-[6px] border-l-naranja
                         rounded-[14px] px-[18px] py-5 flex flex-col gap-3
                         shadow-[0_2px_0_rgba(23,19,16,.08)]"
            >
              <h3 className="font-display font-extrabold text-[27px] leading-none m-0">
                {s.titulo}
              </h3>
              <p className="m-0 text-tinta-suave text-[16px]">{s.alcance}</p>
              <ul className="m-0 pl-[18px] text-[16px] grid gap-1 list-disc marker:text-naranja">
                {s.fallas.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <BotonWhatsApp
                mensaje={s.mensajeWa}
                variante="negro"
                tamano="chico"
                className="mt-auto self-start"
              >
                Consultar
              </BotonWhatsApp>
            </article>
          ))}
        </div>

        <Placas />
      </div>
    </section>
  );
}
