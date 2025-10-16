import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Section from '@/components/ui/section';
import Image from 'next/image';
import Link from 'next/link';

const courses = [
  {
    title: 'Curso de Producción EDM',
    description: 'Aprendé a producir como un pro desde cero.',
    creator: 'Pedro L.',
    avatarImage: 'https://randomuser.me/api/portraits/men/12.jpg',
    courseImage: 'https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849822_960_720.jpg',
    price: '$499',
    difficulty: 'Principiante',
    duration: '8 semanas',
  },
  {
    title: 'Sample Pack Lo-Fi Vol.1',
    description: 'Más de 200 sonidos para tus beats chill.',
    creator: 'Anna S.',
    avatarImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    courseImage:
      'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    price: '$799',
    difficulty: 'Intermedio',
    duration: '12 semanas',
  },
  {
    title: 'Curso de Mezcla y Mastering',
    description: 'Llevá tus producciones al siguiente nivel.',
    creator: 'Lucas R.',
    avatarImage: 'https://randomuser.me/api/portraits/men/64.jpg',
    courseImage:
      'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&h=400',
    price: '$1999',
    difficulty: 'Avanzado',
    duration: '14 semanas',
  },
];

export const LastReleases = () => {
  return (
    <Section className="bg-secondaryLight">
      <h2 className="text-secondaryBg mb-8 text-center text-3xl font-semibold tracking-tight">
        Últimos <span className="text-ctas">lanzamientos</span>
      </h2>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
        {courses.map((course, i) => (
          <div key={i} className="group flex h-full flex-col transition-all duration-500">
            <div className="text-secondaryLight bg-secondaryBg flex h-full flex-col gap-4 rounded-2xl px-4 py-6 shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl">
              <div className="h-72 w-full overflow-hidden rounded-xl">
                <Image
                  src={course.courseImage}
                  alt={course.title}
                  width={400}
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={course.avatarImage} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>{course.creator}</p>
              </div>
              <div className="flex justify-between">
                <div className="bg-ctas rounded-xl px-3 py-1">
                  <p>{course.difficulty}</p>
                </div>
                <p className="">{course.duration}</p>
              </div>
              <p className="text-lg font-semibold tracking-tight">{course.title}</p>
              <p className="flex-1">{course.description}</p>
              <div className="flex-grow" />
              <div className="flex items-center justify-between">
                <p className="text-ctas font-semibold">{course.price}</p>
                <Button asChild>
                  <Link href="/cursos">
                    <p>Ver curso</p>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center px-4 pt-12">
        <Button asChild variant="ghost">
          <Link href="/cursos">
            <p className="text-ctas text-xl">Ver todos los cursos {'>'}</p>
          </Link>
        </Button>
      </div>
    </Section>
  );
};
