'use client';

import { Button } from '@/components/ui/button';
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
    imageUrl: '',
    previewUrls: ['', ''],
    zipUrl: '',
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
          imageUrl: data.imageUrl,
          previewUrls: data.previewUrls || ['', ''],
          zipUrl: data.zipUrl,
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
      const updated = [...formData.previewUrls];
      updated[index] = value;
      setFormData(prev => ({ ...prev, previewUrls: updated }));
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

  if (loading) return <p className="p-4">Cargando...</p>;

  return (
    <div className="mx-auto max-w-xl space-y-4 p-6">
      <h2 className="mb-4 text-2xl font-bold">Editar Sample Pack</h2>

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
        <Label>Imagen actual</Label>
        {formData.imageUrl && (
          <Image
            fill
            src={formData.imageUrl}
            alt="Cover"
            className="h-32 w-auto rounded object-cover"
          />
        )}
        <Input
          type="file"
          accept="image/*"
          onChange={e => handleFileChange('coverImage', e.target.files?.[0] || null)}
        />
      </div>

      <div className="space-y-2">
        <Label>Previews actuales</Label>
        {formData.previewUrls.map((url, idx) => (
          <div key={idx} className="space-y-1">
            {url && (
              <audio controls src={url} className="w-full">
                Tu navegador no soporta audio.
              </audio>
            )}
            <Input
              type="file"
              accept="audio/*"
              onChange={e => handleFileChange('preview', e.target.files?.[0] || null, idx)}
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label>Archivo ZIP actual</Label>
        {formData.zipUrl && (
          <a
            href={formData.zipUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Descargar ZIP
          </a>
        )}
        <Input
          type="file"
          accept=".zip"
          onChange={e => handleFileChange('zipFile', e.target.files?.[0] || null)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Precio</Label>
        <Input id="price" name="price" value={formData.price} onChange={handleTextChange} />
      </div>

      <div className="pt-4">
        <Button onClick={handleUpdate}>Actualizar</Button>
      </div>
    </div>
  );
};
