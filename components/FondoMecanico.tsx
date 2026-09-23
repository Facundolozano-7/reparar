"use client";

import { useEffect, useRef } from "react";

/**
 * Fondo decorativo de toda la página: engranajes que giran y pistas de
 * circuito que se iluminan, los dos manejados por el scroll.
 *
 * Es una capa fija, transparente y sin clics por encima de las secciones
 * (así se ve igual sobre los fondos claros y los negros) y por debajo de la
 * barra superior (z-40) y del botón flotante de WhatsApp (z-50).
 *
 * El JS solo escribe dos variables CSS: --y (scroll en px) y data-activo
 * (si se está scrolleando). Los giros y los pulsos se calculan en el CSS.
 */

/** Arma el contorno de un engranaje centrado en (0,0). */
function engranaje(radio: number, dientes: number, alto: number): string {
  const paso = (Math.PI * 2) / dientes;
  const exterior = radio + alto;
  const puntos: string[] = [];
  for (let i = 0; i < dientes; i++) {
    const a = i * paso;
    // Base del diente, punta (un poco más angosta) y vuelta a la base
    const angulos: [number, number][] = [
      [a, radio],
      [a + paso * 0.12, exterior],
      [a + paso * 0.38, exterior],
      [a + paso * 0.5, radio],
    ];
    for (const [ang, r] of angulos) {
      puntos.push(`${(Math.cos(ang) * r).toFixed(2)} ${(Math.sin(ang) * r).toFixed(2)}`);
    }
  }
  return `M${puntos.join("L")}Z`;
}

type Engranaje = {
  x: number;
  y: number;
  radio: number;
  dientes: number;
  /** Grados por px de scroll. Dos engranajes que engranan van en sentido contrario. */
  giro: number;
};

/**
 * Cada grupo es un SVG propio anclado a un borde de la pantalla, para que en
 * el celular no queden recortados fuera de vista.
 */
const grupos: {
  clase: string;
  viewBox: string;
  engranajes: Engranaje[];
}[] = [
  {
    // Arriba a la izquierda: un par que engrana
    clase: "-left-16 top-20 w-[clamp(180px,26vw,340px)]",
    viewBox: "0 0 300 300",
    engranajes: [
      { x: 110, y: 110, radio: 70, dientes: 16, giro: 0.12 },
      { x: 200, y: 185, radio: 38, dientes: 9, giro: -0.12 * (16 / 9) },
    ],
  },
  {
    // Mitad derecha: uno grande
    clase: "-right-24 top-[42%] w-[clamp(200px,30vw,400px)]",
    viewBox: "0 0 300 300",
    engranajes: [
      { x: 150, y: 150, radio: 105, dientes: 24, giro: -0.08 },
    ],
  },
  {
    // Abajo a la izquierda: un trío
    clase: "-left-10 -bottom-10 w-[clamp(170px,24vw,320px)]",
    viewBox: "0 0 300 300",
    engranajes: [
      { x: 100, y: 190, radio: 60, dientes: 14, giro: 0.1 },
      { x: 174, y: 120, radio: 34, dientes: 8, giro: -0.1 * (14 / 8) },
      { x: 188, y: 204, radio: 22, dientes: 6, giro: 0.1 * (14 / 6) },
    ],
  },
];

/** Pistas del circuito en un lienzo de 1440×900, con un "pad" en cada punta. */
const pistas: { d: string; pads: [number, number][]; desfase: number }[] = [
  { d: "M0 160 H220 L280 220 H520", pads: [[520, 220]], desfase: 0 },
  { d: "M1440 90 H1180 L1120 150 V300", pads: [[1120, 300]], desfase: 300 },
  { d: "M0 620 H140 L200 560 H380 L420 520", pads: [[420, 520]], desfase: 520 },
  { d: "M1440 700 H1260 L1200 760 H960", pads: [[960, 760]], desfase: 180 },
  { d: "M760 900 V820 L820 760 H1000", pads: [[1000, 760]], desfase: 700 },
  { d: "M1440 420 H1320 L1280 380 H1150", pads: [[1150, 380]], desfase: 420 },
  { d: "M300 0 V70 L350 120 H600", pads: [[600, 120]], desfase: 860 },
];

export default function FondoMecanico() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const capa = ref.current;
    if (!capa) return;
    // Sin animación si el usuario lo pidió en su sistema: queda el dibujo quieto
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let apagar: ReturnType<typeof setTimeout>;

    const actualizar = () => {
      frame = 0;
      capa.style.setProperty("--y", String(window.scrollY));
    };

    const alScrollear = () => {
      if (!frame) frame = requestAnimationFrame(actualizar);
      // Mientras se scrollea los circuitos brillan más; al frenar se apagan
      capa.dataset.activo = "";
      clearTimeout(apagar);
      apagar = setTimeout(() => delete capa.dataset.activo, 220);
    };

    actualizar();
    window.addEventListener("scroll", alScrollear, { passive: true });
    return () => {
      window.removeEventListener("scroll", alScrollear);
      cancelAnimationFrame(frame);
      clearTimeout(apagar);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fondo-mecanico fixed inset-0 z-30 pointer-events-none overflow-hidden"
    >
      {/* Circuitos */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        {pistas.map((p, i) => (
          <g key={i}>
            <path d={p.d} className="pista" pathLength={1000} />
            <path
              d={p.d}
              className="pista-luz"
              pathLength={1000}
              style={{ "--desfase": p.desfase } as React.CSSProperties}
            />
            {p.pads.map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={6} className="pad" />
            ))}
          </g>
        ))}
      </svg>

      {/* Engranajes */}
      {grupos.map((g, i) => (
        <svg key={i} viewBox={g.viewBox} className={`absolute aspect-square ${g.clase}`}>
          {g.engranajes.map((e) => (
            <g key={`${e.x}-${e.y}`} transform={`translate(${e.x} ${e.y})`}>
              <g className="engranaje" style={{ "--giro": e.giro } as React.CSSProperties}>
                {/* Círculo invisible del tamaño total: deja la caja del grupo
                    centrada justo en el eje, así el giro no "baila" */}
                <circle r={e.radio + Math.max(6, e.radio * 0.16)} stroke="none" />
                <path d={engranaje(e.radio, e.dientes, Math.max(6, e.radio * 0.16))} />
                <circle r={e.radio * 0.62} />
                <circle r={e.radio * 0.2} />
              </g>
            </g>
          ))}
        </svg>
      ))}
    </div>
  );
}
