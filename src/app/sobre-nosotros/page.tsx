'use client';

import About from '@/components/pages/about/About';
import AboutHero from '@/components/pages/about/Hero';
import { SonicArtPhilosophy } from '@/components/pages/about/SonicArtPhilosophy';
import { motion } from 'framer-motion';

const page = () => {
  return (
    <div className="flex min-h-screen flex-col py-40">
      <motion.h2
        className="font-engravers text-secondaryBlack text-center text-5xl tracking-wider uppercase md:text-6xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Sobre Nosotros
      </motion.h2>
      <AboutHero />
      <About />
      <SonicArtPhilosophy />
    </div>
  );
};

export default page;
