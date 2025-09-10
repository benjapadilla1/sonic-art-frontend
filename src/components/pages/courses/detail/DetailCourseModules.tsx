'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Course } from '@/types/firestore';

interface DetailCourseModulesProps {
  course: Course;
}

export function DetailCourseModules({ course }: DetailCourseModulesProps) {
  return (
    <section className="bg-secondaryBg w-full py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Contenido del curso
          </h2>
          <p className="mt-3 text-base text-white">
            Descubre todos los módulos y capítulos que aprenderás en este curso.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-6">
          {course.modules
            .sort((a, b) => a.order - b.order)
            .map(module => (
              <AccordionItem
                key={module.order}
                value={`module-${module.order}`}
                className="rounded-2xl border border-gray-200 bg-white shadow-md transition hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
              >
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline">
                  <div className="flex flex-col text-left">
                    <span>
                      {module.order}. {module.title}
                    </span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {module.chapters.length} capítulo
                      {module.chapters.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-6 pb-6">
                    {module.description && (
                      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        {module.description}
                      </p>
                    )}

                    <div className="space-y-3">
                      {module.chapters
                        .sort((a, b) => a.order - b.order)
                        .map(chapter => (
                          <Card
                            key={chapter.id}
                            className="rounded-xl border border-gray-100 bg-gray-50/80 shadow-sm backdrop-blur-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-800/80"
                          >
                            <CardContent className="p-4">
                              <h4 className="text-base font-medium">
                                {chapter.order}. {chapter.title}
                              </h4>
                              {chapter.description && (
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                  {chapter.description}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </section>
  );
}
