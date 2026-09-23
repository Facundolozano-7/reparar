import { wa } from "@/lib/site";

/**
 * Único punto donde se arma un link a WhatsApp en toda la página.
 * El mensaje se pasa en claro: `wa()` se encarga de encodearlo.
 *
 * Variantes, tal como están en la referencia:
 *  - naranja  (.btn--wsp)    fondo naranja, para el CTA principal de cada bloque
 *  - negro    (.btn--negro)  fondo negro, para acciones secundarias
 *  - linea    (.btn--linea)  contorno claro sobre fondo oscuro
 *  - flotante (.flotante)    verde WhatsApp, fijo abajo a la derecha
 */
type Variante = "naranja" | "negro" | "linea" | "flotante";

const base =
  "inline-flex items-center justify-center gap-[9px] font-display font-bold " +
  "rounded-[10px] border-2 border-transparent no-underline cursor-pointer " +
  "transition-[transform,background-color] duration-[120ms] ease-out active:translate-y-px";

const variantes: Record<Variante, string> = {
  naranja: "bg-naranja text-white hover:bg-naranja-osc",
  negro: "bg-negro text-white hover:bg-[#2a2422]",
  linea:
    "bg-transparent text-[#F5F0E8] border-[rgba(245,240,232,.45)] hover:border-naranja hover:text-naranja",
  flotante:
    "fixed right-4 bottom-4 z-50 bg-wsp text-white shadow-[0_8px_24px_rgba(0,0,0,.35)] " +
    "px-[18px] pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]",
};

/** .btn = 20px / 12px 20px ; .btn--chico = 18px / 9px 14px */
const tamanos = {
  normal: "text-[20px] px-5 py-3",
  chico: "text-[18px] px-[14px] py-[9px]",
};

export function IconoWhatsApp() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="w-5 h-5 fill-current flex-none"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

type Props = {
  /** Mensaje en claro con el que se abre el chat */
  mensaje: string;
  /** Texto del botón */
  children: React.ReactNode;
  variante?: Variante;
  tamano?: keyof typeof tamanos;
  /** El flotante ya trae su propio padding: no le sumamos el del tamaño */
  className?: string;
};

export default function BotonWhatsApp({
  mensaje,
  children,
  variante = "naranja",
  tamano = "normal",
  className = "",
}: Props) {
  const conTamano = variante === "flotante" ? "text-[20px]" : tamanos[tamano];

  return (
    <a
      href={wa(mensaje)}
      target="_blank"
      rel="noopener"
      className={`${base} ${variantes[variante]} ${conTamano} ${className}`}
    >
      <IconoWhatsApp />
      {children}
    </a>
  );
}
