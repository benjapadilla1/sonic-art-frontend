'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fetchSamplePackById } from '@/functions/samplePacks/fetchCourseById';
import { useAuthStore } from '@/stores/useAuthStore';
import { useCartStore } from '@/stores/useCartStore';
import { SamplePack } from '@/types/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FAQs } from '../FAQs';

type DetailSamplePackProps = {
  id: string;
};

const DetailSamplePack = ({ id }: DetailSamplePackProps) => {
  const [samplePack, setSamplePack] = useState<SamplePack | null>(null);
  const { addItem } = useCartStore();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    const fetchSamplePack = async () => {
      const response = await fetchSamplePackById(id);
      setSamplePack(response);
    };

    fetchSamplePack();
  }, [id]);

  if (!samplePack) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-500">Cargando Sample Pack...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-6xl p-6">
        <Card className="overflow-hidden rounded-3xl border border-gray-200 shadow-xl dark:border-neutral-800">
          <CardContent className="grid grid-cols-1 gap-10 p-8 md:grid-cols-2">
            <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:from-neutral-800 dark:to-neutral-900">
              <Image
                src={samplePack.coverImageUrl || ''}
                alt={samplePack.title}
                className="h-auto max-h-[400px] w-full object-contain drop-shadow-md"
                width={600}
                height={450}
              />
            </div>

            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {samplePack.title}
                </h1>
                <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  {samplePack.description}
                </p>

                <div className="text-ctas text-4xl font-bold">
                  {samplePack.price === 0 ? 'Gratis' : `$${samplePack.price}`}
                </div>
              </div>

              <Button
                className="rounded-xl py-6 text-lg font-semibold"
                onClick={() => {
                  if (samplePack.price === 0) {
                    if (!isLoggedIn) {
                      toast.error('Debes iniciar sesión para descargar');
                      return;
                    }
                    window.open(samplePack.downloadUrl, '_blank');
                  } else {
                    addItem({
                      id: samplePack.id,
                      title: samplePack.title,
                      type: 'samplePack',
                      price: Number(samplePack.price),
                      coverImageUrl: samplePack.coverImageUrl ?? '',
                    });
                  }
                }}
              >
                {samplePack.price === 0 ? 'Descargar' : 'Agregar al carrito'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-10">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
            Escucha un adelanto
          </h2>
          {samplePack.previewTracks && samplePack.previewTracks.length > 0 ? (
            <div className="space-y-8">
              {samplePack.previewTracks.map((preview, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-md transition hover:shadow-lg"
                >
                  <p className="mb-3 text-gray-700">Preview {idx + 1}</p>
                  <audio
                    controls
                    controlsList="nodownload noplaybackrate"
                    className="w-full rounded-lg"
                  >
                    <source src={preview} type="audio/mpeg" />
                    Tu navegador no soporta el reproductor de audio.
                  </audio>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Todavía no hay previews disponibles.</p>
          )}
        </div>
      </div>

      <div className="w-full pt-10">
        <FAQs />
      </div>
    </>
  );
};

export default DetailSamplePack;
