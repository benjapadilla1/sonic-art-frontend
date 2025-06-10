'use client';

import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
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
        <source src="/videos/heroVideo.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 flex h-full flex-row items-center bg-black/50 px-2 pl-14 text-center">
        <div className="relative grid h-[1.2em] w-[12ch]">
          <h1 className="font-engravers text-4xl font-bold text-white md:text-7xl">Creatividad</h1>
          <AnimatePresence mode="wait">
            <motion.h1
              key={words[index]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="font-engravers absolute bottom-0 left-0 text-4xl font-bold text-white md:text-7xl"
            >
              {words[index]}
            </motion.h1>
          </AnimatePresence>
          <Button asChild className="h-10 w-48 rounded-xl">
            <Link href="/cursos">Explorá los cursos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
