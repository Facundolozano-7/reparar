/**
 * Una landing por servicio. El slug es el que va en la URL
 * (/lavarropas, /aire-acondicionado, ...) y serviceType es cómo se nombra
 * el servicio adentro de una frase: "Ver aire acondicionado".
 *
 * El contenido sale de `servicios`: acá solo vive lo propio de la landing.
 */
import { servicios, type Servicio } from "./contenido";

export type Landing = {
  slug: string;
  serviceType: string;
  servicio: Servicio;
};

/**
 * El `titulo` del servicio no siempre entra bien en una frase
 * ("TV LED y Smart"), así que cada landing tiene su propio nombre corto.
 */
const serviceTypes: Record<string, string> = {
  lavarropas: "Lavarropas",
  "aire-acondicionado": "Aire acondicionado",
  heladeras: "Heladeras",
  microondas: "Microondas",
  tv: "Televisores",
};

export const landings: Landing[] = servicios.map((servicio) => ({
  slug: servicio.slug,
  serviceType: serviceTypes[servicio.slug] ?? servicio.titulo,
  servicio,
}));

/** Devuelve la landing de ese slug, o undefined si el slug no existe. */
export function buscarLanding(slug: string): Landing | undefined {
  return landings.find((landing) => landing.slug === slug);
}
