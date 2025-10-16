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
import { deleteCourse } from '@/functions/courses/deleteCourse';
import { fetchCourses } from '@/functions/courses/fetchCourses';
import type { Course } from '@/types/firestore';
import { BookOpen, Clock, Edit3, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const CoursesCard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const data = await fetchCourses();
      setCourses(data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleDeleteCourse = async (id: string) => {
    try {
      await deleteCourse(id);
      loadCourses();
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
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="icon-wrapper">
            <BookOpen className="text-primary h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display gradient-text-primary text-3xl">Cursos</h2>
            <p className="text-muted-foreground mt-1">
              Gestiona el contenido educativo de la academia
            </p>
          </div>
        </div>

        <Link href="/admin/cursos/crear">
          <Button className="gap-2 px-6 py-3 text-base">
            <Plus className="h-5 w-5" />
            Crear Curso
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="admin-card rounded-xl p-6">
              <Skeleton className="loading-skeleton mb-4 h-48 w-full rounded-lg" />
              <Skeleton className="loading-skeleton mb-2 h-6 w-3/4" />
              <Skeleton className="loading-skeleton mb-4 h-4 w-full" />
              <div className="flex gap-2">
                <Skeleton className="loading-skeleton h-9 w-20" />
                <Skeleton className="loading-skeleton h-9 w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map(course => (
            <Card key={course.id} className="admin-card group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                {course.coverImageUrl ? (
                  <Image
                    src={course.coverImageUrl || '/placeholder.svg'}
                    alt={`Portada del curso ${course.title}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="bg-muted flex h-full items-center justify-center">
                    <BookOpen className="text-muted-foreground h-12 w-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <CardHeader className="space-y-3">
                <CardTitle className="font-heading group-hover:text-primary line-clamp-2 text-xl transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground line-clamp-3">
                  {course.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-muted-foreground flex items-center gap-2">
                    <span className="font-medium">${course.price}</span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration} hs</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex gap-3 pt-4">
                <Link href={`/admin/cursos/${course.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                    <Edit3 className="h-4 w-4" />
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
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="glass-effect border-destructive/20 bg-white backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="bg-destructive/10 rounded-full p-2">
                <Trash2 className="text-destructive h-5 w-5" />
              </div>
              ¿Eliminar este curso?
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground py-4">
            Esta acción no se puede deshacer. El curso será eliminado permanentemente.
          </p>
          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedCourseId && handleDeleteCourse(selectedCourseId)}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Eliminar Curso
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
