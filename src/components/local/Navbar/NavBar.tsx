'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { NavbarMenu } from './NavDropdown';

const NavBar: React.FC = () => {
  const [isTop, setIsTop] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      setIsTop(window.scrollY < 900);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const isHome = pathname === '/';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 z-50 flex w-full items-center justify-between px-4 py-3 transition-colors duration-500 sm:px-6',
        isHome && isTop ? 'bg-transparent' : 'bg-secondaryBg rounded-b-xl'
      )}
    >
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
        <Button className="border-ctas font-engravers rounded-none border-2 bg-transparent" asChild>
          <Link href="/login">Iniciar Sesión</Link>
        </Button>
        <Button
          className="border-ctas font-engravers rounded-none border-2 hover:bg-transparent"
          asChild
        >
          <Link href="/login">Registrarse</Link>
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
