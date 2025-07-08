import { FAQs } from '@/components/pages/samplePacks/FAQs';
import Script from 'next/script';
import { PayhipEmbed } from '../../components/pages/samplePacks/Embed';

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-20">
      <PayhipEmbed />
      <div className="payhip-embed-page" data-key="Vc0Ni">
        ...
      </div>
      <Script type="text/javascript" src="https://payhip.com/embed-page.js?v=24u68984"></Script>
      <FAQs />
    </div>
  );
};

export default page;
