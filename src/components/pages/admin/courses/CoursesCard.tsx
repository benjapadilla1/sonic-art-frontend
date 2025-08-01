'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
}

export const CoursesCard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses`);
      if (!res.ok) throw new Error('Error al obtener cursos');
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDeleteCourse = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar curso');

      fetchCourses();
    } catch (err) {
      console.error('Error al eliminar curso:', err);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-around">
        <h2 className="text-2xl font-bold">Cursos</h2>
        <Link href={`/admin/courses/create`}>
          <Button>Crear Curso</Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {courses.map(course => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription className="text-muted-foreground line-clamp-2 text-sm">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  <strong>Precio:</strong> ${course.price}
                </p>
                <p className="text-muted-foreground text-sm">
                  <strong>Duración:</strong> {course.duration} hs
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/admin/courses/${course.id}`}>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </Link>
                <Button
                  onClick={() => handleDeleteCourse(course.id)}
                  variant="destructive"
                  size="sm"
                >
                  Eliminar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
