'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const logos = [
  '/images/home/logos/BIENAIMER.png',
  '/images/home/logos/Cyclic.png',
  '/images/home/logos/MDTRAXX.png',
  '/images/home/logos/Nervous-Records.png',
  '/images/home/logos/OTHERWISE.png',
  '/images/home/logos/Phonic.jpg',
  '/images/home/logos/Selecta.png',
  '/images/home/logos/WHOYOSTRO.png',
];

const duplicatedLogos = [...logos, ...logos];

export const LabelLogoCarousel = () => {
  return (
    <div className="overflow-hidden pt-24 backdrop-blur-md">
      <p className="text-secondaryBg py-10 text-center text-3xl font-semibold tracking-tight">
        Nuestros alumnos firmaron en sellos como:
      </p>
      <motion.div
        className="flex w-max gap-12 px-6"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div key={index} className="relative h-40 w-60 flex-shrink-0">
            <Image
              src={logo}
              alt={`Logo ${index + 1}`}
              fill
              className="rounded-md object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
