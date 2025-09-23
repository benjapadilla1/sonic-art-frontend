import DetailPurchasedSamplePack from '@/components/pages/mySamplePacks/DetailPurchasedSamplePack';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const page = () => {
  return (
    <div className="pt-20">
      <Button variant="outline" asChild className="mb-6 ml-6">
        <Link href="/mis-sample-packs">Volver a mis sample packs</Link>
      </Button>
      <DetailPurchasedSamplePack />
    </div>
  );
};

export default page;
