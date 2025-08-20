'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuthStore } from '@/stores/useAuthStore';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LogButtons from './LogButtons';
import { UserProfile } from './UserProfile';

export const MobileNavbar = () => {
  const isUserLoggedIn = useAuthStore(state => state.isLoggedIn);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleNavigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="flex items-center justify-center">
          <Button variant="ghost" size="icon" className="text-ctas">
            <Menu className="size-9" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-secondaryLight w-[250px]">
          <nav className="mt-8 ml-4 flex flex-col gap-4">
            <button
              onClick={() => handleNavigate('/')}
              className="text-secondaryBlack text-left text-lg font-medium hover:underline"
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavigate('/sobre-nosotros')}
              className="text-secondaryBlack text-left text-lg font-medium hover:underline"
            >
              Sobre Nosotros
            </button>
            <button
              onClick={() => handleNavigate('/cursos')}
              className="text-secondaryBlack text-left text-lg font-medium hover:underline"
            >
              Cursos
            </button>
            <button
              onClick={() => handleNavigate('/sample-packs')}
              className="text-secondaryBlack text-left text-lg font-medium hover:underline"
            >
              Sample Packs
            </button>
            <button
              onClick={() => handleNavigate('/clases')}
              className="text-secondaryBlack text-left text-lg font-medium hover:underline"
            >
              Mentoría 1 a 1
            </button>
            <button
              onClick={() => handleNavigate('/contacto')}
              className="text-secondaryBlack text-left text-lg font-medium hover:underline"
            >
              Contacto
            </button>
            <Separator className="bg-ctas" />
            {isUserLoggedIn ? <UserProfile isMobile /> : <LogButtons isMobile />}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};
