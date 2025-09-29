'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { dataURLtoFile } from '@/functions/cloud/DataURLToFile';
import { Chapter, Module } from '@/types/firestore';
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
    <div className="mx-auto mt-8 max-w-xl space-y-6 rounded-lg bg-white p-6 shadow-md">
      <h1 className="text-2xl font-semibold">Crear nuevo curso</h1>

      <form onSubmit={handleCreateCourse} className="space-y-4">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleInputChange} />
        </div>

        <div>
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-row gap-4">
          <div className="w-full">
            <Label htmlFor="price">Precio</Label>
            <Input id="price" name="price" value={formData.price} onChange={handleInputChange} />
          </div>
          <div className="w-full">
            <Label htmlFor="duration">Duración (hs)</Label>
            <Input
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="image">Imagen del curso</Label>
          <Input
            id="image"
            className="file:px-2"
            type="file"
            accept="image/*"
            onChange={e => handleImageChange(e)}
          />
          {formData.coverImageUrl && (
            <Image
              src={formData.coverImageUrl}
              alt="Cover Image"
              width={200}
              height={200}
              className="mt-2 rounded-md border"
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="video">Video de introducción del curso</Label>
          <Input
            id="video"
            className="file:px-2"
            type="file"
            accept="video/*"
            onChange={e => handleVideoChange(e)}
          />
          {formData.introVideoUrl && (
            <video src={formData.introVideoUrl} controls className="mt-2 rounded-md border" />
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold">Módulos</h2>

          {formData.modules.map((mod, modIdx) => (
            <div key={modIdx} className="space-y-3 rounded-md border p-4">
              <div>
                <Label>Título del módulo</Label>
                <Input
                  value={mod.title}
                  onChange={e => handleModuleChange(modIdx, 'title', e.target.value)}
                />
              </div>

              <div>
                <Label>Descripción del módulo</Label>
                <Textarea
                  value={mod.description}
                  onChange={e => handleModuleChange(modIdx, 'description', e.target.value)}
                />
              </div>

              <div className="space-y-3 rounded-md border bg-white p-3">
                <h3 className="text-sm font-bold">Capítulos</h3>
                {(mod.chapters || []).map((chapter, chapIdx) => (
                  <div key={chapIdx} className="space-y-2 border-t pt-2">
                    <p>Capítulo {chapIdx + 1}</p>
                    <div>
                      <Label>Título</Label>
                      <Input
                        value={chapter.title}
                        onChange={e =>
                          handleChapterChange(modIdx, chapIdx, 'title', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Descripción</Label>
                      <Textarea
                        value={chapter.description}
                        onChange={e =>
                          handleChapterChange(modIdx, chapIdx, 'description', e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Video del capítulo:</Label>
                      <VideoUploader
                        setFile={file => handleChapterChange(modIdx, chapIdx, 'videoUrl', file)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeChapter(modIdx, chapIdx)}
                    >
                      Eliminar capítulo
                    </Button>
                    <Separator />
                  </div>
                ))}
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => addChapter(modIdx)}
                >
                  Añadir capítulo
                </Button>
              </div>

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeModule(modIdx)}
              >
                Eliminar módulo
              </Button>
            </div>
          ))}

          <Button type="button" onClick={addModule}>
            Añadir módulo
          </Button>
        </div>

        <div className="pt-4 text-right">
          <Button
            disabled={isLoading}
            type="submit"
            className="bg-black text-white hover:bg-gray-900"
          >
            {isLoading ? 'Creando Curso...' : 'Crear Curso'}
          </Button>
        </div>
      </form>
    </div>
  );
};
