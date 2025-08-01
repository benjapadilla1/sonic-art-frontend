'use client';

import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/useAuthStore';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Admin from './Admin';
import LogButtons from './LogButtons';
import { LogoutButton } from './LogOutButton';
import { MobileNavbar } from './MobileNavbar';
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
  const isUserLoggedIn = useAuthStore(state => state.isLoggedIn);
  const isUserAdmin = useAuthStore(state => state.isAdmin);

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
      <MobileNavbar />
      {isUserAdmin && <Admin />}
      {isUserLoggedIn ? <LogoutButton /> : <LogButtons />}
    </nav>
  );
};

export default NavBar;
