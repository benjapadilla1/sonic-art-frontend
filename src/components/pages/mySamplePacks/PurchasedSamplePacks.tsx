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
      <h3 className="pt-4 text-center text-2xl font-semibold tracking-tight">Tus sample packs</h3>
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
                    <p className="text-lg font-semibold tracking-tight">{samplePack.title}</p>
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
          <div className="mx-auto my-20 flex max-w-md flex-col items-center justify-center gap-6 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c.828 0 1.5.672 1.5 1.5S12.828 11 12 11s-1.5-.672-1.5-1.5S11.172 8 12 8zm0 0v8m0 0h6m-6 0H6"
              />
            </svg>
            <h4 className="text-2xl font-semibold text-gray-700">No tienes sample packs aún</h4>
            <p className="text-gray-500">
              Explora nuestros sample packs y comienza a crear hoy mismo.
            </p>
            <Link href="/sample-packs">
              <Button size="lg" className="bg-ctas hover:bg-ctas/90 text-white">
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
