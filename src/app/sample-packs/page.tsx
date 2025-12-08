import { FAQs } from '@/components/pages/samplePacks/FAQs';
import SamplePacks from '@/components/pages/samplePacks/SamplePacks';

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pt-20">
      <SamplePacks />
      <FAQs />
    </div>
  );
};

export default page;
