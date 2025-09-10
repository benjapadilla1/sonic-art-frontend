'use client';

import DetailSamplePack from '@/components/pages/samplePacks/detail/DetailSamplePack';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const DetailPage = () => {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';

  return (
    <div className="pt-20">
      <div className="pt-2 pl-10">
        <Button variant="outline" className="bg-white">
          <Link href={`/sample-packs`}>Volver</Link>
        </Button>
      </div>
      <DetailSamplePack id={id} />
    </div>
  );
};

export default DetailPage;
