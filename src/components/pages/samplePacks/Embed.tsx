'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    PayhipEmbed?: {
      loadEmbeds: () => void;
    };
  }
}

interface PayhipEmbedProps {
  dataKey: string;
}

export const PayhipEmbed = ({ dataKey }: PayhipEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://payhip.com/embed-page.js?v=24u68984"]'
    );

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://payhip.com/embed-page.js?v=24u68984';
      script.type = 'text/javascript';
      script.async = true;
      script.onload = () => {
        if (window.PayhipEmbed) {
          window.PayhipEmbed.loadEmbeds();
        }
      };
      document.body.appendChild(script);
    } else {
      if (window.PayhipEmbed) {
        window.PayhipEmbed.loadEmbeds();
      } else {
        // Esperar a que el script cargue si ya está pero aún no terminó de inicializar
        existingScript.addEventListener('load', () => {
          if (window.PayhipEmbed) {
            window.PayhipEmbed.loadEmbeds();
          }
        });
      }
    }
  }, []);

  return (
    <div ref={containerRef} className="payhip-embed-page" data-key={dataKey}>
      <p>Cargando productos de Payhip...</p>
    </div>
  );
};
