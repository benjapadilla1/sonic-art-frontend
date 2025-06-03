import { Button } from '@/components/ui/button';
import Section from '@/components/ui/section';
import Image from 'next/image';
import Link from 'next/link';

export const StartYourJourney = () => {
  return (
    <Section className="bg-ctas flex items-center justify-center gap-5 rounded-none text-white">
      <div className="flex w-1/2 flex-col justify-center gap-4 px-8 py-16">
        <p className="font-engravers text-4xl font-semibold">
          ¿Listo para comenzar tu camino en la producción musical?
        </p>
        <p className="max-w-xl text-lg">
          Inscribite ahora y transformá tu pasión en experiencia con nuestros cursos integrales de
          producción musical.
        </p>
        <div className="flex gap-2">
          <Button className="bg-secondaryLight rounded-xl px-8 py-6 hover:bg-white" asChild>
            <Link href="/acceso">
              <p className="text-secondaryBg text-xl">Inscribite ahora</p>
            </Link>
          </Button>
          <Button variant="outline" className="rounded-xl px-8 py-6" asChild>
            <Link href="/">
              <p className="text-xl">Ver cursos</p>
            </Link>
          </Button>
        </div>
      </div>
      <div className="relative h-80 w-1/3">
        <Image
          src={
            'https://images.pexels.com/photos/8132964/pexels-photo-8132964.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
          }
          alt="Test Image"
          fill
          className="rounded-xl object-cover"
        />
      </div>
    </Section>
  );
};
