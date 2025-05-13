import { Button } from '@/components/ui/button';
import Section from '@/components/ui/section';

export const SonicArtPhilosophy = () => {
  return (
    <Section className="bg-secondaryBg flex flex-col items-center justify-center gap-10 px-6 py-20 text-white md:px-10 lg:px-20">
      <h2 className="font-engravers text-center text-3xl font-bold tracking-widest md:text-4xl">
        Sumate a nuestra comunidad de artistas
      </h2>

      <div className="max-w-4xl space-y-6 text-base leading-loose tracking-wide text-pretty md:text-lg">
        <p>
          En <strong>Sonic Art</strong> no creemos en fórmulas mágicas ni atajos. Creemos en el
          trabajo consciente, en el desarrollo de un oído crítico y en la importancia de encontrar
          tu propia identidad sonora.
        </p>
        <p>
          Nuestra propuesta combina conocimientos técnicos sólidos con un enfoque artístico y
          creativo, siempre adaptado a tus necesidades y nivel de experiencia.
        </p>
        <p>
          Hoy, a través de nuestros cursos, sample packs, mentorías y comunidad online, acompañamos
          a productores de todo el mundo a dar pasos firmes en su camino musical. Desde quienes
          recién comienzan a experimentar en un DAW, hasta productores más avanzados que buscan
          perfeccionar sus mezclas o lanzar su música en sellos reconocidos.
        </p>
        <p>
          Más que una academia, <strong>Sonic Art</strong> es una comunidad de personas que
          comparten una misma pasión: la música como forma de vida.
        </p>
        <p>
          Si estás buscando un lugar donde aprender de manera efectiva, desarrollar tu arte y
          rodearte de una comunidad que te apoye en cada etapa, este es tu espacio.
        </p>
        <p className="font-semibold">
          Te invitamos a sumarte a nuestra comunidad y comenzar a construir, hoy mismo, el sonido de
          tu propia historia.
        </p>
      </div>

      <Button className="mt-6 px-8 py-6 text-lg font-semibold" asChild>
        <a href="https://discord.com/invite/mz8XdqrCjU" target="_blank" rel="noopener noreferrer">
          Unirse
        </a>
      </Button>
    </Section>
  );
};
