import { checklist, condiciones, notaPresupuesto, pasos } from "@/lib/contenido";
import BotonWhatsApp from "./BotonWhatsApp";

/** El checklist convertido en plantilla: el cliente solo completa cada línea. */
const mensajePresupuesto = [
  "Hola REPAR.ar 👋 Quiero pedir un presupuesto.",
  "Marca y modelo: ",
  "Qué hace: ",
  "Código de error o luz que titila: ",
  "Hace cuánto falla: ",
  "¿Lo revisó otro técnico?: ",
].join("\n");

export default function PasoAPaso() {
  return (
    <section id="presupuesto" className="py-16 min-[880px]:py-20">
      <div className="w-full max-w-[1120px] mx-auto px-5 grid gap-9 min-[880px]:grid-cols-[1.1fr_.9fr] min-[880px]:gap-[52px] min-[880px]:items-start">
        <div>
          <h2
            data-revelar
            className="font-display font-extrabold text-[clamp(30px,7vw,46px)] leading-[1.02] tracking-[-.01em] m-0 mb-[10px]"
          >
            Cómo es el paso a paso
          </h2>
          <p data-revelar className="m-0 mb-8 max-w-[60ch] text-tinta-suave text-[17px]">
            Ningún trabajo se empieza sin que vos lo apruebes.
          </p>

          <ol className="list-none m-0 p-0 grid gap-[18px]">
            {pasos.map((p, i) => (
              <li
                key={p.titulo}
                data-revelar
                style={{ "--retraso": `${i * 110}ms` } as React.CSSProperties}
                // La línea vertical une cada número con el siguiente (menos en el último)
                className="relative grid grid-cols-[44px_1fr] gap-[14px] items-start
                           after:content-[''] after:absolute after:left-[19px] after:top-[46px] after:-bottom-[14px]
                           after:w-[2px] after:bg-[rgba(23,19,16,.15)] last:after:hidden"
              >
                <span
                  aria-hidden="true"
                  className="w-10 h-10 rounded-full bg-negro text-naranja text-center
                             font-display font-extrabold text-[24px] leading-10"
                >
                  {i + 1}
                </span>
                <div>
                  <b className="block font-display font-bold text-[23px] leading-[1.1]">
                    {p.titulo}
                  </b>
                  <span className="text-tinta-suave text-[16px]">{p.detalle}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div
          data-revelar
          style={{ "--retraso": "150ms" } as React.CSSProperties}
          className="bg-papel border border-[rgba(23,19,16,.14)] border-t-[6px] border-t-naranja
                     rounded-[14px] px-5 py-[22px] shadow-[0_2px_0_rgba(23,19,16,.08)]
                     min-[880px]:sticky min-[880px]:top-24"
        >
          <h3 className="font-display font-extrabold text-[26px] leading-[1.05] m-0 mb-[6px]">
            Antes de escribirnos, tené a mano:
          </h3>
          <ul className="m-0 mt-[14px] pl-5 grid gap-[7px] text-[16px] list-disc marker:text-naranja">
            {checklist.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="m-0 mt-[14px] text-tinta-suave text-[16px]">
            Con estos datos te orientamos rápido y coordinamos si conviene taller o
            domicilio. El precio sale después del diagnóstico.
          </p>
          <BotonWhatsApp mensaje={mensajePresupuesto} tamano="chico" className="mt-5">
            Pedir presupuesto
          </BotonWhatsApp>
        </div>
      </div>

      {/* Condiciones: cómo se cobra el presupuesto según dónde se revise el equipo */}
      <div className="w-full max-w-[1120px] mx-auto px-5 mt-12">
        <div className="grid gap-4 min-[760px]:grid-cols-3">
          {condiciones.map((c, i) => (
            <article
              key={c.titulo}
              data-revelar
              style={{ "--retraso": `${i * 110}ms` } as React.CSSProperties}
              className="bg-papel border border-[rgba(23,19,16,.14)] border-l-[6px] border-l-naranja
                         rounded-[14px] px-5 py-[18px]"
            >
              <h3 className="font-display font-extrabold text-[23px] leading-[1.1] m-0 mb-[6px]">
                {c.titulo}
              </h3>
              <p className="m-0 text-tinta-suave text-[16px]">{c.detalle}</p>
            </article>
          ))}
        </div>
        <p
          data-revelar
          className="m-0 mt-5 max-w-[70ch] text-[16px] font-bold"
        >
          {notaPresupuesto}
        </p>
      </div>
    </section>
  );
}
