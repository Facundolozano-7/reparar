import type { Metadata, Viewport } from "next";
import { Alfa_Slab_One, Barlow, Barlow_Condensed } from "next/font/google";
import { site } from "@/lib/site";
import Splash, { PIEZAS } from "@/components/Splash";
import "./globals.css";

/**
 * next/font descarga las tipografías en build y las sirve desde tu dominio:
 * no hay request a fonts.googleapis.com en runtime y no hay salto de fuente.
 * `variable` expone cada familia como CSS custom property para usarla en el tema.
 */
const texto = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--fuente-texto",
  display: "swap",
});

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--fuente-display",
  display: "swap",
});

const marca = Alfa_Slab_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--fuente-marca",
  display: "swap",
});

export const metadata: Metadata = {
  // Cambiar por el dominio final cuando esté: hace absolutas las URLs de OG.
  metadataBase: new URL("https://repar-ar.vercel.app"),
  title: {
    default: `${site.nombre} — ${site.rubro} en Córdoba`,
    template: `%s | ${site.nombre}`,
  },
  description:
    "Servicio técnico multimarcas en Córdoba: lavarropas, aire acondicionado, heladeras, microondas y TV. Presupuesto sin cargo en el taller, visitas a domicilio y garantía de 3 a 6 meses.",
  keywords: [
    "servicio técnico Córdoba",
    "reparación de lavarropas",
    "reparación de heladeras",
    "service de aire acondicionado",
    "reparación de microondas",
    "reparación de TV LED",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: site.nombre,
    title: `${site.nombre} — ${site.rubro} en Córdoba`,
    description:
      "Lavarropas, aire acondicionado, heladeras, microondas y TV. Presupuesto sin cargo en el taller y garantía de 3 a 6 meses.",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-AR"
      className={`${texto.variable} ${display.variable} ${marca.variable}`}
      // El script de abajo agrega la clase "js" antes de hidratar
      suppressHydrationWarning
    >
      <head>
        {/* Las piezas de la pantalla de carga son lo primero que se ve:
            que empiecen a bajar antes que cualquier otra imagen. */}
        {PIEZAS.map((pieza) => (
          <link
            key={pieza}
            rel="preload"
            as="image"
            href={`/splash/${pieza}.webp`}
            type="image/webp"
          />
        ))}
        {/* Marca que hay JS antes del primer pintado: sin esto, el contenido
            animado quedaría invisible para quien navega sin JavaScript.
            De paso marca si la pantalla de carga ya se mostró en esta
            pestaña, así no se repite en cada navegación. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');" +
              "try{if(sessionStorage.getItem('splash'))" +
              "document.documentElement.classList.add('sin-splash');" +
              "else sessionStorage.setItem('splash','1')}catch(e){}",
          }}
        />
      </head>
      <body className="bg-hueso text-tinta font-texto antialiased">
        <Splash />
        {children}
      </body>
    </html>
  );
}
