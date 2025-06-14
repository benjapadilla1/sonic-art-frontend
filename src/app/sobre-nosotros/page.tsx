'use client';

import About from '@/components/pages/about/About';
import Born from '@/components/pages/about/Born';
import AboutHero from '@/components/pages/about/Hero';
import { SonicArtPhilosophy } from '@/components/pages/about/SonicArtPhilosophy';

const page = () => {
  return (
    <div className="m-auto flex min-h-screen w-full max-w-[1350px] flex-col items-center justify-center">
      <AboutHero />
      <About />
      <Born />
      <SonicArtPhilosophy />
    </div>
  );
};

export default page;
