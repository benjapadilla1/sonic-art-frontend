import { FAQs } from '@/components/pages/samplePacks/FAQs';
import { PayhipEmbed } from '../../components/pages/samplePacks/Embed';

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-20">
      <PayhipEmbed />
      <FAQs />
    </div>
  );
};

export default page;
