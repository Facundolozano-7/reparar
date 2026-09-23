/**
 * Datos fijos del negocio. Única fuente de verdad: si cambia un teléfono
 * o una dirección, se cambia acá y se actualiza en toda la página.
 */
export const site = {
  nombre: "REPAR.ar",
  rubro: "Servicio técnico multimarcas",
  ciudad: "Córdoba, Argentina",

  /** Número en formato internacional, sin + ni espacios (lo pide wa.me) */
  telefono: "5493513045568",
  telefonoVisible: "351 304-5568",

  instagram: "https://www.instagram.com/repar.ar.cba/",
  facebook: "https://www.facebook.com/reparar.ar.5",

  talleres: [
    {
      calle: "Emilio Pettoruti 2653",
      barrio: "B° Tablada Park",
      horario: "Turno a coordinar",
      maps: "https://www.google.com/maps/search/?api=1&query=Emilio+Pettoruti+2653%2C+C%C3%B3rdoba%2C+Argentina",
    },
    {
      calle: "Gilardo Gilardi 1493",
      barrio: "B° Los Naranjos",
      horario: "Lunes a viernes de 10 a 18 hs",
      maps: "https://www.google.com/maps/search/?api=1&query=Gilardo+Gilardi+1493%2C+C%C3%B3rdoba%2C+Argentina",
    },
  ],
} as const;

/**
 * Arma el link a WhatsApp con el mensaje ya escrito.
 * encodeURIComponent es obligatorio: los espacios, acentos y emojis
 * rompen la URL si van tal cual.
 */
export function wa(mensaje: string): string {
  return `https://wa.me/${site.telefono}?text=${encodeURIComponent(mensaje)}`;
}

/**
 * Mapa para meter en un <iframe>, armado solo con la dirección.
 * No necesita API key (a diferencia de la Maps Embed API oficial).
 */
export function mapaEmbed(calle: string): string {
  const q = encodeURIComponent(`${calle}, Córdoba, Argentina`);
  return `https://maps.google.com/maps?q=${q}&z=16&output=embed`;
}
