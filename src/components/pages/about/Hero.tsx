import Section from '@/components/ui/section';
import Image from 'next/image';

const AboutHero = () => {
  return (
    <Section className="flex flex-col items-center justify-center gap-4">
      <h3 className="font-engravers text-secondaryBlack text-4xl font-semibold tracking-wide uppercase">
        La producción musical en su esencia más pura
      </h3>
      <p className="max-w-[1350px] text-center text-lg leading-relaxed">
        En Sonic Art creemos que la música es una de las formas más poderosas de expresión personal.
        Por eso, nuestra misión es acompañarte en el camino de descubrir y potenciar tu propia voz
        artística, simplificando el proceso de aprender a producir música y dándote herramientas
        claras y prácticas para crecer.
      </p>
      <div className="relative mt-20 size-full h-96 w-full overflow-hidden rounded-lg">
        <Image fill src="/images/about/about.png" alt="Hero About image" />
      </div>
    </Section>
  );
};

export default AboutHero;
