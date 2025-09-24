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
      <div className="flex flex-wrap justify-around gap-10 pt-4">
        {courses && courses.length > 0 ? (
          <div className="flex flex-wrap justify-around gap-10 pt-4">
            {courses.map(course => (
              <div key={course.id} className="group flex flex-col transition-all duration-500">
                <Link href={`/mis-cursos/${course.id}`}>
                  <div className="text-secondaryLight bg-secondaryBg flex h-[600px] w-[350px] flex-col gap-4 rounded-2xl px-4 py-6 shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl">
                    <div className="h-64 w-full overflow-hidden rounded-xl">
                      <Image
                        src={course.coverImageUrl ?? ''}
                        alt={course.title}
                        width={400}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex items-center justify-center text-center">
                      <p className="font-engravers text-lg font-semibold">{course.title}</p>
                    </div>

                    <p className="text-secondaryLight line-clamp-3 text-sm">{course.description}</p>

                    <div className="flex-grow" />

                    <div className="flex items-center justify-center">
                      <Button>
                        <p>Ver curso</p>
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
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
