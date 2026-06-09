import React from 'react';

/**
 * Border Beam (estilo 21st.dev / Magic UI) adaptado a JSX + CSS plano.
 * Un haz de luz en gradiente que recorre el borde del contenedor padre
 * (que debe tener position: relative y border-radius). Es puramente CSS
 * (una capa con conic-gradient rotando), muy liviano.
 *
 * @param {number} duration  segundos por vuelta (def. 6)
 * @param {number} delay     retardo en segundos (def. 0)
 */
export function BorderBeam({ duration = 6, delay = 0, className = '' }) {
  return (
    <span
      className={`border-beam ${className}`}
      style={{
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
      aria-hidden="true"
    />
  );
}

export default BorderBeam;
