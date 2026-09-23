"use client";

import { useEffect } from "react";

/**
 * Observa todos los elementos con `data-revelar` y les agrega .visible
 * la primera vez que entran en pantalla. La animación en sí está en globals.css.
 * Un solo observer para toda la página: las secciones siguen siendo Server Components.
 */
export default function AnimacionesScroll() {
  useEffect(() => {
    const elementos = document.querySelectorAll<HTMLElement>("[data-revelar]");

    const observer = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          entrada.target.classList.add("visible");
          observer.unobserve(entrada.target); // se anima una sola vez
        }
      },
      // Dispara un poco antes de que el elemento llegue al borde inferior
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    elementos.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
