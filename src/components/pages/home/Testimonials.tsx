import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Section from '@/components/ui/section';
import { Quote } from 'lucide-react';
import { LabelLogoCarousel } from './LabelLogoCarousel';

const reviews = [
  {
    name: 'Sofía R.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    title: '¡Increíble experiencia!',
    description:
      'Los cursos están súper bien explicados, y aprendí más en una semana que en meses por mi cuenta.',
    date: '2 semanas atrás',
    rating: 5,
  },
  {
    name: 'Matías G.',
    image: 'https://randomuser.me/api/portraits/men/33.jpg',
    title: 'Muy recomendado',
    description: 'Compré un sample pack y la calidad es excelente. Volveré por más.',
    date: '1 mes atrás',
    rating: 4,
  },
];

export const Testimonials = () => {
  return (
    <Section className="">
      <p className="font-engravers mb-12 text-center text-3xl font-semibold">
        Opiniones de nuestros alumnos
      </p>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {reviews.map((review, i) => (
          <Card
            key={i}
            className="relative border-none bg-white/70 shadow-xl backdrop-blur-xl transition-transform hover:scale-[1.02]"
          >
            <Quote className="absolute -top-5 -left-5 text-6xl opacity-20" />
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={review.image} alt={review.name} />
                  <AvatarFallback>{review.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base text-gray-800">{review.name}</CardTitle>
                  <CardDescription className="text-sm">{review.date}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-lg font-semibold">{review.title}</p>
              <p className="text-muted-foreground mt-2 text-sm">{review.description}</p>
            </CardContent>
            <CardFooter className="text-yellow-500">
              {'★'.repeat(review.rating)}
              {'☆'.repeat(5 - review.rating)}
            </CardFooter>
          </Card>
        ))}
      </div>
      <LabelLogoCarousel />
    </Section>
  );
};
