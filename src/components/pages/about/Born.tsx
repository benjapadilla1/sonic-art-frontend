import Section from '@/components/ui/section';
import Image from 'next/image';

const Born = () => {
  return (
    <Section className="bg-secondaryLight text-secondaryBlack flex w-screen flex-col items-center justify-center py-16">
      <h3 className="mb-10 text-center text-4xl font-bold tracking-tight sm:text-5xl">
        ¿Cómo nació Sonic Art?
      </h3>
      <div className="flex w-full max-w-6xl flex-col-reverse items-center gap-12 md:flex-row md:items-stretch md:gap-16">
        <div className="w-full md:w-1/2">
          <p className="text-justify text-base leading-relaxed md:text-lg">
            Sonic Art nació de una necesidad muy personal. Cuando yo mismo comencé a estudiar
            producción musical, me enfrenté a un océano de información desordenada y abrumadora. Esa
            sobrecarga de datos muchas veces no hacía más que frustrarme y hacerme sentir que crear
            buena música era una meta inalcanzable. Fue a través de años de experiencia, estudio y
            errores que descubrí que, en realidad, menos es más: que simplificando procesos,
            entendiendo principios esenciales y enfocándose en lo importante, cualquier persona
            puede alcanzar un sonido profesional. A partir de mi experiencia trabajando como
            instructor y mentor de artistas de distintos niveles, sentí que era hora de crear un
            espacio diferente. Un lugar donde aprender a producir música fuera claro, motivador y
            práctico, sin vueltas innecesarias ni tecnicismos vacíos. Así nació Sonic Art, con el
            propósito de simplificar, impulsar y potenciar la creatividad de cada artista.
          </p>
        </div>
        <div className="flex w-full justify-center md:w-1/2">
          <div className="relative h-full w-full max-w-sm md:max-w-md lg:max-w-lg">
            <Image
              src="/images/about/FullSizeRender5.jpg"
              alt="Sonic Art"
              fill
              className="rounded-xl object-cover shadow-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Born;
