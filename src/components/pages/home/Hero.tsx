'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Hero = () => {
  const words = ['Impulsando', 'Simplificando', 'Potenciando'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/sampleVideo.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 flex h-full flex-row items-center justify-center gap-4 bg-black/50 px-2 text-center">
        <div className="h-fit overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1
              key={words[index]}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-white md:text-6xl"
            >
              {words[index]}
            </motion.h1>
          </AnimatePresence>
        </div>
        <h1 className="text-4xl font-bold text-white md:text-6xl">Creatividad</h1>
      </div>
    </section>
  );
};
