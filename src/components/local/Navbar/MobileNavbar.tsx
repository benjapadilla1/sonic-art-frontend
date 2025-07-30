'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuthStore } from '@/stores/useAuthStore';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import LogButtons from './LogButtons';
import { LogoutButton } from './LogOutButton';

export const MobileNavbar = () => {
  const isUserLoggedIn = useAuthStore(state => state.isLoggedIn);

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild className="flex items-center justify-center">
          <Button variant="ghost" size="icon" className="text-ctas">
            <Menu className="size-9" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-secondaryLight w-[250px]">
          <nav className="mt-8 ml-4 flex flex-col gap-4">
            <Link href="/" className="text-secondaryBlack text-lg font-medium hover:underline">
              Inicio
            </Link>
            <Link
              href="/cursos"
              className="text-secondaryBlack text-lg font-medium hover:underline"
            >
              Cursos
            </Link>
            <Link
              href="/sample-packs"
              className="text-secondaryBlack text-lg font-medium hover:underline"
            >
              Sample Packs
            </Link>
            <Link
              href="/mentoria-1a1"
              className="text-secondaryBlack text-lg font-medium hover:underline"
            >
              Mentoría 1 a 1
            </Link>
            <Link
              href="/contacto"
              className="text-secondaryBlack text-lg font-medium hover:underline"
            >
              Contacto
            </Link>
            <Separator className="size-1" />
            {isUserLoggedIn ? <LogoutButton isMobile /> : <LogButtons isMobile />}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};
