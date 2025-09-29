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
      <div className="mt-6 flex flex-wrap justify-around gap-10 pt-4">
        {samplePacks && samplePacks.length > 0 ? (
          samplePacks.map(samplePack => (
            <div key={samplePack.id} className="group flex flex-col transition-all duration-500">
              <Link href={`/mis-sample-packs/${samplePack.id}`}>
                <div className="text-secondaryLight bg-secondaryBg flex h-[600px] w-[350px] flex-col gap-4 rounded-2xl px-4 py-6 shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl">
                  <div className="h-64 w-full overflow-hidden rounded-xl">
                    <Image
                      src={samplePack.coverImageUrl}
                      alt={samplePack.title}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex items-center justify-center text-center">
                    <p className="font-engravers text-lg font-semibold">{samplePack.title}</p>
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

                  <p className="text-secondaryLight line-clamp-3 text-sm">
                    {samplePack.description || 'Sin descripción'}
                  </p>

                  <div className="flex items-center justify-center">
                    <Button>
                      <p>Ver más</p>
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
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
