import React, { useMemo } from 'react';

/**
 * Meteors (estilo 21st.dev / Aceternity) adaptado a JSX + CSS plano.
 * Lluvia de "meteoritos" que cruzan en diagonal. Solo son spans animados
 * con CSS (transform + opacity), así que es muy liviano.
 *
 * @param {number} number  cantidad de meteoritos (def. 14)
 */
export function Meteors({ number = 14 }) {
  const meteors = useMemo(
    () =>
      Array.from({ length: number }).map(() => ({
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 4}s`,
        duration: `${3 + Math.random() * 4}s`,
      })),
    [number]
  );

  return (
    <span className="meteors" aria-hidden="true">
      {meteors.map((m, i) => (
        <span
          key={i}
          className="meteor"
          style={{ left: m.left, animationDelay: m.delay, animationDuration: m.duration }}
        />
      ))}
    </span>
  );
}

export default Meteors;
