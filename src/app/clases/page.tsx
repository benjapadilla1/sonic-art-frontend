import { PayhipEmbedClasses } from '@/components/pages/classes/Embed';
import { FAQs } from '@/components/pages/classes/FAQs';

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-20">
      <PayhipEmbedClasses dataKey="your-data-key" />
      <FAQs />
    </div>
  );
};

export default page;
