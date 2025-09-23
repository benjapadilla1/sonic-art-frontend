'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { fetchCourseById } from '@/functions/courses/fetchCourseById'; // función que trae el curso del backend
import { Chapter, Course } from '@/types/firestore'; // tu modelo de curso
import { CheckCircle2, PlayCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CoursePlayer() {
  const { id } = useParams();
  const idStr = Array.isArray(id) ? id[0] : (id ?? '');

  const [course, setCourse] = useState<Course | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [completed, setCompleted] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await fetchCourseById(idStr);
        setCourse(data);

        // Seleccionar automáticamente el primer capítulo
        if (data.modules.length > 0 && data.modules[0].chapters.length > 0) {
          setSelectedChapter(data.modules[0].chapters[0]);
        }
      } catch (err) {
        console.error('Error loading course:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [idStr]);

  if (loading) {
    return <p className="py-20 text-center">Cargando curso...</p>;
  }

  if (!course) {
    return <p className="py-20 text-center text-red-500">Curso no encontrado</p>;
  }

  // Calcular progreso global
  const allChapters = course.modules.flatMap(m => m.chapters);
  const totalChapters = allChapters.length;
  const completedChapters = Object.keys(completed).filter(id => completed[id] >= 0.95).length;
  const progress = (completedChapters / totalChapters) * 100;

  const handleProgress = (id: string, currentTime: number, duration: number) => {
    setCompleted(prev => ({
      ...prev,
      [id]: currentTime / duration,
    }));
  };

  return (
    <div className="flex h-screen">
      <aside className="w-90 overflow-y-auto border-r bg-gray-50 p-4">
        <h2 className="font-engravers mb-4 text-xl font-bold">{course.title}</h2>
        <p className="text-sm text-gray-600">{course.description}</p>

        <div className="mt-4">
          <Progress value={progress} className="h-2 rounded-full" />
          <p className="mt-1 text-sm text-gray-500">
            {completedChapters} de {totalChapters} capítulos completados
          </p>
        </div>

        {/* Lista de módulos y capítulos */}
        <Accordion type="multiple" className="mt-6 space-y-2">
          {course.modules
            .sort((a, b) => a.order - b.order)
            .map(module => (
              <AccordionItem
                key={module.order}
                value={module.order.toString() ?? ''}
                className="rounded border"
              >
                <AccordionTrigger className="px-3 py-2 text-left font-medium">
                  {module.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1">
                    {module.chapters
                      .sort((a, b) => a.order - b.order)
                      .map(chapter => {
                        const isCompleted = completed[chapter.id ?? ''] >= 0.95;
                        return (
                          <li
                            key={chapter.id}
                            className={`flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm hover:bg-gray-100 ${
                              selectedChapter?.id === chapter.id ? 'bg-gray-200 font-semibold' : ''
                            }`}
                            onClick={() => setSelectedChapter(chapter)}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <PlayCircle className="h-4 w-4 text-blue-500" />
                            )}
                            {chapter.title}
                          </li>
                        );
                      })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto p-6">
        {selectedChapter ? (
          <div>
            <h1 className="text-2xl font-bold">{selectedChapter.title}</h1>
            <p className="mt-2 text-gray-600">{selectedChapter.description}</p>

            <Card className="mt-4 border-0 text-white shadow-lg">
              <CardContent className="p-3">
                {selectedChapter.videoUrl ? (
                  <div className="mx-auto w-full max-w-6xl">
                    <div className="aspect-video">
                      <video
                        src={selectedChapter.videoUrl}
                        controls
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        className="w-full rounded-lg shadow-md"
                        onContextMenu={e => e.preventDefault()}
                        onTimeUpdate={e => {
                          const target = e.target as HTMLVideoElement;
                          handleProgress(
                            selectedChapter.id ?? '',
                            target.currentTime,
                            target.duration
                          );
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400">Este capítulo no tiene video.</p>
                )}
                <div className="mt-3">
                  <Progress
                    value={(completed[selectedChapter.id ?? ''] || 0) * 100}
                    className="h-2 rounded-full"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    {(completed[selectedChapter.id ?? ''] || 0) >= 0.95
                      ? 'Capítulo completado'
                      : `Avance: ${Math.round((completed[selectedChapter.id ?? ''] || 0) * 100)}%`}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <p className="text-gray-500">Selecciona un capítulo para comenzar</p>
        )}
      </main>
    </div>
  );
}
