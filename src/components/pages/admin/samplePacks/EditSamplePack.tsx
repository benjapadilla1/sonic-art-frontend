'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/samplepacks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
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
        <Input id="title" name="title" value={formData.title} onChange={handleInputChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">URL de Imagen</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label>Previews</Label>
        <Input
          name="preview-0"
          placeholder="URL de preview 1"
          value={formData.previewUrls[0]}
          onChange={handleInputChange}
        />
        <Input
          name="preview-1"
          placeholder="URL de preview 2"
          value={formData.previewUrls[1]}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="zipUrl">URL del ZIP</Label>
        <Input id="zipUrl" name="zipUrl" value={formData.zipUrl} onChange={handleInputChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Precio</Label>
        <Input id="price" name="price" value={formData.price} onChange={handleInputChange} />
      </div>

      <div className="pt-4">
        <Button onClick={handleUpdate}>Actualizar</Button>
      </div>
    </div>
  );
};
