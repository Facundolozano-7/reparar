"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Los href arrancan con "/" para que el menú también sirva desde las landings
 * de servicio. Estando en la home el navegador solo scrollea: mismo documento,
 * cambia nada más el fragmento.
 */
const secciones = [
  { href: "/#inicio", texto: "Inicio" },
  { href: "/#servicios", texto: "Servicios" },
  { href: "/#trabajos", texto: "Trabajos" },
  { href: "/#presupuesto", texto: "Presupuesto" },
  { href: "/#donde-estamos", texto: "Dónde estamos" },
];

/** Separación mínima con el logo cuando el menú se corre al centro */
const AIRE_CON_LOGO = 32;

/**
 * Menú de secciones. Arriba de todo va pegado a la derecha; apenas se
 * empieza a scrollear se desliza al centro de la barra.
 *
 * El corrimiento se mide en px (centro de la barra − centro del menú) y se
 * aplica con translateX, que sí se puede animar con transition (un cambio
 * de margin-left:auto a centrado, no).
 */
export default function NavSecciones() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolleado, setScrolleado] = useState(false);
  const [corrimiento, setCorrimiento] = useState(0);

  // ¿Ya se empezó a bajar?
  useEffect(() => {
    const alScrollear = () => setScrolleado(window.scrollY > 8);
    alScrollear();
    window.addEventListener("scroll", alScrollear, { passive: true });
    return () => window.removeEventListener("scroll", alScrollear);
  }, []);

  // Cuánto hay que correr el menú para centrarlo. Se recalcula si cambia el
  // ancho de la barra o del menú (resize, carga de la tipografía).
  useEffect(() => {
    const nav = navRef.current;
    const barra = nav?.parentElement;
    const logo = barra?.firstElementChild as HTMLElement | null;
    if (!nav || !barra || !logo) return;

    const medir = () => {
      // offsetLeft/offsetWidth ignoran el transform: medimos la posición de reposo
      const centroBarra = barra.clientWidth / 2;
      const centroNav = nav.offsetLeft + nav.offsetWidth / 2;
      let delta = centroBarra - centroNav;

      // En pantallas angostas no dejamos que se monte sobre el logo
      const bordeLogo = logo.offsetLeft + logo.offsetWidth + AIRE_CON_LOGO;
      if (nav.offsetLeft + delta < bordeLogo) delta = bordeLogo - nav.offsetLeft;

      setCorrimiento(Math.min(0, delta));
    };

    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(barra);
    ro.observe(nav);
    return () => ro.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Secciones"
      className="hidden min-[820px]:flex ml-auto gap-[22px]
                 transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none"
      style={{ transform: scrolleado ? `translateX(${corrimiento}px)` : undefined }}
    >
      {secciones.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className="font-display font-bold text-[19px] text-[#F5F0E8] no-underline whitespace-nowrap hover:text-naranja"
        >
          {s.texto}
        </Link>
      ))}
    </nav>
  );
}
