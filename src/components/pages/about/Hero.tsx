import Section from '@/components/ui/section';

const AboutHero = () => {
  return (
    <Section className="flex flex-col items-center justify-center gap-6">
      <h3 className="font-engravers text-secondaryBlack mb-4 text-4xl font-semibold tracking-wide uppercase">
        La producción musical en su esencia más pura
      </h3>
      <p className="text-lg leading-relaxed">
        En Sonic Art creemos que la música es una de las formas más poderosas de expresión personal.
        Por eso, nuestra misión es acompañarte en el camino de descubrir y potenciar tu propia voz
        artística, simplificando el proceso de aprender a producir música y dándote herramientas
        claras y prácticas para crecer.
      </p>
    </Section>
  );
};

export default AboutHero;
