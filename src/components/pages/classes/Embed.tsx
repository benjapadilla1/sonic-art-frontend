'use client';

import { useRef } from 'react';

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

export const PayhipEmbedClasses = ({ dataKey }: PayhipEmbedProps) => {
  // const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const existingScript = document.querySelector(
  //     'script[src="https://payhip.com/embed-page.js?v=24u68984"]'
  //   );

  //   if (!existingScript) {
  //     const script = document.createElement('script');
  //     script.src = 'https://payhip.com/embed-page.js?v=24u68984';
  //     script.type = 'text/javascript';
  //     script.async = true;
  //     script.onload = () => {
  //       if (window.PayhipEmbed) {
  //         window.PayhipEmbed.loadEmbeds();
  //       }
  //     };
  //     document.body.appendChild(script);
  //   } else {
  //     if (window.PayhipEmbed) {
  //       window.PayhipEmbed.loadEmbeds();
  //     } else {
  //       existingScript.addEventListener('load', () => {
  //         if (window.PayhipEmbed) {
  //           window.PayhipEmbed.loadEmbeds();
  //         }
  //       });
  //     }
  //   }
  // }, []);

  return (
    // <div ref={containerRef} className="payhip-embed-page" data-key={dataKey}>
    <p>Cargando clases 1 a 1 ...</p>
    // </div>
  );
};
