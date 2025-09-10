'use client';

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const cancelOrder = async () => {
      if (!token) return;

      try {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/paypal/cancel-order?token=${token}`
        );

        if (res.data) {
          toast.info('Pago cancelado');
        } else {
          toast.error('Error al cancelar la orden');
        }
      } catch (err) {
        console.error(err);
        toast.error('Error de conexión con el servidor');
      } finally {
        router.push('/');
      }
    };

    cancelOrder();
  }, [router, token]);

  return <p>Pago cancelado.</p>;
}
