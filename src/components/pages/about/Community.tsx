import { Button } from '@/components/ui/button';
import Section from '@/components/ui/section';

const Community = () => {
  return (
    <Section className="flex flex-col justify-center gap-5">
      <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
        Sumate a nuestra comunidad de artistas
      </h2>
      <div className="flex flex-col justify-center gap-4 text-center">
        <p>
          Hoy, a través de nuestros cursos, sample packs, mentorías y comunidad online, acompañamos
          a productores de todo el mundo a dar pasos firmes en su camino musical. Desde quienes
          recién comienzan a experimentar en un DAW, hasta productores más avanzados que buscan
          perfeccionar sus mezclas o lanzar su música en sellos reconocidos.
        </p>
        <p>
          Si estás buscando un lugar donde aprender de manera efectiva, desarrollar tu arte y
          rodearte de una comunidad que te apoye en cada etapa, este es tu espacio.
        </p>
        <p className="text-center font-semibold">
          Te invitamos a sumarte a nuestra comunidad y comenzar a construir, hoy mismo, el sonido de
          tu propia historia.
        </p>
      </div>
      <div className="flex justify-center">
        <Button className="max-w-lg p-6 text-lg font-semibold transition" asChild>
          <a href="https://discord.com/invite/mz8XdqrCjU" target="_blank" rel="noopener noreferrer">
            Unirse a la comunidad
          </a>
        </Button>
      </div>
    </Section>
  );
};

export default Community;
