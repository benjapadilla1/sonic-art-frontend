import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Chapter, Course, Module } from '@/types/firestore';

interface Props {
  course: Course | null;
  mod: Module;
  idx: number;
  setCourse: React.Dispatch<React.SetStateAction<Course | null>>;
  moveItem: <T>(items: T[], fromIndex: number, toIndex: number) => T[];
}

export const ModuleChapters = ({ idx, course, setCourse, mod, moveItem }: Props) => {
  const handleChapterChange = (
    moduleIndex: number,
    chapterIndex: number,
    field: keyof Chapter,
    value: string
  ) => {
    if (!course) return;
    const updatedModules = [...course.modules];
    const updatedChapters = [...(updatedModules[moduleIndex].chapters || [])];
    updatedChapters[chapterIndex] = {
      ...updatedChapters[chapterIndex],
      [field]: value,
    };
    updatedModules[moduleIndex].chapters = updatedChapters;
    setCourse({ ...course, modules: updatedModules });
  };

  const addChapter = (moduleIndex: number) => {
    if (!course) return;
    const updatedModules = [...course.modules];
    const chapters = updatedModules[moduleIndex].chapters || [];
    chapters.push({ title: '', description: '', videoUrl: '', order: chapters.length + 1 });
    updatedModules[moduleIndex].chapters = chapters;
    setCourse({ ...course, modules: updatedModules });
  };

  const removeChapter = (moduleIndex: number, chapterIndex: number) => {
    if (!course) return;
    const updatedModules = [...course.modules];
    const updatedChapters =
      updatedModules[moduleIndex].chapters?.filter((_, i) => i !== chapterIndex) || [];
    updatedModules[moduleIndex].chapters = updatedChapters;
    setCourse({ ...course, modules: updatedModules });
  };

  const moveChapter = (moduleIndex: number, chapterIndex: number, direction: 'up' | 'down') => {
    if (!course) return;
    const updatedModules = [...course.modules];
    const chapters = updatedModules[moduleIndex].chapters || [];
    const toIndex = direction === 'up' ? chapterIndex - 1 : chapterIndex + 1;
    if (toIndex < 0 || toIndex >= chapters.length) return;
    updatedModules[moduleIndex].chapters = moveItem(chapters, chapterIndex, toIndex);
    setCourse({ ...course, modules: updatedModules });
  };

  return (
    <>
      <h4 className="text-md font-semibold">Capítulos</h4>
      <Accordion type="multiple" className="space-y-2">
        {mod?.chapters?.map((ch, chIdx) => (
          <AccordionItem
            key={chIdx}
            value={`chapter-${idx}-${chIdx}`}
            className="rounded-md border"
          >
            <AccordionTrigger className="px-4 py-2">
              {ch.title || `Capítulo ${chIdx + 1}`}
              {moveChapter && (
                <div className="ml-auto flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveChapter(idx, chIdx, 'up')}
                    disabled={chIdx === 0}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveChapter(idx, chIdx, 'down')}
                    disabled={chIdx === mod.chapters.length - 1}
                  >
                    ↓
                  </Button>
                </div>
              )}
            </AccordionTrigger>
            <AccordionContent className="space-y-4 p-4">
              <div className="space-y-2">
                <Label>Título del capítulo</Label>
                <Input
                  value={ch.title}
                  onChange={e => handleChapterChange(idx, chIdx, 'title', e.target.value)}
                  placeholder="Título"
                />
              </div>

              <div className="space-y-2">
                <Label>Descripción</Label>
                <Textarea
                  value={ch.description}
                  onChange={e => handleChapterChange(idx, chIdx, 'description', e.target.value)}
                  placeholder="Descripción"
                />
              </div>

              <div className="space-y-2">
                <Label>Video (URL)</Label>
                <Input
                  value={ch.videoUrl}
                  onChange={e => handleChapterChange(idx, chIdx, 'videoUrl', e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeChapter(idx, chIdx)}
              >
                Eliminar capítulo
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => addChapter(idx)}
        className="mt-2"
      >
        Añadir capítulo
      </Button>
    </>
  );
};
