import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Course } from '@/types/firestore';
import Image from 'next/image';

interface CourseDescriptionProps {
  course: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course | null>>;
}

const CourseDescription = ({ course, setCourse }: CourseDescriptionProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourse(prev => (prev ? { ...prev, coverImageUrl: reader.result as string } : null));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Información del curso</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="title">Título del curso</Label>
          <Input
            id="title"
            value={course.title}
            onChange={e => setCourse({ ...course, title: e.target.value })}
            placeholder="Ej: Curso de Producción Musical Avanzado"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            value={course.description}
            onChange={e => setCourse({ ...course, description: e.target.value })}
            placeholder="Describe brevemente de qué trata el curso"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="price">Precio</Label>
            <Input
              id="price"
              value={course.price}
              onChange={e => setCourse({ ...course, price: e.target.value })}
              placeholder="Ej: 15000"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="duration">Duración (en horas)</Label>
            <Input
              id="duration"
              value={course.duration}
              onChange={e => setCourse({ ...course, duration: e.target.value })}
              placeholder="Ej: 10"
            />
          </div>

          <div className="flex space-y-1">
            <div className="flex flex-col gap-2">
              <Label htmlFor="image">Imagen del curso</Label>
              <Input id="image" type="file" accept="image/*" onChange={e => handleImageChange(e)} />
            </div>

            {course.coverImageUrl && (
              <div className="relative h-40 w-full">
                <Image
                  fill
                  src={course.coverImageUrl}
                  alt="Vista previa del curso"
                  className="mt-2 rounded-md border object-cover shadow-sm"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseDescription;
