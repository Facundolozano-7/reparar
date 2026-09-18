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
      <path d="M12.04 2.02c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.06 22l5.25-1.38a9.87 9.87 0 0 0 4.73 1.21h.01c5.46 0 9.9-4.45 9.9-9.91a9.85 9.85 0 0 0-2.9-7A9.82 9.82 0 0 0 12.04 2.02zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.25 8.25-8.25zm-2.6 4.4h-.57c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.65 1.12 2.83c.14.18 1.9 2.9 4.6 3.96.64.28 1.14.44 1.53.56.64.2 1.23.18 1.69.11.52-.08 1.59-.65 1.81-1.28.22-.63.22-1.17.16-1.28-.07-.11-.25-.18-.52-.31-.27-.14-1.59-.79-1.84-.88-.25-.09-.43-.13-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.16-1.33-.8-.71-1.34-1.59-1.49-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.4-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.6-1.47-.84-2.01-.2-.46-.41-.47-.6-.48z" />
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
