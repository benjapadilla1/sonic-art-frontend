import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-secondaryLight px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-black">Sonic Lab</h2>
          <p className="text-muted-foreground mt-2 max-w-xs text-sm">Aca iria el slogan</p>
        </div>

        <div className="flex flex-col gap-2 text-sm md:text-base">
          <Link href="/cursos" className="text-muted-foreground transition hover:text-black">
            Cursos
          </Link>
          <Link href="/sample-packs" className="text-muted-foreground transition hover:text-black">
            Sample Packs
          </Link>
          <Link href="/mentoria" className="text-muted-foreground transition hover:text-black">
            Mentoría 1 a 1
          </Link>
          <Link href="/contacto" className="text-muted-foreground transition hover:text-black">
            Contacto
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium">Seguinos</span>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="text-muted-foreground mt-10 border-t pt-6 text-center text-xs">
        © {new Date().getFullYear()} Sonic Art. Todos los derechos reservados.
      </div>
    </footer>
  );
};
