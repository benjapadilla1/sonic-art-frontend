'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { fetchPurchasedSamplePackById } from '@/functions/samplePacks/fetchPurchasedSamplePackById';
import { useAuthStore } from '@/stores/useAuthStore';
import type { SamplePack } from '@/types/firestore';
import { Download, Music } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const DetailPurchasedSamplePack = () => {
  const { id } = useParams();
  const idStr = Array.isArray(id) ? id[0] : (id ?? '');
  const [samplePack, setSamplePack] = useState<SamplePack | null>(null);
  const { user, isLoggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/acceso');
      return;
    }

    fetchPurchasedSamplePackById(user?.uid ?? '', idStr)
      .then(setSamplePack)
      .catch(console.error);
  }, [idStr, isLoggedIn, router, user, user?.uid]);

  console.log(samplePack?.coverImageUrl);

  if (!samplePack) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground text-lg">Cargando sample pack...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="relative">
            <Card className="border-border/50 bg-card/50 overflow-hidden border-2 backdrop-blur-sm">
              <div className="group relative aspect-square">
                <Image
                  src={samplePack.coverImageUrl ?? ''}
                  alt={samplePack.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Music className="text-primary h-6 w-6" />
                <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                  Sample Pack
                </span>
              </div>

              <div className="space-y-4">
                <h2 className="text-foreground text-4xl leading-tight font-bold md:text-5xl">
                  {samplePack.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
                  {samplePack.description}
                </p>
              </div>
            </div>

            <Card className="from-primary/10 to-accent/5 border-primary/20 bg-gradient-to-br p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Download className="text-primary h-6 w-6" />
                  <h3 className="text-foreground text-xl font-semibold">Descargar Contenido</h3>
                </div>

                <p className="text-muted-foreground">
                  Tu sample pack incluye todos los archivos de audio en alta calidad, listos para
                  usar en tu próxima producción musical.
                </p>

                <Button
                  asChild
                  size="lg"
                  className="text-primary-foreground w-full py-4 text-lg font-semibold"
                >
                  <a
                    href={samplePack.downloadUrl ?? ''}
                    download
                    className="flex items-center justify-center space-x-3"
                  >
                    <Download className="h-5 w-5" />
                    <span>Descargar Sample Pack</span>
                  </a>
                </Button>

                <p className="text-muted-foreground text-center text-sm">
                  Descarga ilimitada • Archivos WAV de alta calidad
                </p>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-card/50 border-border/50 p-6 text-center">
                <div className="space-y-2">
                  <div className="text-primary text-2xl font-bold">24-bit</div>
                  <div className="text-muted-foreground text-sm">Calidad de Audio</div>
                </div>
              </Card>
              <Card className="bg-card/50 border-border/50 p-6 text-center">
                <div className="space-y-2">
                  <div className="text-primary text-2xl font-bold">WAV</div>
                  <div className="text-muted-foreground text-sm">Formato</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPurchasedSamplePack;
