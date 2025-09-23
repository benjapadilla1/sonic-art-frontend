'use client';

import { fetchSamplePackById } from '@/functions/samplePacks/fetchCourseById';
import { SamplePack } from '@/types/firestore';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const DetailPurchasedSamplePack = () => {
  const { id } = useParams();
  const idStr = Array.isArray(id) ? id[0] : (id ?? '');
  const [samplePack, setSamplePack] = useState<SamplePack | null>(null);

  useEffect(() => {
    fetchSamplePackById(idStr).then(setSamplePack).catch(console.error);
  }, [idStr]);

  if (!samplePack) return <p className="min-h-screen py-20 text-center">Cargando sample pack...</p>;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col rounded-xl border bg-white shadow-md md:flex-row">
      <div className="relative h-40 w-full md:h-auto md:w-1/2">
        <Image
          src={samplePack.coverImageUrl ?? ''}
          alt={samplePack.title}
          fill
          className="rounded-t-xl object-cover md:rounded-l-xl md:rounded-tr-none"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center p-8">
        <h1 className="text-3xl font-bold">{samplePack.title}</h1>
        <p className="mt-4 text-gray-600">{samplePack.description}</p>

        <div className="flex">
          <a
            href={samplePack.downloadUrl ?? ''}
            download
            className="bg-ctas hover:bg-ctas/90 mt-6 inline-block rounded-md px-6 py-3 text-white transition"
          >
            Descargar Sample Pack
          </a>
        </div>
      </div>
    </div>
  );
};

export default DetailPurchasedSamplePack;
