/**
 * Todo el texto de la página vive acá. Los componentes solo lo maquetan.
 * NO inventar contenido nuevo: esto ya está confirmado con el cliente.
 */

export type Servicio = {
  slug: string;
  titulo: string;
  alcance: string;
  fallas: string[];
  mensajeWa: string;
};

export const servicios: Servicio[] = [
  {
    slug: "lavarropas",
    titulo: "Lavarropas",
    alcance: "Carga frontal y superior, automáticos y semiautomáticos.",
    fallas: [
      "Ruido o golpes al centrifugar (rodamientos y retén)",
      "No desagota: bomba o filtro obstruido",
      "No carga agua: electroválvula o presostato",
      "Tablero sin respuesta o con código de error",
    ],
    mensajeWa: "Hola REPAR.ar 👋 Necesito service de lavarropas. Marca y modelo: ",
  },
  {
    slug: "aire-acondicionado",
    titulo: "Aire acondicionado",
    alcance: "Instalación, service y reparación de split frío/calor.",
    fallas: [
      "Instalación completa con vacío y carga de gas",
      "No enfría o enfría poco: pérdida de gas",
      "Limpieza profunda de evaporador y filtros",
      "Placa que no arranca o tira código por luces",
    ],
    mensajeWa:
      "Hola REPAR.ar 👋 Consulto por aire acondicionado (instalación / service / reparación): ",
  },
  {
    slug: "heladeras",
    titulo: "Heladeras",
    alcance: "Con freezer, no frost y equipos de frío en general.",
    fallas: [
      "No enfría: compresor, gas o filtro tapado",
      "Escarcha en el freezer o desagüe tapado",
      "Termostato y sensores fuera de rango",
      "Motor que arranca y corta todo el tiempo",
    ],
    mensajeWa: "Hola REPAR.ar 👋 Necesito service de heladera. Marca y modelo: ",
  },
  {
    slug: "microondas",
    titulo: "Microondas",
    alcance: "Digitales y a perilla, con y sin grill.",
    fallas: [
      "Enciende pero no calienta: magnetrón o alta tensión",
      "Teclas que no responden: membrana nueva",
      "Plato que no gira, puerta o traba rota",
      "Chispazos adentro de la cavidad",
    ],
    mensajeWa: "Hola REPAR.ar 👋 Consulto por un microondas. Marca y falla: ",
  },
  {
    slug: "tv",
    titulo: "TV LED y Smart",
    alcance: "LED, Smart y Android TV de todas las medidas.",
    fallas: [
      "Pantalla oscura con sonido: tiras de LED",
      "No enciende o queda el led titilando: fuente",
      "Se apaga sola o se reinicia sola",
      "Sin imagen, sin señal o con manchas",
    ],
    mensajeWa: "Hola REPAR.ar 👋 Consulto por un televisor. Marca, pulgadas y falla: ",
  },
];

export type Trabajo = {
  src: string;
  titulo: string;
  detalle: string;
  alt: string;
  /** Slug de la landing del servicio al que corresponde el trabajo. */
  servicio: string;
};

