'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Module {
  title: string;
  content: string;
}

export const CreateCourse = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    modules: [] as Module[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModuleChange = (index: number, field: keyof Module, value: string) => {
    const updatedModules = [...formData.modules];
    updatedModules[index][field] = value;
    setFormData({ ...formData, modules: updatedModules });
  };

  const addModule = () => {
    setFormData({
      ...formData,
      modules: [...formData.modules, { title: '', content: '' }],
    });
  };

  const removeModule = (index: number) => {
    const updatedModules = formData.modules.filter((_, i) => i !== index);
    setFormData({ ...formData, modules: updatedModules });
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Error al crear curso');

      router.push('/admin');
      toast.success('Curso creado correctamente');
    } catch (err) {
      console.error('Error al crear curso:', err);
      toast.error('Hubo un error al crear el curso');
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

        <div>
          <Label htmlFor="price">Precio</Label>
          <Input id="price" name="price" value={formData.price} onChange={handleInputChange} />
        </div>

        <div>
          <Label htmlFor="duration">Duración (hs)</Label>
          <Input
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold">Módulos</h2>

          {formData.modules.map((mod, idx) => (
            <div key={idx} className="relative space-y-2 rounded-md border bg-gray-50 p-4">
              <div>
                <Label>Título del módulo</Label>
                <Input
                  value={mod.title}
                  onChange={e => handleModuleChange(idx, 'title', e.target.value)}
                />
              </div>
              <div>
                <Label>Contenido del módulo</Label>
                <Textarea
                  value={mod.content}
                  onChange={e => handleModuleChange(idx, 'content', e.target.value)}
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeModule(idx)}
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
          <Button type="submit" className="bg-black text-white hover:bg-gray-900">
            Crear curso
          </Button>
        </div>
      </form>
    </div>
  );
};
