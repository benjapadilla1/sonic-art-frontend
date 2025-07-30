'use client';

import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export function NavbarMenu() {
  return (
    <NavigationMenu className="ml-34 hidden lg:block">
      <NavigationMenuList className="gap-2">
        <NavigationMenuItem>
          <Link href="/cursos" passHref>
            <NavigationMenuLink
              className={
                (navigationMenuTriggerStyle(),
                'font-engravers text-backgroundLight text-lg font-semibold')
              }
            >
              Cursos
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/sample-packs" passHref>
            <NavigationMenuLink
              className={
                (navigationMenuTriggerStyle(),
                'font-engravers text-backgroundLight text-lg font-semibold')
              }
            >
              Sample Packs
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/clases" passHref>
            <NavigationMenuLink
              className={
                (navigationMenuTriggerStyle(),
                'font-engravers text-backgroundLight text-lg font-semibold')
              }
            >
              Clases 1 a 1
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/sobre-nosotros" passHref>
            <NavigationMenuLink
              className={
                (navigationMenuTriggerStyle(),
                'font-engravers text-backgroundLight text-lg font-semibold')
              }
            >
              Sobre nosotros
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contacto" passHref>
            <NavigationMenuLink
              className={
                (navigationMenuTriggerStyle(),
                'font-engravers text-backgroundLight text-lg font-semibold')
              }
            >
              Contacto
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
