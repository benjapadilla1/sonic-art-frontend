'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { fetchCourses } from '@/functions/courses/fetchCourses';
import type { Course } from '@/types/firestore';
import { BookOpen, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface GrantCoursesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userEmail: string;
  onGrantSuccess: () => void;
}

export const GrantCoursesDialog = ({
  isOpen,
  onClose,
  userId,
  userEmail,
  onGrantSuccess,
}: GrantCoursesDialogProps) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadCourses();
    }
  }, [isOpen]);

  const loadCourses = async () => {
    setCoursesLoading(true);
    try {
      const data = await fetchCourses();
      setCourses(data);
    } catch (err) {
      console.error('Error al cargar cursos:', err);
      toast.error('Error al cargar cursos');
    } finally {
      setCoursesLoading(false);
    }
  };

  const handleToggleCourse = (courseId: string) => {
    const newSelected = new Set(selectedCourses);
    if (newSelected.has(courseId)) {
      newSelected.delete(courseId);
    } else {
      newSelected.add(courseId);
    }
    setSelectedCourses(newSelected);
  };

  const handleGrantCourses = async () => {
    if (selectedCourses.size === 0) {
      toast.warning('Por favor selecciona al menos un curso');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/grant-courses`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseIds: Array.from(selectedCourses),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error al otorgar cursos');
      }

      toast.success('Cursos otorgados correctamente');
      setSelectedCourses(new Set());
      onGrantSuccess();
      onClose();
    } catch (error) {
      console.error('Error al otorgar cursos:', error);
      toast.error('Error al otorgar cursos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-hidden bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Otorgar Acceso a Cursos
          </DialogTitle>
          <DialogDescription>
            Selecciona los cursos a otorgar a <span className="font-medium">{userEmail}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {coursesLoading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="text-center">
                <Loader2 className="text-primary mx-auto mb-2 h-8 w-8 animate-spin" />
                <p className="text-muted-foreground">Cargando cursos...</p>
              </div>
            </div>
          ) : courses.length > 0 ? (
            <ScrollArea className="h-64 w-full rounded-md border p-4">
              <div className="space-y-3">
                {courses.map(course => (
                  <div
                    key={course.id}
                    className="hover:bg-muted flex items-start gap-3 space-y-0 rounded p-3"
                  >
                    <Checkbox
                      id={`course-${course.id}`}
                      checked={selectedCourses.has(course.id!)}
                      onCheckedChange={() => handleToggleCourse(course.id!)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-1">
                      <label
                        htmlFor={`course-${course.id}`}
                        className="cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {course.title}
                      </label>
                      <p className="text-muted-foreground text-xs">${course.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex h-40 items-center justify-center rounded-md border">
              <p className="text-muted-foreground">No hay cursos disponibles</p>
            </div>
          )}

          {selectedCourses.size > 0 && (
            <div className="bg-primary/10 rounded-md p-3">
              <p className="text-primary text-sm font-medium">
                {selectedCourses.size} curso{selectedCourses.size !== 1 ? 's' : ''} seleccionado
                {selectedCourses.size !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            onClick={handleGrantCourses}
            disabled={loading || selectedCourses.size === 0}
            className="gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Otorgar Acceso
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
