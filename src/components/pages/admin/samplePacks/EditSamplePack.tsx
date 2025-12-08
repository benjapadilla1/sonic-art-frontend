'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface EditSamplePackProps {
  id: string;
}

export const EditSamplePack = ({ id }: EditSamplePackProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    coverImageUrl: '',
    previewTracks: ['', ''],
    downloadUrl: '',
    price: '',
  });

  const [newCoverImage, setNewCoverImage] = useState<File | null>(null);
  const [newPreviews, setNewPreviews] = useState<(File | null)[]>([null, null]);
  const [newZipFile, setNewZipFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchSamplePack = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/samplepacks/${id}`);
        if (!res.ok) throw new Error('Error al cargar Sample Pack');
        const data = await res.json();
        setFormData({
          title: data.title,
          description: data.description,
          coverImageUrl: data.coverImageUrl,
          previewTracks: data.previewTracks || ['', ''],
          downloadUrl: data.downloadUrl,
          price: data.price.toString(),
        });
      } catch (err) {
        console.error(err);
        toast.error('No se pudo cargar el Sample Pack');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSamplePack();
  }, [id]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('preview-')) {
      const index = Number(name.split('-')[1]);
      const updated = [...formData.previewTracks];
      updated[index] = value;
      setFormData(prev => ({ ...prev, previewTracks: updated }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (field: string, file: File | null, index?: number) => {
    if (field === 'coverImage') {
      setNewCoverImage(file);
    } else if (field === 'zipFile') {
      setNewZipFile(file);
    } else if (field === 'preview' && typeof index === 'number') {
      const updated = [...newPreviews];
      updated[index] = file;
      setNewPreviews(updated);
    }
  };

  const handleUpdate = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);

      if (newCoverImage) {
        formDataToSend.append('coverImage', newCoverImage);
      }
      if (newZipFile) {
        formDataToSend.append('zipFile', newZipFile);
      }
      newPreviews.forEach((file, idx) => {
        if (file) {
          formDataToSend.append(`preview${idx + 1}`, file);
        }
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/samplepacks/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (!res.ok) throw new Error('Error al actualizar Sample Pack');
      toast.success('Sample Pack actualizado correctamente');
      router.push('/admin');
    } catch (err) {
      console.error(err);
      toast.error('No se pudo actualizar el Sample Pack');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="text-muted-foreground text-sm">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Editar Sample Pack</h1>
        <p className="text-muted-foreground">
          Actualiza la información y archivos de tu sample pack
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información Básica</CardTitle>
          <CardDescription>Actualiza el título, descripción y precio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Título
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleTextChange}
              placeholder="Ej: Lo-Fi Hip Hop Essentials"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Descripción
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleTextChange}
              placeholder="Describe tu sample pack..."
              className="min-h-[120px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Precio
            </Label>
            <div className="relative">
              <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                $
              </span>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleTextChange}
                placeholder="29.99"
                className="h-11 pl-7"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Imagen de Portada</CardTitle>
          <CardDescription>La imagen principal de tu sample pack</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.coverImageUrl && (
            <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-lg border">
              <Image
                src={formData.coverImageUrl || '/placeholder.svg'}
                alt="Cover"
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="cover-upload" className="text-sm font-medium">
              Subir nueva imagen
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="cover-upload"
                type="file"
                accept="image/*"
                onChange={e => handleFileChange('coverImage', e.target.files?.[0] || null)}
                className="h-11"
              />
              {newCoverImage && (
                <span className="text-muted-foreground text-sm">{newCoverImage.name}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pistas de Vista Previa</CardTitle>
          <CardDescription>Archivos de audio para demostración</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.previewTracks && formData.previewTracks.length > 0 ? (
            formData.previewTracks
              .filter(url => url !== null && url !== undefined && url !== '')
              .map((url, idx) => (
                <div key={idx} className="space-y-3 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Preview {idx + 1}</Label>
                    {newPreviews[idx] && (
                      <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
                        Nuevo archivo
                      </span>
                    )}
                  </div>
                  <audio controls src={url} className="w-full">
                    Tu navegador no soporta audio.
                  </audio>
                  <Input
                    type="file"
                    accept="audio/*"
                    onChange={e => handleFileChange('preview', e.target.files?.[0] || null, idx)}
                    className="h-11"
                  />
                </div>
              ))
          ) : (
            <div className="space-y-4">
              <div className="text-muted-foreground flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <svg
                  className="mb-3 h-12 w-12 opacity-40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
                <p className="text-sm font-medium">No hay pistas de vista previa</p>
                <p className="text-xs">Sube archivos de audio para demostración</p>
              </div>
              {[0, 1].map(idx => (
                <div key={idx} className="space-y-2">
                  <Label htmlFor={`preview-${idx}`} className="text-sm font-medium">
                    Preview {idx + 1}
                  </Label>
                  <Input
                    id={`preview-${idx}`}
                    type="file"
                    accept="audio/*"
                    onChange={e => handleFileChange('preview', e.target.files?.[0] || null, idx)}
                    className="h-11"
                  />
                  {newPreviews[idx] && (
                    <p className="text-muted-foreground text-xs">
                      Archivo seleccionado: {newPreviews[idx]?.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Archivo Descargable</CardTitle>
          <CardDescription>El archivo ZIP que recibirán los compradores</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.downloadUrl && (
            <div className="bg-muted/50 flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="bg-background flex h-10 w-10 items-center justify-center rounded-md">
                  <svg
                    className="text-muted-foreground h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">Archivo actual</p>
                  <p className="text-muted-foreground text-xs">Click para descargar</p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href={formData.downloadUrl} target="_blank" rel="noopener noreferrer">
                  Descargar
                </a>
              </Button>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="zip-upload" className="text-sm font-medium">
              Subir nuevo archivo ZIP
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="zip-upload"
                type="file"
                accept=".zip"
                onChange={e => handleFileChange('zipFile', e.target.files?.[0] || null)}
                className="h-11"
              />
              {newZipFile && (
                <span className="text-muted-foreground text-sm">{newZipFile.name}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between border-t pt-6">
        <Button variant="outline" onClick={() => router.push('/admin')}>
          Cancelar
        </Button>
        <Button onClick={handleUpdate} size="lg" className="min-w-[140px]">
          Actualizar Sample Pack
        </Button>
      </div>
    </div>
  );
};
