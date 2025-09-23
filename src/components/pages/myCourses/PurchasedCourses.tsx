'use client';

import { Button } from '@/components/ui/button';
import { fetchPurchasedCourses } from '@/functions/courses/fetchPurchasedCourses';
import { useAuthStore } from '@/stores/useAuthStore';
import { Course } from '@/types/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const PurchasedCourses = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[] | null>([]);
  const router = useRouter();
  const { isLoggedIn, user } = useAuthStore();

  if (!isLoggedIn) {
    router.push('/acceso');
  }

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const response = await fetchPurchasedCourses(user?.uid ?? '');
        setCourses(response || []);
      } catch (error) {
        console.error('Error cargando cursos', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [user?.uid]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <span className="text-secondaryBg text-lg">Cargando tus cursos...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <h3 className="font-engravers pt-4 text-center text-2xl font-semibold">Tus cursos</h3>
      <div className="flex">
        {courses && courses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map(course => (
              <Link
                href={`/mis-cursos/${course.id}`}
                key={course.id}
                className="group relative overflow-hidden rounded-lg border shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={course.coverImageUrl ?? ''}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold">{course.title}</h3>
                  <p className="line-clamp-2 text-sm text-gray-600">{course.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mx-auto my-8 flex flex-col items-center">
            <p className="mb-4">No tienes cursos comprados aún.</p>
            <Link href="/cursos">
              <Button size="lg" className="text-xl">
                Comprar cursos
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchasedCourses;
