"use client";

import { useEffect } from "react";

const CONVERSION_WHATSAPP = "AW-18432657709/ZjV8COyhxPAcEK2SsNVE";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Cuenta una conversión de Google Ads por cada click en un link a WhatsApp.
 *
 * Un solo listener en document (en captura, para que corra aunque algún
 * handler corte la propagación) alcanza para todos los botones: todos son
 * <a href="https://wa.me/..."> armados por wa(). Si gtag todavía no cargó,
 * el click se ignora en silencio.
 */
export default function ConversionWhatsApp() {
  useEffect(() => {
    function alClick(evento: MouseEvent) {
      const destino = evento.target;
      if (!(destino instanceof Element)) return;
      if (!destino.closest('a[href^="https://wa.me/"]')) return;

      window.gtag?.("event", "conversion", { send_to: CONVERSION_WHATSAPP });
    }

    document.addEventListener("click", alClick, { capture: true });
    return () => document.removeEventListener("click", alClick, { capture: true });
  }, []);

  return null;
}
