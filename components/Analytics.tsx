import Script from "next/script";

const ID_GOOGLE_ADS = "AW-18432657709";

/**
 * Etiqueta de Google (gtag.js) para Google Ads.
 * Solo inicializa y registra la visita: la conversión se dispara aparte,
 * en ConversionWhatsApp, recién cuando alguien toca un botón de WhatsApp.
 */
export default function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ID_GOOGLE_ADS}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${ID_GOOGLE_ADS}');
        `}
      </Script>
    </>
  );
}
