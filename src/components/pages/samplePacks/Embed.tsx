'use client';

import { useEffect } from 'react';

type Product = {
  id: string;
  title: string;
  price: string;
};

const mockProducts: Product[] = [
  {
    id: 'Vc0Ni',
    title: 'Curso de Producción Musical',
    price: '$49.99',
  },
  {
    id: 'Vc0Ni',
    title: 'Sample Pack Vol. 1',
    price: '$19.99',
  },
];

export const PayhipEmbed = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://payhip.com/assets/payhip.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-8 py-10">
      {mockProducts.map(product => {
        const productUrl = `https://payhip.com/buy?link=${product.id}`;

        return (
          <div key={product.id} className="rounded-xl border bg-white p-6 shadow-lg">
            <h3 className="mb-2 text-xl font-bold">{product.title}</h3>
            <p className="mb-4 text-gray-700">{product.price}</p>
            <a
              href={productUrl}
              className="payhip-buy-button bg-black px-4 py-2 text-white"
              data-theme="blue"
            >
              Comprar
            </a>
          </div>
        );
      })}
    </div>
  );
};
