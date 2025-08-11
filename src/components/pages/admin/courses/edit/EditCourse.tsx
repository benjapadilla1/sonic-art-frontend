import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { dataURLtoFile } from '@/functions/cloud/DataURLToFile';
import { Course } from '@/types/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CourseDescription from './CourseDescription';
import { CourseModules } from './CourseModules';

interface EditCourseProps {
  id: string;
}

export const EditCourse = ({ id }: EditCourseProps) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${id}`);
        if (!res.ok) throw new Error('Error al obtener el curso');
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const saveChanges = async () => {
    const form = new FormData();

    if (course) {
      form.append('title', course.title);
      form.append('description', course.description);
      form.append('price', course.price.toString());
      form.append('duration', course.duration.toString());
    }

    if (course?.coverImageUrl) {
      const imageFile = dataURLtoFile(course.coverImageUrl, 'cover.jpg');
      form.append('coverImageUrl', imageFile);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${id}`, {
        method: 'PUT',
        body: form,
      });
      if (!res.ok) throw new Error('Error al actualizar el curso');
      toast.success('Curso actualizado con éxito');
    } catch (err) {
      console.error(err);
      toast.error('Error al guardar los cambios');
    }
  };

  if (loading) return <div>Cargando curso...</div>;
  if (!course) return <div>Curso no encontrado</div>;

  return (
    <div className="mx-auto max-w-4xl space-y-8 rounded-lg border bg-white p-8 shadow-md">
      <div className="space-y-6">
        <CourseDescription course={course} setCourse={setCourse} />

        <Separator />

        <CourseModules course={course} setCourse={setCourse} />
      </div>

      <Separator />

      <div className="flex justify-end pt-4">
        <Button onClick={saveChanges} className="bg-black text-white hover:bg-gray-900">
          Guardar cambios
        </Button>
      </div>
    </div>
  );
};
