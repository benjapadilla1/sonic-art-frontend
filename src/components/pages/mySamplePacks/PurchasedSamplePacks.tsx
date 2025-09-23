'use client';

import { Button } from '@/components/ui/button';
import { fetchPurchasedSamplePacks } from '@/functions/samplePacks/fetchPurchasedSamplePacks';
import { useAuthStore } from '@/stores/useAuthStore';
import { SamplePack } from '@/types/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const PurchasedSamplePacks = () => {
  const [samplePacks, setSamplePacks] = useState<SamplePack[] | null>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { isLoggedIn, user } = useAuthStore();

  if (!isLoggedIn) {
    router.push('/acceso');
  }

  useEffect(() => {
    const loadSamplePacks = async () => {
      try {
        setLoading(true);
        const response = await fetchPurchasedSamplePacks(user?.uid ?? '');
        setSamplePacks(response || []);
      } catch (error) {
        console.error('Error cargando sample packs', error);
        setSamplePacks([]);
      } finally {
        setLoading(false);
      }
    };

    loadSamplePacks();
  }, [user?.uid]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <span className="text-secondaryBg text-lg">Cargando tus sample packs...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 text-center">
      <h3 className="font-engravers pt-4 text-center text-2xl font-semibold">Tus sample packs</h3>
      <p className="pt-2 text-xl">Estos son los sample packs que has comprado:</p>
      <div className="mt-6 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {samplePacks && samplePacks.length > 0 ? (
          samplePacks.map(samplePack => (
            <Link
              href={`/mis-sample-packs/${samplePack.id}`}
              key={samplePack.id}
              className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-md transition hover:shadow-lg"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={samplePack.coverImageUrl}
                  alt={samplePack.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                  {samplePack.title}
                </h3>
                <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                  {samplePack.description || 'Sin descripción'}
                </p>
                <Button>Ver más</Button>
              </div>
            </Link>
          ))
        ) : (
          <div className="mx-auto flex w-full flex-col items-center justify-center">
            <p className="mb-4">No has comprado ningún sample pack todavía.</p>
            <Link href="/sample-packs">
              <Button size="lg" className="text-xl">
                Comprar sample packs
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchasedSamplePacks;
