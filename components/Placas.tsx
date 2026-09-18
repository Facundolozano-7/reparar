import BotonWhatsApp from "./BotonWhatsApp";

/**
 * Va adentro de la sección de servicios, no como sección aparte:
 * en la referencia comparte el .wrap con la grilla de fichas.
 */
export default function Placas() {
  return (
    <div className="mt-4 bg-negro text-[#F5F0E8] rounded-[14px] px-5 py-[26px] grid gap-[14px] min-[820px]:grid-cols-[1fr_auto] min-[820px]:items-center">
      <div className="min-[820px]:col-start-1">
        <h3 className="text-naranja font-display font-extrabold text-[clamp(26px,6vw,36px)] leading-none m-0">
          También reparamos la placa, no solo la cambiamos
        </h3>
        <p className="m-0 max-w-[62ch] text-[17px]">
          Trabajamos a nivel componente: medimos la placa con tester, buscamos el
          que está en falla y lo reemplazamos. En muchos casos eso evita comprar
          un módulo nuevo, que es la parte más cara del arreglo.
        </p>
      </div>
      <BotonWhatsApp
        mensaje="Hola REPAR.ar 👋 Quiero consultar por la reparación de una placa electrónica. Equipo: "
        className="justify-self-start"
      >
        Consultar por una placa
      </BotonWhatsApp>
    </div>
  );
}
