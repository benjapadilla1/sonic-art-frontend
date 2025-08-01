import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface EditCourseProps {
  id: string;
}

interface Module {
  title: string;
  content: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  modules: Module[];
  createdAt: string;
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

  const handleModuleChange = (index: number, field: keyof Module, value: string) => {
    if (!course) return;
    const updatedModules = [...course.modules];
    updatedModules[index][field] = value;
    setCourse({ ...course, modules: updatedModules });
  };

  const saveChanges = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(course),
      });
      if (!res.ok) throw new Error('Error al actualizar el curso');
      toast.success('Curso actualizado con éxito');
    } catch (err) {
      console.error(err);
      toast.error('Error al guardar los cambios');
    }
  };

  const handleAddModule = () => {
    if (!course) return;
    const newModule = { title: '', content: '' };
    setCourse({ ...course, modules: [...course.modules, newModule] });
  };

  const handleDeleteModule = (index: number) => {
    if (!course) return;
    const updatedModules = course.modules.filter((_, i) => i !== index);
    setCourse({ ...course, modules: updatedModules });
  };

  if (loading) return <div>Cargando curso...</div>;
  if (!course) return <div>Curso no encontrado</div>;

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <p className="text-2xl">Título del curso</p>
          <Input
            value={course.title}
            onChange={e => setCourse({ ...course, title: e.target.value })}
          />
          <p>Descripción del curso</p>
          <Textarea
            value={course.description}
            onChange={e => setCourse({ ...course, description: e.target.value })}
          />
          <p>Precio del curso</p>
          <Input
            value={course.price}
            onChange={e => setCourse({ ...course, price: e.target.value })}
          />
          <p>Duración del curso (en horas)</p>
          <Input
            value={course.duration}
            onChange={e => setCourse({ ...course, duration: e.target.value })}
          />
        </CardHeader>
      </Card>

      <div>
        <h3 className="mb-4 text-xl font-semibold">Módulos del curso</h3>
        <div className="space-y-6">
          {course.modules.map((mod, idx) => (
            <Card key={idx}>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle>Módulo {idx + 1}</CardTitle>
                  <CardDescription>Editá la info del módulo</CardDescription>
                </div>
                <Button variant="destructive" onClick={() => handleDeleteModule(idx)} className="">
                  Eliminar módulo
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Título del módulo:</p>
                <Input
                  value={mod.title}
                  onChange={e => handleModuleChange(idx, 'title', e.target.value)}
                  placeholder="Título del módulo"
                />
                <p>Descripción:</p>
                <Textarea
                  value={mod.content}
                  onChange={e => handleModuleChange(idx, 'content', e.target.value)}
                  placeholder="Contenido del módulo"
                />
              </CardContent>
            </Card>
          ))}
        </div>
        <Button variant="outline" onClick={handleAddModule} className="mt-4">
          Añadir módulo
        </Button>
      </div>

      <Separator />

      <div className="flex justify-end">
        <Button onClick={saveChanges} className="bg-black text-white hover:bg-gray-900">
          Guardar cambios
        </Button>
      </div>
    </div>
  );
};
