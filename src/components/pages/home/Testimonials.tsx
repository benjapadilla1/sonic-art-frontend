import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Section from '@/components/ui/section';
import { LabelLogoCarousel } from './LabelLogoCarousel';

const reviews = [
  {
    name: 'Sofía R.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    title: '¡Increíble experiencia!',
    description:
      'Los cursos están súper bien explicados, y aprendí más en una semana que en meses por mi cuenta.',
    rating: 5,
  },
  {
    name: 'Matías G.',
    image: 'https://randomuser.me/api/portraits/men/33.jpg',
    title: 'Muy recomendado',
    description: 'Compré un sample pack y la calidad es excelente. Volveré por más.',
    rating: 4,
  },
  {
    name: 'Lucía P.',
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
    title: 'Gran comunidad',
    description:
      'Me encanta la comunidad, siempre hay alguien dispuesto a ayudar y compartir ideas.',
    rating: 5,
  },
  {
    name: 'Carlos M.',
    image: 'https://randomuser.me/api/portraits/men/21.jpg',
    title: 'Atención rápida',
    description:
      'Tuve un problema con mi cuenta y lo resolvieron en menos de un día. Excelente soporte.',
    rating: 4,
  },
  {
    name: 'Valentina S.',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
    title: 'Contenido actualizado',
    description: 'Siempre encuentro material nuevo y relevante para mejorar mis producciones.',
    rating: 5,
  },
  {
    name: 'Javier T.',
    image: 'https://randomuser.me/api/portraits/men/56.jpg',
    title: 'Fácil de usar',
    description: 'La plataforma es intuitiva y fácil de navegar, incluso para principiantes.',
    rating: 4,
  },
];

export const Testimonials = () => {
  const slides = Array.from({ length: Math.ceil(reviews.length / 2) }, (_, i) =>
    reviews.slice(i * 2, i * 2 + 2)
  );

  return (
    <Section className="">
      <p className="font-engravers text-secondaryBg mb-12 text-center text-3xl font-semibold">
        Experiencias de <span className="text-ctas">nuestra comunidad</span>
      </p>
      <Carousel className="relative">
        <CarouselContent>
          {slides.map((pair, idx) => (
            <CarouselItem key={idx} className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {pair.map(review => (
                <Card
                  key={review.name}
                  className="bg-secondaryBg text-secondaryLight relative border-none shadow-xl backdrop-blur-xl transition-transform hover:scale-[1.02] hover:rounded-xl"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={review.image} alt={review.name} />
                        <AvatarFallback>{review.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{review.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">{review.title}</p>
                    <p className="mt-2 text-sm">{review.description}</p>
                  </CardContent>
                  <CardFooter className="text-yellow-500">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </CardFooter>
                </Card>
              ))}
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-8 flex justify-center gap-4">
          <CarouselPrevious className="!static !top-auto !left-auto !transform-none" />
          <CarouselNext className="!static !top-auto !left-auto !transform-none" />
        </div>
      </Carousel>
      <LabelLogoCarousel />
    </Section>
  );
};
