import { Button } from '@/components/ui/button';
import { Instagram, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-secondaryLight px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:justify-between">
        <div>
          <Link href={'/'}>
            <Image alt="Logo" width={80} height={60} src={'/images/logos/logo_black.png'} />
          </Link>
        </div>

        <div className="flex flex-col gap-2 text-sm md:text-base">
          <Link href="/cursos" className="text-muted-foreground transition hover:text-black">
            Cursos
          </Link>
          <Link href="/sample-packs" className="text-muted-foreground transition hover:text-black">
            Sample Packs
          </Link>
          <Link href="/clases" className="text-muted-foreground transition hover:text-black">
            Clases 1 a 1
          </Link>
          <Link href="/contacto" className="text-muted-foreground transition hover:text-black">
            Contacto
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">Seguinos</span>
          <div className="flex items-center gap-3">
            <Button className="hover:bg-ctas" variant="ghost" size="icon" asChild>
              <a
                href="https://www.instagram.com/sonicart.lab/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button className="hover:bg-ctas" variant="ghost" size="icon" asChild>
              <a
                href="https://www.youtube.com/channel/UCRTidIvv5e1JXhE0O5Mfl7Q"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="text-muted-foreground mt-10 flex flex-col gap-4 border-t pt-6 text-center text-xs">
        © {new Date().getFullYear()} Sonic Art. Todos los derechos reservados.
        <div className="flex items-center justify-center gap-2">
          <Link href="/politica-de-privacidad" className="hover:underline">
            Política de Privacidad
          </Link>
          <Link href="/terminos-y-condiciones" className="hover:underline">
            Términos y Condiciones
          </Link>
        </div>
      </div>
    </footer>
  );
};
