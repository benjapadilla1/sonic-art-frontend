'use client';

import type React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Archive, DollarSign, FileAudio, ImageIcon, Music, Upload } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const CreateSamplePack = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    coverImageFile: null as File | null,
    previewFiles: [null, null] as (File | null)[],
    zipFile: null as File | null,
    price: '',
  });
  const router = useRouter();

  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [audioPreviews, setAudioPreviews] = useState<(string | null)[]>([null, null]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData(prev => ({ ...prev, coverImageFile: file }));
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handlePreviewChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const updatedFiles = [...formData.previewFiles];
    updatedFiles[index] = file;
    setFormData(prev => ({ ...prev, previewFiles: updatedFiles }));

    const updatedPreviews = [...audioPreviews];
    updatedPreviews[index] = file ? URL.createObjectURL(file) : null;
    setAudioPreviews(updatedPreviews);
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, zipFile: file }));
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', formData.price);

      if (formData.coverImageFile) data.append('coverImage', formData.coverImageFile);
      if (formData.zipFile) data.append('zipFile', formData.zipFile);

      formData.previewFiles.forEach((file, i) => {
        if (file) data.append(`preview-${i}`, file);
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/samplepacks`, {
        method: 'POST',
        body: data,
      });

      if (!res.ok) throw new Error('Error al crear Sample Pack');

      toast.success('Sample Pack creado con éxito');
      router.push('/admin');
    } catch (err) {
      console.error(err);
      toast.error('Hubo un error al crear el Sample Pack');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-slate-900">Crear Sample Pack</h1>
          <p className="text-slate-600">Sube tu contenido musical y compártelo con el mundo</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className="border-2 border-slate-200 shadow-lg">
              <CardHeader className="rounded-t-lg bg-slate-900 text-white">
                <CardTitle className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-orange-500 px-3 py-1 font-bold text-white"
                  >
                    1
                  </Badge>
                  <Music className="h-5 w-5" />
                  Información Básica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="font-medium text-slate-700">
                    Título del Sample Pack
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleTextChange}
                    placeholder="Ej: Trap Beats Vol. 1"
                    className="border-slate-300 focus:border-slate-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="font-medium text-slate-700">
                    Descripción
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleTextChange}
                    placeholder="Describe tu sample pack, género, BPM, instrumentos utilizados..."
                    className="min-h-[100px] border-slate-300 focus:border-slate-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="font-medium text-slate-700">
                    Precio (USD)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-500" />
                    <Input
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleTextChange}
                      placeholder="29.99"
                      className="border-slate-300 pl-10 focus:border-slate-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200 shadow-lg">
              <CardHeader className="rounded-t-lg bg-slate-900 text-white">
                <CardTitle className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-orange-500 px-3 py-1 font-bold text-white"
                  >
                    2
                  </Badge>
                  <ImageIcon className="h-5 w-5" />
                  Imagen de Portada
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Label className="font-medium text-slate-700">
                    Sube una imagen atractiva para tu sample pack
                  </Label>
                  <div className="rounded-lg border-2 border-dashed border-slate-300 p-6 text-center transition-colors hover:border-slate-400">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverChange}
                      className="hidden"
                      id="cover-upload"
                    />
                    <Label htmlFor="cover-upload" className="cursor-pointer">
                      <Upload className="mx-auto mb-4 h-12 w-12 text-slate-400" />
                      <p className="text-slate-600">Haz clic para subir imagen</p>
                      <p className="mt-1 text-sm text-slate-500">PNG, JPG hasta 10MB</p>
                    </Label>
                  </div>
                  {coverPreview && (
                    <div className="relative h-48 w-full overflow-hidden rounded-lg">
                      <Image
                        fill
                        src={coverPreview || '/placeholder.svg'}
                        alt="Portada"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200 shadow-lg">
              <CardHeader className="rounded-t-lg bg-slate-900 text-white">
                <CardTitle className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-orange-500 px-3 py-1 font-bold text-white"
                  >
                    3
                  </Badge>
                  <FileAudio className="h-5 w-5" />
                  Previews de Audio
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-slate-600">
                    Sube hasta 3 previews para que los usuarios escuchen tu trabajo
                  </p>
                  {[0, 1, 2].map(i => (
                    <div key={i} className="space-y-2">
                      <Label className="font-medium text-slate-700">Preview {i + 1}</Label>
                      <div className="rounded-lg border-2 border-dashed border-slate-300 p-4 transition-colors hover:border-slate-400">
                        <Input
                          type="file"
                          accept="audio/*"
                          onChange={e => handlePreviewChange(i, e)}
                          className="hidden"
                          id={`audio-${i}`}
                        />
                        <Label
                          htmlFor={`audio-${i}`}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <Upload className="h-5 w-5 text-slate-400" />
                          <span className="text-slate-600">Subir archivo de audio</span>
                        </Label>
                      </div>
                      {audioPreviews[i] && (
                        <audio controls className="w-full">
                          <source src={audioPreviews[i] || ''} type="audio/mpeg" />
                        </audio>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200 shadow-lg">
              <CardHeader className="rounded-t-lg bg-slate-900 text-white">
                <CardTitle className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-orange-500 px-3 py-1 font-bold text-white"
                  >
                    4
                  </Badge>
                  <Archive className="h-5 w-5" />
                  Archivo Principal
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Label className="font-medium text-slate-700">
                    Archivo ZIP con todos los samples
                  </Label>
                  <div className="rounded-lg border-2 border-dashed border-slate-300 p-6 text-center transition-colors hover:border-slate-400">
                    <Input
                      type="file"
                      accept=".zip"
                      onChange={handleZipChange}
                      className="hidden"
                      id="zip-upload"
                    />
                    <Label htmlFor="zip-upload" className="cursor-pointer">
                      <Archive className="mx-auto mb-4 h-12 w-12 text-slate-400" />
                      <p className="text-slate-600">Sube tu archivo ZIP</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Incluye todos los samples, loops y stems
                      </p>
                    </Label>
                  </div>
                  {formData.zipFile && (
                    <div className="rounded-lg bg-slate-100 p-3">
                      <p className="text-sm text-slate-700">
                        <Archive className="mr-2 inline h-4 w-4" />
                        {formData.zipFile.name}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-6 border-2 border-slate-200 shadow-lg">
              <CardHeader className="rounded-t-lg bg-slate-900 text-white">
                <CardTitle>Resumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Título:</span>
                    <span className="font-medium text-slate-900">
                      {formData.title || 'Sin título'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Precio:</span>
                    <span className="font-bold text-green-600">${formData.price || '0.00'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Portada:</span>
                    <Badge variant={coverPreview ? 'default' : 'secondary'}>
                      {coverPreview ? '✓ Subida' : 'Pendiente'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Previews:</span>
                    <Badge variant="secondary">{audioPreviews.filter(p => p).length}/3</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Archivo ZIP:</span>
                    <Badge variant={formData.zipFile ? 'default' : 'secondary'}>
                      {formData.zipFile ? '✓ Subido' : 'Pendiente'}
                    </Badge>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-orange-500 py-3 font-bold text-white hover:bg-orange-600"
                    size="lg"
                  >
                    Crear Sample Pack
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
