'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import type { SamplePack } from '@/types/firestore';
import { Edit3, Music, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const AdminSamplePacks = () => {
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
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="icon-wrapper">
            <Music className="text-accent h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display gradient-text-primary text-3xl">Sample Packs</h2>
            <p className="text-muted-foreground mt-1">
              Administra los paquetes de samples disponibles
            </p>
          </div>
        </div>

        <Link href="/admin/samplepacks/crear">
          <Button className="gap-2 px-6 py-3 text-base">
            <Plus className="h-5 w-5" />
            Crear Sample Pack
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="admin-card rounded-xl p-6">
              <Skeleton className="loading-skeleton mb-4 h-48 w-full rounded-lg" />
              <Skeleton className="loading-skeleton mb-2 h-6 w-3/4" />
              <Skeleton className="loading-skeleton mb-4 h-4 w-full" />
              <div className="flex gap-2">
                <Skeleton className="loading-skeleton h-9 w-20" />
                <Skeleton className="loading-skeleton h-9 w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {samplePacks.map(pack => (
            <Card key={pack.id} className="admin-card group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                {pack.coverImageUrl ? (
                  <Image
                    src={pack.coverImageUrl || '/placeholder.svg'}
                    alt={pack.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="bg-muted flex h-full items-center justify-center">
                    <Music className="text-muted-foreground h-12 w-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <CardHeader className="space-y-3">
                <CardTitle className="font-heading group-hover:text-accent line-clamp-2 text-xl transition-colors">
                  {pack.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                  {pack.description}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">${pack.price}</span>
                </div>
              </CardContent>

              <CardFooter className="flex gap-3 pt-4">
                <Link href={`/admin/samplepacks/${pack.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                    <Edit3 className="h-4 w-4" />
                    Editar
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setConfirmId(pack.id)}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!confirmId} onOpenChange={() => setConfirmId(null)}>
        <DialogContent className="glass-effect border-destructive/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="bg-destructive/10 rounded-full p-2">
                <Trash2 className="text-destructive h-5 w-5" />
              </div>
              ¿Eliminar este Sample Pack?
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground py-4">
            Esta acción no se puede deshacer. El sample pack será eliminado permanentemente.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setConfirmId(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(confirmId!)}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Eliminar Sample Pack
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
