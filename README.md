# REPAR.ar

Sitio de un servicio técnico de electrodomésticos de Córdoba. Informativo, con una
página por servicio, y con un único objetivo: que cada botón termine en una consulta
por WhatsApp.

Sitio: https://www.repararservice.com

## Stack

- Next.js 15 (App Router) y React 19
- TypeScript
- Tailwind CSS 4
- Desplegado en Vercel

## Cómo está armado

```
app/
  layout.tsx          fuentes, metadata global, medición
  page.tsx            home
  [servicio]/page.tsx las 5 landings, generadas desde lib/
components/           UI (hero, servicios, trabajos, botón de WhatsApp, ...)
lib/
  site.ts             datos del negocio y el helper wa()
  contenido.ts        textos: servicios, fallas, trabajos, condiciones
  landings.ts         arma cada landing a partir de contenido.ts
```

## Decisiones

**El contenido vive en `lib/`, no en los componentes.** Los cinco servicios salen de
`contenido.ts`; `landings.ts` los convierte en landings y `app/[servicio]/page.tsx`
las genera en el build con `generateStaticParams`. Con `dynamicParams = false`,
cualquier slug que no exista devuelve 404. Agregar un servicio nuevo es agregar un
objeto, no una carpeta.

**Una URL por servicio.** Google posiciona páginas, no sitios: una página cuyo título,
encabezado y contenido hablan solo de heladeras responde mejor a "reparación de
heladeras en Córdoba" que una home que habla de cinco cosas. Cada landing define su
propia metadata y su canonical con `generateMetadata`.

**Un solo lugar arma los links de WhatsApp.** `BotonWhatsApp` usa el helper `wa()`,
que codifica el mensaje con `encodeURIComponent`. Ningún componente escribe una URL
de `wa.me` a mano.

**La conversión se mide con un listener delegado.** En vez de agregar un `onClick` a
cada botón (y volverlos todos Client Components), un único listener en `document`
revisa con `closest` si el click cayó dentro de un `a[href^="https://wa.me/"]` y recién
ahí dispara el evento de Google Ads. Un solo `"use client"` para todo el sitio.

**Server Components por defecto.** Solo llevan `"use client"` los componentes que
necesitan interacción o estado.

## Correrlo en local

```
bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
```

## Pendientes

- Página de privacidad: el sitio usa la etiqueta de Google y corresponde avisarlo.
- Datos estructurados `LocalBusiness` con los dos talleres, para búsquedas locales.
- Imágenes de Open Graph por servicio: hoy comparten la de la home.
  
## Créditos

Desarrollo del sitio: [Facundo Lozano](https://github.com/Facundolozano-7).
Marca, fotos y contenido: REPAR.ar.