export const trabajos: Trabajo[] = [
  {
    src: "/trabajos/aire.webp",
    titulo: "Split Philco",
    detalle:
      "Instalación de split frío/calor: vacío y carga de gas controlada con manifold, y medición de la placa electrónica con multímetro.",
    alt: "Split Philco instalado, unidad exterior con manómetros durante la carga de gas y placa electrónica medida con tester.",
    servicio: "aire-acondicionado",
  },
  {
    src: "/trabajos/lavarropas.webp",
    titulo: "Samsung EcoBubble",
    detalle:
      "Desarme del frente y apertura de la cuba para cambiar rodamientos y retén, la causa típica del ruido al centrifugar.",
    alt: "Lavarropas Samsung EcoBubble de carga frontal, frente desarmado con el conjunto de tina y tambor, y tina abierta al medio.",
    servicio: "lavarropas",
  },
  {
    src: "/trabajos/heladera.webp",
    titulo: "Heladera Gafa",
    detalle:
      "Service del circuito de refrigeración: compresor, condensador y filtro deshidratador, con carga de gas controlada con manifold.",
    alt: "Heladera Gafa cerrada, su interior limpio y el sector del compresor con las mangueras de carga conectadas.",
    servicio: "heladeras",
  },
  {
    src: "/trabajos/microondas.webp",
    titulo: "BGH Quick Chef",
    detalle:
      "Cambio de la membrana del teclado y control del magnetrón y del circuito de alta tensión.",
    alt: "Microondas BGH Quick Chef con membrana de teclado nueva, panel frontal desarmado y magnetrón a la vista.",
    servicio: "microondas",
  },
  {
    src: "/trabajos/tv.webp",
    titulo: "Smart TV",
    detalle:
      "Recambio de las tiras de LED de la retroiluminación (backlight), prueba con el panel abierto y equipo entregado funcionando.",
    alt: "Panel de un televisor apoyado con las tiras de LED al descubierto, prueba de backlight encendido y el televisor ya funcionando.",
    servicio: "tv",
  },
];

/**
 * Los tres números que se muestran en las landings de servicio.
 * `valor` es lo que se cuenta desde 0; prefijo y sufijo van pegados al número.
 */
export type Numero = {
  valor: number;
  prefijo?: string;
  sufijo?: string;
  etiqueta: string;
};

/**
 * Separador de miles a mano (10000 -> "10.000"). No usamos toLocaleString
 * porque el server y el navegador pueden formatear distinto y eso rompe la
 * hidratación.
 */
export function formatearNumero(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const numeros: Numero[] = [
  { prefijo: "+", valor: 10000, etiqueta: "reparaciones" },
  { valor: 95, sufijo: "%", etiqueta: "satisfacción" },
  { prefijo: "+", valor: 25, etiqueta: "años en el rubro" },
];

export const pasos = [
  {
    titulo: "Nos escribís por WhatsApp",
    detalle:
      "Contanos marca, modelo y qué hace el equipo. Ahí coordinamos si lo acercás al taller o vamos a domicilio.",
  },
  {
    titulo: "Diagnóstico y presupuesto",
    detalle:
      "Revisamos el equipo y te decimos qué tiene, cuánto sale y cuánto tiempo lleva repararlo.",
  },
  {
    titulo: "Reparamos si aceptás el presupuesto",
    detalle:
      "Con tu aprobación hacemos el trabajo, en el taller o en tu casa, según lo que hayamos acordado.",
  },
  {
    titulo: "Entrega con garantía",
    detalle: "Probamos el equipo antes de entregarlo y la reparación queda garantizada.",
  },
];

export const checklist = [
  "Marca y modelo del equipo (está en la etiqueta trasera)",
  "Qué hace y qué dejó de hacer",
  "Si tira algún código de error o luz que titila",
  "Hace cuánto que viene fallando",
  "Si ya lo revisó otro técnico",
];

export const condiciones = [
  {
    titulo: "Presupuesto en el taller",
    detalle:
      "Acercás el electrodoméstico a cualquiera de los dos talleres y el presupuesto es sin cargo.",
  },
  {
    titulo: "Presupuesto a domicilio",
    detalle:
      "Coordinamos un turno y el técnico va a revisar el equipo. Esa visita tiene un costo que solo se cobra si no se hace la reparación: si la hacés, se descuenta del arreglo. El presupuesto tiene una vigencia de 15 días.",
  },
  {
    titulo: "Garantía",
    detalle:
      "De 3 a 6 meses sobre la reparación efectuada. El plazo depende del electrodoméstico y del tipo de intervención que se haya realizado.",
  },
];

export const notaPresupuesto =
  "No damos presupuestos por teléfono de reparaciones que no diagnosticamos nosotros. Para decirte un precio serio hay que ver el equipo.";
