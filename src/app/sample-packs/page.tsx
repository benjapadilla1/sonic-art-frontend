import { PayhipEmbed } from '@/components/pages/samplePacks/Embed';
import { FAQs } from '@/components/pages/samplePacks/FAQs';

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-20">
      <PayhipEmbed dataKey="Vc0Ni" />
      <FAQs />
    </div>
  );
};

export default page;
