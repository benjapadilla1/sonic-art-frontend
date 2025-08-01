'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface LogoutButtonProps {
  isMobile?: boolean;
}

export const LogoutButton = ({ isMobile }: LogoutButtonProps) => {
  const router = useRouter();
  const logout = useAuthStore(state => state.logout);

  return (
    <Button
      onClick={() => {
        logout();
        toast.info('Sesión cerrada');
        router.push('/');
      }}
      className={cn(isMobile ? 'relative mr-4' : 'hidden lg:flex')}
    >
      Cerrar sesión
    </Button>
  );
};
