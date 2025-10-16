import { Button } from '@/components/ui/button';
import Section from '@/components/ui/section';
import Image from 'next/image';
import Link from 'next/link';

export const StartYourJourney = () => {
  return (
    <Section className="bg-ctas flex flex-col-reverse items-center justify-between gap-6 rounded-none py-16 text-white md:flex-row md:gap-0 md:py-20">
      <div className="flex w-full flex-col items-center justify-center gap-6 px-6 md:w-1/2 md:items-start md:px-12">
        <p className="text-center text-3xl font-semibold tracking-tight md:text-left md:text-4xl">
          ¿Listo para comenzar tu camino en la producción musical?
        </p>
        <p className="max-w-xl text-center text-lg md:text-left">
          Inscribite ahora y transformá tu pasión en experiencia con nuestros cursos integrales de
          producción musical.
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
          <Button className="bg-secondaryLight rounded-xl px-6 py-4 hover:bg-white" asChild>
            <Link href="/acceso">
              <p className="text-secondaryBg text-lg">Inscribite ahora</p>
            </Link>
          </Button>
          <Button variant="outline" className="rounded-xl px-6 py-4" asChild>
            <Link href="/">
              <p className="text-lg">Ver cursos</p>
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative h-64 w-full max-w-sm md:h-96 md:w-1/3 md:max-w-none">
        <Image
          src="/images/home/start-your-journey.jpg"
          alt="Test Image"
          fill
          className="rounded-xl object-cover"
        />
      </div>
    </Section>
  );
};
