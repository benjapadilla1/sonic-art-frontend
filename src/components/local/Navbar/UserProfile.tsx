'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/stores/useAuthStore';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CartSheet } from '../Cart/CartSheet';

interface UserProfileProps {
  isMobile?: boolean;
}

export const UserProfile = ({ isMobile }: UserProfileProps) => {
  const { logout, isAdmin } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className={`flex gap-4 ${isMobile ? 'flex-col items-start' : 'items-center'}`}>
      <Button variant="outline" className="text-white">
        USD
      </Button>
      <CartSheet />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="hover:bg-ctas relative">
            <User className="h-5 w-5 text-white" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild className="hover:bg-ctas! cursor-pointer hover:text-white!">
            <Link href="/perfil">Mi cuenta</Link>
          </DropdownMenuItem>

          {isAdmin && (
            <DropdownMenuItem asChild className="hover:bg-ctas! cursor-pointer hover:text-white!">
              <Link href="/admin">Admin</Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild className="hover:bg-ctas! cursor-pointer hover:text-white!">
            <Link href="/mis-cursos">Mis Cursos</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="hover:bg-ctas! cursor-pointer hover:text-white!">
            <Link href="/mis-sample-packs">Mis Sample Packs</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="hover:bg-ctas! cursor-pointer hover:text-white!"
            onClick={handleLogout}
          >
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
