import { CreateSamplePack } from '@/components/pages/admin/samplePacks/CreateSamplePack';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const page = () => {
  return (
    <div className="pt-20">
      <Link className="p-6" href={`/admin`}>
        <Button variant="outline">Volver</Button>
      </Link>
      <CreateSamplePack />
    </div>
  );
};

export default page;
