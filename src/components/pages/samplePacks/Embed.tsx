'use client';

import { useEffect } from 'react';

export const PayhipEmbed = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://payhip.com/js/embed-product-page.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <div>
      <div className="payhip-embed-page" data-key="Vc0Ni" />
    </div>
  );
};
