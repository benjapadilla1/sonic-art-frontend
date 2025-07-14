'use client';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const LogoutButton = () => {
  const router = useRouter();
  const logout = useAuthStore(state => state.logout);

  return (
    <Button
      onClick={() => {
        logout();
        toast.info('Sesión cerrada 👋');
        router.push('/login');
      }}
    >
      Cerrar sesión
    </Button>
  );
};
