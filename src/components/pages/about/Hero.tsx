import Section from '@/components/ui/section';
import Image from 'next/image';

const AboutHero = () => {
  return (
    <Section className="text-secondaryBlack flex flex-col items-center justify-center px-4 py-16">
      <div className="mb-10 max-w-4xl text-center">
        <h1 className="font-engravers mb-6 text-4xl font-semibold tracking-wide uppercase md:text-5xl">
          La producción musical en su esencia más pura
        </h1>
        <p className="text-lg leading-relaxed md:text-xl">
          En Sonic Art creemos que la música es una de las formas más poderosas de expresión
          personal. Por eso, nuestra misión es acompañarte en el camino de descubrir y potenciar tu
          propia voz artística, simplificando el proceso de aprender a producir música y dándote
          herramientas claras y prácticas para crecer.
        </p>
      </div>

      <div className="relative aspect-[16/9] w-full max-w-6xl overflow-hidden rounded-xl shadow-lg">
        <Image
          src="/images/about/about.png"
          alt="Sonic Art producción musical"
          fill
          className="object-cover"
          priority
        />
      </div>
    </Section>
  );
};

export default AboutHero;
