'use client';

import { EditSamplePack } from '@/components/pages/admin/samplePacks/EditSamplePack';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const CourseDetailPage = () => {
  const params = useParams();
  const id =
    typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';

  return (
    <div className="pt-20">
      <Link className="p-6" href={`/admin`}>
        <Button variant="outline">Volver</Button>
      </Link>
      <EditSamplePack id={id} />
    </div>
  );
};

export default CourseDetailPage;
