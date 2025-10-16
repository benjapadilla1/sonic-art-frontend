'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { dataURLtoFile } from '@/functions/cloud/DataURLToFile';
import type { Chapter, Module } from '@/types/firestore';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  ImageIcon,
  Layers,
  Play,
  Plus,
  Trash2,
  Upload,
  Video,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { VideoUploader } from '../VideoUploader';

export const CreateCourse = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    coverImageUrl: '',
    introVideoUrl: '',
    modules: [] as Module[],
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, coverImageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const introVideoUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, introVideoUrl }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModuleChange = (index: number, field: keyof Module, value: string) => {
    const updatedModules = [...formData.modules];
    updatedModules[index] = {
      ...updatedModules[index],
      [field]: value,
    };
    setFormData({ ...formData, modules: updatedModules });
  };

  const handleChapterChange = (
    moduleIndex: number,
    chapterIndex: number,
    field: keyof Chapter,
    value: string | File
  ) => {
    const updatedModules = [...formData.modules];
    const updatedChapters = [...(updatedModules[moduleIndex].chapters || [])];
    updatedChapters[chapterIndex] = {
      ...updatedChapters[chapterIndex],
      [field]: value,
    };
    updatedModules[moduleIndex].chapters = updatedChapters;
    setFormData({ ...formData, modules: updatedModules });
  };

  const addModule = () => {
    setFormData({
      ...formData,
      modules: [
        ...formData.modules,
        {
          title: '',
          description: '',
          order: formData.modules.length + 1,
          chapters: [],
        },
      ],
    });
  };

  const removeModule = (index: number) => {
    const updatedModules = formData.modules.filter((_, i) => i !== index);
    setFormData({ ...formData, modules: updatedModules });
  };

  const addChapter = (moduleIndex: number) => {
    const updatedModules = [...formData.modules];
    const chapters = updatedModules[moduleIndex].chapters || [];
    chapters.push({
      title: '',
      description: '',
      videoUrl: '',
      order: chapters.length + 1,
    });
    updatedModules[moduleIndex].chapters = chapters;
    setFormData({ ...formData, modules: updatedModules });
  };

  const removeChapter = (moduleIndex: number, chapterIndex: number) => {
    const updatedModules = [...formData.modules];
    const updatedChapters =
      updatedModules[moduleIndex].chapters?.filter((_, i) => i !== chapterIndex) || [];
    updatedModules[moduleIndex].chapters = updatedChapters;
    setFormData({ ...formData, modules: updatedModules });
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData();

    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('duration', formData.duration);

    // Imagen
    if (formData.coverImageUrl) {
      const imageFile = dataURLtoFile(formData.coverImageUrl, 'cover.jpg');
      form.append('coverImage', imageFile);
    }

    form.append(
      'modules',
      JSON.stringify(
        formData.modules.map((module, modIdx) => ({
          ...module,
          chapters: module.chapters?.map((ch, chapIdx) => {
            const fieldName = `video-${modIdx}-${chapIdx}`;
            return {
              ...ch,
              videoUrl:
                ch.videoUrl && typeof ch.videoUrl === 'object' && 'type' in ch.videoUrl
                  ? fieldName
                  : '',
            };
          }),
        }))
      )
    );

    formData.modules.forEach((mod, modIdx) => {
      mod.chapters?.forEach((ch, chapIdx) => {
        const fieldName = `video-${modIdx}-${chapIdx}`;
        if (ch.videoUrl && typeof ch.videoUrl === 'object' && 'type' in ch.videoUrl) {
          form.append(fieldName, ch.videoUrl as File);
        }
      });
    });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses`, {
        method: 'POST',
        body: form,
      });

      if (!res.ok) throw new Error('Error al crear curso');

      router.push('/admin');
      toast.success('Curso creado correctamente');
    } catch (err) {
      console.error('Error al crear curso:', err);
      toast.error('Hubo un error al crear el curso');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="course-form-container min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="course-form-card border-border/50 bg-card overflow-hidden rounded-2xl border shadow-xl">
          <div className="step-header bg-ctas border-b border-orange-700/20 px-8 py-6">
            <div className="flex items-center gap-3 text-white">
              <div className="rounded-lg bg-white/10 p-2 backdrop-blur-sm">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Crear Nuevo Curso</h1>
                <p className="mt-1 text-sm text-orange-50">
                  Completa la información para publicar tu curso
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <form
              onSubmit={handleCreateCourse}
              className={`space-y-10 ${isLoading ? 'loading-state pointer-events-none opacity-60' : ''}`}
            >
              <section className="form-section space-y-6">
                <div className="step-indicator border-border flex items-center gap-3 border-b pb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white shadow-sm">
                    1
                  </span>
                  <h2 className="text-foreground text-xl font-semibold">
                    Información Básica del Curso
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <Label
                      htmlFor="title"
                      className="form-label mb-2 flex items-center gap-2 text-sm font-medium"
                    >
                      <BookOpen className="text-muted-foreground h-4 w-4" />
                      Título del Curso
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="form-input h-11 transition-all focus:ring-2 focus:ring-orange-500/20"
                      placeholder="Ej: Producción Musical Avanzada"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label
                      htmlFor="description"
                      className="form-label mb-2 flex items-center gap-2 text-sm font-medium"
                    >
                      <FileText className="text-muted-foreground h-4 w-4" />
                      Descripción
                      <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="form-input min-h-[120px] resize-none transition-all focus:ring-2 focus:ring-orange-500/20"
                      placeholder="Describe qué aprenderán los estudiantes en este curso..."
                      required
                    />
                    <p className="text-muted-foreground mt-2 text-xs">
                      Sé específico sobre los objetivos y beneficios del curso
                    </p>
                  </div>

                  <div>
                    <Label
                      htmlFor="price"
                      className="form-label mb-2 flex items-center gap-2 text-sm font-medium"
                    >
                      <DollarSign className="text-muted-foreground h-4 w-4" />
                      Precio (USD)
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="form-input h-11 transition-all focus:ring-2 focus:ring-orange-500/20"
                      placeholder="99.99"
                      type="number"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="duration"
                      className="form-label mb-2 flex items-center gap-2 text-sm font-medium"
                    >
                      <Clock className="text-muted-foreground h-4 w-4" />
                      Duración (horas)
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="form-input h-11 transition-all focus:ring-2 focus:ring-orange-500/20"
                      placeholder="12"
                      type="number"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </section>

              <section className="form-section space-y-6">
                <div className="step-indicator border-border flex items-center gap-3 border-b pb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white shadow-sm">
                    2
                  </span>
                  <h2 className="text-foreground text-xl font-semibold">Contenido Multimedia</h2>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="space-y-3">
                    <Label
                      htmlFor="image"
                      className="form-label flex items-center gap-2 text-sm font-medium"
                    >
                      <ImageIcon className="text-muted-foreground h-4 w-4" />
                      Imagen de Portada
                      <span className="text-destructive">*</span>
                    </Label>
                    <div className="file-upload-area border-border bg-muted/30 rounded-lg border-2 border-dashed p-6 transition-colors hover:border-orange-500/50">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="rounded-full bg-orange-500/10 p-3">
                          <ImageIcon className="h-6 w-6 text-orange-500" />
                        </div>
                        <div className="text-center">
                          <Label
                            htmlFor="image"
                            className="text-foreground cursor-pointer text-sm font-medium transition-colors hover:text-orange-500"
                          >
                            Haz clic para subir
                          </Label>
                          <p className="text-muted-foreground mt-1 text-xs">PNG, JPG hasta 10MB</p>
                        </div>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="sr-only"
                          required
                        />
                      </div>
                    </div>
                    {formData.coverImageUrl && (
                      <div className="preview-media border-border overflow-hidden rounded-lg border shadow-sm">
                        <Image
                          src={formData.coverImageUrl || '/placeholder.svg'}
                          alt="Vista previa de portada"
                          width={400}
                          height={250}
                          className="h-48 w-full object-cover"
                        />
                        <div className="border-t border-green-500/20 bg-green-500/10 p-2">
                          <p className="flex items-center gap-1 text-xs text-green-700 dark:text-green-400">
                            <CheckCircle2 className="h-3 w-3" />
                            Imagen cargada correctamente
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="video"
                      className="form-label flex items-center gap-2 text-sm font-medium"
                    >
                      <Video className="text-muted-foreground h-4 w-4" />
                      Video de Introducción
                      <span className="text-muted-foreground text-xs font-normal">(Opcional)</span>
                    </Label>
                    <div className="file-upload-area border-border bg-muted/30 rounded-lg border-2 border-dashed p-6 transition-colors hover:border-orange-500/50">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="rounded-full bg-orange-500/10 p-3">
                          <Video className="h-6 w-6 text-orange-500" />
                        </div>
                        <div className="text-center">
                          <Label
                            htmlFor="video"
                            className="text-foreground cursor-pointer text-sm font-medium transition-colors hover:text-orange-500"
                          >
                            Haz clic para subir
                          </Label>
                          <p className="text-muted-foreground mt-1 text-xs">MP4, MOV hasta 100MB</p>
                        </div>
                        <Input
                          id="video"
                          type="file"
                          accept="video/*"
                          onChange={handleVideoChange}
                          className="sr-only"
                        />
                      </div>
                    </div>
                    {formData.introVideoUrl && (
                      <div className="preview-media border-border overflow-hidden rounded-lg border shadow-sm">
                        <video
                          src={formData.introVideoUrl}
                          controls
                          className="h-48 w-full bg-black object-cover"
                        />
                        <div className="border-t border-green-500/20 bg-green-500/10 p-2">
                          <p className="flex items-center gap-1 text-xs text-green-700 dark:text-green-400">
                            <CheckCircle2 className="h-3 w-3" />
                            Video cargado correctamente
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              <section className="form-section space-y-6">
                <div className="step-indicator border-border flex items-center gap-3 border-b pb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white shadow-sm">
                    3
                  </span>
                  <div className="flex-1">
                    <h2 className="text-foreground text-xl font-semibold">Estructura del Curso</h2>
                    <p className="text-muted-foreground mt-1 text-sm">
                      Organiza tu contenido en módulos y capítulos
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {formData.modules.length === 0 ? (
                    <div className="border-border bg-muted/30 rounded-xl border-2 border-dashed px-6 py-12 text-center">
                      <div className="mb-4 inline-flex rounded-full bg-orange-500/10 p-4">
                        <Layers className="h-8 w-8 text-orange-500" />
                      </div>
                      <h3 className="text-foreground mb-2 text-lg font-semibold">
                        No hay módulos todavía
                      </h3>
                      <p className="text-muted-foreground mx-auto mb-6 max-w-md text-sm">
                        Comienza agregando tu primer módulo para estructurar el contenido de tu
                        curso
                      </p>
                      <Button
                        type="button"
                        onClick={addModule}
                        className="navy-button inline-flex h-11 items-center gap-2 px-6"
                      >
                        <Plus className="h-5 w-5" />
                        Crear Primer Módulo
                      </Button>
                    </div>
                  ) : (
                    <>
                      {formData.modules.map((mod, modIdx) => (
                        <div
                          key={modIdx}
                          className="module-card border-border bg-card rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md"
                        >
                          <div className="mb-6 flex items-start justify-between gap-4">
                            <div className="flex flex-1 items-center gap-3">
                              <div className="rounded-lg bg-orange-500/10 p-2">
                                <Layers className="h-5 w-5 text-orange-500" />
                              </div>
                              <div>
                                <h3 className="text-foreground text-lg font-semibold">
                                  Módulo {modIdx + 1}
                                </h3>
                                <p className="text-muted-foreground text-xs">
                                  {(mod.chapters || []).length}{' '}
                                  {(mod.chapters || []).length === 1 ? 'capítulo' : 'capítulos'}
                                </p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeModule(modIdx)}
                              className="flex h-9 items-center gap-2"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="hidden sm:inline">Eliminar</span>
                            </Button>
                          </div>

                          <div className="mb-6 grid grid-cols-1 gap-4">
                            <div>
                              <Label className="form-label mb-2 flex items-center gap-1 text-sm font-medium">
                                Título del Módulo
                                <span className="text-destructive">*</span>
                              </Label>
                              <Input
                                value={mod.title}
                                onChange={e => handleModuleChange(modIdx, 'title', e.target.value)}
                                className="form-input h-11 transition-all focus:ring-2 focus:ring-orange-500/20"
                                placeholder="Ej: Fundamentos de Mezcla"
                                required
                              />
                            </div>
                            <div>
                              <Label className="form-label mb-2 flex items-center gap-1 text-sm font-medium">
                                Descripción del Módulo
                                <span className="text-destructive">*</span>
                              </Label>
                              <Textarea
                                value={mod.description}
                                onChange={e =>
                                  handleModuleChange(modIdx, 'description', e.target.value)
                                }
                                className="form-input min-h-[80px] resize-none transition-all focus:ring-2 focus:ring-orange-500/20"
                                placeholder="Describe qué se aprende en este módulo..."
                                required
                              />
                            </div>
                          </div>

                          <div className="border-border space-y-4 border-t pt-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-foreground flex items-center gap-2 text-sm font-semibold">
                                <Play className="text-muted-foreground h-4 w-4" />
                                Capítulos
                                <span className="text-muted-foreground text-xs font-normal">
                                  ({(mod.chapters || []).length})
                                </span>
                              </h4>
                              <Button
                                type="button"
                                size="sm"
                                onClick={() => addChapter(modIdx)}
                                className="navy-button flex h-9 items-center gap-2"
                              >
                                <Plus className="h-4 w-4" />
                                Añadir Capítulo
                              </Button>
                            </div>

                            {(mod.chapters || []).length === 0 ? (
                              <div className="border-border bg-muted/20 rounded-lg border border-dashed px-4 py-8 text-center">
                                <Play className="text-muted-foreground mx-auto mb-2 h-6 w-6" />
                                <p className="text-muted-foreground text-sm">
                                  No hay capítulos en este módulo
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {(mod.chapters || []).map((chapter, chapIdx) => (
                                  <div
                                    key={chapIdx}
                                    className="chapter-card border-border bg-muted/30 hover:bg-muted/50 rounded-lg border p-4 transition-colors"
                                  >
                                    <div className="mb-4 flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/10 text-xs font-semibold text-orange-600">
                                          {chapIdx + 1}
                                        </span>
                                        <span className="text-foreground text-sm font-semibold">
                                          Capítulo {chapIdx + 1}
                                        </span>
                                      </div>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeChapter(modIdx, chapIdx)}
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Eliminar capítulo</span>
                                      </Button>
                                    </div>

                                    <div className="mb-4 grid grid-cols-1 gap-4">
                                      <div>
                                        <Label className="form-label mb-2 flex items-center gap-1 text-xs font-medium">
                                          Título
                                          <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                          value={chapter.title}
                                          onChange={e =>
                                            handleChapterChange(
                                              modIdx,
                                              chapIdx,
                                              'title',
                                              e.target.value
                                            )
                                          }
                                          className="form-input h-10 text-sm transition-all focus:ring-2 focus:ring-orange-500/20"
                                          placeholder="Título del capítulo"
                                          required
                                        />
                                      </div>
                                      <div>
                                        <Label className="form-label mb-2 flex items-center gap-1 text-xs font-medium">
                                          Descripción
                                          <span className="text-destructive">*</span>
                                        </Label>
                                        <Textarea
                                          value={chapter.description}
                                          onChange={e =>
                                            handleChapterChange(
                                              modIdx,
                                              chapIdx,
                                              'description',
                                              e.target.value
                                            )
                                          }
                                          className="form-input min-h-[70px] resize-none text-sm transition-all focus:ring-2 focus:ring-orange-500/20"
                                          placeholder="Descripción del capítulo"
                                          required
                                        />
                                      </div>
                                    </div>

                                    <div>
                                      <Label className="form-label mb-2 flex items-center gap-2 text-xs font-medium">
                                        <Video className="text-muted-foreground h-3 w-3" />
                                        Video del Capítulo
                                        <span className="text-destructive">*</span>
                                      </Label>
                                      <VideoUploader
                                        setFile={file =>
                                          handleChapterChange(modIdx, chapIdx, 'videoUrl', file)
                                        }
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        onClick={addModule}
                        className="navy-button flex h-12 w-full items-center justify-center gap-2 rounded-lg text-base transition-transform hover:scale-[1.02]"
                      >
                        <Plus className="h-5 w-5" />
                        Añadir Nuevo Módulo
                      </Button>
                    </>
                  )}
                </div>
              </section>

              <section className="form-section">
                <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-orange-500/20 bg-gradient-to-r from-orange-500/5 to-orange-600/5 p-6 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <h3 className="text-foreground mb-2 flex items-center gap-2 text-lg font-semibold">
                      <CheckCircle2 className="h-5 w-5 text-orange-500" />
                      ¿Listo para crear tu curso?
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Revisa toda la información antes de continuar. Podrás editarla después.
                    </p>
                  </div>
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="orange-button flex h-12 items-center gap-2 px-8 text-base font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <>
                        <Upload className="h-5 w-5 animate-spin" />
                        Creando Curso...
                      </>
                    ) : (
                      <>
                        <Upload className="h-5 w-5" />
                        Crear Curso
                      </>
                    )}
                  </Button>
                </div>
              </section>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
