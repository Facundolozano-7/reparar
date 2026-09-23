/**
 * Pantalla de carga: el logo se arma pieza por pieza y termina con el nombre.
 *
 * Las seis piezas salen del logo real, recortadas por píxel: cada píxel opaco
 * de public/logo.png cae en exactamente una pieza, así que apiladas vuelven a
 * dar el logo idéntico, sin huecos ni bordes. El script que las genera está en
 * el historial de la conversación; si cambia el logo, hay que regenerarlas.
 *
 * Son 69 KB en total repartidos en seis archivos, menos que el logo entero.
 * Van precargadas desde el <head> (ver layout.tsx) para que empiecen a bajar
 * antes que cualquier otra imagen de la página.
 *
 * Se esconde sola con CSS (ver globals.css): no depende de que haya cargado
 * ningún JavaScript, así que no se puede quedar tapando la página.
 */

/** En orden de aparición. El nombre coincide con el del archivo. */
export const PIEZAS = [
  "engranaje",
  "copo",
  "llama",
  "espiral",
  "chip",
  "nombre",
] as const;

export default function Splash() {
  return (
    <div className="splash" aria-hidden="true">
      <div className="splash__logo">
        {PIEZAS.map((pieza, i) => (
          <div
            key={pieza}
            className={`splash__pieza splash__pieza--${i + 1}`}
            style={{ backgroundImage: `url(/splash/${pieza}.webp)` }}
          />
        ))}
      </div>
    </div>
  );
}
