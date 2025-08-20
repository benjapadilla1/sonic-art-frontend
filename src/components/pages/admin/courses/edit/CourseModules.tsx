import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Course, Module } from '@/types/firestore';
import { ModuleChapters } from './ModuleChapters';

interface CourseModulesProps {
  course: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course | null>>;
}

export const CourseModules = ({ course, setCourse }: CourseModulesProps) => {
  const moveItem = <T,>(items: T[], fromIndex: number, toIndex: number): T[] => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    return updatedItems;
  };

  const handleAddModule = () => {
    if (!course) return;
    const newModule = {
      title: '',
      description: '',
      order: course.modules.length + 1,
      chapters: [],
    };
    setCourse({ ...course, modules: [...course.modules, newModule] });
  };

  const handleModuleChange = (index: number, field: keyof Module, value: string) => {
    if (!course) return;
    const updatedModules = [...course.modules];
    updatedModules[index] = {
      ...updatedModules[index],
      [field]: value,
    };
    setCourse({ ...course, modules: updatedModules });
  };

  const handleDeleteModule = (index: number) => {
    if (!course) return;
    const updatedModules = course.modules.filter((_, i) => i !== index);
    setCourse({ ...course, modules: updatedModules });
  };

  const moveModule = (fromIndex: number, direction: 'up' | 'down') => {
    if (!course) return;
    const updatedModules = [...course.modules];
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= updatedModules.length) return;
    setCourse({ ...course, modules: moveItem(updatedModules, fromIndex, toIndex) });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Módulos del curso</h3>

      <Accordion type="multiple" className="space-y-4">
        {course.modules?.map((mod, idx) => (
          <AccordionItem key={idx} value={`module-${idx}`} className="rounded-lg border">
            <AccordionTrigger className="px-4 py-3 text-lg font-medium">
              {mod.title || `Módulo ${idx + 1}`}
              {moveModule && (
                <div className="ml-auto flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveModule(idx, 'up')}
                    disabled={idx === 0}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveModule(idx, 'down')}
                    disabled={idx === course.modules.length - 1}
                  >
                    ↓
                  </Button>
                </div>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <Card className="rounded-none border-t-0">
                <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Módulo {idx + 1}</CardTitle>
                    <CardDescription>Editá los datos de este módulo</CardDescription>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteModule(idx)}
                    className="w-full sm:w-auto"
                  >
                    Eliminar módulo
                  </Button>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor={`mod-title-${idx}`}>Título</Label>
                    <Input
                      id={`mod-title-${idx}`}
                      value={mod.title}
                      onChange={e => handleModuleChange(idx, 'title', e.target.value)}
                      placeholder="Título del módulo"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`mod-desc-${idx}`}>Descripción</Label>
                    <Textarea
                      id={`mod-desc-${idx}`}
                      value={mod.description}
                      onChange={e => handleModuleChange(idx, 'description', e.target.value)}
                      placeholder="Descripción del módulo"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <ModuleChapters
                      idx={idx}
                      course={course}
                      mod={mod}
                      setCourse={setCourse}
                      moveItem={moveItem}
                    />
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button variant="default" onClick={handleAddModule} className="mt-4">
        Añadir módulo
      </Button>
    </div>
  );
};
