'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
    <div className="mx-auto max-w-xl space-y-4 p-6">
      <h2 className="mb-4 text-2xl font-bold">Crear Sample Pack</h2>

      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleTextChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleTextChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Imagen de portada</Label>
        <Input type="file" accept="image/*" onChange={handleCoverChange} className="file:px-2" />
        {coverPreview && (
          <div className="relative h-48 w-full">
            <Image
              fill
              src={coverPreview}
              objectFit="cover"
              alt="Portada"
              className="mt-2 rounded-lg"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Previews de audio (1 o 2)</Label>
        {[0, 1].map(i => (
          <div key={i}>
            <Input type="file" accept="audio/*" onChange={e => handlePreviewChange(i, e)} />
            {audioPreviews[i] && (
              <audio controls className="mt-2">
                <source src={audioPreviews[i] || ''} type="audio/mpeg" />
              </audio>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="zipFile">Archivo ZIP</Label>
        <Input type="file" accept=".zip" onChange={handleZipChange} className="file:px-2" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Precio</Label>
        <Input id="price" name="price" value={formData.price} onChange={handleTextChange} />
      </div>

      <div className="pt-4">
        <Button onClick={handleSubmit}>Crear</Button>
      </div>
    </div>
  );
};
