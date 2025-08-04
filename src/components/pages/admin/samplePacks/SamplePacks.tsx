'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface SamplePack {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  previewUrls: string[];
  zipUrl: string;
  price: number;
  createdAt: string;
}

export const SamplePacks = () => {
  const [samplePacks, setSamplePacks] = useState<SamplePack[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const fetchSamplePacks = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/samplepacks`);
      const data = await res.json();
      setSamplePacks(data);
    } catch (err) {
      console.error('Error al obtener sample packs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/samplepacks/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar');
      toast.success('Sample Pack eliminado correctamente');
      fetchSamplePacks();
    } catch (err) {
      toast.error('Hubo un error al eliminar el sample pack');
      console.error(err);
    } finally {
      setConfirmId(null);
    }
  };

  useEffect(() => {
    fetchSamplePacks();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-engravers text-2xl font-bold">Sample Packs</h3>
        <Link href="/admin/samplepacks/crear">
          <Button>Crear Sample Pack</Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {samplePacks.map(pack => (
            <Card key={pack.id}>
              <CardHeader>
                <CardTitle className="line-clamp-1">{pack.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="relative h-40">
                  <Image
                    src={pack.imageUrl}
                    alt={pack.title}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <p className="text-muted-foreground line-clamp-2 text-sm">{pack.description}</p>
                <p className="text-sm font-semibold">Precio: ${pack.price}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/admin/samplepacks/${pack.id}`}>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={() => setConfirmId(pack.id)}>
                  Eliminar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!confirmId} onOpenChange={() => setConfirmId(null)}>
        <DialogContent className="bg-secondaryLight flex flex-col gap-3">
          <DialogHeader>
            <DialogTitle>¿Eliminar este Sample Pack?</DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setConfirmId(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => handleDelete(confirmId!)}>
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
