'use client';

import { fetchCourses } from '@/functions/courses/fetchCourses';
import { useAuthStore } from '@/stores/useAuthStore';
import { Course } from '@/types/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const [courses, setCourses] = useState<Course[] | null>([]);
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    router.push('/acceso');
  }

  useEffect(() => {
    const loadCourses = async () => {
      const response = await fetchCourses();
      setCourses(response);
    };

    loadCourses();
  }, []);

  return (
    <div className="font-engravers min-h-screen py-20 text-center text-2xl font-semibold">
      Tus cursos
      <div className="flex">
        {courses?.map(course => (
          <Link
            href={`/mis-cursos/${course.id}`}
            key={course.id}
            className="m-2 rounded border p-4"
          >
            <h3 className="font-semibold">{course.title}</h3>
            <p>{course.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
