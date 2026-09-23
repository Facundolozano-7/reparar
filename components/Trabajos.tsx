import Image from "next/image";
import Link from "next/link";
import { trabajos } from "@/lib/contenido";
import { buscarLanding } from "@/lib/landings";
import BotonWhatsApp from "./BotonWhatsApp";

/**
 * Cada foto es una tira vertical (2:3) con tres momentos:
 * cómo entró el equipo, qué se hizo adentro y cómo salió.
 */
export default function Trabajos() {
  return (
    <section id="trabajos" className="bg-negro text-[#F5F0E8] py-16 min-[880px]:py-20">
      <div className="w-full max-w-[1120px] mx-auto px-5">
        <h2
          data-revelar
          className="font-display font-extrabold text-[clamp(30px,7vw,46px)] leading-[1.02] tracking-[-.01em] m-0 mb-[10px]"
        >
          Procedimientos en nuestro taller
        </h2>
        <p data-revelar className="m-0 mb-8 max-w-[60ch] text-[#B5ABA0] text-[17px]">
          Fotos de equipos que pasaron por el taller. Cada tira muestra lo mismo:
          cómo entró, qué se hizo adentro y cómo salió.
        </p>

        <div className="grid gap-4 grid-cols-2 min-[640px]:grid-cols-3 min-[1000px]:grid-cols-5">
          {trabajos.map((t, i) => {
            const landing = buscarLanding(t.servicio);

            return (
              <figure
                key={t.src}
                data-revelar
                style={{ "--retraso": `${i * 90}ms` } as React.CSSProperties}
                className="group m-0 bg-[#0E0B0A] rounded-[14px] overflow-hidden border border-[rgba(245,240,232,.12)]
                           transition-colors duration-200 hover:border-naranja"
              >
                <div className="overflow-hidden">
                  <Image
                    src={t.src}
                    alt={t.alt}
                    width={720}
                    height={1080}
                    sizes="(min-width: 1000px) 210px, (min-width: 640px) 33vw, 50vw"
                    className="w-full h-auto aspect-[2/3] object-cover object-top
                               transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="px-[15px] pt-[14px] pb-[17px]">
                  <h3 className="font-display font-bold text-[22px] leading-[1.05] m-0 mb-1">
                    {t.titulo}
                  </h3>
                  <p className="m-0 text-[15px] text-[#A99F94]">{t.detalle}</p>
                  {/* El link va acá y no sobre la foto: tocar la foto abre el visor. */}
                  {landing && (
                    <Link
                      href={`/${landing.slug}`}
                      className="inline-block mt-[10px] text-[15px] font-semibold text-naranja
                                 no-underline underline-offset-4 hover:underline"
                    >
                      Ver {landing.serviceType.toLowerCase()}
                    </Link>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>

        <div data-revelar className="mt-8 flex flex-wrap items-center gap-4">
          <p className="m-0 text-[#A99F94] text-[16px]">
            ¿Tenés un equipo parecido? Mandanos una foto y te decimos si tiene arreglo.
          </p>
          <BotonWhatsApp
            mensaje="Hola REPAR.ar 👋 Te mando una foto de mi equipo para ver si tiene arreglo."
            tamano="chico"
          >
            Mandar foto
          </BotonWhatsApp>
        </div>
      </div>
    </section>
  );
}
