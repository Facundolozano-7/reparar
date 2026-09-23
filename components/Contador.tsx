"use client";

import { useEffect, useRef, useState } from "react";
import { formatearNumero } from "@/lib/contenido";

/** Cuánto tarda el conteo de 0 al valor final */
const DURACION = 1400;

type Props = {
  valor: number;
  prefijo?: string;
  sufijo?: string;
  className?: string;
};

/**
 * Número que cuenta desde 0 cuando entra en pantalla.
 *
 * Arranca mostrando el valor final: así el HTML que sale del server ya trae
 * el número y se ve igual sin JavaScript. Recién el efecto lo baja a 0, y solo
 * si hay que animar — mientras tanto el bloque está invisible por data-revelar,
 * así que el reseteo no se llega a ver.
 */
export default function Contador({ valor, prefijo = "", sufijo = "", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [mostrado, setMostrado] = useState(valor);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setMostrado(0);

    let raf = 0;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();

        const arranque = performance.now();
        const paso = (ahora: number) => {
          const t = Math.min(1, (ahora - arranque) / DURACION);
          // Frena sobre el final en vez de cortar de golpe
          setMostrado(Math.round(valor * (1 - Math.pow(1 - t, 3))));
          if (t < 1) raf = requestAnimationFrame(paso);
        };
        raf = requestAnimationFrame(paso);
      },
      { threshold: 0.4 },
    );

    observador.observe(el);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [valor]);

  return (
    <span ref={ref} className={className}>
      {prefijo}
      {formatearNumero(mostrado)}
      {sufijo}
    </span>
  );
}
