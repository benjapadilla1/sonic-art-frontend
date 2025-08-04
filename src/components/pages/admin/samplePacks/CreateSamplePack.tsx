'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const CreateSamplePack = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    previewUrls: ['', ''],
    zipUrl: '',
    price: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Handle previews
    if (name.startsWith('preview-')) {
      const index = Number(name.split('-')[1]);
      const updatedPreviews = [...formData.previewUrls];
      updatedPreviews[index] = value;
      setFormData(prev => ({ ...prev, previewUrls: updatedPreviews }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/samplepacks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      });

      if (!res.ok) throw new Error('Error al crear Sample Pack');

      toast.success('Sample Pack creado con éxito');
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        previewUrls: ['', ''],
        zipUrl: '',
        price: '',
      });
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
        <Label>Previews (1 o 2)</Label>
        <Input
          name="preview-0"
          placeholder="URL de audio 1"
          value={formData.previewUrls[0]}
          onChange={handleInputChange}
        />
        <Input
          name="preview-1"
          placeholder="URL de audio 2 (opcional)"
          value={formData.previewUrls[1]}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="zipUrl">URL del archivo ZIP</Label>
        <Input id="zipUrl" name="zipUrl" value={formData.zipUrl} onChange={handleInputChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Precio</Label>
        <Input id="price" name="price" value={formData.price} onChange={handleInputChange} />
      </div>

      <div className="pt-4">
        <Button onClick={handleSubmit}>Crear</Button>
      </div>
    </div>
  );
};
