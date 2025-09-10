'use client';

import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/useAuthStore';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LogButtons from './LogButtons';
import { MobileNavbar } from './MobileNavbar';
import { NavbarMenu } from './NavDropdown';
import { UserProfile } from './UserProfile';

const NavBar: React.FC = () => {
  const [isTop, setIsTop] = useState(true);
  const [isAuthResolved, setIsAuthResolved] = useState(false);
  const { fetchAdminStatus, isLoggedIn, token } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      setIsTop(window.scrollY < 900);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        await fetchAdminStatus();
      }
      setIsAuthResolved(true);
    };

    initAuth();
  }, [fetchAdminStatus, token]);

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
      <MobileNavbar />
      <div className="flex w-48 items-center justify-end">
        {isAuthResolved ? (
          isLoggedIn ? (
            <UserProfile />
          ) : (
            <LogButtons />
          )
        ) : (
          <div className="h-10 w-full" />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
