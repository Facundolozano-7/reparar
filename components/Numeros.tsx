import { formatearNumero, numeros } from "@/lib/contenido";
import Contador from "./Contador";

/**
 * Los tres números del hero de cada landing, al costado del título.
 *
 * No trae fondo ni <section>: vive adentro del hero oscuro. En pantalla
 * angosta se acomodan en fila abajo del texto y a partir de 880px pasan a
 * columna, contra el borde derecho.
 *
 * El número se cuenta solo, así que para un lector de pantalla es ruido:
 * la cifra final va en el aria-label del ítem y lo de adentro queda oculto.
 */
export default function Numeros() {
  return (
    <ul className="list-none m-0 p-0 grid grid-cols-3 gap-3 min-[880px]:grid-cols-1 min-[880px]:gap-7">
      {numeros.map((n, i) => (
        <li
          key={n.etiqueta}
          data-revelar
          style={{ "--retraso": `${320 + i * 120}ms` } as React.CSSProperties}
          aria-label={`${n.prefijo ?? ""}${formatearNumero(n.valor)}${n.sufijo ?? ""} ${n.etiqueta}`}
          className="border-l-[3px] border-naranja pl-3 min-[880px]:pl-4"
        >
          <span aria-hidden="true">
            <Contador
              valor={n.valor}
              prefijo={n.prefijo}
              sufijo={n.sufijo}
              className="block font-display font-extrabold text-[#F5F0E8]
                         text-[clamp(26px,6.5vw,44px)] leading-none tracking-[-.02em]
                         tabular-nums"
            />
            <span className="block mt-[5px] text-[#B5ABA0] text-[clamp(12px,2.8vw,16px)] leading-tight">
              {n.etiqueta}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
