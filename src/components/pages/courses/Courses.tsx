'use client';

import { Button } from '@/components/ui/button';
import { fetchCourses } from '@/functions/courses/fetchCourses';
import { useCartStore } from '@/stores/useCartStore';
import { Course } from '@/types/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const { addItem } = useCartStore();

  const loadCourses = async () => {
    const response = await fetchCourses();
    setCourses(response);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div className="flex flex-col gap-2 pt-4">
      <h2 className="font-engravers py-4 text-center text-3xl font-semibold">Nuestros Cursos</h2>
      <div className="flex flex-wrap justify-around gap-10">
        {courses.map(course => (
          <div key={course.id} className="group flex h-full flex-col transition-all duration-500">
            <div className="text-secondaryLight bg-secondaryBg flex h-full flex-col gap-4 rounded-2xl px-4 py-6 shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl">
              <div className="h-72 w-full overflow-hidden rounded-xl">
                <Image
                  src={course.coverImageUrl ?? '/placeholder.jpg'}
                  alt={course.title}
                  width={400}
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="flex items-center justify-center text-center">
                <p className="font-engravers text-lg font-semibold">{course.title}</p>
              </div>

              <div className="flex justify-between text-sm text-gray-400">
                <div className="bg-ctas rounded-xl px-3 py-1 text-white">
                  <p>{course.duration} hs</p>
                </div>
                <p>Creado: {new Date(course.createdAt).toLocaleDateString()}</p>
              </div>

              <p className="text-secondaryLight flex-1 text-sm">{course.description}</p>

              <div className="flex-grow" />

              <div className="flex items-center justify-between">
                <p className="flex gap-1 text-white">
                  <span className="text-ctas">$</span>
                  {course.price}
                </p>
                <Button
                  onClick={() =>
                    addItem({
                      id: course.id,
                      title: course.title,
                      type: 'course',
                      price: Number(course.price),
                      coverImageUrl: course.coverImageUrl ?? '/placeholder.jpg',
                    })
                  }
                >
                  <p>Añadir al carrito</p>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
