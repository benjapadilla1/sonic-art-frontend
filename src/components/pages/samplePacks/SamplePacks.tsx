'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchSamplePacks } from '@/functions/samplePacks/fetchSamplePacks';
import { SamplePack } from '@/types/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const SamplePacks = () => {
  const [samplePacks, setSamplePacks] = useState<SamplePack[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {samplePacks.map(samplePack => (
        <Card key={samplePack.id} className="flex flex-col">
          <CardHeader>
            <Image
              src={samplePack.coverImageUrl}
              alt={samplePack.title}
              className="h-48 w-full rounded-xl object-cover"
            />
          </CardHeader>

          <CardContent className="flex-1 space-y-2">
            <CardTitle className="text-xl">{samplePack.title}</CardTitle>
            <p className="text-muted-foreground line-clamp-3 text-sm">{samplePack.description}</p>
            {samplePack.category && (
              <Badge variant="secondary" className="mt-1">
                {samplePack.category}
              </Badge>
            )}
            <p className="mt-2 text-lg font-semibold">${samplePack.price}</p>
            {samplePack.previewTracks?.length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="text-sm font-medium">Preview tracks:</p>
                {samplePack.previewTracks.map((track, index) => (
                  <audio key={index} controls src={track} className="w-full rounded" />
                ))}
              </div>
            )}
          </CardContent>

          <CardFooter>
            <Button
              className="w-full"
              onClick={() => {
                // TODO Logic to add the sample pack to the cart}
              }}
            >
              Añadir al carrito
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SamplePacks;
