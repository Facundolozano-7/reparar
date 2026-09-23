import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { trabajos } from "@/lib/contenido";
import { buscarLanding, landings } from "@/lib/landings";
import Topbar from "@/components/Topbar";
import PasoAPaso from "@/components/PasoAPaso";
import DondeEstamos from "@/components/DondeEstamos";
import AnimacionesScroll from "@/components/AnimacionesScroll";
import FondoMecanico from "@/components/FondoMecanico";
import BotonWhatsApp from "@/components/BotonWhatsApp";
import Numeros from "@/components/Numeros";

type Props = { params: Promise<{ servicio: string }> };

/** Las cinco landings se generan en build; cualquier otro slug es 404. */
export function generateStaticParams() {
  return landings.map((landing) => ({ servicio: landing.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { servicio } = await params;
  const landing = buscarLanding(servicio);
  if (!landing) return {};

  const titulo = `${landing.servicio.titulo} en Córdoba`;
  const descripcion = `${landing.servicio.alcance} Presupuesto sin cargo en el taller, visitas a domicilio y garantía de 3 a 6 meses.`;

  return {
    title: titulo,
    description: descripcion,
    openGraph: { type: "website", locale: "es_AR", title: titulo, description: descripcion },
    alternates: { canonical: `/${landing.slug}` },
  };
}

export default async function LandingServicio({ params }: Props) {
  const { servicio } = await params;
  const landing = buscarLanding(servicio);
  if (!landing) notFound();

  const { titulo, alcance, fallas, mensajeWa } = landing.servicio;
  const delServicio = trabajos.filter((t) => t.servicio === landing.slug);
  const otras = landings.filter((l) => l.slug !== landing.slug);

  return (
    <>
      <Topbar />
      <main id="top">
        {/* Mismo lenguaje que el hero de la home, en versión corta: acá el
            visitante ya sabe qué busca y lo único que falta es que escriba. */}
        <section
          id="inicio"
          className="relative bg-negro text-[#F5F0E8] overflow-hidden pt-12 pb-[90px] min-[880px]:pt-16 min-[880px]:pb-[120px]"
        >
          <div
            aria-hidden="true"
            className="absolute -top-[40%] right-[45%] bottom-[30%] -left-[30%] pointer-events-none
                       bg-[radial-gradient(closest-side,rgba(253,78,1,.30),transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 -bottom-px h-[54px] bg-naranja
                       [clip-path:polygon(0_100%,100%_0,100%_100%)]"
          />

          <div
            className="relative z-[1] w-full max-w-[1120px] mx-auto px-5 grid gap-9
                       min-[880px]:grid-cols-[1fr_minmax(220px,260px)] min-[880px]:gap-12 min-[880px]:items-center"
          >
            <div>
              <Link
                href="/#servicios"
                data-revelar
                className="inline-block font-display font-bold text-[17px] text-[#B5ABA0] no-underline hover:text-naranja"
              >
                ← Todos los servicios
              </Link>
              <h1
                data-revelar
                style={{ "--retraso": "80ms" } as React.CSSProperties}
                className="font-display font-extrabold text-[clamp(40px,10vw,72px)] leading-[.94] tracking-[-.02em] mt-3 mb-[14px]"
              >
                {titulo}
              </h1>
              <p
                data-revelar
                style={{ "--retraso": "160ms" } as React.CSSProperties}
                className="m-0 mb-6 text-[18px] text-[#CFC6BA] max-w-[52ch]"
              >
                {alcance}
              </p>
              <div
                data-revelar
                style={{ "--retraso": "240ms" } as React.CSSProperties}
              >
                <BotonWhatsApp mensaje={mensajeWa}>Escribir por WhatsApp</BotonWhatsApp>
              </div>
            </div>

            <Numeros />
          </div>
        </section>

        <section className="py-16">
          <div className="w-full max-w-[1120px] mx-auto px-5">
            <h2
              data-revelar
              className="font-display font-extrabold text-[clamp(30px,7vw,46px)] leading-[1.02] tracking-[-.01em] m-0 mb-8"
            >
              Fallas que atendemos
            </h2>

            <ul className="list-none m-0 p-0 grid gap-4 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
              {fallas.map((f, i) => (
                <li
                  key={f}
                  data-revelar
                  style={{ "--retraso": `${i * 90}ms` } as React.CSSProperties}
                  className="bg-papel border border-[rgba(23,19,16,.14)] border-l-[6px] border-l-naranja
                             rounded-[14px] px-[18px] py-4 text-[17px]
                             shadow-[0_2px_0_rgba(23,19,16,.08)]"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {delServicio.length > 0 && (
          <section className="bg-negro text-[#F5F0E8] py-16 min-[880px]:py-20">
            <div className="w-full max-w-[1120px] mx-auto px-5">
              <h2
                data-revelar
                className="font-display font-extrabold text-[clamp(30px,7vw,46px)] leading-[1.02] tracking-[-.01em] m-0 mb-8"
              >
                Así trabajamos en nuestro taller
              </h2>

              <div className="grid gap-6">
                {delServicio.map((t) => (
                  <figure
                    key={t.src}
                    data-revelar
                    className="m-0 grid gap-5 min-[760px]:grid-cols-[300px_1fr] min-[760px]:items-start min-[760px]:gap-8"
                  >
                    <Image
                      src={t.src}
                      alt={t.alt}
                      width={720}
                      height={1080}
                      sizes="(min-width: 760px) 300px, 100vw"
                      className="w-full h-auto aspect-[2/3] object-cover object-top
                                 rounded-[14px] border border-[rgba(245,240,232,.12)]"
                    />
                    <figcaption className="min-[760px]:pt-2">
                      <h3 className="font-display font-bold text-[27px] leading-[1.05] m-0 mb-2">
                        {t.titulo}
                      </h3>
                      <p className="m-0 max-w-[60ch] text-[17px] text-[#B5ABA0]">{t.detalle}</p>
                      <Link
                        href="/#trabajos"
                        className="inline-block mt-4 text-[16px] font-semibold text-naranja
                                   no-underline underline-offset-4 hover:underline"
                      >
                        Ver todos los trabajos
                      </Link>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        <PasoAPaso />

        <section className="pb-16">
          <div className="w-full max-w-[1120px] mx-auto px-5">
            <h2
              data-revelar
              className="font-display font-extrabold text-[clamp(26px,5vw,34px)] leading-[1.05] tracking-[-.01em] m-0 mb-5"
            >
              También reparamos
            </h2>
            <ul className="list-none m-0 p-0 flex flex-wrap gap-3">
              {otras.map((otra) => (
                <li key={otra.slug}>
                  <Link
                    href={`/${otra.slug}`}
                    className="inline-flex items-center font-display font-bold text-[19px]
                               px-[14px] py-[9px] rounded-[10px] border-2 border-[rgba(23,19,16,.2)]
                               text-tinta no-underline transition-colors duration-[120ms]
                               hover:border-naranja hover:text-naranja"
                  >
                    {otra.servicio.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Siempre última: cierra la página con contacto y ubicaciones */}
        <DondeEstamos />
      </main>
      <AnimacionesScroll />
      <FondoMecanico />
    </>
  );
}
