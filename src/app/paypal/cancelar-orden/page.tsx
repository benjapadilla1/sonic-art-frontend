import CancelOrder from '@/components/pages/paypal/CancelOrder';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <CancelOrder />
    </Suspense>
  );
}
