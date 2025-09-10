'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Section from '@/components/ui/section';
import { fetchCourseById } from '@/functions/courses/fetchCourseById';
import { useCartStore } from '@/stores/useCartStore';
import { Course } from '@/types/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Testimonials } from '../../home/Testimonials';
import { FAQs } from '../FAQs';
import { CourseIntroVideo } from './CourseIntroVideo';
import { DetailCourseModules } from './DetailCourseModules';

type Props = {
  id: string;
};

const DetailCourse = ({ id }: Props) => {
  const [course, setCourse] = useState<Course | null>(null);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetchCourseById(id);
      setCourse(response);
    };
    fetchCourse();
  }, [id]);

  if (!course) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-500">Cargando curso...</p>
      </div>
    );
  }

  return (
    <>
      <Section className="mx-auto max-w-6xl !py-8">
        <Card className="overflow-hidden rounded-3xl border border-gray-200 shadow-xl dark:border-neutral-800">
          <CardContent className="grid grid-cols-1 gap-10 p-8 md:grid-cols-2">
            <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:from-neutral-800 dark:to-neutral-900">
              <Image
                src={course.coverImageUrl || '/placeholder.png'}
                alt={course.title}
                className="h-auto max-h-[400px] w-full object-contain drop-shadow-md"
                width={600}
                height={450}
              />
            </div>

            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {course.title}
                </h1>
                <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  {course.description}
                </p>

                <div className="text-ctas text-4xl font-bold">${course.price}</div>

                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Duración:</strong> {course.duration} horas
                  </li>
                  <li>
                    <strong>Módulos:</strong> {course.modules?.length || 0}
                  </li>
                </ul>
              </div>

              <Button
                className="rounded-xl py-6 text-lg font-semibold"
                onClick={() => {
                  addItem({
                    id: course.id,
                    title: course.title,
                    type: 'course',
                    price: Number(course.price),
                    coverImageUrl: course.coverImageUrl ?? '/placeholder.jpg',
                  });
                }}
              >
                Agregar al carrito
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>

      <CourseIntroVideo videoUrl={course.introVideoUrl} />
      <DetailCourseModules course={course} />
      <Testimonials />
      <FAQs />
    </>
  );
};

export default DetailCourse;
