import { site, mapaEmbed, wa } from "@/lib/site";
import BotonWhatsApp from "./BotonWhatsApp";
import { Wordmark } from "./Topbar";

function IconoInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 flex-none fill-none stroke-current stroke-2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
    </svg>
  );
}

function IconoFacebook() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 flex-none fill-current">
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.6V14h2.7v8h3.2z" />
    </svg>
  );
}

const linkRed =
  "inline-flex items-center gap-2 font-display font-bold text-[19px] text-[#F5F0E8] no-underline hover:text-naranja";

/** Cierre de la página: mapas de los dos talleres a la izquierda y todos los datos de contacto al costado. */
export default function DondeEstamos() {
  return (
    <section id="donde-estamos" className="bg-negro text-[#F5F0E8] pt-16 pb-10 min-[880px]:pt-20">
      <div className="w-full max-w-[1120px] mx-auto px-5">
        <h2
          data-revelar
          className="font-display font-extrabold text-[clamp(30px,7vw,46px)] leading-[1.02] tracking-[-.01em] m-0 mb-[10px]"
        >
          Dónde estamos
        </h2>
        <p data-revelar className="m-0 mb-8 max-w-[60ch] text-[#B5ABA0] text-[17px]">
          Dos talleres en la ciudad de Córdoba. Escribinos antes de venir así
          coordinamos horario y nos aseguramos de tener el repuesto.
        </p>

        <div className="grid gap-8 min-[760px]:grid-cols-[minmax(0,400px)_1fr] min-[760px]:gap-12">
          {/* Mapas, uno arriba del otro */}
          <div className="grid gap-4">
            {site.talleres.map((t, i) => (
              // El iframe no recibe clics: todo el mapa es un link que abre
              // Google Maps (la app en el celular) con la dirección.
              <div
                key={t.calle}
                data-revelar
                style={{ "--retraso": `${i * 110}ms` } as React.CSSProperties}
                className="group relative aspect-[16/9] bg-[#1a1512] rounded-[14px] overflow-hidden
                           border border-[rgba(245,240,232,.12)]"
              >
                <iframe
                  src={mapaEmbed(t.calle)}
                  title={`Mapa de ${t.calle}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                />
                <a
                  href={t.maps}
                  target="_blank"
                  rel="noopener"
                  aria-label={`Abrir ${t.calle}, ${t.barrio}, en Google Maps`}
                  className="absolute inset-0 flex items-end justify-between gap-2 p-[10px] no-underline"
                >
                  <span className="font-display font-bold text-[15px] bg-negro/85 text-[#F5F0E8] rounded-full px-3 py-1">
                    {t.barrio}
                  </span>
                  <span
                    className="font-display font-bold text-[15px] bg-negro/85 text-[#F5F0E8] rounded-full px-3 py-1
                               border border-[rgba(245,240,232,.2)] transition-colors group-hover:bg-naranja group-hover:border-naranja"
                  >
                    Abrir ↗
                  </span>
                </a>
              </div>
            ))}
          </div>

          {/* Contacto */}
          <div data-revelar style={{ "--retraso": "150ms" } as React.CSSProperties} className="grid gap-7 content-start">
            <div>
              <BotonWhatsApp mensaje="Hola REPAR.ar 👋 Quiero hacer una consulta.">
                Escribinos por WhatsApp
              </BotonWhatsApp>
              <a
                href={wa("Hola REPAR.ar 👋 Quiero hacer una consulta.")}
                target="_blank"
                rel="noopener"
                className="block mt-3 font-display font-extrabold text-[clamp(28px,5vw,36px)] leading-none text-naranja no-underline hover:text-[#F5F0E8]"
              >
                {site.telefonoVisible}
              </a>
            </div>

            <ul className="list-none m-0 p-0 grid gap-5">
              {site.talleres.map((t) => (
                <li key={t.calle} className="border-l-[4px] border-naranja pl-4">
                  <h3 className="font-display font-extrabold text-[24px] leading-[1.05] m-0">
                    {t.calle}
                  </h3>
                  <span className="block text-[#A99F94] text-[16px]">{t.barrio}</span>
                  <span className="block mt-1 font-display font-bold text-[18px]">{t.horario}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href={site.instagram} target="_blank" rel="noopener" className={linkRed}>
                <IconoInstagram />
                Instagram
              </a>
              <a href={site.facebook} target="_blank" rel="noopener" className={linkRed}>
                <IconoFacebook />
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[rgba(245,240,232,.14)] grid gap-3">
          <Wordmark className="text-[26px]" />
          <p className="m-0 text-[14px] text-[#7C7267]">
            {site.rubro}, {site.ciudad}. REPAR.ar repara lavarropas, aires
            acondicionados, heladeras, microondas y televisores LED, Smart y Android.
          </p>
        </div>
      </div>
    </section>
  );
}
