'use client';

import { Button } from '@/components/ui/button';
import { fetchSamplePacks } from '@/functions/samplePacks/fetchSamplePacks';
import { useCartStore } from '@/stores/useCartStore';
import { SamplePack } from '@/types/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const SamplePacks = () => {
  const [samplePacks, setSamplePacks] = useState<SamplePack[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  const loadSamplePacks = async () => {
    try {
      const response = await fetchSamplePacks();
      setSamplePacks(response);
    } catch (error) {
      console.error('Error loading sample packs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSamplePacks();
  }, []);

  if (loading) {
    return <p className="py-10 text-center">Cargando sample packs...</p>;
  }

  if (samplePacks.length === 0) {
    return <p className="py-10 text-center">No hay sample packs disponibles.</p>;
  }

  return (
    <div className="flex min-h-[800px] flex-col gap-2 pt-4">
      <h2 className="py-4 text-center text-3xl font-bold tracking-tight">Sample Packs</h2>

      <div className="flex flex-wrap justify-around gap-10 pt-4">
        {samplePacks.map(samplePack => (
          <div key={samplePack.id} className="group flex flex-col transition-all duration-500">
            <Link href={`/sample-packs/${samplePack.id}`}>
              <div className="text-secondaryLight bg-secondaryBg flex h-[600px] w-[350px] flex-col gap-4 rounded-2xl px-4 py-6 shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl">
                <div className="h-64 w-full overflow-hidden rounded-xl">
                  <Image
                    src={samplePack.coverImageUrl ?? ''}
                    alt={samplePack.title}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="flex items-center justify-center text-center">
                  <p className="text-lg font-bold tracking-tight">{samplePack.title}</p>
                </div>

                <div className="flex justify-between text-sm text-gray-400">
                  {samplePack.category ? (
                    <div className="bg-ctas rounded-xl px-3 py-1 text-white">
                      <p>{samplePack.category}</p>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>

                <p className="text-secondaryLight line-clamp-3 text-sm">{samplePack.description}</p>

                {samplePack.previewTracks?.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Preview:</p>
                    {samplePack.previewTracks.map((track, index) => (
                      <audio key={index} controls src={track} className="w-full rounded" />
                    ))}
                  </div>
                )}

                <div className="flex-grow" />

                <div className="flex items-center justify-between">
                  <p className="flex gap-1 text-white">
                    <span className="text-ctas">$</span>
                    {samplePack.price}
                  </p>
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      addItem({
                        id: samplePack.id,
                        title: samplePack.title,
                        type: 'samplePack',
                        price: Number(samplePack.price),
                        coverImageUrl: samplePack.coverImageUrl ?? '',
                      });
                    }}
                  >
                    <p>Añadir al carrito</p>
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SamplePacks;
