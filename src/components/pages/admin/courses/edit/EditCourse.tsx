import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { dataURLtoFile } from '@/functions/cloud/DataURLToFile';
import { fetchCourseById } from '@/functions/courses/fetchCourseById';
import { Course } from '@/types/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CourseDescription from './CourseDescription';
import { CourseModules } from './CourseModules';

interface EditCourseProps {
  id: string;
}

export const EditCourse = ({ id }: EditCourseProps) => {
  const [originalCourse, setOriginalCourse] = useState<Course | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetchCourseById(id);

        const cloned = structuredClone(res);
        setOriginalCourse(cloned);
        setCourse(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const getUpdatedFields = () => {
    if (!course || !originalCourse) return {};
    const updated: Record<string, unknown> = {};

    ['title', 'description', 'price', 'duration'].forEach(key => {
      if (course[key as keyof Course] !== originalCourse[key as keyof Course]) {
        updated[key] = course[key as keyof Course];
      }
    });

    if (course.coverImageUrl !== originalCourse.coverImageUrl) {
      updated.coverImageUrl = course.coverImageUrl;
    }

    if (course.introVideoUrl !== originalCourse.introVideoUrl) {
      updated.introVideoUrl = course.introVideoUrl;
    }

    const originalModules = JSON.stringify(originalCourse.modules);
    const currentModules = JSON.stringify(
      course.modules.map(module => ({
        ...module,
        chapters: module.chapters.map(ch => ({
          ...ch,
          videoUrl:
            ch.videoUrl && typeof ch.videoUrl === 'object' && 'type' in ch.videoUrl
              ? 'FILE_PLACEHOLDER'
              : ch.videoUrl,
        })),
      }))
    );

    console.log('current modules', currentModules);

    if (originalModules !== currentModules) {
      updated.modules = course.modules;
    }

    return updated;
  };

  const saveChanges = async () => {
    if (!course) return;

    const updatedFields = getUpdatedFields();

    if (Object.keys(updatedFields).length === 0) {
      toast.info('No hay cambios para guardar');
      return;
    }

    const form = new FormData();

    if (typeof updatedFields.coverImageUrl === 'string' && updatedFields.coverImageUrl) {
      const imageFile = dataURLtoFile(updatedFields.coverImageUrl, 'cover.jpg');
      form.append('coverImage', imageFile);
    }

    if (
      updatedFields.introVideoUrl &&
      typeof updatedFields.introVideoUrl === 'object' &&
      'type' in updatedFields.introVideoUrl
    ) {
      form.append('introVideo', updatedFields.introVideoUrl as File);
      delete updatedFields.introVideoUrl;
    }

    if (updatedFields.modules && Array.isArray(updatedFields.modules)) {
      (updatedFields.modules as Course['modules']).forEach((mod, modIdx) => {
        mod.chapters.forEach((ch, chapIdx) => {
          if (ch.videoUrl && typeof ch.videoUrl === 'object' && 'type' in ch.videoUrl) {
            const fieldName = `video-${modIdx}-${chapIdx}`;
            form.append(fieldName, ch.videoUrl as File);
            ch.videoUrl = fieldName;
          }
        });
      });

      form.append('modules', JSON.stringify(updatedFields.modules));
    }

    Object.entries(updatedFields).forEach(([key, value]) => {
      if (key !== 'modules') {
        if (typeof value === 'string' || value instanceof Blob) {
          form.append(key, value);
        } else if (typeof value === 'number' || typeof value === 'boolean') {
          form.append(key, value.toString());
        }
      }
    });

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
