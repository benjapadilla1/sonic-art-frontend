'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { fetchCourseById } from '@/functions/courses/fetchCourseById';
import { fetchPurchasedCourseById } from '@/functions/courses/fetchPurchasedCourseById';
import { useAuthStore } from '@/stores/useAuthStore';
import type { Chapter, Course } from '@/types/firestore';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  PlayCircle,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CoursePlayer() {
  const { id } = useParams();
  const { user, isAdmin, isLoggedIn } = useAuthStore();
  const idStr = Array.isArray(id) ? id[0] : (id ?? '');

  const [course, setCourse] = useState<Course | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [completed, setCompleted] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idStr) return;

    const savedProgress = localStorage.getItem(`progress-${idStr}`);
    if (savedProgress) {
      try {
        setCompleted(JSON.parse(savedProgress));
      } catch (err) {
        console.error('Error parsing saved progress', err);
      }
    }
  }, [idStr]);

  useEffect(() => {
    if (!idStr) return;
    localStorage.setItem(`progress-${idStr}`, JSON.stringify(completed));
  }, [completed, idStr]);

  useEffect(() => {
    const loadCourse = async () => {
      if (!idStr) return;
      setLoading(true);
      setError(null);

      try {
        // 🧩 Caso 1: usuario no logueado
        if (!isLoggedIn) {
          setError('Necesitas iniciar sesión para ver este curso.');
          return;
        }

        // 🧩 Caso 2: admin puede ver todos los cursos
        if (isAdmin) {
          const data = await fetchCourseById(idStr);
          setCourse(data);
          if (data.modules?.length > 0 && data.modules[0].chapters?.length > 0) {
            setSelectedChapter(data.modules[0].chapters[0]);
          }
          return;
        }

        // 🧩 Caso 3: usuario normal → buscar curso comprado
        const data = await fetchPurchasedCourseById(idStr, user?.uid ?? '');
        if (!data) {
          setError('No tienes acceso a este curso. Asegúrate de haberlo comprado.');
          return;
        }

        setCourse(data);
        if (data.modules?.length > 0 && data.modules[0].chapters?.length > 0) {
          setSelectedChapter(data.modules[0].chapters[0]);
        }
      } catch (err) {
        console.error('Error loading course:', err);
        setError('Hubo un error al cargar el curso.');
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin !== undefined && isAdmin !== null) {
      loadCourse();
    }
  }, [idStr, isAdmin, isLoggedIn, user]);

  if (loading) {
    return (
      <div className="bg-background flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="progress-ring mx-auto mb-4 h-12 w-12">
            <div className="bg-background flex h-full w-full items-center justify-center rounded-full">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"></div>
            </div>
          </div>
          <p className="text-muted-foreground text-lg font-medium">Cargando curso...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background flex h-screen items-center justify-center">
        <div className="max-w-md text-center">
          <div className="bg-destructive/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <BookOpen className="text-destructive h-8 w-8" />
          </div>
          <p className="text-destructive text-xl font-semibold">No se puede acceder al curso</p>
          <p className="text-muted-foreground mt-2">{error}</p>
          {!user && (
            <a
              href="/login"
              className="bg-primary mt-4 inline-block rounded-lg px-4 py-2 text-white"
            >
              Iniciar sesión
            </a>
          )}
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-background flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="bg-destructive/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <BookOpen className="text-destructive h-8 w-8" />
          </div>
          <p className="text-destructive text-xl font-semibold">Curso no encontrado</p>
          <p className="text-muted-foreground mt-2">
            El curso que buscas no existe o ha sido eliminado
          </p>
        </div>
      </div>
    );
  }

  const allChapters = course.modules.flatMap(m => m.chapters);
  const totalChapters = allChapters.length;
  const completedChapters = Object.keys(completed).filter(id => completed[id] >= 0.95).length;
  const progress = (completedChapters / totalChapters) * 100;

  const handleProgress = (id: string, currentTime: number, duration: number) => {
    if (!duration) return;
    setCompleted(prev => ({
      ...prev,
      [id]: currentTime / duration,
    }));
  };

  const getCurrentChapterIndex = () => {
    return allChapters.findIndex(chapter => chapter.id === selectedChapter?.id);
  };

  const goToNextChapter = () => {
    const currentIndex = getCurrentChapterIndex();
    if (currentIndex < allChapters.length - 1) {
      setSelectedChapter(allChapters[currentIndex + 1]);
    }
  };

  const goToPreviousChapter = () => {
    const currentIndex = getCurrentChapterIndex();
    if (currentIndex > 0) {
      setSelectedChapter(allChapters[currentIndex - 1]);
    }
  };

  return (
    <div className="bg-background flex h-screen">
      <aside
        className={`course-sidebar transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-80 lg:w-96'
        } border-sidebar-border flex flex-col overflow-hidden border-r`}
      >
        <div className="border-sidebar-border flex items-center justify-between border-b p-6">
          {!sidebarCollapsed && (
            <div className="flex-1">
              <h2 className="font-display text-sidebar-foreground text-xl text-balance">
                {course.title}
              </h2>
              <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                {course.description}
              </p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-muted-foreground hover:text-sidebar-foreground ml-2"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {!sidebarCollapsed && (
          <>
            <div className="border-sidebar-border border-b p-6">
              <div className="flex items-center gap-4">
                <div className="progress-ring h-16 w-16 flex-shrink-0">
                  <div className="bg-sidebar flex h-full w-full items-center justify-center rounded-full">
                    <div className="text-center">
                      <div className="text-primary text-lg font-bold">{Math.round(progress)}%</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <Award className="text-primary h-4 w-4" />
                    <span className="text-sidebar-foreground text-sm font-medium">
                      Progreso del curso
                    </span>
                  </div>
                  <Progress value={progress} className="mb-2 h-2" />
                  <p className="text-muted-foreground text-xs">
                    {completedChapters} de {totalChapters} capítulos completados
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <Accordion type="multiple" className="space-y-3">
                {course.modules
                  .sort((a, b) => a.order - b.order)
                  .map((module, moduleIndex) => (
                    <AccordionItem
                      key={module.order}
                      value={module.order.toString() ?? ''}
                      className="border-sidebar-border bg-sidebar-accent/30 rounded-lg border"
                    >
                      <AccordionTrigger className="px-4 py-3 text-left hover:no-underline">
                        <div className="flex items-center gap-3">
                          <div className="module-number text-2xl">
                            {String(moduleIndex + 1).padStart(2, '0')}
                          </div>
                          <div>
                            <div className="font-heading text-sidebar-foreground">
                              {module.title}
                            </div>
                            <div className="text-muted-foreground text-xs">
                              {module.chapters.length} capítulos
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-3">
                        <div className="space-y-1">
                          {module.chapters
                            .sort((a, b) => a.order - b.order)
                            .map((chapter, chapterIndex) => {
                              const isCompleted = completed[chapter.id ?? ''] >= 0.95;
                              const isActive = selectedChapter?.id === chapter.id;
                              const chapterProgress = completed[chapter.id ?? ''] || 0;

                              return (
                                <div
                                  key={chapter.id}
                                  className={`chapter-item cursor-pointer p-3 ${isActive ? 'active' : ''}`}
                                  onClick={() => setSelectedChapter(chapter)}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                      {isCompleted ? (
                                        <div className="bg-primary flex h-6 w-6 items-center justify-center rounded-full">
                                          <CheckCircle2 className="text-primary-foreground h-4 w-4" />
                                        </div>
                                      ) : (
                                        <div className="border-muted-foreground/30 flex h-6 w-6 items-center justify-center rounded-full border">
                                          <span className="text-muted-foreground text-xs font-medium">
                                            {chapterIndex + 1}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div
                                        className={`text-sm font-medium ${
                                          isActive ? 'text-primary' : 'text-sidebar-foreground'
                                        }`}
                                      >
                                        {chapter.title}
                                      </div>
                                      {chapterProgress > 0 && chapterProgress < 0.95 && (
                                        <div className="mt-1">
                                          <Progress value={chapterProgress * 100} className="h-1" />
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex-shrink-0">
                                      <Clock className="text-muted-foreground h-3 w-3" />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </div>
          </>
        )}
      </aside>

      <main className="flex flex-1 flex-col overflow-hidden">
        {selectedChapter ? (
          <>
            <div className="border-border bg-card/50 border-b p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h1 className="font-display text-foreground text-2xl text-balance lg:text-3xl">
                    {selectedChapter.title}
                  </h1>
                  <p className="text-muted-foreground mt-2 text-pretty">
                    {selectedChapter.description}
                  </p>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPreviousChapter}
                    disabled={getCurrentChapterIndex() === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNextChapter}
                    disabled={getCurrentChapterIndex() === allChapters.length - 1}
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="mx-auto max-w-6xl">
                <Card className="video-container border-0 shadow-2xl">
                  <CardContent className="p-0">
                    {selectedChapter.videoUrl ? (
                      <div className="aspect-video">
                        <video
                          src={selectedChapter.videoUrl}
                          controls
                          controlsList="nodownload noremoteplayback"
                          disablePictureInPicture
                          className="h-full w-full rounded-lg"
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
                    ) : (
                      <div className="flex aspect-video items-center justify-center">
                        <div className="text-center">
                          <PlayCircle className="text-muted-foreground/50 mx-auto h-16 w-16" />
                          <p className="text-muted-foreground mt-4 text-lg font-medium">
                            Este capítulo no tiene video
                          </p>
                          <p className="text-muted-foreground/70 text-sm">
                            El contenido estará disponible próximamente
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-foreground text-sm font-medium">
                          Progreso del capítulo
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {Math.round((completed[selectedChapter.id ?? ''] || 0) * 100)}%
                        </span>
                      </div>
                      <Progress
                        value={(completed[selectedChapter.id ?? ''] || 0) * 100}
                        className="h-2"
                      />
                      <p className="text-muted-foreground mt-2 text-xs">
                        {(completed[selectedChapter.id ?? ''] || 0) >= 0.95
                          ? '¡Capítulo completado! 🎉'
                          : 'Continúa viendo para completar este capítulo'}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <BookOpen className="text-muted-foreground/50 mx-auto h-16 w-16" />
              <p className="text-muted-foreground mt-4 text-xl font-medium">
                Selecciona un capítulo para comenzar
              </p>
              <p className="text-muted-foreground/70 text-sm">
                Elige un capítulo del menú lateral para empezar tu aprendizaje
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
