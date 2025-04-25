import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Section from '@/components/ui/section';
import Image from 'next/image';

const courses = [
  {
    title: 'Curso de Producción Trap',
    description: 'Aprendé a producir como un pro desde cero.',
    date: '15/01/2023',
    creator: 'Carlos N.',
    avatarImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    courseImage:
      'https://images.pexels.com/photos/164967/pexels-photo-164967.jpeg?auto=compress&cs=tinysrgb&h=400',
  },
  {
    title: 'Sample Pack Lo-Fi Vol.1',
    description: 'Más de 200 sonidos para tus beats chill.',
    date: '12/02/2023',
    creator: 'Juan P.',
    avatarImage: 'https://randomuser.me/api/portraits/men/45.jpg',
    courseImage:
      'https://images.pexels.com/photos/114907/pexels-photo-114907.jpeg?auto=compress&cs=tinysrgb&h=400',
  },
  {
    title: 'Curso de Mezcla y Mastering',
    description: 'Llevá tus producciones al siguiente nivel.',
    date: '25/02/2023',
    creator: 'María G.',
    avatarImage: 'https://randomuser.me/api/portraits/women/29.jpg',
    courseImage:
      'https://images.pexels.com/photos/164853/pexels-photo-164853.jpeg?auto=compress&cs=tinysrgb&h=400',
  },
  {
    title: 'Curso de Producción EDM',
    description: 'Aprendé a producir como un pro desde cero.',
    date: '15/01/2023',
    creator: 'Pedro L.',
    avatarImage: 'https://randomuser.me/api/portraits/men/12.jpg',
    courseImage: 'https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849822_960_720.jpg',
  },
  {
    title: 'Sample Pack Lo-Fi Vol.1',
    description: 'Más de 200 sonidos para tus beats chill.',
    date: '12/02/2023',
    creator: 'Anna S.',
    avatarImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    courseImage:
      'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    title: 'Curso de Mezcla y Mastering',
    description: 'Llevá tus producciones al siguiente nivel.',
    date: '25/02/2023',
    creator: 'Lucas R.',
    avatarImage: 'https://randomuser.me/api/portraits/men/64.jpg',
    courseImage:
      'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&h=400',
  },
];

export const LastReleases = () => {
  return (
    <Section className="bg-secondaryLight">
      <h2 className="font-engravers mb-8 text-center text-3xl font-semibold">
        Últimos lanzamientos
      </h2>
      <Carousel>
        <CarouselContent>
          {courses.map((course, i) => (
            <CarouselItem
              key={i}
              className="group basis-full transition-all duration-500 md:basis-1/3"
            >
              <div className="bg-backgroundLight flex h-full flex-col gap-4 rounded-2xl px-4 py-6 shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl">
                <div className="h-96 w-full overflow-hidden rounded-xl">
                  <Image
                    src={course.courseImage}
                    alt={course.title}
                    width={700}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={course.avatarImage} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="font-medium">{course.creator}</p>
                </div>
                <p className="text-xs text-gray-500">{course.date}</p>
                <p className="font-engravers text-lg font-semibold">{course.title}</p>
                <p className="text-sm text-gray-700">{course.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Section>
  );
};
