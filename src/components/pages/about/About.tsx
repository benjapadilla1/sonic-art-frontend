import { Card, CardContent } from '@/components/ui/card';
import Section from '@/components/ui/section';
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <div className="space-y-12">
      <Section>
        <h1 className="mb-4 text-4xl font-bold">Sobre Nosotros</h1>
        <p className="text-muted-foreground text-lg">
          Somos una plataforma creada por y para productores musicales. Nuestro objetivo es ayudarte
          a crecer, aprender y conectar con otros artistas apasionados como vos.
        </p>
      </Section>

      <Section>
        <h2 className="mb-2 text-2xl font-semibold">Nuestra Misión</h2>
        <Separator className="mb-4" />
        <p className="text-muted-foreground">
          Democratizar el acceso al conocimiento y las herramientas profesionales del mundo de la
          producción musical. Queremos que puedas llevar tu arte al siguiente nivel sin importar tu
          experiencia previa o tus recursos.
        </p>
      </Section>

      <Section>
        <h2 className="mb-2 text-2xl font-semibold">Qué Ofrecemos</h2>
        <Separator className="mb-4" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-bold">Cursos Online</h3>
              <p className="text-muted-foreground">
                Desde fundamentos hasta técnicas avanzadas, nuestros cursos están diseñados por
                productores activos en la industria.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-bold">Sample Packs</h3>
              <p className="text-muted-foreground">
                Packs originales de alta calidad listos para usar en tus producciones. Sonidos que
                inspiran.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-bold">Mentorías 1 a 1</h3>
              <p className="text-muted-foreground">
                Clases personalizadas con artistas y productores profesionales. Recibí feedback real
                y llevá tu música a otro nivel.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <h2 className="mb-2 text-2xl font-semibold">Nuestra Comunidad</h2>
        <Separator className="mb-4" />
        <p className="text-muted-foreground mb-4">
          Creemos en el poder de compartir. Por eso construimos una comunidad activa en Discord
          donde podés mostrar tus beats, colaborar, recibir feedback y mantenerte motivado.
        </p>
      </Section>

      <Section>
        <h2 className="mb-2 text-2xl font-semibold">Sumate al Movimiento</h2>
        <Separator className="mb-4" />
        <p className="text-muted-foreground mb-6">
          Si sos productor, beatmaker o simplemente alguien con amor por la música, esta plataforma
          es para vos.
        </p>
        <a
          href="/registro"
          className="bg-primary text-primary-foreground inline-block rounded-xl px-6 py-3 font-semibold transition hover:brightness-110"
        >
          Crear cuenta
        </a>
      </Section>
    </div>
  );
};

export default About;
