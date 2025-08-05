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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Course } from '@/types/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const CoursesCard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

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
      toast.success('Curso eliminado correctamente');
    } catch (err) {
      console.error('Error al eliminar curso:', err);
      toast.error('Error al eliminar curso');
    } finally {
      setOpenDialog(false);
      setSelectedCourseId(null);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row">
        <h2 className="font-engravers text-2xl font-bold">Cursos</h2>
        <Link href={`/admin/cursos/crear`}>
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
            <Card
              key={course.id}
              className="flex flex-col shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              {course.coverImageUrl ? (
                <div className="relative -mt-6 h-64 w-full">
                  <Image
                    src={course.coverImageUrl}
                    alt={`Portada del curso ${course.title}`}
                    fill
                    className="rounded-t-lg object-cover"
                  />
                </div>
              ) : (
                <Skeleton className="-mt-6 h-64 w-full rounded-xl" />
              )}

              <CardHeader className="flex flex-col gap-1 px-4 pt-4">
                <CardTitle className="text-lg font-semibold">{course.title}</CardTitle>
                <CardDescription className="text-muted-foreground line-clamp-3 text-sm">
                  {course.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow space-y-1 px-4 pt-2 pb-4">
                <p className="text-muted-foreground text-sm">
                  <strong>Precio:</strong> ${course.price}
                </p>
                <p className="text-muted-foreground text-sm">
                  <strong>Duración:</strong> {course.duration} hs
                </p>
              </CardContent>

              <CardFooter className="flex items-center justify-between px-4 pt-2 pb-4">
                <Link href={`/admin/cursos/${course.id}`}>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    setSelectedCourseId(course.id);
                    setOpenDialog(true);
                  }}
                  variant="destructive"
                  size="sm"
                >
                  Eliminar
                </Button>
              </CardFooter>
            </Card>
          ))}

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="bg-secondaryLight flex flex-col gap-3">
              <DialogHeader>
                <DialogTitle>¿Estás seguro que querés eliminar este curso?</DialogTitle>
              </DialogHeader>
              <p className="pl-2 text-sm">Esta acción no se puede deshacer.</p>
              <DialogFooter>
                <Button className="bg-white" variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => selectedCourseId && handleDeleteCourse(selectedCourseId)}
                >
                  Eliminar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};
