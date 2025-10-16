'use client';

import { useCartStore } from '@/stores/useCartStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Page() {
  const router = useRouter();
  const { clearCart } = useCartStore();

  useEffect(() => {
    const capture = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      if (!token) return;

      try {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/paypal/capture-order`, null, {
          params: { token },
        });
        toast.success('Pago exitoso!');
        clearCart();
        router.push('/mis-cursos');
      } catch (error) {
        console.error(error);
        toast.error('Error al procesar el pago');
      }
    };

    capture();
  }, [clearCart, router]);

  return (
    <p className="min-h-screen py-20 text-center text-4xl font-bold tracking-tight sm:text-5xl">
      Procesando pago...
    </p>
  );
}
