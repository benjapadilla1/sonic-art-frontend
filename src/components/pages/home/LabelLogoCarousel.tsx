'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const logos = [
  'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&h=400',
  'https://images.pexels.com/photos/164853/pexels-photo-164853.jpeg?auto=compress&cs=tinysrgb&h=400',
  'https://images.pexels.com/photos/164967/pexels-photo-164967.jpeg?auto=compress&cs=tinysrgb&h=400',
  'https://images.pexels.com/photos/114907/pexels-photo-114907.jpeg?auto=compress&cs=tinysrgb&h=400',
  'https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849822_960_720.jpg',
  'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&h=400',
  'https://images.pexels.com/photos/164853/pexels-photo-164853.jpeg?auto=compress&cs=tinysrgb&h=400',
];

const duplicatedLogos = [...logos, ...logos];

export const LabelLogoCarousel = () => {
  return (
    <div className="overflow-hidden pt-24 backdrop-blur-md">
      <p className="font-engravers py-10 text-center text-3xl font-semibold">
        Nuestros alumnos lanzaron sellos como
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
