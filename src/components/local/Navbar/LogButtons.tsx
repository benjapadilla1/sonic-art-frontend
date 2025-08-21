import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface LogButtonsProps {
  isMobile?: boolean;
  setOpen?: (open: boolean) => void;
}

const LogButtons = ({ isMobile, setOpen }: LogButtonsProps) => {
  return (
    <div
      className={cn(
        isMobile ? 'relative mr-4 flex flex-row gap-1' : 'hidden flex-row gap-4 lg:flex'
      )}
    >
      {isMobile ? (
        <>
          <Button
            className="border-ctas font-engravers text-secondaryBlack bg-secondaryLight w-1/2 rounded-none border-1 hover:text-white"
            asChild
            onClick={() => setOpen?.(false)}
          >
            <Link href="/acceso">Iniciar Sesión</Link>
          </Button>
          <Button
            className="border-ctas font-engravers hover:text-secondaryBlack w-1/2 rounded-none border-1 hover:bg-transparent"
            asChild
            onClick={() => setOpen?.(false)}
          >
            <Link href="/registro">Registrarse</Link>
          </Button>
        </>
      ) : (
        <>
          <Button
            className="border-ctas font-engravers rounded-none border-2 bg-transparent"
            asChild
          >
            <Link href="/acceso">Iniciar Sesión</Link>
          </Button>
          <Button
            className="border-ctas font-engravers rounded-none border-2 hover:bg-transparent"
            asChild
          >
            <Link href="/registro">Registrarse</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default LogButtons;
