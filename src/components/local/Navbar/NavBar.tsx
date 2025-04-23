import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { NavbarMenu } from './NavDropdown';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-secondaryBg fixed top-0 left-0 z-50 flex w-full items-center justify-around rounded-b-xl px-4 py-3 sm:px-6">
      <div className="relative h-13 w-32">
        <Link href="/" className="block h-full w-full">
          <Image
            src="/images/logos/isologo_white.png"
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>
      </div>
      <NavbarMenu />
      <div className="flex gap-4">
        <Button className="border-ctas rounded-none border-2 bg-transparent" asChild>
          <Link href="/login">Iniciar sesión</Link>
        </Button>
        <Button className="border-ctas rounded-none border-2 hover:bg-transparent" asChild>
          <Link href="/login">Registarse</Link>
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
